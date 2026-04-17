import React from 'react';
import { ArrowLeft, BookOpen, Target } from 'lucide-react';
import { STAMP_BENCHMARKS, RUBRIC_AXES, FCPS_CREDIT_SUMMARY, TARGET_BENCHMARK } from '../../content/rubric';
import { Badge } from '../ui/Badge';

interface RubricReferenceViewProps {
  onBack: () => void;
}

export const RubricReferenceView: React.FC<RubricReferenceViewProps> = ({ onBack }) => (
  <div className="max-w-4xl mx-auto space-y-10 pb-20">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-black text-sm uppercase tracking-widest"
    >
      <ArrowLeft size={16} /> Back
    </button>

    <header className="space-y-3">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Reference</p>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
        STAMP Rubric · FCPS Credit Mapping
      </h1>
      <p className="text-slate-500 italic">
        The ground-truth rubric every Avant rater uses on the FCPS Hindi exam.
      </p>
    </header>

    <section className="bg-white border-2 border-slate-100 rounded-[1.75rem] overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Benchmark</th>
            <th className="p-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">ACTFL</th>
            <th className="p-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Text-Type</th>
            <th className="p-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Language Control</th>
            <th className="p-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">FCPS Credits</th>
          </tr>
        </thead>
        <tbody>
          {STAMP_BENCHMARKS.map((b) => (
            <tr
              key={b.benchmark}
              className={`border-t border-slate-100 ${b.benchmark === TARGET_BENCHMARK ? 'bg-emerald-50' : ''}`}
            >
              <td className="p-3 font-black text-slate-900 align-top">{b.benchmark}</td>
              <td className="p-3 font-bold text-slate-800 align-top">{b.actflLabel}</td>
              <td className="p-3 text-slate-700 align-top max-w-xs">{b.textType}</td>
              <td className="p-3 text-slate-700 align-top max-w-xs">{b.languageControl}</td>
              <td className="p-3 font-black text-slate-900 align-top">
                {b.creditCount === 0 ? '—' : b.creditCount}
                {b.benchmark === TARGET_BENCHMARK && (
                  <div className="mt-1">
                    <Badge tone="green" size="xs">TARGET</Badge>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
        <Target size={24} className="text-emerald-600" /> Rubric Axes
      </h2>
      {RUBRIC_AXES.map((ax) => (
        <div key={ax.id} className="bg-white border-2 border-slate-100 rounded-2xl p-6">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-xl font-black text-slate-900">{ax.name}</h3>
            <Badge tone="slate" size="xs">{ax.id}</Badge>
          </div>
          <p className="text-sm text-slate-500 italic mb-4">{ax.oneLiner}</p>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                What raters check
              </p>
              <ul className="space-y-1 text-slate-700 text-sm">
                {ax.whatRatersLookFor.map((q, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-indigo-500">▸</span> <span>{q}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                How to train
              </p>
              <ul className="space-y-1 text-slate-700 text-sm">
                {ax.howToTrain.map((q, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-emerald-500">✓</span> <span>{q}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
        <BookOpen size={24} className="text-orange-600" /> FCPS Credit Ladder
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {FCPS_CREDIT_SUMMARY.map((c) => (
          <div
            key={c.level}
            className={`rounded-2xl p-5 border-2 ${
              c.credits === 3 ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-100'
            }`}
          >
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-black text-slate-900">{c.credits}</span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                credit{c.credits === 1 ? '' : 's'}
              </span>
            </div>
            <p className="font-black text-slate-900">{c.label}</p>
            <p className="text-xs text-slate-600 italic mt-1 leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
