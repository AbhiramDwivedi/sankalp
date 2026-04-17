import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L1-09-weather-seasons',
  level: 1,
  themeGroup: 'Identity',
  order: 9,
  titleHindi: 'मौसम और ऋतुएँ',
  titleEnglish: 'Weather & Seasons',
  hook: 'Seasons force tense variety — summers were hot, winters will be cold, it is raining now.',
  heroScene: 'A four-panel tableau of Indian seasons: monsoon downpour with umbrellas, summer sun with mango tree, winter mist with shawls, spring with mustard fields',
});
