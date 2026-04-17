import React from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';
import type { GrammarNote, TeacherNote } from '../../content/schema';
import { Section } from '../ui/Section';
import { DevanagariText } from '../ui/DevanagariText';
import { TeacherNoteBox } from './TeacherNoteBox';

interface GrammarCornerstonesProps {
  grammar: GrammarNote[];
  note: TeacherNote;
}

export const GrammarCornerstones: React.FC<GrammarCornerstonesProps> = ({ grammar, note }) => {
  if (!grammar.length) {
    return (
      <Section
        title="Grammar Cornerstones"
        eyebrow="Coming soon"
        accent="emerald"
        icon={<Sparkles size={28} strokeWidth={2.5} />}
      >
        <TeacherNoteBox note={note} />
        <p className="text-sm italic text-slate-500 text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
          Grammar notes for this pack are being authored.
        </p>
      </Section>
    );
  }
  return (
    <Section
      title="Grammar Cornerstones"
      eyebrow={`${grammar.length} focused rules — only what the rubric rewards`}
      accent="emerald"
      icon={<Sparkles size={28} strokeWidth={2.5} />}
    >
      <TeacherNoteBox note={note} />
      <div className="space-y-6">
        {grammar.map((g, i) => (
          <div
            key={i}
            className="bg-white border-2 border-emerald-100 rounded-[1.75rem] p-7 shadow-sm print:break-inside-avoid"
          >
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{g.title}</h3>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed mt-2">{g.rule}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 bg-emerald-50/60 rounded-xl p-4 border border-emerald-100">
              {g.examples.map((ex, j) => (
                <div key={j} className="grid md:grid-cols-[1fr_1fr] gap-2 items-baseline">
                  <DevanagariText as="span" size="sm" weight="bold" className="text-slate-900">
                    {ex.hindi}
                  </DevanagariText>
                  <div>
                    <span className="text-xs italic text-slate-400 mr-2">{ex.transliteration}</span>
                    <span className="text-sm text-slate-700">{ex.english}</span>
                  </div>
                </div>
              ))}
            </div>

            {g.pitfall && (
              <div className="mt-4 flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-xl p-3">
                <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                <p className="text-xs font-medium text-rose-800 leading-relaxed">
                  <span className="font-black uppercase tracking-wider mr-1">Pitfall:</span>
                  {g.pitfall}
                </p>
              </div>
            )}

            <div className="mt-4 border-l-4 border-indigo-300 pl-4 py-2 bg-indigo-50/50 rounded-r-xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">
                Why the rubric cares
              </p>
              <p className="text-xs text-indigo-900 leading-relaxed">{g.whyItMatters}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
