import React from 'react';
import { Link2 } from 'lucide-react';
import type { ConnectorEntry, TeacherNote } from '../../content/schema';
import { Section } from '../ui/Section';
import { DevanagariText } from '../ui/DevanagariText';
import { TeacherNoteBox } from './TeacherNoteBox';

interface ConnectorBankProps {
  connectors: ConnectorEntry[];
  note: TeacherNote;
}

export const ConnectorBank: React.FC<ConnectorBankProps> = ({ connectors, note }) => {
  if (!connectors.length) {
    return (
      <Section
        title="Connector & Sentence-Frame Bank"
        eyebrow="Coming soon"
        accent="indigo"
        icon={<Link2 size={28} strokeWidth={2.5} />}
      >
        <TeacherNoteBox note={note} />
        <p className="text-sm italic text-slate-500 text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
          Connectors for this pack are being authored.
        </p>
      </Section>
    );
  }
  return (
    <Section
      title="Connector & Sentence-Frame Bank"
      eyebrow="The Intermediate-Low → Intermediate-Mid accelerator"
      accent="indigo"
      icon={<Link2 size={28} strokeWidth={2.5} />}
    >
      <TeacherNoteBox note={note} />
      <div className="grid md:grid-cols-2 gap-4">
        {connectors.map((c, i) => (
          <div
            key={i}
            className="bg-indigo-50/50 border-2 border-indigo-100 rounded-2xl p-5 print:break-inside-avoid"
          >
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <DevanagariText as="span" size="md" weight="black" className="text-indigo-900">
                {c.hindi}
              </DevanagariText>
              <span className="text-[10px] italic text-indigo-500 font-bold">{c.transliteration}</span>
            </div>
            <p className="text-sm font-black text-indigo-700 mb-3">{c.english}</p>
            <div className="bg-white rounded-xl p-3 border border-indigo-100 space-y-1.5">
              <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Frame</p>
              <DevanagariText as="p" size="sm" weight="medium" className="text-slate-700">
                {c.frame}
              </DevanagariText>
            </div>
            <div className="mt-3 space-y-1">
              <DevanagariText as="p" size="sm" weight="bold" className="text-slate-900">
                {c.sampleHindi}
              </DevanagariText>
              <p className="text-xs italic text-slate-500">{c.sampleEnglish}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
