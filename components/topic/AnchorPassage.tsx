import React from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';
import type { Passage, TeacherNote } from '../../content/schema';
import { Section } from '../ui/Section';
import { DevanagariText } from '../ui/DevanagariText';
import { TeacherNoteBox } from './TeacherNoteBox';

interface AnchorPassageProps {
  passage: Passage;
  note: TeacherNote;
}

export const AnchorPassage: React.FC<AnchorPassageProps> = ({ passage, note }) => (
  <Section
    title="Reading Sample"
    eyebrow={passage.title}
    accent="orange"
    icon={<BookOpen size={28} strokeWidth={2.5} />}
    pageBreakBefore
  >
    <TeacherNoteBox note={note} />

    <div className="bg-gradient-to-br from-orange-50/50 to-amber-50/50 border-2 border-orange-100 rounded-[2.5rem] p-10 md:p-14 relative print:break-inside-avoid">
      <div className="absolute top-6 left-6 text-orange-200 font-black text-7xl opacity-40" aria-hidden>
        “
      </div>

      <DevanagariText
        as="p"
        size="xl"
        weight="bold"
        display
        className="text-slate-900 leading-[2.1] relative z-10 mb-10"
      >
        {passage.hindi}
      </DevanagariText>

      <div className="border-t-2 border-dashed border-orange-200 pt-8 space-y-4">
        <p className="text-sm italic text-slate-500 font-medium leading-relaxed">
          {passage.transliteration}
        </p>
        <p className="text-base text-slate-800 font-bold leading-relaxed">
          {passage.english}
        </p>
      </div>
    </div>

    {passage.highlights.length > 0 && (
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
          What to notice
        </p>
        <ul className="space-y-2">
          {passage.highlights.map((h, i) => (
            <li key={i} className="text-sm flex items-start gap-3">
              <span className="font-hindi font-black text-orange-700 shrink-0">{h.term}</span>
              <span className="text-slate-500">—</span>
              <span className="text-slate-700 font-medium">{h.note}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {passage.comprehensionQuestions.length > 0 && (
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 print:break-before-page">
        <div className="flex items-center gap-2 mb-4 text-slate-700">
          <HelpCircle size={20} strokeWidth={2.5} />
          <h3 className="text-sm font-black uppercase tracking-widest">Comprehension Check</h3>
        </div>
        <ol className="space-y-4 list-decimal list-inside">
          {passage.comprehensionQuestions.map((qa, i) => (
            <li key={i} className="text-slate-800 font-bold leading-relaxed">
              {qa.q}
              <div className="mt-1 ml-6 text-sm font-medium text-emerald-700 italic">
                Answer: {qa.a}
              </div>
            </li>
          ))}
        </ol>
      </div>
    )}
  </Section>
);
