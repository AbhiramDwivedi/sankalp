import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Printer,
  ArrowRight,
  BookOpen,
  Library,
  PenTool,
  GraduationCap,
  Clock,
  Target,
  AlertTriangle,
  Compass,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import type {
  TopicPack,
  GrammarNote as GrammarRule,
  ConnectorEntry as Connector,
  CulturalInsight,
  Muhavara,
  ModelText,
  ModelEssay,
  WritingPrompt,
  TeacherNote,
  VocabEntry,
} from '../../content/schema';
import type { EvaluationResult } from '../../types';
import type { ProficiencyLevel } from '../../types';
import { HeroBanner } from './HeroBanner';
import { VocabCard } from './VocabCard';
import { VerdictCard } from './VerdictCard';
import { AiAssessmentPanel } from './AiAssessmentPanel';
import { Badge } from '../ui/Badge';
import { DevanagariText } from '../ui/DevanagariText';
import { tokensFor } from '../ui/themeTokens';
import { TARGET_BENCHMARK } from '../../content/rubric';
import { CURRICULUM } from '../../content/curriculum';
import { RubricAxisTags } from './RubricAxisTag';
import { NextUpCard, type NextUpCardProps } from '../ui/NextUpCard';
import { OverlayProgress } from '../ui/OverlayProgress';

// -----------------------------------------------------------------------------
// TopicPackViewV2 - pack page IA.
//
// Splits a pack into 4 audience-shaped tabs:
//   1. Study     - sequenced action steps, every "go do X" is a real button
//   2. Reference - vocab / grammar / connectors / idioms / cultural / model texts
//                  rendered as lookups, no marketing prose
//   3. Write     - reading sample + 2 model essays (sub-tabs) + writing prompts
//                  + AI assessment. Verdict cards are NOT shown here.
//   4. Teacher   - rationale, all teacher notes, verdict cards, self-check rubric
//
// Print: all four tabs render sequentially regardless of selection.
// -----------------------------------------------------------------------------

type TabKey = 'study' | 'reference' | 'write' | 'teacher';

interface TabDef {
  key: TabKey;
  hindi: string;
  english: string;
  icon: React.ReactNode;
}

const TABS: TabDef[] = [
  { key: 'study', hindi: 'पढ़ो', english: 'Study', icon: <BookOpen size={16} strokeWidth={2.5} /> },
  { key: 'reference', hindi: 'संदर्भ', english: 'Reference', icon: <Library size={16} strokeWidth={2.5} /> },
  { key: 'write', hindi: 'लिखो', english: 'Write', icon: <PenTool size={16} strokeWidth={2.5} /> },
  { key: 'teacher', hindi: 'शिक्षक', english: "Teacher's view", icon: <GraduationCap size={16} strokeWidth={2.5} /> },
];

interface TopicPackViewV2Props {
  pack: TopicPack;
  aiEnabled?: boolean;
  level?: ProficiencyLevel;
  onBack: () => void;
  onMarkComplete?: () => void;
  onEvaluation?: (result: EvaluationResult) => void;
  /** Mini-progress bar data + next-up card data. Both optional so the view
   *  still renders inside tests / storyboards without a profile context. */
  progress?: {
    position: string;
    planName?: string;
    percent: number;
  };
  nextUp?: NextUpCardProps;
}

export const TopicPackViewV2: React.FC<TopicPackViewV2Props> = ({
  pack,
  aiEnabled = false,
  onBack,
  onMarkComplete,
  onEvaluation,
  progress,
  nextUp,
}) => {
  const tokens = tokensFor(pack.themeGroup);
  const [activeTab, setActiveTab] = useState<TabKey>('study');
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const tabBodyRef = useRef<HTMLDivElement | null>(null);

  // After a tab switch driven by an action button, scroll to the requested anchor.
  useEffect(() => {
    if (!pendingScroll) return;
    const id = pendingScroll;
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPendingScroll(null);
    }, 50);
    return () => window.clearTimeout(t);
  }, [pendingScroll, activeTab]);

  // `N` key triggers Continue from anywhere inside the overlay (unless typing
  // in an input/textarea). Scoped to this component so it unmounts cleanly.
  const nextContinue = nextUp?.onContinue ?? null;
  useEffect(() => {
    if (!nextContinue) return;
    const h = (e: KeyboardEvent) => {
      if (e.key !== 'n' && e.key !== 'N') return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      e.preventDefault();
      nextContinue();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [nextContinue]);

  const goTo = (tab: TabKey, anchorId?: string) => {
    setActiveTab(tab);
    if (anchorId) setPendingScroll(anchorId);
    if (tabBodyRef.current) {
      tabBodyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-32 space-y-8 animate-in fade-in duration-500 printable-area">
      {progress && (
        <OverlayProgress
          position={progress.position}
          planName={progress.planName}
          percent={progress.percent}
        />
      )}
      {/* Toolbar */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-black transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm uppercase tracking-widest">Back to Library</span>
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-3 bg-white border-2 border-slate-100 hover:border-orange-400 text-slate-700 rounded-2xl flex items-center gap-2 font-black text-sm transition-all shadow-sm"
          >
            <Printer size={16} /> Print / Save PDF
          </button>
          {onMarkComplete && (
            <button
              onClick={onMarkComplete}
              className={`px-5 py-3 text-white rounded-2xl font-black text-sm shadow-lg ${tokens.accentBg} hover:opacity-90`}
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>

      <HeroBanner pack={pack} />

      {/* Tab bar - sticky on desktop, scrollable on mobile */}
      <div className="sticky top-0 z-20 -mx-2 px-2 py-3 bg-white/90 backdrop-blur-md border-b border-slate-100 no-print">
        <div className="flex gap-1 md:gap-2 overflow-x-auto" role="tablist" aria-label="Pack sections">
          {TABS.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => goTo(t.key)}
                className={`group relative flex items-center gap-3 px-4 md:px-6 py-3 rounded-2xl border-2 transition-all whitespace-nowrap ${
                  isActive
                    ? `bg-white ${tokens.accentText} border-current shadow-md`
                    : 'bg-slate-50 text-slate-500 border-transparent hover:text-slate-900 hover:bg-white'
                }`}
              >
                <span
                  className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center ${
                    isActive ? `${tokens.accentBg} text-white` : 'bg-white text-slate-400 group-hover:text-slate-700'
                  }`}
                >
                  {t.icon}
                </span>
                <span className="flex flex-col items-start leading-tight">
                  <DevanagariText as="span" size="sm" weight="black" className="text-current">
                    {t.hindi}
                  </DevanagariText>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-current/80">
                    {t.english}
                  </span>
                </span>
                {isActive && (
                  <span
                    className="absolute -bottom-3 left-6 right-6 h-1 rounded-full"
                    style={{ background: tokens.primaryHex }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div ref={tabBodyRef} className="space-y-12">
        {/* Print: render all tabs in order, hidden in screen */}
        <div className={activeTab === 'study' ? 'block' : 'hidden print:block'}>
          <StudyTab pack={pack} goTo={goTo} />
        </div>
        <div className={activeTab === 'reference' ? 'block' : 'hidden print:block'}>
          <ReferenceTab pack={pack} />
        </div>
        <div className={activeTab === 'write' ? 'block' : 'hidden print:block'}>
          <WriteTab
            pack={pack}
            aiEnabled={aiEnabled}
            onEvaluation={onEvaluation}
          />
        </div>
        <div className={activeTab === 'teacher' ? 'block' : 'hidden print:block'}>
          <TeacherTab pack={pack} />
        </div>
      </div>

      {nextUp && <NextUpCard {...nextUp} />}

      <footer className="pt-10 border-t-4 border-dotted border-slate-100 flex justify-between items-end text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] print:text-slate-400">
        <span>Student: ____________________________</span>
        <span className="text-center">सङ्कल्प · {pack.id}</span>
        <span>Date: ________________</span>
      </footer>
    </div>
  );
};

// =============================================================================
// TAB 1 - STUDY  (the action plan)
// =============================================================================

interface StudyTabProps {
  pack: TopicPack;
  goTo: (tab: TabKey, anchor?: string) => void;
}

const StudyTab: React.FC<StudyTabProps> = ({ pack, goTo }) => {
  const tokens = tokensFor(pack.themeGroup);
  const grammarTitles = pack.grammar.slice(0, 4).map((g) => g.title);

  const steps: Array<{
    n: number;
    title: string;
    body: string;
    cta: string;
    onClick: () => void;
    minutes?: string;
  }> = [
    {
      n: 1,
      title: 'Read the reading sample out loud',
      body: `One short paragraph titled "${pack.anchor.title}". Read it twice - once for meaning, once for sentence shapes.`,
      cta: 'Open reading',
      minutes: '~10 min',
      onClick: () => goTo('write', 'anchor-passage'),
    },
    {
      n: 2,
      title: `Drill ${pack.grammar.length} grammar moves`,
      body: grammarTitles.join(' · '),
      cta: 'Open grammar',
      minutes: '~25 min',
      onClick: () => goTo('reference', 'ref-grammar'),
    },
    {
      n: 3,
      title: `Skim ${pack.vocabulary.length} vocabulary words and ${pack.connectors.length} connectors`,
      body: 'Reference-style - look up, do not memorise the list. The same words come back inside the model essays.',
      cta: 'Open vocabulary',
      minutes: '~15 min',
      onClick: () => goTo('reference', 'ref-vocab'),
    },
    {
      n: 4,
      title: `Read ${pack.modelEssays.length} model essays slowly`,
      body: 'Each essay is annotated paragraph-by-paragraph with the moves a rater would notice.',
      cta: 'Open essays',
      minutes: '~20 min',
      onClick: () => goTo('write', 'model-essays'),
    },
    {
      n: 5,
      title: `Write your own essay (${pack.prompts.length} prompts)`,
      body: 'Pick one prompt, draft 3 paragraphs, then run the self-check. Optional: AI evaluation.',
      cta: 'Open prompts',
      minutes: '~30 min',
      onClick: () => goTo('write', 'writing-prompts'),
    },
  ];

  return (
    <section className="space-y-10">
      {/* Hook + outcomes */}
      <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 md:p-12 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
          What you'll be able to do after this pack
        </p>
        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
          {pack.rationale.afterThisPackStudentCan.map((c, i) => (
            <li key={i} className="text-sm font-bold text-slate-800 flex items-start gap-2 leading-relaxed">
              <span className={`${tokens.accentText} mt-0.5 shrink-0`}>✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
          <Clock size={12} />
          <span>Total time: {pack.rationale.estimatedTime}</span>
        </div>
      </div>

      {/* Action steps */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
          Your path through this pack
        </p>
        <ol className="space-y-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="group bg-white rounded-2xl border-2 border-slate-100 hover:border-current transition-all overflow-hidden"
            >
              <button
                onClick={s.onClick}
                className="w-full flex items-stretch text-left"
              >
                <div
                  className={`${tokens.accentBg} text-white px-5 md:px-8 py-6 flex items-center justify-center shrink-0 font-hindi-display text-3xl md:text-4xl font-black w-20 md:w-24`}
                >
                  {s.n}
                </div>
                <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-base md:text-lg font-black text-slate-900 leading-tight">
                      {s.title}
                    </p>
                    <p className="text-sm text-slate-500 leading-snug mt-1">{s.body}</p>
                    {s.minutes && (
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2 flex items-center gap-1.5">
                        <Clock size={10} /> {s.minutes}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest ${tokens.accentText} bg-slate-50 group-hover:bg-current group-hover:text-white transition-colors`}
                  >
                    <span className="group-hover:text-white">{s.cta}</span>
                    <ArrowRight size={14} className="group-hover:text-white" />
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Self-check tip */}
      <div className={`rounded-2xl border-2 border-dashed ${tokens.ring} p-6 ${tokens.surfaceBg}`}>
        <p className="text-sm font-bold text-slate-700 leading-relaxed">
          When your draft is ready, jump to the{' '}
          <button
            onClick={() => goTo('teacher', 'self-check')}
            className={`${tokens.accentText} font-black underline decoration-dotted underline-offset-4`}
          >
            self-check rubric
          </button>{' '}
          on the Teacher tab and tick the boxes honestly. 4+ passes ≈ 3 credits.
        </p>
      </div>
    </section>
  );
};

// =============================================================================
// TAB 2 - REFERENCE  (lookups, no marketing prose)
// =============================================================================

const ReferenceTab: React.FC<{ pack: TopicPack }> = ({ pack }) => {
  const grouped = React.useMemo<Record<string, VocabEntry[]>>(() => {
    const g: Record<string, VocabEntry[]> = {};
    pack.vocabulary.forEach((v) => {
      const key = v.subgroup || v.partOfSpeech;
      (g[key] = g[key] || []).push(v);
    });
    return g;
  }, [pack.vocabulary]);

  return (
    <section className="space-y-12">
      <RefHeader
        id="ref-vocab"
        eyebrow={`${pack.vocabulary.length} words · ${Object.keys(grouped).length} groups`}
        title="Vocabulary"
      />
      <div className="space-y-8">
        {(Object.entries(grouped) as [string, VocabEntry[]][]).map(([group, entries]) => (
          <div key={group}>
            <div className="flex items-center gap-3 mb-4">
              <Badge tone="orange" size="xs">{group.replace(/-/g, ' ')}</Badge>
              <span className="text-xs font-semibold text-slate-400">{entries.length} words</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
              {entries.map((e, i) => (
                <VocabCard key={`${e.hindi}-${i}`} entry={e} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <RefDivider />

      <RefHeader
        id="ref-grammar"
        eyebrow={`${pack.grammar.length} rules`}
        title="Grammar"
      />
      <RefGrammar grammar={pack.grammar} />

      <RefDivider />

      <RefHeader
        id="ref-connectors"
        eyebrow={`${pack.connectors.length} connectors`}
        title="Connectors"
      />
      <RefConnectors connectors={pack.connectors} />

      <RefDivider />

      <RefHeader
        id="ref-idioms"
        eyebrow={`${pack.muhavare.length} idioms`}
        title="Muhavare"
      />
      <RefMuhavare muhavare={pack.muhavare} />

      <RefDivider />

      <RefHeader
        id="ref-cultural"
        eyebrow={`${pack.cultural.length} notes`}
        title="Cultural details"
      />
      <RefCultural items={pack.cultural} />

      <RefDivider />

      <RefHeader
        id="ref-models"
        eyebrow={`${pack.modelTexts.length} short formats`}
        title="Model texts (schedule · diary · sms · letter)"
      />
      <RefModelTexts texts={pack.modelTexts} />
    </section>
  );
};

const RefHeader: React.FC<{ id: string; eyebrow: string; title: string }> = ({ id, eyebrow, title }) => (
  <header id={id} className="space-y-1 scroll-mt-32">
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{eyebrow}</p>
    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">{title}</h2>
  </header>
);

const RefDivider: React.FC = () => (
  <hr className="border-t border-dashed border-slate-200" />
);

const RefGrammar: React.FC<{ grammar: GrammarRule[] }> = ({ grammar }) => (
  <div className="grid lg:grid-cols-2 gap-5">
    {grammar.map((g, i) => (
      <article
        key={i}
        className="bg-white rounded-2xl border-2 border-slate-100 p-6 print:break-inside-avoid space-y-4"
      >
        <h3 className="text-base font-black text-slate-900 leading-tight">{g.title}</h3>
        <p className="text-sm text-slate-700 leading-relaxed">{g.rule}</p>
        <ul className="space-y-2 bg-slate-50 rounded-xl p-4">
          {g.examples.map((ex, ei) => (
            <li key={ei} className="text-sm">
              <DevanagariText as="span" size="sm" weight="bold" className="text-slate-900">
                {ex.hindi}
              </DevanagariText>
              <span className="block text-xs italic text-slate-500 mt-0.5">
                {ex.transliteration} - {ex.english}
              </span>
            </li>
          ))}
        </ul>
        {g.pitfall && (
          <p className="text-xs text-rose-700 leading-relaxed bg-rose-50 border-l-2 border-rose-300 px-3 py-2 rounded">
            <span className="font-black uppercase tracking-widest text-[9px] text-rose-600 block mb-1">
              Common pitfall
            </span>
            {g.pitfall}
          </p>
        )}
      </article>
    ))}
  </div>
);

const RefConnectors: React.FC<{ connectors: Connector[] }> = ({ connectors }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {connectors.map((c, i) => (
      <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
        <DevanagariText as="p" size="md" weight="black" className="text-indigo-700">
          {c.hindi}
        </DevanagariText>
        <p className="text-xs italic text-slate-500 mt-0.5">{c.transliteration}</p>
        <p className="text-sm font-bold text-slate-800 mt-2">{c.english}</p>
        {c.frame && (
          <p className="text-[11px] font-mono text-slate-500 mt-2">{c.frame}</p>
        )}
        {c.sampleHindi && (
          <div className="mt-3 border-t border-slate-100 pt-3">
            <DevanagariText as="p" size="sm" weight="bold" className="text-slate-700">
              {c.sampleHindi}
            </DevanagariText>
            <p className="text-xs italic text-slate-500 mt-1">{c.sampleEnglish}</p>
          </div>
        )}
      </div>
    ))}
  </div>
);

const RefMuhavare: React.FC<{ muhavare: Muhavara[] }> = ({ muhavare }) => (
  <div className="grid md:grid-cols-2 gap-5">
    {muhavare.map((m, i) => (
      <article key={i} className="bg-white rounded-2xl border-2 border-violet-100 p-6 print:break-inside-avoid">
        <DevanagariText as="p" size="md" weight="black" className="text-violet-800">
          {m.phrase}
        </DevanagariText>
        <p className="text-xs italic text-slate-400 mt-1">Lit: {m.literal}</p>
        <p className="text-sm font-bold text-slate-800 mt-3 leading-relaxed">{m.meaning}</p>
        <div className="mt-4 bg-violet-50 rounded-xl p-3">
          <DevanagariText as="p" size="sm" weight="bold" className="text-slate-800 leading-relaxed">
            {m.example}
          </DevanagariText>
          <p className="text-xs italic text-slate-500 mt-1">{m.exampleEnglish}</p>
        </div>
      </article>
    ))}
  </div>
);

const RefCultural: React.FC<{ items: CulturalInsight[] }> = ({ items }) => (
  <div className="grid md:grid-cols-2 gap-4">
    {items.map((c, i) => (
      <div key={i} className="bg-white rounded-2xl border border-amber-100 p-5 flex gap-4">
        <span className="text-3xl shrink-0" aria-hidden>{c.emoji}</span>
        <div>
          <h4 className="text-sm font-black text-slate-900">{c.title}</h4>
          <p className="text-sm text-slate-700 leading-relaxed mt-1">{c.body}</p>
        </div>
      </div>
    ))}
  </div>
);

const RefModelTexts: React.FC<{ texts: ModelText[] }> = ({ texts }) => (
  <div className="grid md:grid-cols-2 gap-5">
    {texts.map((t, i) => (
      <article key={i} className="bg-white rounded-2xl border-2 border-slate-100 p-6 print:break-inside-avoid">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-black text-slate-900">{t.title}</h4>
          <Badge tone="slate" size="xs">{t.kind}</Badge>
        </div>
        <DevanagariText as="p" size="sm" weight="bold" className="text-slate-900 leading-[2] whitespace-pre-line">
          {t.hindi}
        </DevanagariText>
        <p className="text-xs italic text-slate-500 mt-3 leading-relaxed">{t.transliteration}</p>
        <p className="text-xs text-slate-700 mt-2 leading-relaxed">{t.english}</p>
      </article>
    ))}
  </div>
);

// =============================================================================
// TAB 3 - WRITE  (anchor + essays + prompts; verdict cards moved to Teacher)
// =============================================================================

interface WriteTabProps {
  pack: TopicPack;
  aiEnabled: boolean;
  onEvaluation?: (result: EvaluationResult) => void;
}

const WriteTab: React.FC<WriteTabProps> = ({ pack, aiEnabled, onEvaluation }) => {
  const [essayIdx, setEssayIdx] = useState(0);
  const [openAiFor, setOpenAiFor] = useState<number | null>(null);

  return (
    <section className="space-y-14">
      {/* Reading sample */}
      <div id="anchor-passage" className="scroll-mt-32 space-y-5">
        <RefHeader id="anchor-header" eyebrow={pack.anchor.title} title="Reading sample - the model to imitate" />
        <div className="bg-gradient-to-br from-orange-50/50 to-amber-50/50 border-2 border-orange-100 rounded-[2.5rem] p-10 md:p-14 relative print:break-inside-avoid">
          <div className="absolute top-6 left-6 text-orange-200 font-black text-7xl opacity-40" aria-hidden>"</div>
          <DevanagariText as="p" size="xl" weight="bold" display className="text-slate-900 leading-[2.1] relative z-10 mb-10">
            {pack.anchor.hindi}
          </DevanagariText>
          <div className="border-t-2 border-dashed border-orange-200 pt-8 space-y-4">
            <p className="text-sm italic text-slate-500 font-medium leading-relaxed">{pack.anchor.transliteration}</p>
            <p className="text-base text-slate-800 font-bold leading-relaxed">{pack.anchor.english}</p>
          </div>
        </div>

        {pack.anchor.highlights.length > 0 && (
          <details className="bg-white border border-slate-100 rounded-2xl p-5 group" open>
            <summary className="cursor-pointer flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">What to notice</span>
              <ChevronDown size={14} className="text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <ul className="space-y-2 mt-4">
              {pack.anchor.highlights.map((h, i) => (
                <li key={i} className="text-sm flex items-start gap-3">
                  <span className="font-hindi font-black text-orange-700 shrink-0">{h.term}</span>
                  <span className="text-slate-500">-</span>
                  <span className="text-slate-700 font-medium">{h.note}</span>
                </li>
              ))}
            </ul>
          </details>
        )}

        {pack.anchor.comprehensionQuestions.length > 0 && (
          <details className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <summary className="cursor-pointer flex items-center gap-2 text-slate-700">
              <HelpCircle size={16} strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase tracking-widest">Comprehension check</span>
            </summary>
            <ol className="space-y-4 list-decimal list-inside mt-4">
              {pack.anchor.comprehensionQuestions.map((qa, i) => (
                <li key={i} className="text-slate-800 font-bold leading-relaxed">
                  {qa.q}
                  <div className="mt-1 ml-6 text-sm font-medium text-emerald-700 italic">Answer: {qa.a}</div>
                </li>
              ))}
            </ol>
          </details>
        )}
      </div>

      {/* Model essays - sub-tabbed */}
      <div id="model-essays" className="scroll-mt-32 space-y-6">
        <RefHeader
          id="essays-header"
          eyebrow={`${pack.modelEssays.length} essays · click a tab to switch`}
          title="Model essays"
        />
        <EssayTabs
          essays={pack.modelEssays}
          activeIdx={essayIdx}
          onChange={setEssayIdx}
        />
        <ModelEssayBody essay={pack.modelEssays[essayIdx]} idx={essayIdx} />

        {/* Print: render the other essays sequentially */}
        <div className="hidden print:block space-y-10 mt-10">
          {pack.modelEssays.map((e, i) =>
            i === essayIdx ? null : <ModelEssayBody key={i} essay={e} idx={i} />,
          )}
        </div>
      </div>

      {/* Writing prompts */}
      <div id="writing-prompts" className="scroll-mt-32 space-y-5">
        <RefHeader
          id="prompts-header"
          eyebrow={`${pack.prompts.length} prompts · pick one`}
          title="Now write your own"
        />
        <ol className="space-y-4">
          {pack.prompts.map((p, i) => (
            <PromptCard
              key={i}
              prompt={p}
              idx={i}
              aiEnabled={aiEnabled}
              isOpen={openAiFor === i}
              onToggleAi={() => setOpenAiFor(openAiFor === i ? null : i)}
            />
          ))}
        </ol>
        {openAiFor !== null && onEvaluation && pack.prompts[openAiFor] && (
          <div className="my-4">
            <AiAssessmentPanel
              promptContext={`${pack.titleEnglish} - Prompt: ${pack.prompts[openAiFor].english}`}
              onResult={onEvaluation}
            />
          </div>
        )}
      </div>
    </section>
  );
};

const EssayTabs: React.FC<{
  essays: ModelEssay[];
  activeIdx: number;
  onChange: (i: number) => void;
}> = ({ essays, activeIdx, onChange }) => {
  const labelFor = (e: ModelEssay, i: number) =>
    e.shortLabel || `Essay ${i + 1}`;

  return (
    <div
      className="flex gap-2 items-stretch no-print border-b-2 border-slate-100"
      role="tablist"
      aria-label="Model essays"
    >
      {essays.map((e, i) => {
        const active = i === activeIdx;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(i)}
            className={`relative px-5 py-3 -mb-[2px] border-b-4 text-left transition-colors ${
              active
                ? 'border-orange-600 text-orange-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className="block text-base font-black tracking-tight leading-tight">
              {labelFor(e, i)}
            </span>
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mt-0.5">
              {e.wordCount}w · {e.tenseUsed.join(' + ')}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const annotationDotColor: Record<string, string> = {
  connector: 'bg-indigo-500',
  'tense-shift': 'bg-emerald-500',
  idiom: 'bg-violet-500',
  vocab: 'bg-orange-500',
  cultural: 'bg-amber-500',
  structure: 'bg-slate-500',
};

const ModelEssayBody: React.FC<{ essay: ModelEssay; idx: number }> = ({ essay, idx }) => {
  const paragraphs = essay.intermediateMid.split(/\n+/).filter(Boolean);
  const annsFor = (pi: number) => essay.annotations.filter((a) => a.paragraphIndex === pi);

  return (
    <article className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-md print:shadow-none print:break-inside-avoid-page">
      <header className="bg-gradient-to-br from-orange-600 to-amber-600 text-white p-8 md:p-10">
        <div className="flex items-center gap-3 flex-wrap mb-3">
          <Badge tone="amber" size="xs" className="bg-white/20 text-white border-white/30">Essay {idx + 1}</Badge>
          <Badge tone="amber" size="xs" className="bg-white/20 text-white border-white/30">{essay.wordCount} words</Badge>
          {essay.tenseUsed.map((t) => (
            <Badge key={t} tone="amber" size="xs" className="bg-white/20 text-white border-white/30">{t} tense</Badge>
          ))}
        </div>
        <p className="text-sm font-medium opacity-90 mb-1">Prompt:</p>
        <p className="text-lg md:text-xl font-bold leading-snug">{essay.prompt}</p>
      </header>

      <div className="p-8 md:p-10 border-b-4 border-dashed border-slate-100">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-600 mb-3">
          Before - Novice version
        </p>
        <DevanagariText as="p" size="sm" weight="medium" className="text-slate-500 italic leading-relaxed line-through decoration-rose-200 decoration-2">
          {essay.novice}
        </DevanagariText>
      </div>

      <div className="p-8 md:p-12 bg-slate-50/50">
        <div className="space-y-8">
          {paragraphs.map((p, pi) => {
            const anns = annsFor(pi);
            return (
              <div key={pi} className="grid md:grid-cols-[1fr_260px] gap-6 print:break-inside-avoid">
                <DevanagariText as="p" size="md" weight="bold" className="text-slate-900 leading-[2.1]">
                  {p}
                </DevanagariText>
                {anns.length > 0 && (
                  <aside className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 self-start">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Paragraph {pi + 1} - what to notice
                    </p>
                    {anns.map((a, ai) => (
                      <div key={ai} className="flex items-start gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${annotationDotColor[a.kind]} mt-1 shrink-0`} />
                        <div className="flex-1">
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                            {a.kind.replace('-', ' ')}: <span className="text-slate-700">{a.highlight}</span>
                          </p>
                          <p className="text-xs text-slate-700 leading-relaxed mt-0.5">{a.note}</p>
                        </div>
                      </div>
                    ))}
                  </aside>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

const PromptCard: React.FC<{
  prompt: WritingPrompt;
  idx: number;
  aiEnabled: boolean;
  isOpen: boolean;
  onToggleAi: () => void;
}> = ({ prompt, idx, aiEnabled, isOpen, onToggleAi }) => (
  <li className="bg-white rounded-2xl border-2 border-slate-100 p-6 md:p-8 print:break-inside-avoid">
    <div className="flex items-start gap-4">
      <span className="font-hindi-display text-3xl font-black text-orange-600 shrink-0 leading-none">
        {idx + 1}
      </span>
      <div className="flex-1 space-y-3">
        <DevanagariText as="p" size="md" weight="bold" className="text-slate-900 leading-relaxed">
          {prompt.hindi}
        </DevanagariText>
        <p className="text-sm italic text-slate-600 leading-relaxed">{prompt.english}</p>
        {prompt.hint && (
          <div className="flex flex-wrap gap-2 pt-2">
            {prompt.hint.connectors?.map((c) => (
              <span key={`c-${c}`} className="font-hindi text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-bold">
                {c}
              </span>
            ))}
            {prompt.hint.tenses?.map((t) => (
              <span key={`t-${t}`} className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
    {aiEnabled && (
      <div className="mt-5 pt-5 border-t border-slate-100 flex justify-end no-print">
        <button
          onClick={onToggleAi}
          className="text-xs font-black uppercase tracking-widest text-orange-700 hover:text-orange-900"
        >
          {isOpen ? 'Hide' : 'Submit for AI evaluation'}
        </button>
      </div>
    )}
  </li>
);

// =============================================================================
// TAB 4 - TEACHER  (rationale, all teacher notes, verdict cards, self-check)
// =============================================================================

const TeacherTab: React.FC<{ pack: TopicPack }> = ({ pack }) => {
  const r = pack.rationale;
  const positionLabel = {
    foundations: 'Foundations (Novice Low → Novice High)',
    building: 'Building (Novice High → Intermediate Low)',
    'pushing-to-IM': 'Pushing to Intermediate Mid (3 credits)',
  } as const;

  const sectionNotes: Array<{ heading: string; note: TeacherNote | undefined }> = [
    { heading: 'Vocabulary', note: pack.vocabularyNote },
    { heading: 'Grammar', note: pack.grammarNote },
    { heading: 'Connectors', note: pack.connectorsNote },
    { heading: 'Reading sample', note: pack.anchorNote },
    { heading: 'Model texts', note: pack.modelTextsNote },
    { heading: 'Cultural details', note: pack.culturalNote },
    { heading: 'Muhavare', note: pack.muhavareNote },
    { heading: 'Model essays', note: pack.modelEssaysNote },
    { heading: 'Writing prompts', note: pack.promptsNote },
    { heading: 'Self-check rubric', note: pack.rubricNote },
  ];

  return (
    <section className="space-y-12">
      {/* Why this pack */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-white border-2 border-amber-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-8 print:break-inside-avoid">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 bg-orange-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-100">
            <Compass size={26} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">
              For the teacher
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Why this pack exists
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              The student does not need to read this section to do the work. It exists so the
              teacher can verify <em>why</em> each piece of content is here and which rubric axis
              it trains.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              {CURRICULUM.creditMapping.issuer} sub-topics covered
            </p>
            <ul className="space-y-1.5">
              {r.fcpsSubTopics.map((t, i) => (
                <li key={i} className="text-sm font-bold text-slate-800 flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">▸</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Rubric axes trained
            </p>
            <RubricAxisTags axes={r.trains} size="sm" />
            <p className="text-xs text-slate-500 italic mt-3 leading-relaxed">
              Mastering these axes at Benchmark {TARGET_BENCHMARK} earns the student
              Intermediate-Mid - which maps to {CURRICULUM.displayStrings.creditPhrase}.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1 flex items-center gap-1.5">
              <Compass size={11} /> Where on the arc
            </p>
            <p className="text-sm font-black text-indigo-900 leading-snug">{positionLabel[r.positionOnArc]}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1 flex items-center gap-1.5">
              <Clock size={11} /> Expected time
            </p>
            <p className="text-sm font-black text-emerald-900 leading-snug">{r.estimatedTime}</p>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1 flex items-center gap-1.5">
              <AlertTriangle size={11} /> If skipped
            </p>
            <p className="text-sm font-black text-rose-900 leading-snug">{r.ifSkippedRisk}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <Target size={12} className="text-emerald-600" />
            Pack-level objectives
          </p>
          <ul className="space-y-2">
            {pack.objectives.map((o, i) => (
              <li key={i} className="text-sm font-bold text-slate-800 flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span className="flex-1">{o.text}</span>
                <RubricAxisTags axes={o.trains} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verdict cards */}
      <div className="space-y-5">
        <RefHeader id="verdicts" eyebrow="Predicted Benchmark per essay" title="Why each essay would pass" />
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          These cards were the most "marketing-y" content on the old page. They have been moved here so
          students do not see them while drafting. They remain so a teacher can audit the
          rubric mapping before approving the pack.
        </p>
        <div className="space-y-6">
          {pack.modelEssays.map((e, i) => (
            <div key={i} className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Essay {i + 1}
              </p>
              <VerdictCard verdict={e.verdict} />
            </div>
          ))}
        </div>
      </div>

      {/* Section-level teacher notes */}
      <div className="space-y-3">
        <RefHeader id="notes" eyebrow="One per section" title="Why each section is here" />
        <div className="space-y-2">
          {sectionNotes
            .filter((s) => s.note)
            .map((s, i) => (
              <details
                key={i}
                className="bg-amber-50/70 border-l-4 border-amber-300 rounded-xl px-5 py-4 group print:open"
              >
                <summary className="cursor-pointer flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-amber-900">
                    <GraduationCap size={14} strokeWidth={2.5} />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em]">
                      {s.heading}
                    </span>
                  </div>
                  <ChevronDown size={14} className="text-amber-700 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-3 space-y-3">
                  <p className="text-amber-900 text-sm leading-relaxed font-medium">{s.note!.why}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">
                      Trains:
                    </span>
                    <RubricAxisTags axes={s.note!.trains} />
                  </div>
                  {s.note!.examLink && (
                    <p className="text-[11px] font-semibold italic text-amber-800">
                      Rubric reference: {s.note!.examLink}
                    </p>
                  )}
                </div>
              </details>
            ))}
        </div>
      </div>

      {/* Self-check rubric */}
      <SelfCheckTable />
    </section>
  );
};

const SELF_CHECK_ROWS = [
  { label: 'Paragraph count', pass: '3+ cohesive paragraphs', borderline: '2 paragraphs', notYet: '1 long paragraph' },
  { label: 'Time frames', pass: 'Past + present + future', borderline: 'Two time frames', notYet: 'One only' },
  { label: 'Connectors', pass: '3+ used correctly', borderline: '1–2 used', notYet: 'None' },
  { label: 'Topic-specific vocab', pass: '8+ words', borderline: '4–7 words', notYet: 'Generic only' },
  { label: 'Idiom or cultural detail', pass: '≥1 included', borderline: 'Weak reference', notYet: 'None' },
  { label: 'Gender / number agreement', pass: 'Errors rare', borderline: 'Occasional errors', notYet: 'Frequent errors' },
];

const SelfCheckTable: React.FC = () => (
  <div id="self-check" className="scroll-mt-32 space-y-5">
    <RefHeader id="self-check-header" eyebrow="Tear-off page" title="Essay self-check" />
    <div className="bg-white border-4 border-dashed border-slate-300 rounded-[2rem] p-6 md:p-10 print:break-inside-avoid">
      <p className="text-sm text-slate-500 italic mb-6">
        Tick one box per row. Mostly "Pass" ≈ Intermediate-Mid ≈ 3 credits.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="text-left p-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Criterion</th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-emerald-700">Pass ✓</th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-amber-700">Borderline ~</th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-rose-700">Not yet ✗</th>
            </tr>
          </thead>
          <tbody>
            {SELF_CHECK_ROWS.map((r, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="p-3 font-black text-slate-800 align-top">{r.label}</td>
                {[r.pass, r.borderline, r.notYet].map((cell, ci) => (
                  <td key={ci} className="p-3 align-top">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <span className="w-4 h-4 border-2 border-slate-300 rounded flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-snug">{cell}</span>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
