import React from 'react';
import type { StudentProfile } from '../../types';
import { TOPIC_PACKS } from '../../content';
import { CAPSTONES } from '../../content/capstones';
import { DECKS, totalCards } from '../../content/flashcards';
import { STUDY_PLANS } from '../../content/studyPlans';
import { DevanagariText } from '../ui/DevanagariText';
import { PaisleyDivider } from '../ui/PaisleyDivider';
import { RangoliCorner } from '../ui/RangoliCorner';
import {
  MotifNamaste,
  MotifDiya,
  MotifBooks,
  MotifSunrise,
  MotifTemple,
} from '../art/motifs';
import { RubricLadderDiagram } from '../art/diagrams';
import { CURRICULUM } from '../../content/curriculum';
import {
  PlusCircle,
  Search,
  CheckCircle2,
  GraduationCap,
  ClipboardList,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Target,
  Clock,
  User,
} from 'lucide-react';

interface LandingViewProps {
  profiles: StudentProfile[];
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onSelectProfile: (id: string) => void;
  onAddStudent: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  profiles,
  searchTerm,
  setSearchTerm,
  onSelectProfile,
  onAddStudent,
}) => {
  const filtered = profiles.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const hasProfiles = profiles.length > 0;

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/40 to-rose-50/30">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* Band 1 · Hero                                               */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <RangoliCorner
          corner="tl"
          color="#ea580c"
          size={110}
          className="absolute top-6 left-6 opacity-40 hidden md:block"
        />
        <RangoliCorner
          corner="tr"
          color="#f59e0b"
          size={110}
          className="absolute top-6 right-6 opacity-40 hidden md:block"
        />
        <RangoliCorner
          corner="bl"
          color="#f59e0b"
          size={110}
          className="absolute bottom-0 left-6 opacity-30 hidden md:block"
        />
        <RangoliCorner
          corner="br"
          color="#ea580c"
          size={110}
          className="absolute bottom-0 right-6 opacity-30 hidden md:block"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20 lg:py-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left - text */}
          <div className="space-y-7 animate-in fade-in duration-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-200">
                स
              </div>
              <span className="text-[11px] font-black tracking-[0.3em] text-orange-700 uppercase">
                Sankalp · हिन्दी
              </span>
            </div>

            <DevanagariText
              as="h1"
              display
              weight="black"
              className="text-7xl sm:text-8xl md:text-9xl leading-[0.9] text-slate-900"
            >
              नमस्ते
            </DevanagariText>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
              Earn <span className="text-orange-700">{CURRICULUM.creditMapping.credits} {CURRICULUM.creditMapping.issuer} World Language credits</span> in {CURRICULUM.language.name}.
            </h2>

            <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              A complete prep course for the {CURRICULUM.examSystem.providerShortName}{' '}
              <strong className="text-slate-900">{CURRICULUM.examSystem.shortName} 2S</strong> exam -{' '}
              {TOPIC_PACKS.length} topic packs, {CAPSTONES.length} capstones,{' '}
              {totalCards().toLocaleString()} flashcards. Target:{' '}
              <strong className="text-slate-900">{CURRICULUM.displayStrings.targetPhrase} (Intermediate-Mid)</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={onAddStudent}
                className="group inline-flex items-center justify-center gap-3 bg-orange-700 hover:bg-orange-700 text-white font-black px-7 py-4 md:px-8 md:py-5 rounded-2xl shadow-xl shadow-orange-200 transition-all hover:-translate-y-0.5 text-base"
              >
                <PlusCircle size={20} strokeWidth={2.5} />
                Start a student
                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => scrollToId('why')}
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-800 font-black px-7 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-slate-200 hover:border-orange-300 transition-all text-base"
              >
                How this works
              </button>
            </div>

            <div className="inline-flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 text-sm font-black text-emerald-800">
              <ShieldCheck size={16} strokeWidth={2.5} />
              {CURRICULUM.creditMapping.credits}-credit audit:
              <span className="tracking-widest">GUARANTEED</span>
            </div>
          </div>

          {/* Right - motif collage */}
          <div className="relative h-[440px] sm:h-[520px] md:h-[580px] animate-in fade-in zoom-in duration-700">
            {/* Warm backdrop card */}
            <div className="absolute inset-4 md:inset-8 rounded-[3.5rem] bg-gradient-to-br from-orange-400 via-amber-400 to-rose-300 shadow-2xl shadow-orange-200/50 overflow-hidden">
              <div className="absolute inset-0 opacity-40">
                <MotifSunrise color="#ffffff" accent="rgba(255,255,255,0.4)" />
              </div>
            </div>

            {/* Center - Namaste */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] aspect-square z-10">
              <div className="w-full h-full bg-white/95 rounded-[2.5rem] p-6 md:p-8 shadow-2xl rotate-2 backdrop-blur-sm border border-white/60">
                <MotifNamaste color="#ea580c" accent="#f59e0b" />
              </div>
            </div>

            {/* Top-right - Diya on dark */}
            <div className="absolute top-4 right-0 md:top-6 md:right-4 w-28 md:w-36 aspect-square z-20 -rotate-6">
              <div className="w-full h-full bg-slate-900 rounded-3xl p-3 md:p-4 shadow-xl">
                <MotifDiya color="#fbbf24" accent="#f59e0b" />
              </div>
            </div>

            {/* Bottom-left - Books */}
            <div className="absolute bottom-4 left-0 md:bottom-6 md:left-2 w-28 md:w-36 aspect-square z-20 rotate-6">
              <div className="w-full h-full bg-emerald-700 rounded-3xl p-3 md:p-4 shadow-xl">
                <MotifBooks color="#ffffff" accent="#a7f3d0" />
              </div>
            </div>

            {/* Bottom-right - Temple */}
            <div className="absolute bottom-2 right-6 md:bottom-4 md:right-14 w-24 md:w-32 aspect-square z-20 rotate-3">
              <div className="w-full h-full bg-indigo-600 rounded-3xl p-3 md:p-4 shadow-xl">
                <MotifTemple color="#ffffff" accent="#c7d2fe" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <PaisleyDivider />
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* Band 2 · The Promise                                        */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section id="why" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20 space-y-12">
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Why Sankalp exists
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
            One exam. One target. One honest path to {CURRICULUM.creditMapping.credits} credits.
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
            Not a generic {CURRICULUM.language.name} course. Every page is engineered around the {CURRICULUM.creditMapping.issuer} Credit-by-Exam
            path - the exam you actually take, the rubric you're actually scored against.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <PromiseCard
            icon={<ClipboardList size={28} strokeWidth={2.5} />}
            eyebrow="What you're prepping for"
            headline={`${CURRICULUM.examSystem.providerShortName} ${CURRICULUM.examSystem.shortName} 2S - Writing + Speaking only`}
            body={`Two sections, ~2 hours total. No reading, no listening. ${CURRICULUM.creditMapping.issuer} only grades what you produce, so we only train what gets graded.`}
            tone="blue"
          />
          <PromiseCard
            icon={<Award size={28} strokeWidth={2.5} />}
            eyebrow="What you walk away with"
            headline={`${CURRICULUM.displayStrings.targetPhrase} = ${CURRICULUM.displayStrings.creditPhrase}`}
            body={`Intermediate-Mid proficiency on both Writing and Speaking. The full ${CURRICULUM.creditMapping.credits}-credit ceiling ${CURRICULUM.creditMapping.issuer} awards - no halfway prize.`}
            tone="emerald"
            highlight
          />
          <PromiseCard
            icon={<BookOpen size={28} strokeWidth={2.5} />}
            eyebrow="How we get there"
            headline="Pack → Capstone → Mock exam"
            body={`${STUDY_PLANS.length} named study plans, 2 to 12 months depending on starting level. About 30 minutes daily - short enough to keep.`}
            tone="orange"
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* Band 3 · Evidence                                           */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16">
        <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 opacity-[0.06] pointer-events-none">
            <MotifSunrise color="#ffffff" accent="#ffffff" />
          </div>

          <div className="relative space-y-10">
            <div className="max-w-3xl space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-300">
                Built, not promised
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Every claim on this page is backed by content in the library.
              </h2>
              <p className="text-slate-300 text-base md:text-lg font-medium leading-relaxed">
                Live counts pulled from the shipping registry - not a marketing number, not a
                roadmap promise.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              <Stat value={TOPIC_PACKS.length} label="Topic packs" sub="L1 · L2 · L3 stretch" />
              <Stat value={CAPSTONES.length} label="Capstones" sub="5 core + 5 push" />
              <Stat value={DECKS.length} label="Flashcard decks" sub="printable 8-up" />
              <Stat value={totalCards().toLocaleString()} label="Flashcards" sub="priority-tiered" />
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-end gap-6 justify-between">
              <div className="max-w-xl">
                <p className="text-white text-lg md:text-2xl font-black leading-snug">
                  "The {CURRICULUM.creditMapping.credits}-credit outcome is the expected one, not the hoped-for one."
                </p>
                <p className="text-slate-400 text-sm italic mt-2">
                  - from the shipping credit audit, regenerated every build.
                </p>
              </div>
              <div className="shrink-0 inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-5 py-2.5 text-sm font-black text-emerald-200">
                <ShieldCheck size={18} strokeWidth={2.5} />
                VERDICT: GUARANTEED
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-5 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target size={20} strokeWidth={2.5} className="text-orange-700" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Where we're aimed
                </p>
              </div>
              <RubricLadderDiagram highlight={5} />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <PaisleyDivider />
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* Band 4 · Get started                                        */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <header className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Ready when you are
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            {hasProfiles ? 'Pick up where you left off.' : 'Create your first student.'}
          </h2>
        </header>

        <div
          className={`grid gap-6 md:gap-8 ${
            hasProfiles ? 'md:grid-cols-5' : 'md:grid-cols-1'
          }`}
        >
          {hasProfiles && (
            <div className="md:col-span-3 bg-white border border-slate-100 rounded-[2.5rem] p-7 md:p-10 shadow-sm space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-700">
                    Welcome back
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    Continue learning
                  </h3>
                </div>
                {profiles.length > 3 && (
                  <div className="relative min-w-[200px]">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Find student..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 text-sm font-semibold"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
                {filtered.map((p) => {
                  const packs = (p.completedTopicIds || []).length;
                  const caps = (p.completedCapstoneIds || []).length;
                  const anyProgress = packs > 0 || caps > 0;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelectProfile(p.id)}
                      className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-orange-300 rounded-2xl transition-all group text-left hover:shadow-lg"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-14 h-14 shrink-0 bg-orange-100 text-orange-700 rounded-2xl flex items-center justify-center font-black text-xl group-hover:bg-orange-700 group-hover:text-white transition-all">
                          {p.name[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-lg font-black text-slate-900 truncate">{p.name}</p>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            {p.currentLevel}
                          </p>
                          <p className="text-xs font-bold text-orange-700 mt-0.5">
                            {packs} / {TOPIC_PACKS.length} packs · {caps} / {CAPSTONES.length}{' '}
                            capstones
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {anyProgress && (
                          <CheckCircle2 size={18} className="text-emerald-500" />
                        )}
                        <ArrowRight
                          size={18}
                          strokeWidth={2.5}
                          className="text-slate-300 group-hover:text-orange-700 group-hover:translate-x-1 transition-all"
                        />
                      </div>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <p className="text-center text-slate-500 text-sm italic py-8">
                    No matches. Clear the search or add a new student.
                  </p>
                )}
              </div>

              <p className="text-xs text-slate-500 italic">
                Switch between students anytime from Settings.
              </p>
            </div>
          )}

          <div
            className={`${
              hasProfiles ? 'md:col-span-2' : 'max-w-2xl mx-auto w-full'
            } bg-gradient-to-br from-orange-500 via-orange-600 to-rose-500 text-white rounded-[2.5rem] p-7 md:p-10 shadow-xl relative overflow-hidden`}
          >
            <div className="absolute -bottom-10 -right-10 w-56 h-56 opacity-20 pointer-events-none">
              <MotifDiya color="#ffffff" accent="rgba(255,255,255,0.6)" />
            </div>
            <div className="relative space-y-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <GraduationCap size={28} strokeWidth={2.25} />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">
                  {hasProfiles ? 'Starting fresh?' : 'Start here'}
                </p>
                <h3 className="text-2xl md:text-3xl font-black leading-tight">
                  {hasProfiles ? 'Add a student' : 'Set up your first student profile'}
                </h3>
                <p className="text-white/90 font-medium leading-relaxed text-sm md:text-base">
                  Takes about 90 seconds. We'll ask for the student's name, current level, and
                  exam date, then match them to one of {STUDY_PLANS.length} study plans.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <MiniChip icon={<User size={12} strokeWidth={2.5} />} label="Name" />
                <MiniChip icon={<Target size={12} strokeWidth={2.5} />} label="6 levels" />
                <MiniChip icon={<Clock size={12} strokeWidth={2.5} />} label="Exam date" />
              </div>

              <button
                onClick={onAddStudent}
                className="w-full inline-flex items-center justify-center gap-3 bg-white text-orange-700 hover:bg-orange-50 font-black px-6 py-4 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                <PlusCircle size={20} strokeWidth={2.5} />
                {hasProfiles ? 'Add student' : 'Begin'}
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 lg:px-12 py-10 text-center">
        <p className="text-xs text-slate-500 font-semibold tracking-wide">
          सङ्कल्प · Sankalp {CURRICULUM.language.name} - a home-built prep kit for the {CURRICULUM.creditMapping.issuer} World Language Credit Exam.
        </p>
      </footer>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────

interface PromiseCardProps {
  icon: React.ReactNode;
  eyebrow: string;
  headline: string;
  body: string;
  tone: 'blue' | 'emerald' | 'orange';
  highlight?: boolean;
}

const toneStyles: Record<
  PromiseCardProps['tone'],
  { iconBg: string; border: string; accent: string }
> = {
  blue: {
    iconBg: 'bg-blue-100 text-blue-700',
    border: 'border-blue-100',
    accent: 'text-blue-600',
  },
  emerald: {
    iconBg: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200',
    accent: 'text-emerald-700',
  },
  orange: {
    iconBg: 'bg-orange-100 text-orange-700',
    border: 'border-orange-100',
    accent: 'text-orange-700',
  },
};

const PromiseCard: React.FC<PromiseCardProps> = ({
  icon,
  eyebrow,
  headline,
  body,
  tone,
  highlight,
}) => {
  const s = toneStyles[tone];
  return (
    <div
      className={`relative bg-white border ${s.border} rounded-[2rem] p-7 md:p-8 shadow-sm transition-transform hover:-translate-y-1 ${
        highlight ? 'ring-2 ring-emerald-200 md:-translate-y-2' : ''
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
          Your target
        </div>
      )}
      <div className={`w-14 h-14 ${s.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <p className={`text-[10px] font-black uppercase tracking-[0.25em] ${s.accent} mb-2`}>
        {eyebrow}
      </p>
      <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-3">
        {headline}
      </h3>
      <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">{body}</p>
    </div>
  );
};

const Stat: React.FC<{ value: number | string; label: string; sub: string }> = ({
  value,
  label,
  sub,
}) => (
  <div className="space-y-1">
    <p className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
      {value}
    </p>
    <p className="text-xs md:text-sm font-black text-white uppercase tracking-widest pt-2">
      {label}
    </p>
    <p className="text-xs text-slate-400 italic">{sub}</p>
  </div>
);

const MiniChip: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20">
    {icon}
    {label}
  </span>
);
