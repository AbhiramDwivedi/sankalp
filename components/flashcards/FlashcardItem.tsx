import React from 'react';
import type { Flashcard } from '../../content/schema';
import { DevanagariText } from '../ui/DevanagariText';

interface FlashcardItemProps {
  card: Flashcard;
  flipped: boolean;
  onToggle: () => void;
  compact?: boolean;
}

const kindBadge: Record<Flashcard['kind'], { bg: string; label: string }> = {
  vocab: { bg: 'bg-amber-100 text-amber-800', label: 'Vocab' },
  connector: { bg: 'bg-indigo-100 text-indigo-800', label: 'Connector' },
  muhavara: { bg: 'bg-rose-100 text-rose-800', label: 'Muhavara' },
  grammar: { bg: 'bg-emerald-100 text-emerald-800', label: 'Grammar' },
  'tense-frame': { bg: 'bg-sky-100 text-sky-800', label: 'Tense' },
  structure: { bg: 'bg-slate-200 text-slate-800', label: 'Structure' },
};

export const FlashcardItem: React.FC<FlashcardItemProps> = ({
  card,
  flipped,
  onToggle,
  compact,
}) => {
  const meta = kindBadge[card.kind];
  const priorityPill =
    card.priority === 'must-know'
      ? 'bg-orange-600 text-white'
      : card.priority === 'core'
      ? 'bg-slate-200 text-slate-700'
      : 'bg-slate-100 text-slate-500';

  return (
    <button
      onClick={onToggle}
      className={`relative w-full bg-white rounded-[2rem] shadow-xl border-2 ${flipped ? 'border-orange-300' : 'border-slate-100'} p-8 md:p-12 min-h-[${compact ? '180' : '320'}px] flex flex-col justify-center text-left transition-all hover:shadow-2xl`}
    >
      <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${meta.bg}`}>
          {meta.label}
        </span>
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${priorityPill}`}>
          {card.priority === 'must-know' ? '★ must-know' : card.priority}
        </span>
      </div>

      <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
        {flipped ? 'Back' : 'Front'}
      </div>

      {!flipped && (
        <div className="space-y-3 text-center">
          {card.front.prompt && !card.front.hindi && (
            <p className="text-5xl md:text-6xl font-black text-slate-400">{card.front.prompt}</p>
          )}
          {card.front.hindi && (
            <DevanagariText size={compact ? 'md' : 'xl'} weight="black" className="text-slate-900 text-center" as="div">
              {card.front.hindi}
            </DevanagariText>
          )}
          {card.front.prompt && card.front.hindi && (
            <p className="text-base text-slate-500 italic mt-2">{card.front.prompt}</p>
          )}
          {card.front.english && (
            <p className="text-lg text-slate-500 italic">{card.front.english}</p>
          )}
          <p className="text-xs text-slate-400 font-semibold italic mt-6 no-print">Tap to flip</p>
        </div>
      )}

      {flipped && (
        <div className="space-y-3">
          {card.back.english && (
            <p className="text-xl md:text-2xl font-black text-slate-900 text-center">
              {card.back.english}
            </p>
          )}
          {card.back.hindi && (
            <DevanagariText size="sm" weight="medium" className="text-slate-500 text-center italic" as="div">
              {card.back.hindi}
            </DevanagariText>
          )}
          {card.back.example && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Example</p>
              <DevanagariText size="sm" weight="bold" className="text-slate-800" as="div">
                {card.back.example}
              </DevanagariText>
              {card.back.note && (
                <p className="text-sm text-slate-500 italic">{card.back.note}</p>
              )}
            </div>
          )}
        </div>
      )}
    </button>
  );
};
