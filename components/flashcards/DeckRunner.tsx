import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Shuffle, RefreshCcw, Check, X, Printer } from 'lucide-react';
import type { Deck, Flashcard } from '../../content/schema';
import { FlashcardItem } from './FlashcardItem';
import { Badge } from '../ui/Badge';
import { NextUpCard, type NextUpCardProps } from '../ui/NextUpCard';
import { OverlayProgress } from '../ui/OverlayProgress';

interface DeckRunnerProps {
  deck: Deck;
  seenIds: string[];
  masteredIds: string[];
  onCardSeen: (cardId: string) => void;
  onCardMastered: (cardId: string) => void;
  onCardNotYet: (cardId: string) => void;
  onBack: () => void;
  onPrint: () => void;
  progress?: {
    position: string;
    planName?: string;
    percent: number;
  };
  nextUp?: NextUpCardProps;
}

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const DeckRunner: React.FC<DeckRunnerProps> = ({
  deck,
  seenIds,
  masteredIds,
  onCardSeen,
  onCardMastered,
  onCardNotYet,
  onBack,
  onPrint,
  progress,
  nextUp,
}) => {
  const [isShuffled, setIsShuffled] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const order = useMemo<Flashcard[]>(
    () => (isShuffled ? shuffled(deck.cards) : deck.cards),
    [deck.cards, isShuffled],
  );

  const current = order[index];
  const seenSet = new Set(seenIds);
  const masteredSet = new Set(masteredIds);

  useEffect(() => {
    if (current && !seenSet.has(current.id)) onCardSeen(current.id);
    setFlipped(false);
  }, [index, current?.id]);

  // Keyboard navigation
  const nextContinue = nextUp?.onContinue ?? null;
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const inText = !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if (e.key === ' ') {
        e.preventDefault();
        setFlipped((f) => !f);
      }
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(order.length - 1, i + 1));
      if ((e.key === 'n' || e.key === 'N') && !inText && nextContinue) {
        e.preventDefault();
        nextContinue();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [order.length, nextContinue]);

  if (!current) return null;

  const mustKnow = deck.cards.filter((c) => c.priority === 'must-know').length;
  const deckSeenPercent = Math.round((seenIds.filter((id) => order.some((c) => c.id === id)).length / order.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {progress && (
        <OverlayProgress
          position={progress.position}
          planName={progress.planName}
          percent={progress.percent}
        />
      )}
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-black text-slate-500 hover:text-orange-600"
        >
          <ArrowLeft size={16} /> Back to decks
        </button>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setIsShuffled((s) => !s)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black ${isShuffled ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            <Shuffle size={14} /> {isShuffled ? 'Shuffled' : 'Ordered'}
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-black"
          >
            <Printer size={14} /> Print 8-up
          </button>
        </div>
      </div>

      <header>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">
          {deck.kind.replace('-', ' ')}
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900">{deck.title}</h1>
        {deck.subtitle && (
          <p className="font-hindi text-lg text-slate-500 italic">{deck.subtitle}</p>
        )}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <Badge tone="orange" size="xs">{order.length} cards</Badge>
          <Badge tone="amber" size="xs">★ {mustKnow} must-know</Badge>
          <Badge tone="green" size="xs">{deckSeenPercent}% seen</Badge>
        </div>
      </header>

      {/* Card */}
      <FlashcardItem card={current} flipped={flipped} onToggle={() => setFlipped((f) => !f)} />

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-black disabled:opacity-40"
        >
          <ArrowLeft size={16} /> Prev
        </button>

        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">
            Card {index + 1} of {order.length}
          </p>
          {masteredSet.has(current.id) && (
            <p className="text-[10px] font-black text-emerald-600 mt-1">✓ Mastered</p>
          )}
        </div>

        <button
          onClick={() => setIndex((i) => Math.min(order.length - 1, i + 1))}
          disabled={index === order.length - 1}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-black disabled:opacity-40"
        >
          Next <ArrowRight size={16} />
        </button>
      </div>

      {/* Mastery buttons (only when flipped) */}
      {flipped && (
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => {
              onCardNotYet(current.id);
              setIndex((i) => Math.min(order.length - 1, i + 1));
            }}
            className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-700 rounded-2xl font-black hover:bg-rose-100"
          >
            <X size={16} /> Review again
          </button>
          <button
            onClick={() => {
              onCardMastered(current.id);
              setIndex((i) => Math.min(order.length - 1, i + 1));
            }}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 shadow-lg"
          >
            <Check size={16} /> Got it
          </button>
        </div>
      )}

      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center no-print">
        Keys · Space = flip · ← → navigate{nextUp?.onContinue ? ' · N = continue' : ''}
      </p>

      {nextUp && <NextUpCard {...nextUp} />}
    </div>
  );
};
