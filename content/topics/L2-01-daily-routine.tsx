import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L2-01-daily-routine',
  level: 2,
  themeGroup: 'Identity',
  order: 13,
  titleHindi: 'दैनिक दिनचर्या',
  titleEnglish: 'Daily Routine',
  hook: 'Sequence verbs + time markers — the fastest path from NH to IM paragraphs.',
  heroScene: 'A clock face as compass, with arrows pointing to morning tea, school, afternoon study, evening play, night reading — all as tiny scenes arrayed around it',
});
