import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Printer,
  HelpCircle,
  ChevronDown,
  Mic,
  Clock,
  Compass,
  Target,
  AlertTriangle,
  GraduationCap,
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
import type { EvaluationResult, SpeakingAttempt, StudentProfile } from '../../types';
import type { ProficiencyLevel } from '../../types';
import { HeroBanner } from './HeroBanner';
import { VocabCard } from './VocabCard';
import { VerdictCard } from './VerdictCard';
import { AiAssessmentPanel } from './AiAssessmentPanel';
import { SpeakingPanel } from './SpeakingPanel';
import { Badge } from '../ui/Badge';
import { DevanagariText } from '../ui/DevanagariText';
import { tokensFor } from '../ui/themeTokens';
import { TARGET_BENCHMARK } from '../../content/curricula/fcps-stamp-hindi/rubric';
import { CURRICULUM } from '../../content/curriculum';
import { RubricAxisTags } from './RubricAxisTag';
import { NextUpCard, type NextUpCardProps } from '../ui/NextUpCard';
import { OverlayProgress } from '../ui/OverlayProgress';

// -----------------------------------------------------------------------------
// TopicPackViewV2 — a chapter in book form.
//
// Four linear sections replace the old Study/Reference/Write/Teacher tabs.
// A student reads forward; a returning student can jump via the stepper or
// the per-section JumpMenu.
//
//   1 Read        → anchor passage + highlights + comprehension
//   2 Learn       → vocab / grammar / connectors / idioms / cultural
//   3 See it done → annotated model essays + short model texts
//   4 Write       → prompts + self-check + optional speaking + AI
//
// Teacher rationale (why each section exists, rubric axes, verdict cards) is
// surfaced by a toolbar toggle, inline per-section. Off by default — students
// don't need to see the pedagogy.
//
// Print renders all four sections sequentially.
// -----------------------------------------------------------------------------

type SectionKey = 'read' | 'learn' | 'see' | 'write';

interface SectionDef {
  key: SectionKey;
  hindi: string;
  english: string;
  subtitle: string;
}

const SECTIONS: SectionDef[] = [
  { key: 'read', hindi: 'पढ़ो', english: 'Read', subtitle: 'Hear the model' },
  { key: 'learn', hindi: 'सीखो', english: 'Learn', subtitle: 'Pieces that made it work' },
  { key: 'see', hindi: 'देखो', english: 'See it done', subtitle: 'Model essays, annotated' },
  { key: 'write', hindi: 'लिखो', english: 'Write it yourself', subtitle: 'Now your turn' },
];

const sectionIndexOf = (k: SectionKey) => SECTIONS.findIndex((s) => s.key === k);

interface TopicPackViewV2Props {
  pack: TopicPack;
  aiEnabled?: boolean;
  level?: ProficiencyLevel;
  onBack: () => void;
  onMarkComplete?: () => void;
  onEvaluation?: (result: EvaluationResult) => void;
  /** Profile + speaking-attempt persistence callback. Both optional so the
   *  view still renders inside tests / storyboards without a profile context.
   *  When omitted, the Speaking practice section hides itself. */
  profile?: StudentProfile;
  onPersistSpeakingAttempt?: (packId: string, attempt: SpeakingAttempt) => void;
  /** Mini-progress bar data + next-up card data. Both optional so the view
   *  still renders inside tests / storyboards without a profile context. */
  progress?: {
    position: string;
    planName?: string;
    percent: number;
  };
  nextUp?: NextUpCardProps;
  /** Chapter-level prev/next by TOPIC_PACKS order (not plan order). */
  onPrevPack?: () => void;
  onNextPack?: () => void;
  prevPackTitle?: string;
  nextPackTitle?: string;
  totalTopics?: number;
}

export const TopicPackViewV2: React.FC<TopicPackViewV2Props> = ({
  pack,
  aiEnabled = false,
  onBack,
  onMarkComplete,
  onEvaluation,
  profile,
  onPersistSpeakingAttempt,
  progress,
  nextUp,
  onPrevPack,
  onNextPack,
  prevPackTitle,
  nextPackTitle,
  totalTopics,
}) => {
  const tokens = tokensFor(pack.themeGroup);
  const [section, setSection] = useState<SectionKey>('read');
  const [teacherMode, setTeacherMode] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const goTo = (s: SectionKey) => {
    setSection(s);
    if (bodyRef.current) {
      bodyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
      <div className="flex items-center justify-between gap-3 flex-wrap no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-black transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm uppercase tracking-widest">Back to Library</span>
        </button>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setTeacherMode((v) => !v)}
            aria-pressed={teacherMode}
            className={`px-5 py-3 rounded-2xl flex items-center gap-2 font-black text-sm transition-all border-2 ${
              teacherMode
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'bg-white border-slate-100 text-slate-700 hover:border-amber-300'
            }`}
          >
            <GraduationCap size={16} /> Teacher view {teacherMode ? 'on' : 'off'}
          </button>
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

      <HeroBanner
        pack={pack}
        totalTopics={totalTopics}
        onPrevPack={onPrevPack}
        onNextPack={onNextPack}
        prevTitle={prevPackTitle}
        nextTitle={nextPackTitle}
      />

      {/* Section stepper — sticky on scroll. 1-2-3-4 book structure, always visible. */}
      <div className="sticky top-0 z-20 -mx-2 px-2 py-3 bg-white/90 backdrop-blur-md border-b border-slate-100 no-print">
        <ol className="flex gap-1 md:gap-2 overflow-x-auto" aria-label="Sections in this chapter">
          {SECTIONS.map((s, i) => {
            const isActive = section === s.key;
            const stepNum = i + 1;
            return (
              <li key={s.key} className="shrink-0">
                <button
                  onClick={() => goTo(s.key)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`group relative flex items-center gap-3 px-3 md:px-5 py-3 rounded-2xl border-2 transition-all whitespace-nowrap ${
                    isActive
                      ? `bg-white ${tokens.accentText} border-current shadow-md`
                      : 'bg-slate-50 text-slate-500 border-transparent hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <span
                    className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-hindi-display text-lg font-black ${
                      isActive ? `${tokens.accentBg} text-white` : 'bg-white text-slate-400 group-hover:text-slate-700'
                    }`}
                  >
                    {stepNum}
                  </span>
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-sm font-black text-current">{s.english}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-current/70 hidden md:block">
                      {s.subtitle}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div ref={bodyRef} className="space-y-12">
        <div className={section === 'read' ? 'block' : 'hidden print:block'}>
          {teacherMode && <PackTeacherPanel pack={pack} />}
          <ReadSection pack={pack} teacherMode={teacherMode} />
          <SectionFooter
            idx={0}
            total={SECTIONS.length}
            prevKey={null}
            nextKey={SECTIONS[1].key}
            onGo={goTo}
            onNextPack={onNextPack}
            nextPackTitle={nextPackTitle}
          />
        </div>
        <div className={section === 'learn' ? 'block' : 'hidden print:block'}>
          <LearnSection pack={pack} teacherMode={teacherMode} />
          <SectionFooter
            idx={1}
            total={SECTIONS.length}
            prevKey="read"
            nextKey="see"
            onGo={goTo}
            onNextPack={onNextPack}
            nextPackTitle={nextPackTitle}
          />
        </div>
        <div className={section === 'see' ? 'block' : 'hidden print:block'}>
          <SeeItDoneSection pack={pack} teacherMode={teacherMode} />
          <SectionFooter
            idx={2}
            total={SECTIONS.length}
            prevKey="learn"
            nextKey="write"
            onGo={goTo}
            onNextPack={onNextPack}
            nextPackTitle={nextPackTitle}
          />
        </div>
        <div className={section === 'write' ? 'block' : 'hidden print:block'}>
          <WriteSection
            pack={pack}
            aiEnabled={aiEnabled}
            onEvaluation={onEvaluation}
            profile={profile}
            onPersistSpeakingAttempt={onPersistSpeakingAttempt}
            teacherMode={teacherMode}
          />
          <SectionFooter
            idx={3}
            total={SECTIONS.length}
            prevKey="see"
            nextKey={null}
            onGo={goTo}
            onNextPack={onNextPack}
            nextPackTitle={nextPackTitle}
          />
        </div>
      </div>

      {nextUp && <NextUpCard {...nextUp} />}

      <footer className="pt-10 border-t-4 border-dotted border-slate-100 flex justify-between items-end text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] print:text-slate-500">
        <span>Student: ____________________________</span>
        <span className="text-center">सङ्कल्प · {pack.id}</span>
        <span>Date: ________________</span>
      </footer>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Section footer — `← Prev · N of total · Next →`. Last section's Next points
// to the next chapter when one exists, closing the book-like loop.
// -----------------------------------------------------------------------------

interface SectionFooterProps {
  idx: number;
  total: number;
  prevKey: SectionKey | null;
  nextKey: SectionKey | null;
  onGo: (k: SectionKey) => void;
  onNextPack?: () => void;
  nextPackTitle?: string;
}

const SectionFooter: React.FC<SectionFooterProps> = ({
  idx,
  total,
  prevKey,
  nextKey,
  onGo,
  onNextPack,
  nextPackTitle,
}) => {
  const prev = prevKey ? SECTIONS[sectionIndexOf(prevKey)] : null;
  const next = nextKey ? SECTIONS[sectionIndexOf(nextKey)] : null;
  const endOfBook = !next && !!onNextPack;

  return (
    <nav
      className="mt-12 pt-6 border-t-2 border-dashed border-slate-100 flex items-center justify-between gap-3 flex-wrap no-print"
      aria-label="Section navigation"
    >
      {prev ? (
        <button
          onClick={() => onGo(prev.key)}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-slate-100 bg-white hover:border-slate-300 transition-colors text-left"
        >
          <ChevronLeft size={18} className="text-slate-400" />
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Previous · {idx} of {total}
            </span>
            <span className="text-sm font-black text-slate-800">{prev.english}</span>
          </span>
        </button>
      ) : (
        <span />
      )}

      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 order-first md:order-none">
        Section {idx + 1} of {total}
      </span>

      {next ? (
        <button
          onClick={() => onGo(next.key)}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-orange-700 text-white hover:bg-orange-800 transition-colors text-right shadow-lg shadow-orange-200"
        >
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
              Next · {idx + 2} of {total}
            </span>
            <span className="text-sm font-black">{next.english}</span>
          </span>
          <ChevronRight size={18} />
        </button>
      ) : endOfBook ? (
        <button
          onClick={onNextPack}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors text-right shadow-lg shadow-emerald-200"
        >
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
              Next chapter
            </span>
            <span className="text-sm font-black">{nextPackTitle || 'Next topic'} →</span>
          </span>
          <ChevronRight size={18} />
        </button>
      ) : (
        <span />
      )}
    </nav>
  );
};

// -----------------------------------------------------------------------------
// Teacher panels — surface WHY content. Off by default, toggled from toolbar.
// -----------------------------------------------------------------------------

const PackTeacherPanel: React.FC<{ pack: TopicPack }> = ({ pack }) => {
  const r = pack.rationale;
  const positionLabel = {
    foundations: 'Foundations (Novice Low → Novice High)',
    building: 'Building (Novice High → Intermediate Low)',
    'pushing-to-IM': 'Pushing to Intermediate Mid (3 credits)',
  } as const;
  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-white border-2 border-amber-200 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6 print:break-inside-avoid mb-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-orange-700 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-100">
          <Compass size={22} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-700">
            For the teacher
          </p>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Why this chapter exists
          </h2>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            {CURRICULUM.creditMapping.issuer} sub-topics covered
          </p>
          <ul className="space-y-1">
            {r.fcpsSubTopics.map((t, i) => (
              <li key={i} className="text-sm font-bold text-slate-800 flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">▸</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Rubric axes trained
          </p>
          <RubricAxisTags axes={r.trains} size="sm" />
          <p className="text-xs text-slate-500 italic mt-3 leading-relaxed">
            Mastering these at Benchmark {TARGET_BENCHMARK} earns Intermediate-Mid ≈{' '}
            {CURRICULUM.displayStrings.creditPhrase}.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1 flex items-center gap-1.5">
            <Compass size={11} /> Where on the arc
          </p>
          <p className="text-sm font-black text-indigo-900 leading-snug">{positionLabel[r.positionOnArc]}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-1 flex items-center gap-1.5">
            <Clock size={11} /> Expected time
          </p>
          <p className="text-sm font-black text-emerald-900 leading-snug">{r.estimatedTime}</p>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1 flex items-center gap-1.5">
            <AlertTriangle size={11} /> If skipped
          </p>
          <p className="text-sm font-black text-rose-900 leading-snug">{r.ifSkippedRisk}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 border border-slate-100">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
          <Target size={12} className="text-emerald-700" />
          Pack objectives
        </p>
        <ul className="space-y-2">
          {pack.objectives.map((o, i) => (
            <li key={i} className="text-sm font-bold text-slate-800 flex items-start gap-2 leading-relaxed">
              <span className="text-emerald-700 mt-0.5">✓</span>
              <span className="flex-1">{o.text}</span>
              <RubricAxisTags axes={o.trains} size="sm" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TeacherSectionNote: React.FC<{ heading: string; note?: TeacherNote }> = ({ heading, note }) => {
  if (!note) return null;
  return (
    <aside className="bg-amber-50 border-l-4 border-amber-400 rounded-xl px-5 py-4 space-y-2 print:break-inside-avoid">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-800 flex items-center gap-2">
        <GraduationCap size={12} strokeWidth={2.5} /> Teacher — {heading}
      </p>
      <p className="text-sm text-amber-900 leading-relaxed font-medium">{note.why}</p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-amber-700">Trains:</span>
        <RubricAxisTags axes={note.trains} />
      </div>
      {note.examLink && (
        <p className="text-[11px] font-semibold italic text-amber-800">
          Rubric reference: {note.examLink}
        </p>
      )}
    </aside>
  );
};

// =============================================================================
// SECTION 1 — READ  (anchor passage + highlights + comprehension)
// =============================================================================

const ReadSection: React.FC<{ pack: TopicPack; teacherMode: boolean }> = ({ pack, teacherMode }) => (
  <section className="space-y-8">
    <SectionHeader n={1} hindi="पढ़ो" english="Read the model first" subtitle={`Anchor passage · ${pack.anchor.title}`} />
    {teacherMode && <TeacherSectionNote heading="Reading sample" note={pack.anchorNote} />}
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
          <ChevronDown size={14} className="text-slate-500 group-open:rotate-180 transition-transform" />
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
  </section>
);

// =============================================================================
// SECTION 2 — LEARN  (vocab / grammar / connectors / idioms / cultural)
// =============================================================================

const LearnSection: React.FC<{ pack: TopicPack; teacherMode: boolean }> = ({ pack, teacherMode }) => {
  const grouped = React.useMemo<Record<string, VocabEntry[]>>(() => {
    const g: Record<string, VocabEntry[]> = {};
    pack.vocabulary.forEach((v) => {
      const key = v.subgroup || v.partOfSpeech;
      (g[key] = g[key] || []).push(v);
    });
    return g;
  }, [pack.vocabulary]);

  return (
    <section className="space-y-10">
      <SectionHeader n={2} hindi="सीखो" english="Learn the pieces" subtitle="Building blocks that made the model work" />

      <JumpMenu
        items={[
          { id: 'sec-vocab', label: `Vocab (${pack.vocabulary.length})` },
          { id: 'sec-grammar', label: `Grammar (${pack.grammar.length})` },
          { id: 'sec-connectors', label: `Connectors (${pack.connectors.length})` },
          { id: 'sec-idioms', label: `Muhavare (${pack.muhavare.length})` },
          { id: 'sec-cultural', label: `Cultural (${pack.cultural.length})` },
        ]}
      />

      <div id="sec-vocab" className="scroll-mt-32 space-y-5">
        <SubHeader eyebrow={`${pack.vocabulary.length} words · ${Object.keys(grouped).length} groups`} title="Vocabulary" />
        {teacherMode && <TeacherSectionNote heading="Vocabulary" note={pack.vocabularyNote} />}
        <div className="space-y-8">
          {(Object.entries(grouped) as [string, VocabEntry[]][]).map(([group, entries]) => (
            <div key={group}>
              <div className="flex items-center gap-3 mb-4">
                <Badge tone="orange" size="xs">{group.replace(/-/g, ' ')}</Badge>
                <span className="text-xs font-semibold text-slate-500">{entries.length} words</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
                {entries.map((e, i) => (
                  <VocabCard key={`${e.hindi}-${i}`} entry={e} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <RefDivider />

      <div id="sec-grammar" className="scroll-mt-32 space-y-5">
        <SubHeader eyebrow={`${pack.grammar.length} rules`} title="Grammar" />
        {teacherMode && <TeacherSectionNote heading="Grammar" note={pack.grammarNote} />}
        <RefGrammar grammar={pack.grammar} />
      </div>

      <RefDivider />

      <div id="sec-connectors" className="scroll-mt-32 space-y-5">
        <SubHeader eyebrow={`${pack.connectors.length} connectors`} title="Connectors" />
        {teacherMode && <TeacherSectionNote heading="Connectors" note={pack.connectorsNote} />}
        <RefConnectors connectors={pack.connectors} />
      </div>

      <RefDivider />

      <div id="sec-idioms" className="scroll-mt-32 space-y-5">
        <SubHeader eyebrow={`${pack.muhavare.length} idioms`} title="Muhavare" />
        {teacherMode && <TeacherSectionNote heading="Muhavare" note={pack.muhavareNote} />}
        <RefMuhavare muhavare={pack.muhavare} />
      </div>

      <RefDivider />

      <div id="sec-cultural" className="scroll-mt-32 space-y-5">
        <SubHeader eyebrow={`${pack.cultural.length} notes`} title="Cultural details" />
        {teacherMode && <TeacherSectionNote heading="Cultural details" note={pack.culturalNote} />}
        <RefCultural items={pack.cultural} />
      </div>
    </section>
  );
};

// =============================================================================
// SECTION 3 — SEE IT DONE  (annotated model essays + short model texts)
// =============================================================================

const SeeItDoneSection: React.FC<{ pack: TopicPack; teacherMode: boolean }> = ({ pack, teacherMode }) => {
  const [essayIdx, setEssayIdx] = useState(0);

  return (
    <section className="space-y-10">
      <SectionHeader n={3} hindi="देखो" english="See it done" subtitle={`${pack.modelEssays.length} annotated model essays`} />
      {teacherMode && <TeacherSectionNote heading="Model essays" note={pack.modelEssaysNote} />}

      <div id="model-essays" className="scroll-mt-32 space-y-6">
        <EssayTabs
          essays={pack.modelEssays}
          activeIdx={essayIdx}
          onChange={setEssayIdx}
        />
        <ModelEssayBody essay={pack.modelEssays[essayIdx]} idx={essayIdx} />
        {teacherMode && (
          <div className="space-y-2 mt-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">
              Teacher — Why this essay would pass
            </p>
            <VerdictCard verdict={pack.modelEssays[essayIdx].verdict} />
          </div>
        )}

        {/* Print: render the other essays sequentially */}
        <div className="hidden print:block space-y-10 mt-10">
          {pack.modelEssays.map((e, i) =>
            i === essayIdx ? null : <ModelEssayBody key={i} essay={e} idx={i} />,
          )}
        </div>
      </div>

      {pack.modelTexts.length > 0 && (
        <>
          <RefDivider />
          <div className="space-y-5">
            <SubHeader
              eyebrow={`${pack.modelTexts.length} short formats`}
              title="Short model texts (schedule · diary · sms · letter)"
            />
            {teacherMode && <TeacherSectionNote heading="Model texts" note={pack.modelTextsNote} />}
            <RefModelTexts texts={pack.modelTexts} />
          </div>
        </>
      )}
    </section>
  );
};

// =============================================================================
// SECTION 4 — WRITE IT YOURSELF  (prompts + self-check + optional speaking/AI)
// =============================================================================

interface WriteSectionProps {
  pack: TopicPack;
  aiEnabled: boolean;
  onEvaluation?: (result: EvaluationResult) => void;
  profile?: StudentProfile;
  onPersistSpeakingAttempt?: (packId: string, attempt: SpeakingAttempt) => void;
  teacherMode: boolean;
}

const WriteSection: React.FC<WriteSectionProps> = ({
  pack,
  aiEnabled,
  onEvaluation,
  profile,
  onPersistSpeakingAttempt,
  teacherMode,
}) => {
  const [openAiFor, setOpenAiFor] = useState<number | null>(null);
  const [speakingOpen, setSpeakingOpen] = useState(false);

  return (
    <section className="space-y-10">
      <SectionHeader n={4} hindi="लिखो" english="Now write your own" subtitle={`${pack.prompts.length} prompts · pick one`} />
      {teacherMode && <TeacherSectionNote heading="Writing prompts" note={pack.promptsNote} />}

      <div id="writing-prompts" className="scroll-mt-32 space-y-5">
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

      {profile && onPersistSpeakingAttempt && (
        <div id="speaking-practice" className="scroll-mt-32 space-y-4 no-print">
          <button
            onClick={() => setSpeakingOpen((v) => !v)}
            data-testid="speaking-toggle"
            aria-expanded={speakingOpen}
            className="w-full flex items-center justify-between gap-4 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 rounded-2xl px-6 py-4 transition-colors"
          >
            <span className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                <Mic size={16} strokeWidth={2.5} />
              </span>
              <span className="text-left">
                <span className="block text-sm md:text-base font-black text-slate-900 leading-tight">
                  Speaking practice
                </span>
                <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Record · self-check · {aiEnabled ? 'optional AI feedback' : 'AI off (toggle in Settings)'}
                </span>
              </span>
            </span>
            <ChevronDown
              size={18}
              className={`text-slate-500 transition-transform ${speakingOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {speakingOpen && (
            <SpeakingPanel
              pack={pack}
              profile={profile}
              aiEnabled={aiEnabled}
              onPersistAttempt={onPersistSpeakingAttempt}
            />
          )}
        </div>
      )}

      <RefDivider />

      <SelfCheckTable />
      {teacherMode && <TeacherSectionNote heading="Self-check rubric" note={pack.rubricNote} />}
    </section>
  );
};

// =============================================================================
// Shared atoms
// =============================================================================

interface SectionHeaderProps {
  n: number;
  hindi: string;
  english: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ n, hindi, english, subtitle }) => (
  <header className="flex items-start gap-5 pb-6 border-b-2 border-slate-100 print:break-inside-avoid">
    <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-orange-700 text-white flex items-center justify-center font-hindi-display text-3xl md:text-4xl font-black shadow-lg shadow-orange-100">
      {n}
    </div>
    <div>
      <DevanagariText as="p" size="lg" weight="black" display className="text-orange-700 leading-none mb-1">
        {hindi}
      </DevanagariText>
      <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
        {english}
      </h2>
      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{subtitle}</p>
    </div>
  </header>
);

const SubHeader: React.FC<{ eyebrow: string; title: string }> = ({ eyebrow, title }) => (
  <header className="space-y-1">
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{eyebrow}</p>
    <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">{title}</h3>
  </header>
);

const RefDivider: React.FC = () => (
  <hr className="border-t border-dashed border-slate-200" />
);

const JumpMenu: React.FC<{ items: { id: string; label: string }[] }> = ({ items }) => (
  <nav className="flex flex-wrap gap-2 no-print" aria-label="Jump to sub-section">
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 self-center">
      Jump to:
    </span>
    {items.map((it) => (
      <a
        key={it.id}
        href={`#${it.id}`}
        className="text-xs font-black px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
      >
        {it.label}
      </a>
    ))}
  </nav>
);

// =============================================================================
// Leaf components (vocab / grammar / connectors / idioms / cultural / model-texts / essays / prompts / self-check)
// =============================================================================

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
        <p className="text-xs italic text-slate-500 mt-1">Lit: {m.literal}</p>
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
          <Badge tone="amber" size="xs" className="!bg-white/20 !text-white !border-white/30">Essay {idx + 1}</Badge>
          <Badge tone="amber" size="xs" className="!bg-white/20 !text-white !border-white/30">{essay.wordCount} words</Badge>
          {essay.tenseUsed.map((t) => (
            <Badge key={t} tone="amber" size="xs" className="!bg-white/20 !text-white !border-white/30">{t} tense</Badge>
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
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">
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
      <span className="font-hindi-display text-3xl font-black text-orange-700 shrink-0 leading-none">
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
    <SubHeader eyebrow="Tear-off page" title="Essay self-check" />
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
