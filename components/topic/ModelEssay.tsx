import React from 'react';
import { PenTool, TrendingUp } from 'lucide-react';
import type { ModelEssay as ModelEssayT, TeacherNote } from '../../content/schema';
import { Section } from '../ui/Section';
import { DevanagariText } from '../ui/DevanagariText';
import { TeacherNoteBox } from './TeacherNoteBox';
import { VerdictCard } from './VerdictCard';
import { Badge } from '../ui/Badge';

interface ModelEssaysProps {
  essays: ModelEssayT[];
  note: TeacherNote;
}

const annotationDotColor: Record<string, string> = {
  connector: 'bg-indigo-500',
  'tense-shift': 'bg-emerald-500',
  idiom: 'bg-violet-500',
  vocab: 'bg-orange-500',
  cultural: 'bg-amber-500',
  structure: 'bg-slate-500',
};

export const ModelEssays: React.FC<ModelEssaysProps> = ({ essays, note }) => {
  if (!essays.length) {
    return (
      <Section
        title="Model Essays"
        eyebrow="Coming soon — the highest-leverage asset in the app"
        accent="orange"
        icon={<PenTool size={28} strokeWidth={2.5} />}
        pageBreakBefore
      >
        <TeacherNoteBox note={note} />
        <p className="text-sm italic text-slate-500 text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
          Model essays for this pack are being authored.
        </p>
      </Section>
    );
  }
  return (
    <Section
      title="Model Essays"
      eyebrow={`${essays.length} fully annotated essays at Intermediate-Mid`}
      accent="orange"
      icon={<PenTool size={28} strokeWidth={2.5} />}
      pageBreakBefore
    >
      <TeacherNoteBox note={note} />
      <div className="space-y-16">
        {essays.map((essay, i) => {
          const paragraphs = essay.intermediateMid.split(/\n+/).filter(Boolean);
          const paragraphAnnotations = (pi: number) =>
            essay.annotations.filter((a) => a.paragraphIndex === pi);

          return (
            <article
              key={i}
              className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl print:shadow-none print:break-inside-avoid-page"
            >
              <header className="bg-gradient-to-br from-orange-600 to-amber-600 text-white p-8 md:p-10">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <Badge tone="amber" size="xs" className="bg-white/20 text-white border-white/30">
                    Essay {i + 1}
                  </Badge>
                  <Badge tone="amber" size="xs" className="bg-white/20 text-white border-white/30">
                    {essay.wordCount} words
                  </Badge>
                  {essay.tenseUsed.map((t) => (
                    <Badge key={t} tone="amber" size="xs" className="bg-white/20 text-white border-white/30">
                      {t} tense
                    </Badge>
                  ))}
                </div>
                <p className="text-sm font-medium opacity-90 mb-1">Prompt:</p>
                <p className="text-lg md:text-xl font-bold leading-snug">{essay.prompt}</p>
              </header>

              {/* Novice version — shows the contrast */}
              <div className="p-8 md:p-10 border-b-4 border-dashed border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-600">
                    Before — Novice version
                  </span>
                  <TrendingUp size={14} className="text-slate-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600">
                    After — Intermediate-Mid version
                  </span>
                </div>
                <DevanagariText as="p" size="sm" weight="medium" className="text-slate-500 italic leading-relaxed line-through decoration-rose-200 decoration-2">
                  {essay.novice}
                </DevanagariText>
              </div>

              {/* Annotated IM essay */}
              <div className="p-8 md:p-12 bg-slate-50/50">
                <div className="space-y-8">
                  {paragraphs.map((p, pi) => {
                    const anns = paragraphAnnotations(pi);
                    return (
                      <div
                        key={pi}
                        className="grid md:grid-cols-[1fr_260px] gap-6 print:break-inside-avoid"
                      >
                        <DevanagariText as="p" size="md" weight="bold" className="text-slate-900 leading-[2.1]">
                          {p}
                        </DevanagariText>
                        {anns.length > 0 && (
                          <aside className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 self-start">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                              Paragraph {pi + 1} — rater notes
                            </p>
                            {anns.map((a, ai) => (
                              <div key={ai} className="flex items-start gap-2.5">
                                <span className={`w-2.5 h-2.5 rounded-full ${annotationDotColor[a.kind]} mt-1 shrink-0`} />
                                <div className="flex-1">
                                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                                    {a.kind.replace('-', ' ')}: <span className="text-slate-700">{a.highlight}</span>
                                  </p>
                                  <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                                    {a.note}
                                  </p>
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

              <div className="p-8 md:p-10 bg-white">
                <VerdictCard verdict={essay.verdict} />
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
};
