import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L1-06-calendar',
  level: 1,
  themeGroup: 'Identity',
  order: 6,
  titleHindi: 'दिन, महीने और कैलेंडर',
  titleEnglish: 'Days, Months & Calendar',
  hook: 'Temporal vocabulary is the raw material for time-frame shifts — the Intermediate-Mid lever.',
  heroScene: 'A stylized calendar page with Hindi month names, marigold garlands draped at the corners, seasonal motifs — monsoon clouds, winter mist, summer sun — flowing across',
});
