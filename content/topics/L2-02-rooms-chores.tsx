import type { TopicPack } from '../schema';
import { makeStub } from '../stubHelpers';

export const pack: TopicPack = makeStub({
  id: 'L2-02-rooms-chores',
  level: 2,
  themeGroup: 'Identity',
  order: 14,
  titleHindi: 'घर के कमरे और कार्य',
  titleEnglish: 'Rooms of the House & Household Chores',
  hook: 'Concrete nouns plus action verbs — high-yield vocabulary for descriptive essays.',
  heroScene: 'A cutaway view of a middle-class Indian home with each room labelled by activity — kitchen with steaming pot, living room with a fan, bedroom with a bed and lamp',
});
