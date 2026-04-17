import React, { useState } from 'react';
import { Layers, Shuffle, ArrowRight, Flag, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import type { Deck, DeckKind } from '../../content/schema';
import { DECKS, DECKS_BY_KIND, totalCards, totalMustKnow, deckProgress } from '../../content/flashcards';
import { packsKnownAtLevel } from '../../content/studyPlans';
import { Badge } from '../ui/Badge';

interface FlashcardsLibraryViewProps {
  seenIds: string[];
  masteredIds: string[];
  studentLevel?: string;
  onOpenDeck: (deckId: string) => void;
}

// Pack-review decks are id'd as `deck-pack-<packId>`. Derive hidden deck ids
// from the student's known-pack list so deck visibility stays in sync with
// the Library.
function hiddenDeckIdsForLevel(level: string | undefined): Set<string> {
  return new Set(packsKnownAtLevel(level).map((pid) => `deck-pack-${pid}`));
}

const kindMeta: Record<DeckKind, { label: string; color: string; order: number }> = {
  'exam-prep': { label: 'Exam-prep', color: 'bg-orange-50 border-orange-200', order: 0 },
  'connector-drill': { label: 'Connector drill', color: 'bg-indigo-50 border-indigo-200', order: 1 },
  'muhavara-drill': { label: 'Muhavara drill', color: 'bg-rose-50 border-rose-200', order: 2 },
  'grammar-essentials': { label: 'Grammar essentials', color: 'bg-emerald-50 border-emerald-200', order: 3 },
  'theme-review': { label: 'Theme review', color: 'bg-amber-50 border-amber-200', order: 4 },
  'pack-review': { label: 'Pack review', color: 'bg-slate-50 border-slate-200', order: 5 },
};

export const FlashcardsLibraryView: React.FC<FlashcardsLibraryViewProps> = ({
  seenIds,
  masteredIds,
  studentLevel,
  onOpenDeck,
}) => {
  const [filter, setFilter] = useState<DeckKind | 'all'>('all');
  const [showKnown, setShowKnown] = useState(false);

  const seen = new Set<string>(seenIds);
  const mastered = new Set<string>(masteredIds);
  const hiddenDeckSet = hiddenDeckIdsForLevel(studentLevel);

  const baseDecks = filter === 'all' ? DECKS : DECKS_BY_KIND[filter];
  const filteredDecks = showKnown ? baseDecks : baseDecks.filter((d) => !hiddenDeckSet.has(d.id));
  const hiddenCount = DECKS.filter((d) => hiddenDeckSet.has(d.id)).length;

  // Sort by kind order then by title
  const sorted = [...filteredDecks].sort((a, b) => {
    const ao = kindMeta[a.kind].order;
    const bo = kindMeta[b.kind].order;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });

  const relevantDecks = DECKS.filter((d) => !hiddenDeckSet.has(d.id));
  const totalSeen = relevantDecks.reduce(
    (s, d) => s + d.cards.filter((c) => seen.has(c.id)).length,
    0,
  );
  const totalMastered = relevantDecks.reduce(
    (s, d) => s + d.cards.filter((c) => mastered.has(c.id)).length,
    0,
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
            Flashcards
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            Drill before the exam
          </h1>
          <p className="text-slate-600 italic max-w-3xl text-lg leading-relaxed mt-3">
            {DECKS.length} decks · {totalCards()} cards · {totalMustKnow()} flagged must-know.
            Flip on-screen or print the 8-up sheets. The "Exam-prep" deck is the one to drill the week before.
          </p>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center gap-3 shadow-xl">
          <Flag className="text-amber-300" />
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Your progress</p>
            <p className="text-xl font-black">
              {totalSeen} seen · {totalMastered} mastered
            </p>
          </div>
        </div>
      </header>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
            filter === 'all' ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All {DECKS.length}
        </button>
        {(Object.keys(DECKS_BY_KIND) as DeckKind[])
          .filter((k) => DECKS_BY_KIND[k].length > 0)
          .sort((a, b) => kindMeta[a].order - kindMeta[b].order)
          .map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                filter === k ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {kindMeta[k].label} ({DECKS_BY_KIND[k].length})
            </button>
          ))}
      </div>

      {hiddenCount > 0 && (
        <div className="flex items-center justify-between gap-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl px-5 py-4">
          <div className="flex items-start gap-3 min-w-0">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-emerald-900">
                {hiddenCount} pack-review {hiddenCount === 1 ? 'deck is' : 'decks are'} hidden — already at your level
              </p>
              <p className="text-xs text-emerald-700 font-medium italic">
                Based on {studentLevel || 'your level'}. Drill decks (connectors, muhavare, grammar, exam-prep) always show.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowKnown((v) => !v)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border-2 border-emerald-200 hover:border-emerald-400 rounded-xl font-black text-xs uppercase tracking-widest text-emerald-800 transition-colors"
          >
            {showKnown ? <EyeOff size={14} /> : <Eye size={14} />}
            {showKnown ? 'Hide again' : 'Show anyway'}
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((d) => (
          <DeckCard
            key={d.id}
            deck={d}
            seenPct={deckProgress(d, seen)}
            masteredCount={d.cards.filter((c) => mastered.has(c.id)).length}
            onClick={() => onOpenDeck(d.id)}
          />
        ))}
      </div>
    </div>
  );
};

const DeckCard: React.FC<{
  deck: Deck;
  seenPct: number;
  masteredCount: number;
  onClick: () => void;
}> = ({ deck, seenPct, masteredCount, onClick }) => {
  const meta = kindMeta[deck.kind];
  const mustKnow = deck.cards.filter((c) => c.priority === 'must-know').length;
  return (
    <button
      onClick={onClick}
      className={`group text-left bg-white rounded-[1.75rem] border-2 ${meta.color} hover:border-orange-400 shadow-sm hover:shadow-xl overflow-hidden transition-all hover:-translate-y-0.5 p-6 space-y-3`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center text-orange-600">
          <Layers size={18} />
        </div>
        <Badge tone="slate" size="xs">{meta.label}</Badge>
        <Badge tone="amber" size="xs" className="ml-auto">★ {mustKnow}</Badge>
      </div>

      <div>
        <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">
          {deck.title}
        </h3>
        {deck.subtitle && (
          <p className="font-hindi text-sm text-slate-500 mt-1">{deck.subtitle}</p>
        )}
        <p className="text-xs text-slate-500 italic mt-2 leading-relaxed line-clamp-3">
          {deck.description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          {deck.cards.length} cards · {masteredCount} mastered
        </p>
        <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-600" />
      </div>

      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-700"
          style={{ width: `${seenPct}%` }}
        />
      </div>
    </button>
  );
};
