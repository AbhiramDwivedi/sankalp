import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L1-10-places-transport',
  level: 1,
  themeGroup: 'ModernSociety',
  order: 10,
  titleHindi: 'जगहें और यातायात',
  titleEnglish: 'Cities, Places, Activities & Transportation',
  hook: 'Postpositions (से, तक, में, पर) get their first workout here — grammar gold.',
  heroScene: 'A stylized Indian cityscape with an auto-rickshaw, a cycle, a train, and a bus arranged like a board game route, terracotta rooftops',
});
