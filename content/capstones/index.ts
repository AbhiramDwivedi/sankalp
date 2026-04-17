// Registry of capstone essays. Capstones are cross-topic writing pieces that
// rehearse the FCPS exam performance. Each capstone draws from 3–5 topic
// packs and exists in 3 length tiers (novice / intermediateMid / push).

import type { Capstone, CapstoneIndexEntry } from '../schema';

import { capstone as C01 } from './C01-restaurant-memory';
import { capstone as C05 } from './C05-school-day';
import { capstone as C10 } from './C10-teen-life-essay';

// The registry auto-compacts; consumers import CAPSTONES / CAPSTONES_BY_ID.

export const CAPSTONES: Capstone[] = [
  C01,
  C05,
  C10,
  // C02, C03, C04, C06, C07, C08, C09 authored in Phase B sub-agent batches
];

export const CAPSTONES_BY_ID: Record<string, Capstone> = Object.fromEntries(
  CAPSTONES.map((c) => [c.id, c]),
);

export const CAPSTONE_INDEX: CapstoneIndexEntry[] = CAPSTONES.map((c) => ({
  id: c.id,
  order: c.order,
  tier: c.tier,
  titleHindi: c.titleHindi,
  titleEnglish: c.titleEnglish,
  themeGroup: c.themeGroup,
  isMockExam: c.isMockExam,
  status: c.status,
}));

export const CAPSTONES_BY_TIER: Record<'core' | 'push', Capstone[]> = {
  core: CAPSTONES.filter((c) => c.tier === 'core'),
  push: CAPSTONES.filter((c) => c.tier === 'push'),
};

export function getCapstone(id: string): Capstone | undefined {
  return CAPSTONES_BY_ID[id];
}

export function nextCapstoneAfter(id: string): Capstone | null {
  const idx = CAPSTONES.findIndex((c) => c.id === id);
  if (idx < 0 || idx >= CAPSTONES.length - 1) return null;
  return CAPSTONES[idx + 1];
}

export function capstonesForPackId(packId: string): Capstone[] {
  return CAPSTONES.filter((c) => c.draws.some((d) => d.packId === packId));
}
