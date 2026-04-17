import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

// NOTE: this is the REFERENCE PACK slot. It will be fully authored in Phase B.
export const pack: TopicPack = makeStub({
  id: 'L1-12-restaurants-food',
  level: 1,
  themeGroup: 'ModernSociety',
  order: 12,
  titleHindi: 'रेस्तराँ और खाना',
  titleEnglish: 'Restaurants & Food',
  hook: 'Culturally rich, vocabulary-dense, naturally uses connectors and time frames — the ideal FCPS essay topic.',
  heroScene: 'An Indian thali on a low wooden table — brass katoris filled with dal, sabzi, raita, chutneys, a pile of rotis, a tulsi plant in the corner, warm afternoon light',
});
