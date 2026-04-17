import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L2-03-food',
  level: 2,
  themeGroup: 'ModernSociety',
  order: 15,
  titleHindi: 'खाना और व्यंजन',
  titleEnglish: 'Food (Level 2 Deep Dive)',
  hook: 'Level 2 revisits food with prepositional richness and opinion statements — opinions drive IM scores.',
  heroScene: 'A Indian kitchen counter covered with a diverse spread — roti dough being rolled, masala dabba open, mango pickle jar, a steaming chai glass',
});
