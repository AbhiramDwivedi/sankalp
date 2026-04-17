import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L3-03-my-future',
  level: 3,
  themeGroup: 'Identity',
  order: 26,
  titleHindi: 'मेरा भविष्य',
  titleEnglish: 'My Future',
  hook: 'Future tense + hypotheticals — the final piece of the three-time-frame puzzle the rubric requires.',
  heroScene: 'A dawn horizon seen through a window frame, a graduation cap silhouette, a distant city, a tree with roots growing into a compass rose',
});
