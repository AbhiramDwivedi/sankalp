import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L1-05-numbers-time',
  level: 1,
  themeGroup: 'Identity',
  order: 5,
  titleHindi: 'गिनती और समय',
  titleEnglish: 'Numbers & Time',
  hook: 'Raters notice when a student says "बजकर पाँच मिनट" instead of "five past" — cheap rubric points.',
  heroScene: 'An oversized brass clock face with Devanagari numerals, surrounded by hourglasses, calendar pages, and sundial shapes, cream background',
});
