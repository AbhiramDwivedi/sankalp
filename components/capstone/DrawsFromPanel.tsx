import React from 'react';
import { Link2, ArrowUpRight } from 'lucide-react';
import type { CrossTopicRef } from '../../content/schema';
import { TOPIC_PACKS_BY_ID } from '../../content';

interface DrawsFromPanelProps {
  draws: CrossTopicRef[];
  onOpenPack?: (packId: string) => void;
}

const contributionColor: Record<CrossTopicRef['contributes'], string> = {
  vocabulary: 'bg-amber-100 text-amber-800',
  grammar: 'bg-emerald-100 text-emerald-800',
  connectors: 'bg-indigo-100 text-indigo-800',
  structure: 'bg-slate-200 text-slate-800',
  cultural: 'bg-rose-100 text-rose-800',
};

export const DrawsFromPanel: React.FC<DrawsFromPanelProps> = ({ draws, onOpenPack }) => (
  <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm print:shadow-none print:break-inside-avoid">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
        <Link2 size={18} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          Draws from
        </p>
        <p className="font-black text-slate-900 text-lg">
          {draws.length} topic packs fuel this capstone
        </p>
      </div>
    </div>

    <ul className="space-y-3">
      {draws.map((d, i) => {
        const pack = TOPIC_PACKS_BY_ID[d.packId];
        return (
          <li
            key={i}
            className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100"
          >
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onOpenPack?.(d.packId)}
                  className="text-sm font-black text-slate-900 hover:text-orange-600 hover:underline"
                >
                  {pack ? pack.titleEnglish : d.packId}
                </button>
                {pack && (
                  <span className="font-hindi text-sm text-slate-500">· {pack.titleHindi}</span>
                )}
                <span
                  className={`ml-auto text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${contributionColor[d.contributes]}`}
                >
                  {d.contributes}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">{d.note}</p>
            </div>
            {pack && onOpenPack && (
              <button
                onClick={() => onOpenPack(d.packId)}
                className="shrink-0 text-slate-400 hover:text-orange-600"
                aria-label={`Open ${pack.titleEnglish}`}
              >
                <ArrowUpRight size={16} />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);
