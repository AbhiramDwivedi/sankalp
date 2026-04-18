// Flashcard deck generator. Deterministic and idempotent.
// Reads TOPIC_PACKS, CAPSTONES, CONNECTORS, and mustHaveCards curation, then
// writes a single committed file at content/flashcards/generated.ts with the
// full DECKS export. Runtime does not re-run this; ship the generated file.
//
// Run: `npx tsx scripts/build-flashcards.ts`

import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { TOPIC_PACKS, TOPIC_PACKS_BY_LEVEL } from '../content';
import { CAPSTONES } from '../content/capstones';
import { CONNECTORS } from '../content/connectors';
import { GRAMMAR_ESSENTIALS, MUST_KNOW_CONNECTOR_KEYS, VOCAB_MUST_KNOW_CROSS_PACK_THRESHOLD } from '../content/flashcards/mustHaveCards';
import type { Deck, Flashcard, TopicPack } from '../content/schema';
import { CURRICULUM } from '../content/curriculum';

// --- Helpers ---------------------------------------------------------------

// Count how many packs use each Hindi vocabulary word for must-know promotion.
function buildVocabCrossPackMap(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of TOPIC_PACKS) {
    const seen = new Set<string>();
    for (const v of p.vocabulary) {
      if (seen.has(v.hindi)) continue;
      seen.add(v.hindi);
      counts.set(v.hindi, (counts.get(v.hindi) || 0) + 1);
    }
  }
  return counts;
}

const crossPack = buildVocabCrossPackMap();

function makeVocabCard(pack: TopicPack, vocabIndex: number): Flashcard {
  const v = pack.vocabulary[vocabIndex];
  const crossCount = crossPack.get(v.hindi) || 1;
  const priority: Flashcard['priority'] =
    crossCount >= VOCAB_MUST_KNOW_CROSS_PACK_THRESHOLD ? 'must-know' : 'core';
  return {
    id: `vocab-${pack.id}-${vocabIndex}`,
    kind: 'vocab',
    sourceRef: { packId: pack.id, entryKey: v.hindi },
    front: {
      hindi: v.hindi,
      prompt: v.emoji,
    },
    back: {
      english: v.english,
      hindi: v.transliteration,
      example: v.exampleHindi,
      note: v.exampleEnglish,
    },
    priority,
    trains: ['TopicCoverage'],
  };
}

function makeMuhavaraCard(pack: TopicPack, muhIndex: number): Flashcard {
  const m = pack.muhavare[muhIndex];
  return {
    id: `muhavara-${pack.id}-${muhIndex}`,
    kind: 'muhavara',
    sourceRef: { packId: pack.id },
    front: {
      hindi: m.phrase,
      prompt: 'मुहावरा',
    },
    back: {
      english: m.meaning,
      hindi: m.literal,
      example: m.example,
      note: m.exampleEnglish,
    },
    priority: 'must-know',
    trains: ['LanguageControl', 'TextType'],
  };
}

function makeConnectorCard(key: string): Flashcard {
  const c = CONNECTORS[key];
  const priority: Flashcard['priority'] =
    MUST_KNOW_CONNECTOR_KEYS.includes(key) ? 'must-know' : 'core';
  return {
    id: `connector-${key}`,
    kind: 'connector',
    front: {
      hindi: c.hindi,
      prompt: c.frame,
    },
    back: {
      english: c.english,
      hindi: c.transliteration,
      example: c.sampleHindi,
      note: c.sampleEnglish,
    },
    priority,
    trains: ['TextType'],
  };
}

function makeGrammarCard(essentialId: string): Flashcard {
  const g = GRAMMAR_ESSENTIALS.find((e) => e.id === essentialId);
  if (!g) throw new Error(`Unknown grammar essential: ${essentialId}`);
  return {
    id: g.id,
    kind: 'grammar',
    front: {
      prompt: g.front.prompt,
      hindi: g.front.hindi,
    },
    back: {
      english: g.back.english,
      example: g.back.example,
      note: g.back.note,
    },
    priority: g.priority,
    trains: ['LanguageControl'],
  };
}

// --- Deck builders ---------------------------------------------------------

function buildPackReviewDeck(pack: TopicPack): Deck {
  const vocabCards = pack.vocabulary.map((_, i) => makeVocabCard(pack, i));
  const muhCards = pack.muhavare.map((_, i) => makeMuhavaraCard(pack, i));
  const connectorKeys = pickConnectorKeysForPack(pack);
  const connCards = connectorKeys.slice(0, 3).map(makeConnectorCard);

  return {
    id: `deck-pack-${pack.id}`,
    title: `${pack.titleEnglish}`,
    subtitle: pack.titleHindi,
    description: `Vocabulary, muhavare, and connectors from ${pack.id}. ${vocabCards.length + muhCards.length + connCards.length} cards.`,
    kind: 'pack-review',
    packIds: [pack.id],
    cards: [...vocabCards, ...muhCards, ...connCards],
  };
}

// Identify connector keys present on the pack's connectors list by matching hindi.
function pickConnectorKeysForPack(pack: TopicPack): string[] {
  const packConnectorHindis = new Set(pack.connectors.map((c) => c.hindi));
  const keys: string[] = [];
  for (const [key, def] of Object.entries(CONNECTORS)) {
    if (packConnectorHindis.has(def.hindi)) keys.push(key);
  }
  return keys;
}

function buildThemeReviewDeck(
  theme: 'Identity' | 'ModernSociety' | 'HumanIngenuity',
  label: string,
  subtitle: string,
): Deck {
  const themePacks = TOPIC_PACKS.filter((p) => p.themeGroup === theme);
  const cards: Flashcard[] = [];

  // Take first 4 must-know vocab per pack, max 30 total.
  const candidateVocab: Flashcard[] = [];
  themePacks.forEach((p) => {
    p.vocabulary.forEach((v, i) => {
      const card = makeVocabCard(p, i);
      if (card.priority === 'must-know') candidateVocab.push(card);
    });
  });

  // Dedupe by back.english + hindi
  const seen = new Set<string>();
  const deduped: Flashcard[] = [];
  for (const c of candidateVocab) {
    const k = `${c.front.hindi}|${c.back.english}`;
    if (seen.has(k)) continue;
    seen.add(k);
    deduped.push(c);
    if (deduped.length >= 24) break;
  }
  cards.push(...deduped);

  // Add 6 muhavare from the theme's packs.
  themePacks.slice(0, 3).forEach((p) => {
    p.muhavare.forEach((_, i) => cards.push(makeMuhavaraCard(p, i)));
  });

  return {
    id: `deck-theme-${theme}`,
    title: label,
    subtitle,
    description: `A curated review deck across all ${theme} packs - the highest-value vocabulary + all muhavare. ${cards.length} cards.`,
    kind: 'theme-review',
    packIds: themePacks.map((p) => p.id),
    cards,
  };
}

function buildConnectorDrillDeck(): Deck {
  const cards = Object.keys(CONNECTORS).map(makeConnectorCard);
  return {
    id: 'deck-connector-drill',
    title: 'Connector drill',
    subtitle: 'पहले · फिर · क्योंकि · लेकिन · इसलिए · हालाँकि · अगर...तो',
    description: `All ${cards.length} connectors in the master bank, with frame and sample. The single most important pre-exam drill - no connectors means no ${CURRICULUM.displayStrings.targetPhrase}.`,
    kind: 'connector-drill',
    cards,
  };
}

function buildMuhavaraDrillDeck(): Deck {
  const cards: Flashcard[] = [];
  TOPIC_PACKS.forEach((p) => {
    p.muhavare.forEach((_, i) => cards.push(makeMuhavaraCard(p, i)));
  });
  return {
    id: 'deck-muhavara-drill',
    title: 'Muhavara drill',
    subtitle: 'All 52 idioms across the library',
    description: `Every muhavara taught across all 26 packs - 2 per pack, ${cards.length} total. One well-placed idiom in an essay signals Intermediate-Mid register.`,
    kind: 'muhavara-drill',
    cards,
  };
}

function buildGrammarEssentialsDeck(): Deck {
  const cards = GRAMMAR_ESSENTIALS.map((g) => makeGrammarCard(g.id));
  return {
    id: 'deck-grammar-essentials',
    title: 'Grammar essentials',
    subtitle: `The 25 ${CURRICULUM.language.name} control points that land ${CURRICULUM.displayStrings.targetPhrase}`,
    description: `ने construction, gender agreement, postpositions, tenses, conditional, polite imperatives, reported speech, and complex clauses. ${cards.length} cards.`,
    kind: 'grammar-essentials',
    cards,
  };
}

function buildExamPrepDeck(allCards: Flashcard[]): Deck {
  // Top ~150 must-know, dedupe by id, capped.
  const must = allCards.filter((c) => c.priority === 'must-know');
  const seen = new Set<string>();
  const unique: Flashcard[] = [];
  for (const c of must) {
    if (seen.has(c.id)) continue;
    seen.add(c.id);
    unique.push(c);
    if (unique.length >= 150) break;
  }
  return {
    id: 'deck-exam-prep',
    title: 'Top 150 must-know',
    subtitle: 'Pre-exam companion deck',
    description: `The 150 highest-value cards across the library - must-know vocabulary, all connectors, all muhavare, and all grammar essentials. The single deck to drill the week before the exam.`,
    kind: 'exam-prep',
    cards: unique,
  };
}

// --- Generate --------------------------------------------------------------

const allCardsPool: Flashcard[] = [];

// Pack-review decks
const packReviewDecks: Deck[] = TOPIC_PACKS.map((p) => {
  const deck = buildPackReviewDeck(p);
  allCardsPool.push(...deck.cards);
  return deck;
});

// Theme review decks
const themeReviewDecks: Deck[] = [
  buildThemeReviewDeck('Identity', 'Identity review', 'Self, family, feelings, clothing, memories'),
  buildThemeReviewDeck('ModernSociety', 'Modern Society review', 'Food, travel, shopping, directions, places'),
  buildThemeReviewDeck('HumanIngenuity', 'Human Ingenuity review', 'Hobbies, health, leisure, teen life'),
];
themeReviewDecks.forEach((d) => allCardsPool.push(...d.cards));

const connectorDrillDeck = buildConnectorDrillDeck();
allCardsPool.push(...connectorDrillDeck.cards);

const muhavaraDrillDeck = buildMuhavaraDrillDeck();
allCardsPool.push(...muhavaraDrillDeck.cards);

const grammarDeck = buildGrammarEssentialsDeck();
allCardsPool.push(...grammarDeck.cards);

const examPrepDeck = buildExamPrepDeck(allCardsPool);

const allDecks: Deck[] = [
  ...packReviewDecks,
  ...themeReviewDecks,
  connectorDrillDeck,
  muhavaraDrillDeck,
  grammarDeck,
  examPrepDeck,
];

// Sanity
const uniqueIds = new Set(allDecks.map((d) => d.id));
if (uniqueIds.size !== allDecks.length) {
  console.error('Duplicate deck ids detected!');
  process.exit(1);
}

// Emit generated file
const header = `// AUTO-GENERATED by scripts/build-flashcards.ts - DO NOT EDIT BY HAND.
// Regenerate with: \`npx tsx scripts/build-flashcards.ts\`

import type { Deck } from '../schema';

`;

const body = `export const DECKS: Deck[] = ${JSON.stringify(allDecks, null, 2)};\n`;

const outPath = join(__dirname, '..', 'content', 'flashcards', 'generated.ts');
writeFileSync(outPath, header + body, 'utf8');

const totalCards = allDecks.reduce((s, d) => s + d.cards.length, 0);
console.log(`Generated ${allDecks.length} decks · ${totalCards} total cards`);
console.log(`  Pack-review: ${packReviewDecks.length}`);
console.log(`  Theme-review: ${themeReviewDecks.length}`);
console.log(`  Connector drill: ${connectorDrillDeck.cards.length} cards`);
console.log(`  Muhavara drill: ${muhavaraDrillDeck.cards.length} cards`);
console.log(`  Grammar essentials: ${grammarDeck.cards.length} cards`);
console.log(`  Exam prep (top must-know): ${examPrepDeck.cards.length} cards`);
console.log(`Wrote ${outPath}`);
