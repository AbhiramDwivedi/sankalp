// Speaking-prompt + self-check defaults for any TopicPack that does NOT
// declare its own `speakingPrompts` / `speakingSelfCheck`. The schema makes
// both fields optional so authors can override per-pack — the helpers here
// guarantee that every pack still ships 5 prompts + 5 self-check items
// without requiring 26 hand edits.
//
// The strategy is mechanical, not stylistic: prompts are derived from the
// pack's existing `prompts` (writing prompts) by rewording for spoken
// delivery; self-check items reference the pack's own connectors, vocab,
// muhavare, and grammar so the rubric stays pack-specific. Added in 4.3.

import type { TopicPack } from './schema';

const SPOKEN_LEAD_INS = [
  'Talk for 60–90 seconds.',
  'Speak for about a minute.',
  'Tell the story aloud (60–90 seconds).',
  'Describe this aloud — about one minute.',
  'Talk through your answer for 60–90 seconds.',
];

/**
 * Reword a writing prompt for spoken delivery: drop "write" / "in three
 * paragraphs" / "describe in writing", prefix with a spoken lead-in.
 */
function rewordForSpeaking(writingPromptEnglish: string, leadIn: string): string {
  let s = writingPromptEnglish.trim();
  // Strip "in three paragraphs" / "in N paragraphs" anywhere.
  s = s.replace(/\s*in\s+(three|two|four|\d+)\s+paragraphs?[.,]?/gi, '');
  // Common writing verbs → spoken verbs.
  s = s.replace(/^Write\s+/i, 'Tell me ');
  s = s.replace(/\bdescribe\b/gi, 'describe aloud');
  s = s.replace(/\bDescribe aloud aloud\b/gi, 'Describe aloud');
  s = s.replace(/^Tell me\s+three paragraphs about\s+/i, 'Tell me about ');
  // Trim trailing ellipses / spaces / commas.
  s = s.replace(/\s{2,}/g, ' ').trim();
  return `${leadIn} ${s}`;
}

/**
 * Build 5 default speaking prompts for a pack. Strategy: take the pack's
 * existing 3 writing prompts and reword each for spoken delivery, then add
 * two pack-shaped extras that lean on vocabulary + cultural detail.
 */
export function defaultSpeakingPromptsFor(pack: TopicPack): string[] {
  const fromWriting = pack.prompts.slice(0, 3).map((p, i) =>
    rewordForSpeaking(p.english, SPOKEN_LEAD_INS[i % SPOKEN_LEAD_INS.length]),
  );

  // Pack-shaped extras. Use English titles so the prompt is pronounceable
  // by a non-Hindi narrator reading the text aloud; the spoken response is
  // expected in Hindi.
  const themeTitle = pack.titleEnglish;
  const extras = [
    `${SPOKEN_LEAD_INS[3]} Walk a friend through one specific moment from "${themeTitle}" — set the scene, describe what happened, and say how you felt.`,
    `${SPOKEN_LEAD_INS[4]} Compare two things from "${themeTitle}" (people, places, customs, or choices). Use at least one connector to mark the contrast.`,
  ];

  // Always 5.
  return [...fromWriting, ...extras].slice(0, 5);
}

/**
 * Build 5 default self-check items for a pack. Each item references a
 * concrete piece of the pack so the rubric stays pack-specific. The shape
 * is intentionally short — students tick boxes between recordings, not
 * read essays.
 */
export function defaultSpeakingSelfCheckFor(pack: TopicPack): string[] {
  const items: string[] = [];

  // 1) Past tense usage — every pack trains tense control toward IM.
  items.push('Used past tense at least once (e.g. ने … किया).');

  // 2) Vocab specificity — name 3 from the pack's own list.
  const sampleVocab = pack.vocabulary
    .slice(0, 3)
    .map((v) => v.hindi)
    .join(' / ');
  items.push(
    `Named at least 3 vocabulary items from this pack (e.g. ${sampleVocab}).`,
  );

  // 3) Connector use — pull one concrete connector from the pack's bank.
  const sampleConnectors = pack.connectors
    .slice(0, 3)
    .map((c) => c.hindi)
    .join(' / ');
  items.push(
    `Connected sentences with at least one connector (e.g. ${sampleConnectors}).`,
  );

  // 4) Muhavara / cultural detail — packs with a muhavara get the idiom
  //    check; otherwise fall back to a cultural-detail prompt.
  if (pack.muhavare.length > 0) {
    items.push(
      `Worked in one muhavara or cultural detail (e.g. ${pack.muhavare[0].phrase}).`,
    );
  } else {
    items.push(
      `Worked in one specific cultural or topic detail (not just generic statements).`,
    );
  }

  // 5) Pacing — uniform across packs, ties self-check to the rubric the
  //    AI rater will be given.
  items.push('Spoke for 60–90 seconds without long silent pauses.');

  return items;
}

/**
 * Resolve speaking prompts for a pack, preferring author-supplied values
 * if present and falling back to defaults otherwise. Always returns 5.
 */
export function getSpeakingPromptsFor(pack: TopicPack): string[] {
  if (pack.speakingPrompts && pack.speakingPrompts.length === 5) {
    return pack.speakingPrompts;
  }
  return defaultSpeakingPromptsFor(pack);
}

/**
 * Resolve speaking self-check items for a pack, preferring author-supplied
 * values if present and falling back to defaults otherwise. Always returns 5.
 */
export function getSpeakingSelfCheckFor(pack: TopicPack): string[] {
  if (pack.speakingSelfCheck && pack.speakingSelfCheck.length === 5) {
    return pack.speakingSelfCheck;
  }
  return defaultSpeakingSelfCheckFor(pack);
}
