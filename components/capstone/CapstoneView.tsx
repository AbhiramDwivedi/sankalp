import React from 'react';
import {
  ArrowLeft,
  Printer,
  Flag,
  CheckCircle2,
  BookOpen,
  Target,
  Clock,
  ScrollText,
  Star,
} from 'lucide-react';
import type { Capstone } from '../../content/schema';
import { tokensFor } from '../ui/themeTokens';
import { Badge } from '../ui/Badge';
import { Section } from '../ui/Section';
import { DevanagariText } from '../ui/DevanagariText';
import { PaisleyDivider } from '../ui/PaisleyDivider';
import { Callout } from '../ui/Callout';
import { CapstoneHeroArt } from '../art/CapstoneHeroArt';
import { DrawsFromPanel } from './DrawsFromPanel';
import { VersionComparison } from './VersionComparison';
import { VerdictCard } from '../topic/VerdictCard';
import { TeacherNoteBox } from '../topic/TeacherNoteBox';
import { RubricAxisTags } from '../topic/RubricAxisTag';
import { ParagraphScaffoldDiagram } from '../art/diagrams';

interface CapstoneViewProps {
  capstone: Capstone;
  isCompleted?: boolean;
  onBack: () => void;
  onMarkComplete: () => void;
  onOpenPack: (packId: string) => void;
}

export const CapstoneView: React.FC<CapstoneViewProps> = ({
  capstone,
  isCompleted,
  onBack,
  onMarkComplete,
  onOpenPack,
}) => {
  const tokens = tokensFor(capstone.themeGroup);
  const imVersion = capstone.versions.find((v) => v.label === 'intermediateMid') || capstone.versions[1];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Top nav */}
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
                : 'bg-orange-600 text-white hover:bg-orange-700'
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

      {/* Why this capstone */}
      <Section
        eyebrow="Why this capstone"
        title="What it rehearses"
        icon={<Star size={22} />}
        accent="orange"
      >
        <Callout kind="goal">
          <p className="text-slate-800 font-medium leading-relaxed">{capstone.whyThisCapstone}</p>
        </Callout>
      </Section>

      {/* Draws from */}
      <DrawsFromPanel draws={capstone.draws} onOpenPack={onOpenPack} />

      {/* Prompt */}
      <Section
        eyebrow="The prompt"
        title="What you will write"
        icon={<Flag size={22} />}
        accent="orange"
      >
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-[2rem] p-8 md:p-10 space-y-4">
          <DevanagariText size="lg" weight="black" className="text-slate-900 leading-relaxed">
            {capstone.promptHindi}
          </DevanagariText>
          <p className="text-base text-slate-600 italic leading-relaxed">
            {capstone.promptEnglish}
          </p>
          {capstone.isMockExam && (
            <div className="flex items-center gap-3 pt-4 border-t border-orange-200/60">
              <Clock size={18} className="text-orange-700" />
              <p className="text-sm font-bold text-slate-700">
                Mock Exam sitting — set a {capstone.mockExamMinutes}-minute timer. No notes. No dictionary.
              </p>
            </div>
          )}
        </div>
      </Section>

      <PaisleyDivider color={tokens.primaryHex} />

      {/* Paragraph scaffold — shown before the essays so the student sees the shape */}
      <Section
        eyebrow="Before you read"
        title="The 3-paragraph shape every capstone uses"
        icon={<BookOpen size={22} />}
        accent="indigo"
      >
        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
          <ParagraphScaffoldDiagram />
        </div>
      </Section>

      {/* The essays */}
      <Section
        eyebrow="Model essays"
        title="Three versions — same story, different ceilings"
        icon={<ScrollText size={22} />}
        accent="orange"
      >
        <VersionComparison versions={capstone.versions} />
      </Section>

      {/* Annotations */}
      <Section
        eyebrow="Annotations"
        title="What the rater sees in the IM version"
        icon={<Target size={22} />}
        accent="orange"
      >
        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 space-y-4 shadow-sm">
          {[0, 1, 2].map((pIdx) => {
            const paras = imVersion.hindi.split('\n\n');
            const para = paras[pIdx] || '';
            const notes = capstone.annotations.filter((a) => a.paragraphIndex === pIdx);
            if (!notes.length && !para) return null;
            return (
              <div key={pIdx} className="border-b border-slate-100 last:border-b-0 pb-4 last:pb-0">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  Paragraph {pIdx + 1}
                </p>
                {para && (
                  <DevanagariText size="sm" weight="medium" className="text-slate-800 mb-3 leading-[2]">
                    {para}
                  </DevanagariText>
                )}
                <ul className="space-y-2">
                  {notes.map((n, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Badge tone={n.kind === 'connector' ? 'indigo' : n.kind === 'idiom' ? 'rose' : n.kind === 'vocab' ? 'amber' : n.kind === 'cultural' ? 'green' : n.kind === 'tense-shift' ? 'orange' : 'slate'} size="xs">
                        {n.kind}
                      </Badge>
                      <div>
                        <DevanagariText size="sm" weight="bold" as="span" className="text-slate-900">
                          {n.highlight}
                        </DevanagariText>
                        <span className="text-slate-600 italic ml-2">— {n.note}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Verdict */}
      <VerdictCard verdict={capstone.verdict} />

      {/* Reader questions */}
      <Section
        eyebrow="Reader questions"
        title="Answer these to check your comprehension"
        icon={<BookOpen size={22} />}
        accent="indigo"
      >
        <div className="space-y-3">
          {capstone.readerQuestions.map((qa, i) => (
            <details
              key={i}
              className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-indigo-200 transition"
            >
              <summary className="cursor-pointer font-black text-slate-900 list-none flex items-start justify-between gap-3">
                <DevanagariText size="sm" weight="bold" as="span" className="flex-1">
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
      </Section>

      {/* Teacher note */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <RubricAxisTags axes={capstone.teacherNote.trains} />
        </div>
        <TeacherNoteBox note={capstone.teacherNote} />
      </div>
    </div>
  );
};
