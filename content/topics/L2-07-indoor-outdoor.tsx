import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L2-07-indoor-outdoor',
  level: 2,
  themeGroup: 'HumanIngenuity',
  order: 19,
  titleHindi: 'अंदर और बाहर की गतिविधियाँ',
  titleEnglish: 'Indoor & Outdoor Activities',
  hook: 'Binary comparisons ("when it rains... otherwise...") train conditional frames — rubric accelerant.',
  heroScene: 'A split illustration: one half indoor — a carrom board and chai; the other half outdoor — a kite in the sky and children playing cricket',
});
