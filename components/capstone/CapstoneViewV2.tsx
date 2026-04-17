import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
  ArrowRight,
  Clock,
  BookOpen,
  PenTool,
  GraduationCap,
  Link2,
  ArrowUpRight,
  Flag,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import type { Capstone, EssayVersion } from '../../content/schema';
import { TOPIC_PACKS_BY_ID } from '../../content';
import { tokensFor } from '../ui/themeTokens';
import { Badge } from '../ui/Badge';
import { DevanagariText } from '../ui/DevanagariText';
import { CapstoneHeroArt } from '../art/CapstoneHeroArt';
import { VerdictCard } from '../topic/VerdictCard';
import { TeacherNoteBox } from '../topic/TeacherNoteBox';
import { RubricAxisTags } from '../topic/RubricAxisTag';
import { ParagraphScaffoldDiagram } from '../art/diagrams';

// -----------------------------------------------------------------------------
// CapstoneViewV2 - capstone page IA, mirrors the topic-pack 4-tab pattern
// but collapses to 3 tabs since capstones have no vocab/grammar to look up.
//   1. Study   - orientation: outcomes, action steps, source packs
//   2. Write   - the prompt + 3 tier essays (sub-tabs) + comprehension Qs
//   3. Teacher - verdict card, teacher note, paragraph annotations
// -----------------------------------------------------------------------------

type TabKey = 'study' | 'write' | 'teacher';

interface TabDef {
  key: TabKey;
  hindi: string;
  english: string;
  icon: React.ReactNode;
}

const TABS: TabDef[] = [
  { key: 'study', hindi: 'पढ़ो', english: 'Study', icon: <BookOpen size={16} strokeWidth={2.5} /> },
  { key: 'write', hindi: 'लिखो', english: 'Write', icon: <PenTool size={16} strokeWidth={2.5} /> },
  { key: 'teacher', hindi: 'शिक्षक', english: "Teacher's view", icon: <GraduationCap size={16} strokeWidth={2.5} /> },
];

const TIER_META: Record<EssayVersion['label'], { title: string; subtitle: string; tone: string }> = {
  novice: { title: 'Novice draft', subtitle: 'What a new learner might write', tone: 'bg-slate-500' },
  intermediateMid: { title: 'Intermediate-Mid', subtitle: 'Benchmark 5 · the 3-credit target', tone: 'bg-orange-600' },
  push: { title: 'Push tier', subtitle: 'Reaching toward Benchmark 6', tone: 'bg-indigo-600' },
};

interface CapstoneViewV2Props {
  capstone: Capstone;
  isCompleted?: boolean;
  onBack: () => void;
  onMarkComplete: () => void;
  onOpenPack: (packId: string) => void;
}

export const CapstoneViewV2: React.FC<CapstoneViewV2Props> = ({
  capstone,
  isCompleted,
  onBack,
  onMarkComplete,
  onOpenPack,
}) => {
  const tokens = tokensFor(capstone.themeGroup);
  const [activeTab, setActiveTab] = useState<TabKey>('study');
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const tabBodyRef = useRef<HTMLDivElement | null>(null);

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

  const goTo = (tab: TabKey, anchorId?: string) => {
    setActiveTab(tab);
    if (anchorId) setPendingScroll(anchorId);
    if (tabBodyRef.current) {
      tabBodyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-32 space-y-8 animate-in fade-in duration-300 printable-area">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-black text-slate-500 hover:text-orange-600"
        >
          <ArrowLeft size={16} /> Back to Capstones
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-black hover:bg-slate-200 text-sm"
          >
            <Printer size={16} /> Print
          </button>
          <button
            onClick={onMarkComplete}
            disabled={isCompleted}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-black text-sm shadow-lg ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-700 cursor-default'
                : `${tokens.accentBg} text-white hover:opacity-90`
            }`}
          >
            <CheckCircle2 size={16} /> {isCompleted ? 'Completed' : 'Mark complete'}
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2.5rem] text-white shadow-2xl print:shadow-none print:break-after-page">
        <div className="absolute inset-0">
          <CapstoneHeroArt capstone={capstone} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
        <div className="relative z-10 p-10 md:p-16 min-h-[380px] flex flex-col justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge tone="amber" size="xs">
              Capstone {capstone.order} · {capstone.tier === 'push' ? 'Push tier' : 'Core tier'}
            </Badge>
            <Badge tone="slate" size="xs" className="bg-white/15 text-white border-white/20">
              {tokens.label}
            </Badge>
            {capstone.isMockExam && (
              <Badge tone="rose" size="xs" className="bg-rose-400/30 text-white border-white/30">
                <Clock size={10} className="inline mr-1" /> Mock Exam · {capstone.mockExamMinutes} min
              </Badge>
            )}
          </div>
          <div className="space-y-3 mt-8">
            <h1 className="font-hindi-display text-4xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-sm">
              {capstone.titleHindi}
            </h1>
            <p className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
              {capstone.titleEnglish}
            </p>
            <p className="text-lg md:text-xl font-medium italic text-white/90 max-w-2xl leading-relaxed">
              {capstone.hook}
            </p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="sticky top-0 z-20 -mx-2 px-2 py-3 bg-white/90 backdrop-blur-md border-b border-slate-100 no-print">
        <div className="flex gap-1 md:gap-2 overflow-x-auto" role="tablist" aria-label="Capstone sections">
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
        <div className={activeTab === 'study' ? 'block' : 'hidden print:block'}>
          <StudyTab capstone={capstone} goTo={goTo} onOpenPack={onOpenPack} />
        </div>
        <div className={activeTab === 'write' ? 'block' : 'hidden print:block'}>
          <WriteTab capstone={capstone} />
        </div>
        <div className={activeTab === 'teacher' ? 'block' : 'hidden print:block'}>
          <TeacherTab capstone={capstone} />
        </div>
      </div>

      <footer className="pt-10 border-t-4 border-dotted border-slate-100 flex justify-between items-end text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] print:text-slate-400">
        <span>Student: ____________________________</span>
        <span className="text-center">सङ्कल्प · {capstone.id}</span>
        <span>Date: ________________</span>
      </footer>
    </div>
  );
};

// =============================================================================
// STUDY
// =============================================================================

interface StudyTabProps {
  capstone: Capstone;
  goTo: (tab: TabKey, anchor?: string) => void;
  onOpenPack: (packId: string) => void;
}

const StudyTab: React.FC<StudyTabProps> = ({ capstone, goTo, onOpenPack }) => {
  const tokens = tokensFor(capstone.themeGroup);

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
      title: 'Read the prompt carefully',
      body: capstone.isMockExam
        ? `This is a Mock Exam. Set a ${capstone.mockExamMinutes}-minute timer before reading the model essays.`
        : 'Note who the prompt is asking you to write to and how many time frames it requires.',
      cta: 'Open prompt',
      minutes: '~3 min',
      onClick: () => goTo('write', 'capstone-prompt'),
    },
    {
      n: 2,
      title: 'Read all three model versions in order',
      body: 'Novice → Intermediate-Mid → Push. Notice exactly what each tier adds to the previous one.',
      cta: 'Open essays',
      minutes: '~25 min',
      onClick: () => goTo('write', 'capstone-versions'),
    },
    {
      n: 3,
      title: capstone.isMockExam
        ? `Write your own draft in ${capstone.mockExamMinutes} minutes`
        : 'Write your own draft (no notes)',
      body: 'Aim for the Intermediate-Mid tier. Three paragraphs, three time frames, four+ connectors.',
      cta: 'Re-read prompt',
      minutes: capstone.isMockExam ? `${capstone.mockExamMinutes} min` : '~30 min',
      onClick: () => goTo('write', 'capstone-prompt'),
    },
    {
      n: 4,
      title: 'Answer the comprehension questions',
      body: 'Confirms you absorbed the IM essay\'s structure, not just its words.',
      cta: 'Open questions',
      minutes: '~10 min',
      onClick: () => goTo('write', 'reader-questions'),
    },
  ];

  return (
    <section className="space-y-10">
      {/* Why this capstone */}
      <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 md:p-12 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
          What this capstone rehearses
        </p>
        <p className="text-base text-slate-800 leading-relaxed">{capstone.whyThisCapstone}</p>
      </div>

      {/* Action steps */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
          Your path through this capstone
        </p>
        <ol className="space-y-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="group bg-white rounded-2xl border-2 border-slate-100 hover:border-current transition-all overflow-hidden"
            >
              <button onClick={s.onClick} className="w-full flex items-stretch text-left">
                <div
                  className={`${tokens.accentBg} text-white px-5 md:px-8 py-6 flex items-center justify-center shrink-0 font-hindi-display text-3xl md:text-4xl font-black w-20 md:w-24`}
                >
                  {s.n}
                </div>
                <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-base md:text-lg font-black text-slate-900 leading-tight">{s.title}</p>
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

      {/* Source packs */}
      <SourcePacks draws={capstone.draws} onOpenPack={onOpenPack} />
    </section>
  );
};

const SourcePacks: React.FC<{
  draws: Capstone['draws'];
  onOpenPack: (packId: string) => void;
}> = ({ draws, onOpenPack }) => {
  const contributionColor: Record<string, string> = {
    vocabulary: 'bg-amber-100 text-amber-800',
    grammar: 'bg-emerald-100 text-emerald-800',
    connectors: 'bg-indigo-100 text-indigo-800',
    structure: 'bg-slate-200 text-slate-800',
    cultural: 'bg-rose-100 text-rose-800',
  };

  return (
    <div id="source-packs" className="scroll-mt-32 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
          <Link2 size={18} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Source packs</p>
          <p className="font-black text-slate-900 text-lg">
            {draws.length} topic packs feed this capstone - open one if you need a refresher
          </p>
        </div>
      </div>
      <ul className="grid md:grid-cols-2 gap-3">
        {draws.map((d, i) => {
          const pack = TOPIC_PACKS_BY_ID[d.packId];
          return (
            <li key={i} className="bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-orange-200 transition">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <button
                    onClick={() => onOpenPack(d.packId)}
                    className="text-sm font-black text-slate-900 hover:text-orange-600 hover:underline text-left"
                  >
                    {pack ? pack.titleEnglish : d.packId}
                  </button>
                  {pack && (
                    <p className="font-hindi text-sm text-slate-500 mt-0.5">{pack.titleHindi}</p>
                  )}
                  <span
                    className={`inline-block mt-2 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${contributionColor[d.contributes] || 'bg-slate-100 text-slate-700'}`}
                  >
                    {d.contributes}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed italic mt-2">{d.note}</p>
                </div>
                <button
                  onClick={() => onOpenPack(d.packId)}
                  className="shrink-0 text-slate-400 hover:text-orange-600 mt-1"
                  aria-label={`Open ${pack ? pack.titleEnglish : d.packId}`}
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// =============================================================================
// WRITE
// =============================================================================

const WriteTab: React.FC<{ capstone: Capstone }> = ({ capstone }) => {
  const initialTier =
    capstone.versions.find((v) => v.label === 'intermediateMid')?.label ||
    capstone.versions[1]?.label ||
    capstone.versions[0].label;
  const [tier, setTier] = useState<EssayVersion['label']>(initialTier);
  const shown = capstone.versions.find((v) => v.label === tier) || capstone.versions[0];

  return (
    <section className="space-y-12">
      {/* Prompt */}
      <div id="capstone-prompt" className="scroll-mt-32 space-y-3">
        <RefHeader id="prompt-header" eyebrow="The prompt" title="What you will write" />
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-[2rem] p-8 md:p-10 space-y-4">
          <DevanagariText size="lg" weight="black" className="text-slate-900 leading-relaxed">
            {capstone.promptHindi}
          </DevanagariText>
          <p className="text-base text-slate-600 italic leading-relaxed">{capstone.promptEnglish}</p>
          {capstone.isMockExam && (
            <div className="flex items-center gap-3 pt-4 border-t border-orange-200/60">
              <Clock size={18} className="text-orange-700" />
              <p className="text-sm font-bold text-slate-700">
                Mock Exam sitting - set a {capstone.mockExamMinutes}-minute timer. No notes. No dictionary.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Paragraph scaffold reminder */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-600 mb-4">
          <Flag size={16} strokeWidth={2.5} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">The 3-paragraph shape</p>
        </div>
        <ParagraphScaffoldDiagram />
      </div>

      {/* Tiered model essays */}
      <div id="capstone-versions" className="scroll-mt-32 space-y-5">
        <RefHeader
          id="versions-header"
          eyebrow={`${capstone.versions.length} versions · same prompt, different ceilings`}
          title="Model essays"
        />
        <TierTabs versions={capstone.versions} activeTier={tier} onChange={setTier} />
        <VersionBody version={shown} />

        {/* Print: render the other tiers sequentially */}
        <div className="hidden print:block space-y-8 mt-8">
          {capstone.versions.map((v) =>
            v.label === tier ? null : <VersionBody key={v.label} version={v} />,
          )}
        </div>
      </div>

      {/* Reader questions */}
      <div id="reader-questions" className="scroll-mt-32 space-y-3">
        <RefHeader
          id="reader-q-header"
          eyebrow={`${capstone.readerQuestions.length} comprehension questions`}
          title="Check your reading"
        />
        <div className="space-y-3">
          {capstone.readerQuestions.map((qa, i) => (
            <details
              key={i}
              className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-indigo-200 transition print:open"
            >
              <summary className="cursor-pointer flex items-start justify-between gap-3 list-none">
                <DevanagariText size="sm" weight="bold" as="span" className="flex-1 text-slate-900">
                  {i + 1}. {qa.q}
                </DevanagariText>
                <span className="text-xs font-black text-indigo-500 uppercase tracking-widest mt-0.5 shrink-0">
                  Answer ↓
                </span>
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <DevanagariText size="sm" weight="medium" className="text-slate-700">
                  {qa.a}
                </DevanagariText>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const TierTabs: React.FC<{
  versions: EssayVersion[];
  activeTier: EssayVersion['label'];
  onChange: (t: EssayVersion['label']) => void;
}> = ({ versions, activeTier, onChange }) => (
  <div className="flex gap-2 items-stretch no-print border-b-2 border-slate-100" role="tablist" aria-label="Essay tiers">
    {versions.map((v) => {
      const meta = TIER_META[v.label];
      const active = v.label === activeTier;
      return (
        <button
          key={v.label}
          role="tab"
          aria-selected={active}
          onClick={() => onChange(v.label)}
          className={`relative px-5 py-3 -mb-[2px] border-b-4 text-left transition-colors flex-1 max-w-[280px] ${
            active
              ? `${meta.tone.replace('bg-', 'border-')} text-slate-900`
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span className="block text-base font-black tracking-tight leading-tight">{meta.title}</span>
          <span className="block text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mt-0.5">
            B{v.targetBenchmark} · {v.wordCount}w · {v.tensesUsed.length} tense{v.tensesUsed.length > 1 ? 's' : ''}
          </span>
        </button>
      );
    })}
  </div>
);

const VersionBody: React.FC<{ version: EssayVersion }> = ({ version }) => {
  const meta = TIER_META[version.label];
  const paragraphs = version.hindi.split('\n\n');
  const englishParas = version.english.split('\n\n');
  return (
    <article className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 md:p-10 shadow-sm print:shadow-none print:break-inside-avoid">
      <header className="flex flex-wrap items-center gap-2 mb-6">
        <span className={`text-[10px] font-black uppercase tracking-[0.25em] text-white px-2 py-1 rounded ${meta.tone}`}>
          {meta.title}
        </span>
        <Badge tone="slate" size="xs">{version.wordCount} words</Badge>
        <Badge tone="amber" size="xs">Benchmark {version.targetBenchmark}</Badge>
        <Badge tone="green" size="xs">{version.tensesUsed.length} tense{version.tensesUsed.length > 1 ? 's' : ''}</Badge>
        <Badge tone="indigo" size="xs">{version.connectorsUsed.length} connectors</Badge>
      </header>

      <div className="space-y-6">
        {paragraphs.map((p, i) => (
          <DevanagariText key={i} size="md" weight="medium" className="text-slate-900 leading-[2.1]">
            {p}
          </DevanagariText>
        ))}
      </div>

      <details className="mt-6 no-print">
        <summary className="text-xs font-black uppercase tracking-widest text-slate-500 cursor-pointer hover:text-orange-600">
          Show English translation
        </summary>
        <div className="mt-4 space-y-3 text-sm text-slate-600 italic leading-relaxed border-l-2 border-slate-200 pl-4">
          {englishParas.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      </details>

      <div className="hidden print:block mt-4 space-y-3 text-sm text-slate-600 italic leading-relaxed border-l-2 border-slate-300 pl-4">
        {englishParas.map((e, i) => <p key={i}>{e}</p>)}
      </div>
    </article>
  );
};

// =============================================================================
// TEACHER
// =============================================================================

const annotationDotColor: Record<string, string> = {
  connector: 'bg-indigo-500',
  'tense-shift': 'bg-emerald-500',
  idiom: 'bg-violet-500',
  vocab: 'bg-orange-500',
  cultural: 'bg-amber-500',
  structure: 'bg-slate-500',
};

const TeacherTab: React.FC<{ capstone: Capstone }> = ({ capstone }) => {
  const imVersion =
    capstone.versions.find((v) => v.label === 'intermediateMid') || capstone.versions[1] || capstone.versions[0];
  const paras = imVersion.hindi.split('\n\n');

  return (
    <section className="space-y-12">
      {/* Why this capstone (deeper) */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-white border-2 border-amber-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-6 print:break-inside-avoid">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 bg-orange-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-100">
            <GraduationCap size={26} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">For the teacher</p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Why this capstone exists
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Rationale, predicted benchmark, and paragraph-by-paragraph annotation of the
              Intermediate-Mid tier. The student does not need this surface to do the work.
            </p>
          </div>
        </div>
        <p className="text-base text-slate-800 leading-relaxed">{capstone.whyThisCapstone}</p>
      </div>

      {/* Verdict card */}
      <div className="space-y-3">
        <RefHeader id="verdict" eyebrow="Predicted benchmark" title="Why the IM version would pass" />
        <VerdictCard verdict={capstone.verdict} />
      </div>

      {/* Annotations */}
      <div className="space-y-3">
        <RefHeader
          id="annotations"
          eyebrow="Paragraph-by-paragraph"
          title="What the rater notices in the IM tier"
        />
        <div className="space-y-4">
          {[0, 1, 2].map((pIdx) => {
            const para = paras[pIdx] || '';
            const notes = capstone.annotations.filter((a) => a.paragraphIndex === pIdx);
            if (!notes.length && !para) return null;
            return (
              <div key={pIdx} className="bg-white border border-slate-100 rounded-2xl p-5 print:break-inside-avoid">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  Paragraph {pIdx + 1}
                </p>
                {para && (
                  <DevanagariText size="sm" weight="medium" className="text-slate-800 mb-4 leading-[2]">
                    {para}
                  </DevanagariText>
                )}
                <ul className="space-y-2">
                  {notes.map((n, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className={`w-2.5 h-2.5 rounded-full ${annotationDotColor[n.kind] || 'bg-slate-400'} mt-1.5 shrink-0`} />
                      <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          {n.kind.replace('-', ' ')}:{' '}
                          <DevanagariText as="span" size="sm" weight="bold" className="text-slate-700">
                            {n.highlight}
                          </DevanagariText>
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed mt-0.5">{n.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Teacher note */}
      <div className="space-y-3">
        <RefHeader id="teacher-note" eyebrow="Pedagogy" title="Teacher note" />
        <div className="flex items-center gap-2">
          <RubricAxisTags axes={capstone.teacherNote.trains} />
        </div>
        <TeacherNoteBox note={capstone.teacherNote} />
      </div>
    </section>
  );
};

// =============================================================================
// shared
// =============================================================================

const RefHeader: React.FC<{ id: string; eyebrow: string; title: string }> = ({ id, eyebrow, title }) => (
  <header id={id} className="space-y-1 scroll-mt-32">
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{eyebrow}</p>
    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">{title}</h2>
  </header>
);
