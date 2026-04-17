import React, { useState } from 'react';
import type { EssayVersion } from '../../content/schema';
import { DevanagariText } from '../ui/DevanagariText';
import { Badge } from '../ui/Badge';

interface VersionComparisonProps {
  versions: EssayVersion[];
}

const tierPill: Record<EssayVersion['label'], { tone: 'slate' | 'orange' | 'green' | 'indigo'; title: string; subtitle: string }> = {
  novice: { tone: 'slate', title: 'Novice draft', subtitle: 'What a new learner might write' },
  intermediateMid: { tone: 'orange', title: 'Intermediate-Mid', subtitle: 'Benchmark 5 · the 3-credit target' },
  push: { tone: 'indigo', title: 'Push version', subtitle: 'Reaching toward Benchmark 6' },
};

export const VersionComparison: React.FC<VersionComparisonProps> = ({ versions }) => {
  const [active, setActive] = useState<EssayVersion['label']>('intermediateMid');
  const shown = versions.find((v) => v.label === active) || versions[1];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 no-print">
        {versions.map((v) => {
          const meta = tierPill[v.label];
          return (
            <button
              key={v.label}
              onClick={() => setActive(v.label)}
              className={`px-5 py-3 rounded-2xl border-2 transition-all text-left ${
                active === v.label
                  ? 'bg-orange-50 border-orange-400 shadow-lg'
                  : 'bg-white border-slate-100 hover:border-slate-300'
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                {meta.title}
              </p>
              <p className="text-xs font-bold text-slate-700 mt-0.5 italic">{meta.subtitle}</p>
              <p className="text-[10px] font-black text-slate-400 mt-1">
                {v.wordCount} words · B{v.targetBenchmark}
              </p>
            </button>
          );
        })}
      </div>

      {/* On-screen: single version */}
      <article className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 md:p-10 shadow-sm print:hidden">
        <VersionBody version={shown} />
      </article>

      {/* Print: all three side-by-side if wide, stacked otherwise */}
      <div className="hidden print:block space-y-6">
        {versions.map((v) => (
          <article key={v.label} className="bg-white rounded-2xl border border-slate-200 p-6 print:break-inside-avoid">
            <Badge tone={tierPill[v.label].tone as any} size="xs" className="mb-3">
              {tierPill[v.label].title} · {v.wordCount} words · B{v.targetBenchmark}
            </Badge>
            <VersionBody version={v} />
          </article>
        ))}
      </div>
    </div>
  );
};

const VersionBody: React.FC<{ version: EssayVersion }> = ({ version }) => {
  const paragraphs = version.hindi.split('\n\n');
  const english = version.english.split('\n\n');
  const meta = tierPill[version.label];
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge tone={meta.tone as any} size="xs">{meta.title}</Badge>
        <Badge tone="slate" size="xs">{version.wordCount} words</Badge>
        <Badge tone="amber" size="xs">Benchmark {version.targetBenchmark}</Badge>
        <Badge tone="green" size="xs">{version.tensesUsed.length} tense{version.tensesUsed.length > 1 ? 's' : ''}</Badge>
        <Badge tone="indigo" size="xs">{version.connectorsUsed.length} connector{version.connectorsUsed.length !== 1 ? 's' : ''}</Badge>
      </div>

      <div className="space-y-6">
        {paragraphs.map((p, i) => (
          <div key={i} className="space-y-2">
            <DevanagariText size="md" weight="medium" className="text-slate-900 leading-[2.1]">
              {p}
            </DevanagariText>
          </div>
        ))}
      </div>

      <details className="mt-6 no-print">
        <summary className="text-xs font-black uppercase tracking-widest text-slate-500 cursor-pointer hover:text-orange-600">
          Show English translation
        </summary>
        <div className="mt-4 space-y-3 text-sm text-slate-600 italic leading-relaxed border-l-2 border-slate-200 pl-4">
          {english.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      </details>

      {/* Print always shows English */}
      <div className="hidden print:block mt-4 space-y-3 text-sm text-slate-600 italic leading-relaxed border-l-2 border-slate-300 pl-4">
        {english.map((e, i) => (
          <p key={i}>{e}</p>
        ))}
      </div>
    </>
  );
};
