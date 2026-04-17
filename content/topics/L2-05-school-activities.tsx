import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L2-05-school-activities',
  level: 2,
  themeGroup: 'Identity',
  order: 17,
  titleHindi: 'स्कूल की गतिविधियाँ',
  titleEnglish: 'School-Related Activities',
  hook: 'Clubs, field trips, sports — ideal for narrative past-tense essays, a rubric requirement at IM.',
  heroScene: 'A school bulletin board collage — cricket trophy, science fair ribbon, music instruments, drama mask, art palette — pinned with washi tape',
});
