// Consumer-facing flashcard API. Wraps the auto-generated `generated.ts`
// with lookup helpers and deck grouping.

import type { Deck, DeckKind, Flashcard } from '../schema';
import { DECKS } from './generated';

export { DECKS };

export const DECKS_BY_ID: Record<string, Deck> = Object.fromEntries(
  DECKS.map((d) => [d.id, d]),
);

export const DECKS_BY_KIND: Record<DeckKind, Deck[]> = {
  'pack-review': DECKS.filter((d) => d.kind === 'pack-review'),
  'theme-review': DECKS.filter((d) => d.kind === 'theme-review'),
  'connector-drill': DECKS.filter((d) => d.kind === 'connector-drill'),
  'muhavara-drill': DECKS.filter((d) => d.kind === 'muhavara-drill'),
  'grammar-essentials': DECKS.filter((d) => d.kind === 'grammar-essentials'),
  'exam-prep': DECKS.filter((d) => d.kind === 'exam-prep'),
};

export function getDeck(id: string): Deck | undefined {
  return DECKS_BY_ID[id];
}

// Resolve the pack-review deck id for a given pack id. Returns null when no
// matching deck exists so call sites (e.g. the lesson-end "practice vocab"
// card) can safely guard against broken links. Convention: deck ids for
// pack-review decks are `deck-pack-<packId>` — generated deterministically by
// scripts/build-flashcards.ts.
export function packReviewDeckId(packId: string): string | null {
  const candidate = `deck-pack-${packId}`;
  return DECKS_BY_ID[candidate] ? candidate : null;
}

export function totalCards(): number {
  return DECKS.reduce((s, d) => s + d.cards.length, 0);
}

export function totalMustKnow(): number {
  const seen = new Set<string>();
  DECKS.forEach((d) =>
    d.cards.forEach((c) => {
      if (c.priority === 'must-know') seen.add(c.id);
    }),
  );
  return seen.size;
}

export function deckProgress(deck: Deck, seenIds: Set<string>): number {
  if (deck.cards.length === 0) return 0;
  const hit = deck.cards.filter((c) => seenIds.has(c.id)).length;
  return Math.round((hit / deck.cards.length) * 100);
}

export type { Flashcard };
