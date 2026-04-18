import React from 'react';
import { GraduationCap, Award, ArrowRight, BookOpen, Users, Target, ClipboardList, Sparkles } from 'lucide-react';
import {
  STAMP_BENCHMARKS,
  RUBRIC_AXES,
  FCPS_CREDIT_SUMMARY,
  EXAM_FACTS,
  TARGET_BENCHMARK,
} from '../../content/curricula/fcps-stamp-hindi/rubric';
import { CURRICULUM } from '../../content/curriculum';
import { Callout } from '../ui/Callout';
import { PaisleyDivider } from '../ui/PaisleyDivider';
import { Badge } from '../ui/Badge';

interface HowThisWorksViewProps {
  onContinue: () => void;
}

export const HowThisWorksView: React.FC<HowThisWorksViewProps> = ({ onContinue }) => (
  <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in duration-500">
    <header className="text-center space-y-4">
      <div className="w-20 h-20 bg-orange-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-orange-100">
        <GraduationCap size={42} strokeWidth={2.5} />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
        A five-minute read before you start
      </p>
      <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
        How this works
      </h1>
      <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
        Sankalp prepares a student to earn {CURRICULUM.creditMapping.credits} World Language credits on the {CURRICULUM.creditMapping.issuer} {CURRICULUM.language.name} exam.
        This page explains the exam, the rubric, and what to read first.
      </p>
    </header>

    <PaisleyDivider />

    {/* 1. The exam */}
    <section className="space-y-6">
      <header className="flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center">
          <ClipboardList size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-700">Step 1</p>
          <h2 className="text-2xl font-black text-slate-900">What is the {CURRICULUM.creditMapping.issuer} exam, really?</h2>
        </div>
      </header>

      <div className="bg-white border-2 border-slate-100 rounded-[1.75rem] p-8 space-y-4">
        <p className="text-slate-800 leading-relaxed">
          The exam is called{' '}
          <strong>{EXAM_FACTS.examName}</strong>. Fairfax County uses{' '}
          <strong>{EXAM_FACTS.testVendor}</strong>, which has only two sections:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {EXAM_FACTS.sections.map((s) => (
            <div key={s.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
                {s.name} · {s.prompts} prompts · ~{s.timeMinutes} min
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{s.details}</p>
            </div>
          ))}
        </div>
        <Callout kind="info" title="There is no reading or listening section">
          Unlike the full {CURRICULUM.examSystem.shortName} 4S test, {CURRICULUM.creditMapping.issuer} only grades Writing and Speaking. That means
          this app focuses entirely on producing output - the reading material here exists
          to teach the student to write and speak well.
        </Callout>
      </div>
    </section>

    {/* 2. Credits */}
    <section className="space-y-6">
      <header className="flex items-center gap-4">
        <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center">
          <Award size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">Step 2</p>
          <h2 className="text-2xl font-black text-slate-900">Credits map to proficiency levels</h2>
        </div>
      </header>
      <div className="grid md:grid-cols-2 gap-4">
        {FCPS_CREDIT_SUMMARY.map((c) => (
          <div
            key={c.level}
            className={`rounded-2xl p-5 border-2 ${
              c.credits === 3
                ? 'bg-emerald-50 border-emerald-300 shadow-lg'
                : 'bg-white border-slate-100'
            }`}
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-black text-slate-900">{c.credits}</span>
              <span className="text-sm font-black text-slate-500">credit{c.credits === 1 ? '' : 's'}</span>
            </div>
            <p className="text-sm font-black text-slate-900">{c.label}</p>
            <p className="text-xs text-slate-600 italic mt-1 leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 3. Rubric axes */}
    <section className="space-y-6">
      <header className="flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
          <Target size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Step 3</p>
          <h2 className="text-2xl font-black text-slate-900">The two rubric axes {CURRICULUM.examSystem.providerShortName} raters score on</h2>
        </div>
      </header>
      <div className="space-y-4">
        {RUBRIC_AXES.map((ax) => (
          <div key={ax.id} className="bg-white border-2 border-slate-100 rounded-2xl p-6">
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <h3 className="text-xl font-black text-slate-900">{ax.name}</h3>
              <Badge tone="slate" size="xs">{ax.id}</Badge>
            </div>
            <p className="text-sm text-slate-600 italic mb-4">{ax.oneLiner}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  What raters look for
                </p>
                <ul className="space-y-1 text-slate-700">
                  {ax.whatRatersLookFor.map((x, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-500">▸</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  How this app trains it
                </p>
                <ul className="space-y-1 text-slate-700">
                  {ax.howToTrain.map((x, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 4. Benchmarks */}
    <section className="space-y-6">
      <header className="flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-2xl flex items-center justify-center">
          <Sparkles size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-orange-700">Step 4</p>
          <h2 className="text-2xl font-black text-slate-900">{CURRICULUM.examSystem.shortName} benchmarks 1–8 at a glance</h2>
        </div>
      </header>
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 text-[10px] font-black uppercase tracking-widest text-slate-500">#</th>
              <th className="text-left p-3 text-[10px] font-black uppercase tracking-widest text-slate-500">ACTFL</th>
              <th className="text-left p-3 text-[10px] font-black uppercase tracking-widest text-slate-500">What it looks like</th>
              <th className="text-left p-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Credits</th>
            </tr>
          </thead>
          <tbody>
            {STAMP_BENCHMARKS.map((b) => {
              const isTarget = b.benchmark === TARGET_BENCHMARK;
              return (
                <tr
                  key={b.benchmark}
                  className={`border-t border-slate-100 ${isTarget ? 'bg-emerald-50' : ''}`}
                >
                  <td className="p-3 font-black text-slate-900">{b.benchmark}</td>
                  <td className="p-3 font-semibold text-slate-700">{b.actflLabel}</td>
                  <td className="p-3 text-slate-600 italic">{b.inOneLine}</td>
                  <td className="p-3 font-black text-slate-900">
                    {b.creditCount === 0 ? '-' : b.creditCount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Callout kind="success" title={`The target is ${CURRICULUM.displayStrings.targetPhrase} on both Writing and Speaking`}>
        Benchmark {CURRICULUM.creditMapping.benchmark} = Intermediate-Mid = {CURRICULUM.creditMapping.credits} credits. Higher benchmarks do not earn more credits
        on the {CURRICULUM.creditMapping.issuer} exam, but they give you headroom if one section slips.
      </Callout>
    </section>

    {/* 5. How to use the library */}
    <section className="space-y-6">
      <header className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
          <BookOpen size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Step 5</p>
          <h2 className="text-2xl font-black text-slate-900">How to work through the library</h2>
        </div>
      </header>
      <ol className="bg-white border-2 border-slate-100 rounded-2xl p-6 md:p-8 space-y-4 list-decimal list-inside text-slate-800">
        <li className="leading-relaxed">
          <strong>Read a pack cover-to-cover.</strong> Vocabulary → grammar → connectors →
          passages → cultural notes. Each section explains why it exists.
        </li>
        <li className="leading-relaxed">
          <strong>Study the two model essays.</strong> Notice the connectors, tense shifts, and
          idiom placement. Read the verdict card at the end.
        </li>
        <li className="leading-relaxed">
          <strong>Attempt a writing prompt.</strong> Follow the {CURRICULUM.creditMapping.issuer} format: two essays, at least
          three cohesive paragraphs each. Write by hand or type.
        </li>
        <li className="leading-relaxed">
          <strong>Self-check.</strong> Use the tear-off rubric at the end of every pack. Four or
          more "Pass" marks → you're on track for Intermediate-Mid.
        </li>
        <li className="leading-relaxed">
          <strong>Optional AI grading.</strong> Enable it in Settings if you want a second
          opinion. The teacher can also grade by hand - both work.
        </li>
      </ol>
    </section>

    <Callout kind="tip" title={`You don't need to learn all of ${CURRICULUM.language.name}`}>
      The goal is {CURRICULUM.creditMapping.credits} credits, not native fluency. Every word, every rule, every essay in this
      library has been chosen because it's likely to appear on a prompt or push a rubric score
      up. If something feels off-topic, it was cut on purpose.
    </Callout>

    <div className="text-center pt-6">
      <button
        onClick={onContinue}
        className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-orange-100 transition-all"
      >
        Open the Library <ArrowRight size={22} />
      </button>
    </div>
  </div>
);
