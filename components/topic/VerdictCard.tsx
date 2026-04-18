import React from 'react';
import { Award, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { VerdictCard as VerdictCardT } from '../../content/schema';
import { STAMP_BENCHMARKS, FCPS_CREDIT_SUMMARY } from '../../content/curricula/fcps-stamp-hindi/rubric';
import { CURRICULUM } from '../../content/curriculum';

interface VerdictCardProps {
  verdict: VerdictCardT;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({ verdict }) => {
  const bench = STAMP_BENCHMARKS.find((b) => b.benchmark === verdict.predictedBenchmark);
  const credit = FCPS_CREDIT_SUMMARY.find((c) => c.level === verdict.predictedCredit);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-[2rem] p-8 shadow-2xl border border-slate-700 print:bg-slate-50 print:text-slate-900 print:border-slate-200 print:shadow-none print:break-inside-avoid">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-amber-500/20 text-amber-300 print:bg-amber-100 print:text-amber-700 rounded-2xl flex items-center justify-center shrink-0">
          <Award size={24} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-300 print:text-amber-700">
            Why This Essay Would Pass
          </p>
          <p className="text-xl font-black mt-1">
            Predicted {CURRICULUM.examSystem.shortName} Benchmark {verdict.predictedBenchmark} · {bench?.actflLabel}
          </p>
          {credit && (
            <p className="text-sm font-bold text-slate-300 print:text-slate-600 mt-1">
              Maps to: <span className="text-amber-300 print:text-amber-700">{credit.label}</span>
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {verdict.whyItPasses.map((reason, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-400 print:text-emerald-700 shrink-0 mt-0.5" strokeWidth={3} />
            <p className="text-sm leading-relaxed text-slate-100 print:text-slate-800 font-medium">
              {reason}
            </p>
          </div>
        ))}
      </div>

      {verdict.gotchas && verdict.gotchas.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-700 print:border-slate-300">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-300 print:text-rose-700 mb-3">
            Watch-outs that could drop the score
          </p>
          <div className="space-y-2">
            {verdict.gotchas.map((g, i) => (
              <div key={i} className="flex items-start gap-3">
                <AlertCircle size={16} className="text-rose-400 print:text-rose-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                <p className="text-sm text-slate-200 print:text-slate-700 leading-relaxed">{g}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
