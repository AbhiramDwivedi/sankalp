import React from 'react';
import type { Deck, Flashcard } from '../../content/schema';
import { PrintCard, PrintCardBlank } from './PrintCard';

/**
 * 4-up single-fold flashcard print layout (no duplex required).
 *
 * Geometry (US letter portrait, 0.4in margins via the `@page flashcard` rule
 * in app/globals.css):
 *   printable area = 7.7in × 10.2in
 *   left half      = 0in–3.85in   (card FRONTS, 4 stacked vertically)
 *   right half     = 3.85in–7.7in (card BACKS, mirrored — see below)
 *   each card      = 3.5in × 2.5in (4 rows × 2.5in = 10in fits in 10.2in)
 *
 * Workflow for the user:
 *   1. Print one-sided. (Each printed sheet contains 4 cards.)
 *   2. Fold the page in half along the vertical centerline, with the PRINTED
 *      side facing OUT. The blank back of the paper goes to the inside of
 *      the fold — so both outer faces of the folded sheet show ink.
 *   3. Cut along the 3 horizontal gutters between rows → 4 standalone
 *      double-sided cards. No duplex printer, no alignment dance.
 *
 * Why the back content is horizontally mirrored (`transform: scaleX(-1)`):
 *   When you fold a sheet along a vertical centerline with print facing out,
 *   the right half rotates 180° around the vertical axis to land on the back
 *   face of the folded card. From the viewer's perspective on that back face,
 *   anything printed there would otherwise appear mirrored. We pre-mirror the
 *   back face on the printed page so it reads correctly after the fold.
 *
 * Vertical alignment is direct: card N's front sits on row N of the left half;
 * card N's back sits on row N of the right half. After folding, back N lands
 * directly behind front N.
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

/** Detect the `?printtest=1` URL flag for fold-alignment debugging. */
function usePrintTestFlag(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return new URLSearchParams(window.location.search).get('printtest') === '1';
  } catch {
    return false;
  }
}

interface PageProps {
  deck: Deck;
  cards: Flashcard[];
  pageIndex: number; // 0-based
  globalStart: number; // absolute card index of cards[0] within the deck
  showIndex: boolean;
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
    {deck.title} · sheet {pageIndex + 1} · fold along centerline
  </div>
);

/**
 * One printed page = a 2-column grid (left = fronts, right = mirrored backs)
 * of 4 rows. Each row holds one card front + its back.
 */
const FoldPage: React.FC<PageProps> = ({ deck, cards, pageIndex, globalStart, showIndex }) => {
  const rows: React.ReactNode[] = [];
  for (let row = 0; row < CARDS_PER_PAGE; row++) {
    const card = cards[row];
    const idx = globalStart + row;

    const frontCell = card ? (
      <PrintCard card={card} face="front" showIndex={showIndex ? idx : undefined} />
    ) : (
      <PrintCardBlank />
    );

    // Back cell is horizontally mirrored so it reads correctly after the
    // fold flips the right half around the vertical axis.
    const backCell = card ? (
      <div style={{ transform: 'scaleX(-1)', transformOrigin: 'center' }}>
        <PrintCard card={card} face="back" showIndex={showIndex ? idx : undefined} />
      </div>
    ) : (
      <PrintCardBlank />
    );

    rows.push(
      <React.Fragment key={`r-${row}`}>
        {frontCell}
        {backCell}
      </React.Fragment>,
    );
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
          // Wide column gap = the fold gutter. Page printable width is 7.7in,
          // 2 cards × 3.5in = 7in, leaving 0.7in for the centerline gutter.
          columnGap: '0.7in',
          rowGap: '0in',
          justifyContent: 'center',
          // Subtle dashed centerline so the user sees where to fold.
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
  const showIndex = usePrintTestFlag();

  return (
    <div className="print-only hidden print:block flashcard-print-root">
      {pages.map((pageCards, pageIdx) => {
        const globalStart = pageIdx * CARDS_PER_PAGE;
        return (
          <FoldPage
            key={pageIdx}
            deck={deck}
            cards={pageCards}
            pageIndex={pageIdx}
            globalStart={globalStart}
            showIndex={showIndex}
          />
        );
      })}
    </div>
  );
};
