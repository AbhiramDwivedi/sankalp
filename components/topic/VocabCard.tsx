import React from 'react';
import type { VocabEntry } from '../../content/schema';
import { DevanagariText } from '../ui/DevanagariText';

interface VocabCardProps {
  entry: VocabEntry;
  compact?: boolean;
}

const posColor: Record<VocabEntry['partOfSpeech'], string> = {
  noun: 'bg-indigo-50 text-indigo-700',
  verb: 'bg-emerald-50 text-emerald-700',
  adjective: 'bg-amber-50 text-amber-700',
  adverb: 'bg-rose-50 text-rose-700',
  phrase: 'bg-orange-50 text-orange-700',
  question: 'bg-violet-50 text-violet-700',
  number: 'bg-slate-100 text-slate-700',
  pronoun: 'bg-cyan-50 text-cyan-700',
};

export const VocabCard: React.FC<VocabCardProps> = ({ entry, compact = false }) => (
  <div className="bg-white border-2 border-slate-100 hover:border-orange-200 rounded-2xl p-5 shadow-sm print:break-inside-avoid print:shadow-none transition-colors">
    <div className="flex items-start gap-4">
      <div className="text-4xl leading-none shrink-0" aria-hidden>{entry.emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline flex-wrap gap-2 mb-1">
          <DevanagariText as="span" size="md" weight="black" className="text-slate-900">
            {entry.hindi}
          </DevanagariText>
          <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${posColor[entry.partOfSpeech]}`}>
            {entry.partOfSpeech}
          </span>
        </div>
        <p className="text-xs text-slate-400 font-bold italic">{entry.transliteration}</p>
        <p className="text-sm text-slate-800 font-bold">{entry.english}</p>
        {!compact && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <DevanagariText as="p" size="sm" weight="medium" className="text-slate-700">
              {entry.exampleHindi}
            </DevanagariText>
            <p className="text-xs text-slate-500 italic mt-1">{entry.exampleEnglish}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
