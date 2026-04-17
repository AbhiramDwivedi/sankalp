import React from 'react';
import { PenLine, Lightbulb } from 'lucide-react';
import type { TeacherNote, WritingPrompt } from '../../content/schema';
import { Section } from '../ui/Section';
import { DevanagariText } from '../ui/DevanagariText';
import { TeacherNoteBox } from './TeacherNoteBox';

interface WritingPromptsProps {
  prompts: WritingPrompt[];
  note: TeacherNote;
  onOpenAi?: (promptIndex: number) => void;
  aiEnabled?: boolean;
}

export const WritingPrompts: React.FC<WritingPromptsProps> = ({
  prompts,
  note,
  onOpenAi,
  aiEnabled,
}) => {
  if (!prompts.length) {
    return (
      <Section
        title="Practice Writing Prompts"
        eyebrow="Coming soon — match FCPS exam format exactly"
        accent="emerald"
        icon={<PenLine size={28} strokeWidth={2.5} />}
      >
        <TeacherNoteBox note={note} />
        <p className="text-sm italic text-slate-500 text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
          Practice prompts for this pack are being authored.
        </p>
      </Section>
    );
  }
  return (
    <Section
      title="Practice Writing Prompts"
      eyebrow={`${prompts.length} FCPS-format prompts — three cohesive paragraphs, personal experience`}
      accent="emerald"
      icon={<PenLine size={28} strokeWidth={2.5} />}
      pageBreakBefore
    >
      <TeacherNoteBox note={note} />
      <div className="space-y-5">
        {prompts.map((p, i) => (
          <div
            key={i}
            className="bg-emerald-50/50 border-2 border-emerald-100 rounded-[2rem] p-8 print:break-inside-avoid"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">
                  Prompt
                </p>
                <DevanagariText as="p" size="md" weight="black" className="text-slate-900 mb-2">
                  {p.hindi}
                </DevanagariText>
                <p className="text-sm text-slate-600 italic">{p.english}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-emerald-100 p-4 mt-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-3 flex items-center gap-2">
                <Lightbulb size={12} /> Hint strip — aim to include
              </p>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Connectors</p>
                  <p className="font-hindi text-slate-800 font-bold leading-snug">
                    {p.hint.connectors.join(' · ')}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Vocab</p>
                  <p className="font-hindi text-slate-800 font-bold leading-snug">
                    {p.hint.vocab.join(' · ')}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Tenses</p>
                  <p className="text-slate-800 font-bold">{p.hint.tenses.join(' + ')}</p>
                </div>
              </div>
            </div>

            {/* Lined writing area for printout */}
            <div className="mt-6 space-y-3 print:block hidden">
              {Array.from({ length: 12 }).map((_, li) => (
                <div key={li} className="h-8 border-b border-slate-200" />
              ))}
            </div>

            {aiEnabled && onOpenAi && (
              <div className="mt-6 flex justify-end no-print">
                <button
                  onClick={() => onOpenAi(i)}
                  className="text-xs font-black uppercase tracking-widest text-emerald-700 hover:text-emerald-900 underline decoration-dotted underline-offset-4"
                >
                  Grade with AI (optional) →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};
