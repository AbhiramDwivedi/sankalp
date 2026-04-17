import React from 'react';
import type { TopicPack } from '../../content/schema';
import { Compass, Clock, Target, AlertTriangle } from 'lucide-react';
import { RubricAxisTags } from './RubricAxisTag';
import { TARGET_BENCHMARK } from '../../content/rubric';

interface WhyThisPackProps {
  pack: TopicPack;
}

const positionLabel = {
  foundations: 'Foundations (Novice Low → Novice High)',
  building: 'Building (Novice High → Intermediate Low)',
  'pushing-to-IM': 'Pushing to Intermediate Mid (3 credits)',
};

export const WhyThisPack: React.FC<WhyThisPackProps> = ({ pack }) => {
  const r = pack.rationale;
  return (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-white border-2 border-amber-100 rounded-[2.5rem] p-10 md:p-14 shadow-xl print:shadow-none print:bg-amber-50 print:break-inside-avoid space-y-8">
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-orange-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-100">
          <Compass size={30} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-2">
            Why this pack exists
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            What you'll actually get from reading this
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            FCPS Sub-Topics Covered
          </p>
          <ul className="space-y-1.5">
            {r.fcpsSubTopics.map((t, i) => (
              <li key={i} className="text-sm font-bold text-slate-800 flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">▸</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Rubric axes this pack trains
          </p>
          <RubricAxisTags axes={r.trains} size="sm" />
          <p className="text-xs text-slate-500 italic mt-3 leading-relaxed">
            Mastering these axes at Benchmark {TARGET_BENCHMARK} earns the student
            Intermediate-Mid — which maps to 3 FCPS credits.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
          <Target size={14} className="text-emerald-600" />
          After this pack, the student can
        </p>
        <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2">
          {r.afterThisPackStudentCan.map((c, i) => (
            <li
              key={i}
              className="text-sm font-bold text-slate-800 flex items-start gap-2 leading-relaxed"
            >
              <span className="text-emerald-600 mt-0.5">✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1 flex items-center gap-1.5">
            <Compass size={12} /> Where on the arc
          </p>
          <p className="text-sm font-black text-indigo-900 leading-snug">
            {positionLabel[r.positionOnArc]}
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1 flex items-center gap-1.5">
            <Clock size={12} /> Expected time
          </p>
          <p className="text-sm font-black text-emerald-900 leading-snug">{r.estimatedTime}</p>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1 flex items-center gap-1.5">
            <AlertTriangle size={12} /> If skipped
          </p>
          <p className="text-sm font-black text-rose-900 leading-snug">{r.ifSkippedRisk}</p>
        </div>
      </div>
    </section>
  );
};
