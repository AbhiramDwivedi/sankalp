import React from 'react';
import { Globe2 } from 'lucide-react';
import type { CulturalInsight as CulturalInsightT, TeacherNote } from '../../content/schema';
import { Section } from '../ui/Section';
import { TeacherNoteBox } from './TeacherNoteBox';

interface CulturalInsightsProps {
  insights: CulturalInsightT[];
  note: TeacherNote;
}

export const CulturalInsights: React.FC<CulturalInsightsProps> = ({ insights, note }) => {
  if (!insights.length) {
    return (
      <Section
        title="Cultural Insight"
        eyebrow="Coming soon"
        accent="orange"
        icon={<Globe2 size={28} strokeWidth={2.5} />}
      >
        <TeacherNoteBox note={note} />
        <p className="text-sm italic text-slate-500 text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
          Cultural notes for this pack are being authored.
        </p>
      </Section>
    );
  }
  return (
    <Section
      title="Cultural Insight"
      eyebrow="Authentic details that raise Text-Type"
      accent="orange"
      icon={<Globe2 size={28} strokeWidth={2.5} />}
    >
      <TeacherNoteBox note={note} />
      <div className="grid md:grid-cols-2 gap-4">
        {insights.map((c, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-amber-50 to-orange-50/50 border-2 border-amber-100 rounded-2xl p-6 print:break-inside-avoid"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl shrink-0" aria-hidden>{c.emoji}</div>
              <div className="flex-1">
                <h4 className="font-black text-amber-900 mb-1">{c.title}</h4>
                <p className="text-sm text-amber-900/80 font-medium leading-relaxed">{c.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
