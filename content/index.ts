// Registry of all topic packs in pedagogical order.
// Components read from TOPIC_PACKS / TOPIC_PACKS_BY_ID to render the Library
// and pack views.

import type { TopicIndexEntry, TopicPack, TopicTheme } from './schema';

import { pack as L1_01 } from './topics/L1-01-greetings';
import { pack as L1_02 } from './topics/L1-02-descriptions-feelings';
import { pack as L1_03 } from './topics/L1-03-family';
import { pack as L1_04 } from './topics/L1-04-clothing-colors';
import { pack as L1_05 } from './topics/L1-05-numbers-time';
import { pack as L1_06 } from './topics/L1-06-calendar';
import { pack as L1_07 } from './topics/L1-07-classes-supplies';
import { pack as L1_08 } from './topics/L1-08-interests-leisure';
import { pack as L1_09 } from './topics/L1-09-weather-seasons';
import { pack as L1_10 } from './topics/L1-10-places-transport';
import { pack as L1_11 } from './topics/L1-11-shopping';
import { pack as L1_12 } from './topics/L1-12-restaurants-food';

import { pack as L2_01 } from './topics/L2-01-daily-routine';
import { pack as L2_02 } from './topics/L2-02-rooms-chores';
import { pack as L2_03 } from './topics/L2-03-food';
import { pack as L2_04 } from './topics/L2-04-school-routines';
import { pack as L2_05 } from './topics/L2-05-school-activities';
import { pack as L2_06 } from './topics/L2-06-health-fitness';
import { pack as L2_07 } from './topics/L2-07-indoor-outdoor';
import { pack as L2_08 } from './topics/L2-08-shopping-advanced';
import { pack as L2_09 } from './topics/L2-09-special-events';
import { pack as L2_10 } from './topics/L2-10-travel-plans';
import { pack as L2_11 } from './topics/L2-11-countries-directions';

import { pack as L3_01 } from './topics/L3-01-my-memories';
import { pack as L3_02 } from './topics/L3-02-teen-life';
import { pack as L3_03 } from './topics/L3-03-my-future';

export const TOPIC_PACKS: TopicPack[] = [
  L1_01, L1_02, L1_03, L1_04, L1_05, L1_06, L1_07, L1_08, L1_09, L1_10, L1_11, L1_12,
  L2_01, L2_02, L2_03, L2_04, L2_05, L2_06, L2_07, L2_08, L2_09, L2_10, L2_11,
  L3_01, L3_02, L3_03,
];

export const TOPIC_PACKS_BY_ID: Record<string, TopicPack> = Object.fromEntries(
  TOPIC_PACKS.map((p) => [p.id, p]),
);

export const TOPIC_INDEX: TopicIndexEntry[] = TOPIC_PACKS.map((p) => ({
  id: p.id,
  titleHindi: p.titleHindi,
  titleEnglish: p.titleEnglish,
  level: p.level,
  themeGroup: p.themeGroup,
  order: p.order,
  status: p.status,
}));

export const TOPIC_PACKS_BY_LEVEL: Record<1 | 2 | 3, TopicPack[]> = {
  1: TOPIC_PACKS.filter((p) => p.level === 1),
  2: TOPIC_PACKS.filter((p) => p.level === 2),
  3: TOPIC_PACKS.filter((p) => p.level === 3),
};

export function nextPackAfter(id: string): TopicPack | null {
  const idx = TOPIC_PACKS.findIndex((p) => p.id === id);
  if (idx < 0 || idx >= TOPIC_PACKS.length - 1) return null;
  return TOPIC_PACKS[idx + 1];
}

export function getPack(id: string): TopicPack | undefined {
  return TOPIC_PACKS_BY_ID[id];
}

/**
 * Return all packs tagged with the given finer-grained `topicTheme`, sorted
 * by level (L1 → L2 → L3) and then by `order` within each level. Consumed
 * by the pack page "related at other levels" sibling strip (see
 * `ThemeSiblingStrip`) and by any cross-cutting theme view. If no packs are
 * tagged with the theme the list is empty.
 */
export function packsInTopicTheme(theme: TopicTheme): TopicPack[] {
  return TOPIC_PACKS
    .filter((p) => p.topicTheme === theme)
    .slice()
    .sort((a, b) => (a.level - b.level) || (a.order - b.order));
}
