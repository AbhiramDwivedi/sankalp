
import { GoogleGenAI, Type } from "@google/genai";
import { ProficiencyLevel, Unit, EvaluationResult, Material } from "./types";

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

export const generateCoursePlan = async (
  name: string,
  startLevel: ProficiencyLevel,
  monthsAvailable: number
): Promise<Unit[]> => {
  // Cap generation to a reasonable number of units to maintain AI response quality (max 18 units)
  const unitsToGenerate = Math.min(monthsAvailable, 18);

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a strategic Hindi Learning Path for ${name} starting at ${startLevel} level. 
    The student has ${monthsAvailable} months until their target FCPS World Language Credit exam.
    
    CRITICAL INSTRUCTIONS:
    1. Generate EXACTLY ${unitsToGenerate} Units (one per month). 
    2. Each Unit must contain 4 distinct weekly lessons.
    3. SCALING COMPLEXITY:
       - If ${startLevel} is Novice Low and monthsAvailable is high (>6): Unit 1 MUST start with basic Devanagari alphabet (Varnamala), phonetics, and 2-letter words. DO NOT jump into sentences yet.
       - Gradually transition from alphabet -> words -> simple phrases -> sentences -> narratives -> complex logic + idioms.
       - The path should peak at Intermediate-Mid proficiency in the final 3 months.
    4. "SANKALPA" PHILOSOPHY: Focus on intentional logic. Even early lessons should ask "Why?".
    
    Ensure the JSON structure matches exactly.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            cognitiveGoal: { type: Type.STRING },
            targetProficiency: { type: Type.STRING },
            lessons: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  topic: { type: Type.STRING },
                  difficulty: { type: Type.NUMBER },
                  description: { type: Type.STRING },
                  status: { type: Type.STRING }
                },
                required: ["id", "title", "topic", "difficulty", "description", "status"]
              }
            }
          },
          required: ["id", "name", "cognitiveGoal", "targetProficiency", "lessons"]
        }
      }
    }
  });

  return safeJsonParse(response.text);
};

export const generateLessonMaterial = async (
  topic: string, 
  level: ProficiencyLevel
): Promise<Material> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a rich, multi-modal Hindi worksheet for ${level} student. Topic: ${topic}.
    
    SANKALPA GUIDELINES:
    - If ${level} is Novice Low: Focus on basic literacy, repetitive sounds, and high-frequency nouns. Keep idioms very simple (e.g., 'aankh ka tara').
    - If ${level} is Intermediate: Use complex sentence structures and deep narrative logic.
    
    MUST INCLUDE:
    1. A Narrative text (Devanagari). Length should be appropriate for ${level} (30 words for Novice Low, 150+ for Intermediate).
    2. Two "Muhavare" (Idioms) with Hindi meanings and example sentences.
    3. Three Practice Questions:
       - Q1: Interpretive (Hindi comprehension).
       - Q2: Interpersonal logic (Opinion/Thought).
       - Q3: Presentational challenge (Logic scenario).
    4. 5 Vocabulary words.
    5. 'thoughtPrompts': Thinking-heavy prompts for the parent/teacher to ask orally.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          hindiText: { type: Type.STRING },
          transliteration: { type: Type.STRING },
          englishTranslation: { type: Type.STRING },
          activity: { type: Type.STRING },
          idioms: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phrase: { type: Type.STRING },
                meaning: { type: Type.STRING },
                example: { type: Type.STRING }
              }
            }
          },
          practiceQuestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                hindiQuestion: { type: Type.STRING }
              }
            }
          },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { word: { type: Type.STRING }, meaning: { type: Type.STRING } }
            }
          },
          thoughtPrompts: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "hindiText", "transliteration", "englishTranslation", "activity", "vocabulary", "thoughtPrompts", "idioms", "practiceQuestions"]
      }
    }
  });

  return safeJsonParse(response.text);
};

export const evaluateHandwriting = async (
  imageData: string,
  lessonContext: string
): Promise<EvaluationResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: imageData } },
        { text: `Strict Evaluation for: ${lessonContext}.
        
        STAMP RUBRIC CRITERIA:
        - Novice: Can they write words/characters correctly?
        - Intermediate Low: Are they creating sentences with intent?
        - Intermediate Mid: Is there a cohesive story/narrative logic across time frames?
        
        Check Devanagari stroke logic if possible. Analyze the "Sankalpa" (intent) behind the student's choices.` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          identifiedStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          areasToImprove: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedNextStep: { type: Type.STRING },
          thoughtProcessAnalysis: { type: Type.STRING }
        }
      }
    }
  });

  return safeJsonParse(response.text);
};
