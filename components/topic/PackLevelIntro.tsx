import React from 'react';
import { Compass, Rocket, Leaf, Target } from 'lucide-react';
import { ProficiencyLevel } from '../../types';

interface PackLevelIntroProps {
  level?: ProficiencyLevel;
  packTitleEnglish: string;
}

// Level-aware opening card: different voice + suggested entry point for the
// same pack. No content duplication — just an adaptive framing banner.
function scriptFor(level: ProficiencyLevel | undefined, packTitleEnglish: string) {
  switch (level) {
    case ProficiencyLevel.NOVICE_LOW:
    case undefined:
      return {
        kicker: 'New to this topic',
        headline: `Start from the top — you're building the foundation for ${packTitleEnglish.toLowerCase()}.`,
        body: 'Read the vocabulary first, then grammar. The model essay at the bottom is the target shape — don\'t worry if it feels far off today.',
        icon: <Leaf size={20} />,
        tone: 'from-emerald-50 to-white border-emerald-200 text-emerald-900',
        badge: 'bg-emerald-600',
      };
    case ProficiencyLevel.NOVICE_MID:
      return {
        kicker: 'Building fluency',
        headline: `Skim vocabulary, then slow down at grammar and the model essay.`,
        body: 'You probably know most of the words. Spend your time on the possessive-agreement rule and the reading sample — that\'s where real fluency comes from.',
        icon: <Compass size={20} />,
        tone: 'from-sky-50 to-white border-sky-200 text-sky-900',
        badge: 'bg-sky-600',
      };
    case ProficiencyLevel.NOVICE_HIGH:
      return {
        kicker: 'Review mode',
        headline: `Vocab is collapsed — expand only if a word surprises you.`,
        body: 'Focus on the grammar cornerstones, connectors, and the two model essays. Then attempt a writing prompt — that\'s what moves you toward Benchmark 5.',
        icon: <Target size={20} />,
        tone: 'from-orange-50 to-white border-orange-200 text-orange-900',
        badge: 'bg-orange-600',
      };
    case ProficiencyLevel.INTERMEDIATE_LOW:
    case ProficiencyLevel.INTERMEDIATE_MID:
    case ProficiencyLevel.INTERMEDIATE_HIGH:
      return {
        kicker: 'Stretch the ceiling',
        headline: `Jump to the model essays and write. Treat everything above as reference.`,
        body: 'The cultural notes and muhavare are flagged for you — those are the details that lift Benchmark 5 writing toward Benchmark 6. Write a prompt in 30 minutes, untimed first, then timed.',
        icon: <Rocket size={20} />,
        tone: 'from-rose-50 to-white border-rose-200 text-rose-900',
        badge: 'bg-rose-600',
      };
  }
}

export const PackLevelIntro: React.FC<PackLevelIntroProps> = ({ level, packTitleEnglish }) => {
  const s = scriptFor(level, packTitleEnglish);
  return (
    <div
      className={`no-print rounded-3xl border-2 bg-gradient-to-br ${s.tone} p-6 md:p-7 shadow-sm`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-2xl ${s.badge} text-white flex items-center justify-center shrink-0 shadow-md`}>
          {s.icon}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-70 mb-1">
            {s.kicker}{level ? ` · ${level}` : ''}
          </p>
          <p className="text-lg md:text-xl font-black leading-snug mb-2">{s.headline}</p>
          <p className="text-sm font-medium opacity-90 leading-relaxed">{s.body}</p>
        </div>
      </div>
    </div>
  );
};
