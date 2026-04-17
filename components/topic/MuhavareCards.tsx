import React from 'react';
import { Quote } from 'lucide-react';
import type { Muhavara, TeacherNote } from '../../content/schema';
import { Section } from '../ui/Section';
import { DevanagariText } from '../ui/DevanagariText';
import { TeacherNoteBox } from './TeacherNoteBox';

interface MuhavareCardsProps {
  muhavare: Muhavara[];
  note: TeacherNote;
}

export const MuhavareCards: React.FC<MuhavareCardsProps> = ({ muhavare, note }) => {
  if (!muhavare.length) {
    return (
      <Section
        title="मुहावरे · Idioms"
        eyebrow="Coming soon"
        accent="indigo"
        icon={<Quote size={28} strokeWidth={2.5} />}
      >
        <TeacherNoteBox note={note} />
        <p className="text-sm italic text-slate-500 text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
          Idioms for this pack are being authored.
        </p>
      </Section>
    );
  }
  return (
    <Section
      title="मुहावरे · Idioms"
      eyebrow="Two curated muhavare — one well-placed idiom signals Intermediate-Mid"
      accent="indigo"
      icon={<Quote size={28} strokeWidth={2.5} />}
    >
      <TeacherNoteBox note={note} />
      <div className="grid md:grid-cols-2 gap-6">
        {muhavare.map((m, i) => (
          <div
            key={i}
            className="bg-indigo-50/50 border-2 border-indigo-100 rounded-[2rem] p-8 print:break-inside-avoid space-y-4"
          >
            <DevanagariText as="p" size="xl" weight="black" display className="text-indigo-900">
              {m.phrase}
            </DevanagariText>
            <div className="bg-white rounded-xl p-4 border border-indigo-100 space-y-2">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Literal</p>
                <p className="text-sm text-slate-600 italic">{m.literal}</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Meaning</p>
                <p className="text-sm text-slate-800 font-bold">{m.meaning}</p>
              </div>
            </div>
            <div className="border-t border-indigo-200/60 pt-3">
              <p className="text-[9px] font-black uppercase tracking-widest text-indigo-500 mb-1">Usage</p>
              <DevanagariText as="p" size="sm" weight="bold" className="text-slate-800">
                {m.example}
              </DevanagariText>
              <p className="text-xs italic text-slate-500 mt-1">{m.exampleEnglish}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
