import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L1-01-greetings',
  level: 1,
  themeGroup: 'Identity',
  order: 1,
  titleHindi: 'अभिवादन और परिचय',
  titleEnglish: 'Greetings & Introductions',
  hook: 'The first words any essay opens with — and the cheapest way to sound fluent.',
  heroScene: 'Two silhouetted students meeting on a school courtyard in the morning, hands joined in namaste, soft marigold sunrise',
});
