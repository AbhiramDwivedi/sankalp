
import { ProficiencyLevel } from './types';

export const STAMP_TOPICS = [
  'Identity & Personal Info',
  'Family & Home',
  'School & Education',
  'Daily Routine & Leisure',
  'Health & Wellbeing',
  'Community & Neighborhood',
  'Work & Career',
  'Global Issues & Environment',
  'Arts & Culture'
];

export const PROFICIENCY_ORDER: ProficiencyLevel[] = [
  ProficiencyLevel.NOVICE_LOW,
  ProficiencyLevel.NOVICE_MID,
  ProficiencyLevel.NOVICE_HIGH,
  ProficiencyLevel.INTERMEDIATE_LOW,
  ProficiencyLevel.INTERMEDIATE_MID,
  ProficiencyLevel.INTERMEDIATE_HIGH,
];

export const AVANT_RUBRIC_SUMMARY = {
  [ProficiencyLevel.NOVICE_LOW]: "Can list words and simple phrases.",
  [ProficiencyLevel.NOVICE_MID]: "Can use basic sentences on familiar topics.",
  [ProficiencyLevel.NOVICE_HIGH]: "Can maintain simple conversations and write short paragraphs.",
  [ProficiencyLevel.INTERMEDIATE_LOW]: "Can create with language, ask/answer questions, and handle social situations.",
  [ProficiencyLevel.INTERMEDIATE_MID]: "Can describe and narrate in various time frames.",
  [ProficiencyLevel.INTERMEDIATE_HIGH]: "Can handle abstract topics and complex social situations."
};

/**
 * Estimated months needed to reach Intermediate-Mid (3 FCPS Credits) 
 * with ~30 mins daily practice.
 */
export const LEVEL_PREP_MONTHS: Record<ProficiencyLevel, number> = {
  [ProficiencyLevel.NOVICE_LOW]: 12,
  [ProficiencyLevel.NOVICE_MID]: 9,
  [ProficiencyLevel.NOVICE_HIGH]: 6,
  [ProficiencyLevel.INTERMEDIATE_LOW]: 4,
  [ProficiencyLevel.INTERMEDIATE_MID]: 2,
  [ProficiencyLevel.INTERMEDIATE_HIGH]: 1,
};

export const calculateRecommendedDate = (level: ProficiencyLevel): string => {
  const now = new Date();
  const monthsNeeded = LEVEL_PREP_MONTHS[level];
  const targetDate = new Date(now.getFullYear(), now.getMonth() + monthsNeeded, 1);
  
  const currentYear = now.getFullYear();
  const examMonth = 10; // November (0-indexed 10)
  
  // If the target date is after this year's November, target next year
  if (targetDate.getFullYear() > currentYear || targetDate.getMonth() > examMonth) {
    return `${currentYear + 1}-11-01`;
  }
  
  return `${currentYear}-11-01`;
};
