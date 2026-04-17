import React from 'react';
import type { Deck, Flashcard } from '../../content/schema';

interface PrintSheetProps {
  deck: Deck;
}

// 8 cards per page (2 columns × 4 rows). Each page is "front sides". The next
// page is the mirrored "back sides" so a double-sided print yields cut-and-flip
// cards that line up.

const PAGE_SIZE = 8;

function chunk<T>(arr: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push([...arr.slice(i, i + size)]);
  return out;
}

export const PrintSheet: React.FC<PrintSheetProps> = ({ deck }) => {
  const pages: Flashcard[][] = chunk<Flashcard>(deck.cards, PAGE_SIZE);

  return (
    <div className="print-only hidden print:block">
      {pages.map((pageCards, pageIdx) => (
        <React.Fragment key={pageIdx}>
          {/* Front side */}
          <div className="print:break-after-page">
            <div className="text-center mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                {deck.title} - front · page {pageIdx * 2 + 1}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {pageCards.map((c) => (
                <CardFace key={c.id} card={c} side="front" />
              ))}
              {Array.from({ length: PAGE_SIZE - pageCards.length }).map((_, i) => (
                <div key={`blank-${i}`} className="h-64 border border-dashed border-slate-200 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Back side (mirrored horizontally so duplex prints align) */}
          <div className="print:break-after-page">
            <div className="text-center mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                {deck.title} - back · page {pageIdx * 2 + 2}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3" style={{ direction: 'rtl' }}>
              {pageCards.map((c) => (
                <div key={c.id} style={{ direction: 'ltr' }}>
                  <CardFace card={c} side="back" />
                </div>
              ))}
              {Array.from({ length: PAGE_SIZE - pageCards.length }).map((_, i) => (
                <div key={`blank-b-${i}`} className="h-64 border border-dashed border-slate-200 rounded-lg" />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const CardFace: React.FC<{ card: Flashcard; side: 'front' | 'back' }> = ({ card, side }) => {
  const face = side === 'front' ? card.front : card.back;
  return (
    <div className="h-64 border-2 border-slate-300 rounded-lg p-4 flex flex-col justify-between">
      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">
        {card.kind} · {card.priority}
      </p>
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2">
        {face.prompt && !face.hindi && (
          <p className="text-3xl">{face.prompt}</p>
        )}
        {face.hindi && (
          <p className="font-hindi text-xl font-bold text-slate-900">{face.hindi}</p>
        )}
        {face.prompt && face.hindi && (
          <p className="text-xs text-slate-500 italic">{face.prompt}</p>
        )}
        {face.english && (
          <p className="text-sm font-bold text-slate-800">{face.english}</p>
        )}
        {face.example && (
          <p className="font-hindi text-sm text-slate-700 mt-1">{face.example}</p>
        )}
        {face.note && (
          <p className="text-[10px] text-slate-500 italic">{face.note}</p>
        )}
      </div>
      <p className="text-[8px] text-slate-300 text-right">{card.id}</p>
    </div>
  );
};
