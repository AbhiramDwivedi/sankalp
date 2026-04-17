import React from 'react';
import { Target } from 'lucide-react';
import type { LearningObjective } from '../../content/schema';
import { Section } from '../ui/Section';
import { RubricAxisTags } from './RubricAxisTag';

interface LearningObjectivesProps {
  objectives: LearningObjective[];
}

export const LearningObjectives: React.FC<LearningObjectivesProps> = ({ objectives }) => {
  if (!objectives.length) return null;
  return (
    <Section
      title="Learning Objectives"
      eyebrow="What a student should walk away with"
      accent="indigo"
      icon={<Target size={28} strokeWidth={2.5} />}
    >
      <ol className="space-y-4">
        {objectives.map((o, i) => (
          <li
            key={i}
            className="bg-white border-2 border-slate-100 rounded-2xl p-5 flex items-start gap-5 shadow-sm print:break-inside-avoid"
          >
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black shrink-0">
              {i + 1}
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-slate-900 font-bold leading-relaxed">{o.text}</p>
              <RubricAxisTags axes={o.trains} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
};
