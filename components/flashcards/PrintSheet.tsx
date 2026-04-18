import React from 'react';
import type { Deck, Flashcard } from '../../content/schema';
import { PrintCard, PrintCardBlank } from './PrintCard';

/**
 * 8-up duplex-aligned flashcard print layout.
 *
 * Layout math (US letter, 0.4in margins — see `@page` rule in index.html):
 *   printable area = 7.7in × 10.2in
 *   cards          = 2 cols × 4 rows of 3.5in × 2.5in = 7.0in × 10.0in
 *   gutters        = 0.35in column gap, 0.05in row gap  (fits in 7.7×10.2)
 *
 * Each sheet produces TWO printed pages:
 *   page A — FrontSheet: 8 card fronts in reading order [0,1,2,3,4,5,6,7]
 *   page B — BackSheet:  same 8 cards but each row's columns REVERSED
 *                        so indices become [1,0, 3,2, 5,4, 7,6]
 *
 * When the printer duplexes on the LONG edge (standard "flip horizontally"),
 * the paper flips left↔right, which puts card N's back directly behind its
 * front. Validated visually via the ?printtest=1 index overlay.
 *
 * A partial final sheet (e.g. 13 cards → first sheet full, second sheet has
 * 5 cards) keeps the 2×4 grid and fills the empty cells with blank slots,
 * so no surviving card shifts position.
 *
 * The DeckRunner renders on-screen; PrintSheet is gated on `print:block` and
 * only appears when the browser is in print media. Screen flip interaction
 * lives in FlashcardItem and is NOT reused here — print is a separate
 * presentational path (PrintCard) to keep screen and print layouts decoupled.
 */

interface PrintSheetProps {
  deck: Deck;
}

const CARDS_PER_SHEET = 8;
const COLS = 2;

function chunk<T>(arr: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push([...arr.slice(i, i + size)]);
  return out;
}

/** Detect the `?printtest=1` URL flag for duplex-alignment debugging. */
function usePrintTestFlag(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return new URLSearchParams(window.location.search).get('printtest') === '1';
  } catch {
    return false;
  }
}

interface SheetProps {
  deck: Deck;
  cards: Flashcard[];
  sheetIndex: number; // 0-based
  face: 'front' | 'back';
  globalStart: number; // absolute card index of cards[0] within the deck
  showIndex: boolean;
}

const SheetHeader: React.FC<{ deck: Deck; sheetIndex: number; face: 'front' | 'back' }> = ({
  deck,
  sheetIndex,
  face,
}) => (
  <div
    style={{
      fontSize: '7pt',
      fontWeight: 900,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: '#94a3b8',
      textAlign: 'center',
      marginBottom: '0.12in',
    }}
  >
    {deck.title} · sheet {sheetIndex + 1} · {face}
  </div>
);

const SheetGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${COLS}, 3.5in)`,
      gridAutoRows: '2.5in',
      columnGap: '0.35in',
      rowGap: '0.05in',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

const FrontSheet: React.FC<SheetProps> = ({ deck, cards, sheetIndex, globalStart, showIndex }) => {
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < CARDS_PER_SHEET; i++) {
    const card = cards[i];
    if (card) {
      cells.push(
        <PrintCard
          key={`f-${card.id}`}
          card={card}
          face="front"
          showIndex={showIndex ? globalStart + i : undefined}
        />,
      );
    } else {
      cells.push(<PrintCardBlank key={`f-blank-${i}`} />);
    }
  }
  return (
    <div
      style={{
        pageBreakAfter: 'always',
        breakAfter: 'page',
        // Size the page container so Chromium doesn't paginate mid-grid.
        minHeight: '10.2in',
      }}
    >
      <SheetHeader deck={deck} sheetIndex={sheetIndex} face="front" />
      <SheetGrid>{cells}</SheetGrid>
    </div>
  );
};

const BackSheet: React.FC<SheetProps> = ({ deck, cards, sheetIndex, globalStart, showIndex }) => {
  // Mirror columns per row: [a,b, c,d, e,f, g,h] -> [b,a, d,c, f,e, h,g].
  const cells: React.ReactNode[] = [];
  for (let row = 0; row < CARDS_PER_SHEET / COLS; row++) {
    for (let col = 0; col < COLS; col++) {
      const mirroredCol = COLS - 1 - col;
      const idx = row * COLS + mirroredCol;
      const card = cards[idx];
      if (card) {
        cells.push(
          <PrintCard
            key={`b-${card.id}`}
            card={card}
            face="back"
            showIndex={showIndex ? globalStart + idx : undefined}
          />,
        );
      } else {
        cells.push(<PrintCardBlank key={`b-blank-${row}-${col}`} />);
      }
    }
  }
  return (
    <div
      style={{
        pageBreakAfter: 'always',
        breakAfter: 'page',
        minHeight: '10.2in',
      }}
    >
      <SheetHeader deck={deck} sheetIndex={sheetIndex} face="back" />
      <SheetGrid>{cells}</SheetGrid>
    </div>
  );
};

export const PrintSheet: React.FC<PrintSheetProps> = ({ deck }) => {
  const sheets = chunk<Flashcard>(deck.cards, CARDS_PER_SHEET);
  const showIndex = usePrintTestFlag();

  return (
    <div className="print-only hidden print:block flashcard-print-root">
      {sheets.map((sheetCards, sheetIdx) => {
        const globalStart = sheetIdx * CARDS_PER_SHEET;
        return (
          <React.Fragment key={sheetIdx}>
            <FrontSheet
              deck={deck}
              cards={sheetCards}
              sheetIndex={sheetIdx}
              globalStart={globalStart}
              face="front"
              showIndex={showIndex}
            />
            <BackSheet
              deck={deck}
              cards={sheetCards}
              sheetIndex={sheetIdx}
              globalStart={globalStart}
              face="back"
              showIndex={showIndex}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
