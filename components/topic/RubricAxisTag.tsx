import React from 'react';
import type { RubricAxis } from '../../content/schema';
import { CURRICULUM } from '../../content/curriculum';

interface RubricAxisTagProps {
  axis: RubricAxis;
  size?: 'xs' | 'sm';
}

const axisData: Record<RubricAxis, { label: string; short: string; bg: string; text: string }> = {
  TextType: {
    label: 'Text-Type',
    short: 'TT',
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
  },
  LanguageControl: {
    label: 'Language Control',
    short: 'LC',
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
  },
  TopicCoverage: {
    label: 'Topic Coverage',
    short: 'TC',
    bg: 'bg-amber-100',
    text: 'text-amber-800',
  },
};

export const RubricAxisTag: React.FC<RubricAxisTagProps> = ({
  axis,
  size = 'xs',
}) => {
  const d = axisData[axis];
  const textSize = size === 'xs' ? 'text-[9px] px-1.5 py-0.5' : 'text-xs px-2 py-1';
  return (
    <span
      className={`inline-flex items-center gap-1 font-black uppercase tracking-widest rounded ${d.bg} ${d.text} ${textSize}`}
      title={`This trains the ${d.label} axis of the ${CURRICULUM.examSystem.shortName} rubric`}
    >
      <span>{d.short}</span>
      <span className="opacity-70 hidden sm:inline">{d.label}</span>
    </span>
  );
};

export const RubricAxisTags: React.FC<{ axes: RubricAxis[]; size?: 'xs' | 'sm' }> = ({
  axes,
  size,
}) => (
  <div className="flex flex-wrap gap-1.5">
    {axes.map((a) => (
      <RubricAxisTag key={a} axis={a} size={size} />
    ))}
  </div>
);
