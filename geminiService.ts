
import { GoogleGenAI, Type } from "@google/genai";
import { EvaluationResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

const RUBRIC_PROMPT_HEADER = `You are an Avant-style STAMP 2S/WS rater grading a Hindi response for the FCPS World Language Credit Exam.

Grade against the STAMP rubric:
- TEXT-TYPE:
  Benchmark 3 (Novice High) = simple sentences, disconnected
  Benchmark 4 (Intermediate Low) = strings of sentences with detail, still independent
  Benchmark 5 (Intermediate Mid, TARGET for 3 FCPS credits) = connected sentences with transitions and groupings of ideas; sentences cannot be rearranged without altering meaning; some control of past/present/future
  Benchmark 6+ = paragraph cohesion with stronger accuracy
- LANGUAGE CONTROL: High / Average / Low based on comprehensibility and accuracy (gender, number, verb forms).
- TOPIC COVERAGE: does the response stay on topic with specific vocabulary?

FCPS Writing format expected: two essays, each at least 3 cohesive paragraphs, personal experience.

Return a score 1-10 where 7+ maps to STAMP Benchmark 5 (Intermediate Mid, 3 credits).`;

export async function evaluateWriting(
  submission: WritingSubmission,
  promptContext: string
): Promise<EvaluationResult> {
  const taskLine = `Prompt context: ${promptContext}\n\nEvaluate the student's response below against the STAMP rubric above.`;

  const parts: any[] = [];
  if (submission.kind === 'image') {
    parts.push({ inlineData: { mimeType: 'image/jpeg', data: submission.data } });
    parts.push({ text: `${RUBRIC_PROMPT_HEADER}\n\n${taskLine}\n\n(Student response is in the attached image of handwriting.)` });
  } else {
    parts.push({
      text: `${RUBRIC_PROMPT_HEADER}\n\n${taskLine}\n\nStudent response (Devanagari):\n${submission.text}`,
    });
  }

  const response = await ai.models.generateContent({
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
}
