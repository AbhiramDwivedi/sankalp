
import { GoogleGenAI, Type } from "@google/genai";
import { EvaluationResult } from "./types";
import { CURRICULUM } from "./content/curriculum";
import { buildRaterPromptHeader } from "./content/curriculumRubric";

let _ai: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (_ai) return _ai;
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set; AI assessment is disabled.");
  _ai = new GoogleGenAI({ apiKey });
  return _ai;
}

const safeJsonParse = (text: string) => {
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse Gemini JSON:", text);
    throw new Error("AI response malformed.");
  }
};

// Assessment is the only AI call retained. Inputs: either a pasted/typed essay
// (preferred - matches exam typing interface) or a handwritten image.
export type WritingSubmission =
  | { kind: 'text'; text: string }
  | { kind: 'image'; data: string };

const OFFLINE_MESSAGE =
  "You're offline — AI assessment needs an internet connection. Your essay is saved locally.";

function isOffline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine === false;
}

// User-friendly message for HTTP 429 (free-tier quota). Surfaced verbatim.
const RATE_LIMIT_MESSAGE =
  "AI grading is rate-limited right now (free tier: 15 requests/min, 1500/day). Wait a minute and try again — your recording is saved locally.";

export async function evaluateWriting(
  submission: WritingSubmission,
  promptContext: string
): Promise<EvaluationResult> {
  // Short-circuit when the browser reports offline. The Gemini SDK would
  // otherwise surface a cryptic fetch error; surface a friendly message
  // and keep the locally-persisted essay untouched.
  if (isOffline()) {
    throw new Error(OFFLINE_MESSAGE);
  }

  // The prompt header is derived entirely from CURRICULUM + curriculum-neutral
  // rubric data (see content/curriculumRubric.ts). No rubric prose is hard-
  // coded here — swapping CURRICULUM swaps the prompt.
  const rubricPromptHeader = buildRaterPromptHeader();
  const taskLine = `Prompt context: ${promptContext}\n\nEvaluate the student's response below against the ${CURRICULUM.examSystem.shortName} rubric above.`;

  const parts: any[] = [];
  if (submission.kind === 'image') {
    parts.push({ inlineData: { mimeType: 'image/jpeg', data: submission.data } });
    parts.push({ text: `${rubricPromptHeader}\n\n${taskLine}\n\n(Student response is in the attached image of handwriting.)` });
  } else {
    parts.push({
      text: `${rubricPromptHeader}\n\n${taskLine}\n\nStudent response (${CURRICULUM.language.script}):\n${submission.text}`,
    });
  }

  try {
    const response = await getAi().models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            identifiedStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            areasToImprove: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedNextStep: { type: Type.STRING },
            thoughtProcessAnalysis: { type: Type.STRING },
          },
          required: ['score', 'feedback', 'identifiedStrengths', 'areasToImprove', 'suggestedNextStep', 'thoughtProcessAnalysis'],
        },
      },
    });

    const raw = safeJsonParse(response.text) as Omit<EvaluationResult, 'date'>;
    return { ...raw, date: new Date().toISOString() };
  } catch (err) {
    // A network failure inside the SDK surfaces as a generic TypeError. If
    // we dropped offline mid-request, normalize the message.
    if (isOffline()) {
      throw new Error(OFFLINE_MESSAGE);
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Speaking evaluation (4.3) — separate sibling to evaluateWriting. Accepts a
// recorded audio Blob (webm/opus from MediaRecorder) and submits it as inline
// audio to gemini-2.5-flash with a speaking-rubric wrapper. The rater prompt
// is the same curriculum-derived header as writing; only the wrapper says
// "this is a spoken response, judge accordingly."
// ---------------------------------------------------------------------------

/**
 * Convert a Blob into a base64-encoded string (no data: prefix), suitable for
 * passing as the `data` field of a Gemini inline-data part. Browser-only
 * (uses FileReader). Kept module-local; not part of the public API.
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result is "data:<mime>;base64,<payload>". Strip the prefix.
      const comma = result.indexOf(',');
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error || new Error('Failed to read audio blob.'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Detect a Gemini rate-limit error (HTTP 429 / "RESOURCE_EXHAUSTED"). The
 * SDK surfaces these as Errors whose `message` contains "429" or the status
 * string. Network status can be on `err.status` for some SDK versions, so
 * check both.
 */
function isRateLimitError(err: unknown): boolean {
  if (!err) return false;
  const anyErr = err as { status?: number; code?: number; message?: string };
  if (anyErr.status === 429 || anyErr.code === 429) return true;
  const msg = String(anyErr.message || err).toLowerCase();
  return msg.includes('429') || msg.includes('rate limit') || msg.includes('resource_exhausted') || msg.includes('quota');
}

export async function evaluateSpeaking(
  audioBlob: Blob,
  promptContext: string,
  /** mimeType override; defaults to whatever the blob reports (typically audio/webm). */
  mimeOverride?: string,
): Promise<EvaluationResult> {
  if (isOffline()) {
    throw new Error(OFFLINE_MESSAGE);
  }
  if (!audioBlob || audioBlob.size === 0) {
    throw new Error('No audio recorded yet — record before submitting.');
  }

  const rubricPromptHeader = buildRaterPromptHeader();
  const speakingWrapper = `The student's response below is SPOKEN, not written. Audio is attached as inline data. Apply the same ${CURRICULUM.examSystem.shortName} rubric, but score for spoken delivery: fluency / pacing / pronunciation count toward Language Control; visible paragraph structure does not apply (judge cohesion through transitions and ideas). The student is rehearsing for the ${CURRICULUM.examSystem.name} Speaking section.

Prompt context: ${promptContext}

Listen to the attached audio and grade against the rubric above.`;

  // Default to audio/webm (MediaRecorder default in Chromium). Strip any
  // codec qualifier ("audio/webm;codecs=opus" → "audio/webm") because the
  // Gemini SDK only accepts the bare mime.
  const rawMime = mimeOverride || audioBlob.type || 'audio/webm';
  const mimeType = rawMime.split(';')[0].trim() || 'audio/webm';

  let base64Audio: string;
  try {
    base64Audio = await blobToBase64(audioBlob);
  } catch (e: any) {
    throw new Error('Could not encode audio for upload — try recording again.');
  }

  const parts: any[] = [
    { inlineData: { mimeType, data: base64Audio } },
    { text: `${rubricPromptHeader}\n\n${speakingWrapper}` },
  ];

  try {
    const response = await getAi().models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            identifiedStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            areasToImprove: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedNextStep: { type: Type.STRING },
            thoughtProcessAnalysis: { type: Type.STRING },
          },
          required: [
            'score',
            'feedback',
            'identifiedStrengths',
            'areasToImprove',
            'suggestedNextStep',
            'thoughtProcessAnalysis',
          ],
        },
      },
    });

    const raw = safeJsonParse(response.text) as Omit<EvaluationResult, 'date'>;
    return { ...raw, date: new Date().toISOString() };
  } catch (err) {
    if (isOffline()) {
      throw new Error(OFFLINE_MESSAGE);
    }
    if (isRateLimitError(err)) {
      throw new Error(RATE_LIMIT_MESSAGE);
    }
    throw err;
  }
}
