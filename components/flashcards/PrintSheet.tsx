import React from 'react';
import type { Deck, Flashcard } from '../../content/schema';
import { PrintCard, PrintCardBlank } from './PrintCard';

/**
 * 4-cards-per-page paired-row flashcard print layout (no mirror, no required
 * fold).
 *
 * Geometry (US letter portrait, 0.4in margins via the `@page flashcard` rule
 * in app/globals.css):
 *   printable area = 7.7in × 10.2in
 *   each card cell = 3.5in × 2.5in (4 rows × 2.5in = 10in fits in 10.2in)
 *   columns        = 2 × 3.5in cards + 0.7in centerline gutter = 7.7in
 *
 * Each row = ONE card. Front in the left cell, back in the right cell. Both
 * faces are typeset normally (no transforms, no horizontal mirror) so the
 * print preview reads exactly like the on-screen cards. A subtle pairing
 * index ("1F" / "1B" etc.) sits in each cell's top-right corner so a stack
 * of cut strips can be re-paired if they get scrambled.
 *
 * Workflow for the user:
 *   1. Print one-sided.
 *   2. Cut horizontally between rows → strips of one card each (front-left,
 *      back-right). Each strip is already a usable study aid.
 *   3. (Optional) Fold each strip along the dashed centerline and glue
 *      front-to-back to make a permanent double-sided card. The dashed line
 *      between the two columns is purely a fold guide; it has no effect on
 *      the layout being useful as cut strips.
 *
 * History: PR #38 introduced a single-fold print layout that horizontally
 * mirrored the back column so that, after folding the printout outward and
 * cutting, the back face of each card would read correctly. The geometry was
 * sound, but in print preview the mirrored Devanagari and reversed English
 * scanned as "broken output" and the fold-then-cut workflow was unfamiliar.
 * This layout removes both surprises: every cell reads normally in preview,
 * the fold is optional, and the cut produces immediately usable strips.
 *
 * Partial final pages (e.g. a 13-card deck → 3 full pages of 4 + 1 page with
 * 1 card) keep the 4-row grid and fill empty rows with blank slots so no
 * surviving card shifts position.
 *
 * The DeckRunner renders on-screen; PrintSheet is gated on `print:block` and
 * only appears when the browser is in print media. Screen flip interaction
 * lives in FlashcardItem and is NOT reused here — print is a separate
 * presentational path (PrintCard) to keep screen and print layouts decoupled.
 */

interface PrintSheetProps {
  deck: Deck;
}

const CARDS_PER_PAGE = 4;

function chunk<T>(arr: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push([...arr.slice(i, i + size)]);
  return out;
}

interface PageProps {
  deck: Deck;
  cards: Flashcard[];
  pageIndex: number; // 0-based
  globalStart: number; // absolute card index of cards[0] within the deck
}

const PageHeader: React.FC<{ deck: Deck; pageIndex: number }> = ({ deck, pageIndex }) => (
  <div
    style={{
      fontSize: '6.5pt',
      fontWeight: 900,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: '#94a3b8',
      textAlign: 'center',
      marginBottom: '0.06in',
      lineHeight: 1.1,
    }}
  >
    {deck.title} · sheet {pageIndex + 1} · cut between rows · optional fold
    along dashed line + glue
  </div>
);

/**
 * One printed page = a 2-column × 4-row grid. Each row is one card: front
 * (left) + back (right), both reading normally. The dashed vertical
 * centerline is a visual fold guide for users who want to glue strips
 * front-to-back.
 */
const CardSheetPage: React.FC<PageProps> = ({ deck, cards, pageIndex, globalStart }) => {
  const rows: React.ReactNode[] = [];
  for (let row = 0; row < CARDS_PER_PAGE; row++) {
    const card = cards[row];
    const idx = globalStart + row + 1; // human-friendly 1-based pair number

    if (card) {
      rows.push(
        <React.Fragment key={`r-${row}`}>
          <PrintCard card={card} face="front" pairLabel={`${idx}F`} />
          <PrintCard card={card} face="back" pairLabel={`${idx}B`} />
        </React.Fragment>,
      );
    } else {
      rows.push(
        <React.Fragment key={`r-${row}`}>
          <PrintCardBlank />
          <PrintCardBlank />
        </React.Fragment>,
      );
    }
  }

  return (
    <div
      style={{
        pageBreakAfter: 'always',
        breakAfter: 'page',
      }}
    >
      <PageHeader deck={deck} pageIndex={pageIndex} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3.5in 3.5in',
          gridAutoRows: '2.5in',
          // Wide column gap = the optional fold gutter. Page printable width
          // is 7.7in; 2 cards × 3.5in = 7in, leaving 0.7in for the gutter.
          columnGap: '0.7in',
          rowGap: '0in',
          justifyContent: 'center',
          // Subtle dashed centerline as a fold guide for glue-bound cards.
          // Purely cosmetic; the cut-only workflow ignores it.
          backgroundImage:
            'linear-gradient(to bottom, #cbd5e1 50%, transparent 50%)',
          backgroundSize: '1px 6px',
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'center top',
        }}
      >
        {rows}
      </div>
    </div>
  );
};

export const PrintSheet: React.FC<PrintSheetProps> = ({ deck }) => {
  const pages = chunk<Flashcard>(deck.cards, CARDS_PER_PAGE);

  return (
    <div className="print-only hidden print:block flashcard-print-root">
      {pages.map((pageCards, pageIdx) => {
        const globalStart = pageIdx * CARDS_PER_PAGE;
        return (
          <CardSheetPage
            key={pageIdx}
            deck={deck}
            cards={pageCards}
            pageIndex={pageIdx}
            globalStart={globalStart}
          />
        );
      })}
    </div>
  );
};
