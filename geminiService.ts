
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
