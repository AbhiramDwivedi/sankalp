import React from 'react';
import { FileText, Mail, CalendarDays, Receipt, ClipboardList, Megaphone, PenLine, ScrollText, Smartphone, MapPin } from 'lucide-react';
import type { ModelText as ModelTextT, ModelTextKind, TeacherNote } from '../../content/schema';
import { Section } from '../ui/Section';
import { DevanagariText } from '../ui/DevanagariText';
import { TeacherNoteBox } from './TeacherNoteBox';

const kindMeta: Record<ModelTextKind, { label: string; icon: React.ReactNode; tone: string }> = {
  email: { label: 'Email', icon: <Mail size={18} />, tone: 'bg-blue-50 border-blue-200' },
  diary: { label: 'Diary Entry', icon: <PenLine size={18} />, tone: 'bg-amber-50 border-amber-200' },
  announcement: { label: 'Announcement', icon: <Megaphone size={18} />, tone: 'bg-rose-50 border-rose-200' },
  menu: { label: 'Menu', icon: <ClipboardList size={18} />, tone: 'bg-orange-50 border-orange-200' },
  schedule: { label: 'Schedule', icon: <CalendarDays size={18} />, tone: 'bg-emerald-50 border-emerald-200' },
  letter: { label: 'Letter', icon: <ScrollText size={18} />, tone: 'bg-violet-50 border-violet-200' },
  review: { label: 'Review', icon: <Receipt size={18} />, tone: 'bg-teal-50 border-teal-200' },
  sign: { label: 'Sign / Notice', icon: <MapPin size={18} />, tone: 'bg-slate-100 border-slate-300' },
  sms: { label: 'Text Message', icon: <Smartphone size={18} />, tone: 'bg-cyan-50 border-cyan-200' },
  poster: { label: 'Poster', icon: <FileText size={18} />, tone: 'bg-fuchsia-50 border-fuchsia-200' },
};

interface ModelTextsProps {
  texts: ModelTextT[];
  note: TeacherNote;
}

export const ModelTexts: React.FC<ModelTextsProps> = ({ texts, note }) => {
  if (!texts.length) {
    return (
      <Section
        title="Model Texts"
        eyebrow="Coming soon"
        accent="slate"
        icon={<FileText size={28} strokeWidth={2.5} />}
      >
        <TeacherNoteBox note={note} />
        <p className="text-sm italic text-slate-500 text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
          Model texts for this pack are being authored.
        </p>
      </Section>
    );
  }
  return (
    <Section
      title="Model Texts"
      eyebrow={`${texts.length} short readings across real-world registers`}
      accent="slate"
      icon={<FileText size={28} strokeWidth={2.5} />}
    >
      <TeacherNoteBox note={note} />
      <div className="space-y-5">
        {texts.map((t, i) => {
          const m = kindMeta[t.kind];
          return (
            <div
              key={i}
              className={`${m.tone} border-2 rounded-[1.75rem] p-7 shadow-sm print:break-inside-avoid`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  {m.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {m.label}
                  </p>
                  <h4 className="font-black text-slate-900">{t.title}</h4>
                </div>
              </div>
              <DevanagariText as="p" size="md" weight="medium" className="text-slate-800 leading-[2] mb-4">
                {t.hindi}
              </DevanagariText>
              <div className="pt-4 border-t border-slate-300/40 space-y-1">
                <p className="text-xs italic text-slate-500">{t.transliteration}</p>
                <p className="text-sm text-slate-700 font-semibold">{t.english}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
