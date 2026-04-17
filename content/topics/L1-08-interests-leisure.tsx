import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L1-08-interests-leisure',
  level: 1,
  themeGroup: 'Identity',
  order: 8,
  titleHindi: 'रुचियाँ और मनोरंजन',
  titleEnglish: 'Interests & Leisure Activities',
  hook: '"What do you like?" is a guaranteed prompt. Arrive with five connected sentences, not five words.',
  heroScene: 'A flat-lay of hobby objects — cricket bat, chess board, sitar, paintbrushes, cricket ball — scattered on a kurta-textured background',
});
