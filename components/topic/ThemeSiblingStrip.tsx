import React from 'react';
import { Link2 } from 'lucide-react';
import type { TopicPack } from '../../content/schema';
import { TOPIC_THEME_META } from '../../content/schema';
import { packsInTopicTheme } from '../../content';
import { BAND_META, bandForPack } from '../../types';

interface ThemeSiblingStripProps {
  pack: TopicPack;
  onOpenSibling?: (packId: string) => void;
}

// -----------------------------------------------------------------------------
// ThemeSiblingStrip — pack-page breadcrumb that surfaces the same topicTheme
// at other levels. Renders nothing when the pack is the sole member of its
// theme (e.g. greetings, weather). Unobtrusive row between the hero banner
// and the section stepper — see TopicPackViewV2.
// -----------------------------------------------------------------------------

export const ThemeSiblingStrip: React.FC<ThemeSiblingStripProps> = ({
  pack,
  onOpenSibling,
}) => {
  const siblings = packsInTopicTheme(pack.topicTheme);
  if (siblings.length < 2) return null;

  const themeMeta = TOPIC_THEME_META[pack.topicTheme];

  return (
    <div
      className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm no-print"
      aria-label={`Related packs in the ${themeMeta.label} theme`}
    >
      <span className="inline-flex items-center gap-2 font-black text-slate-700 text-xs uppercase tracking-[0.2em]">
        <Link2 size={14} className="text-slate-500" />
        <span aria-hidden className="text-base leading-none">
          {themeMeta.emoji}
        </span>
        {themeMeta.label}
      </span>
      <span className="text-slate-400 text-[10px] uppercase tracking-widest font-black">
        In this theme
      </span>
      <ul className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
        {siblings.map((s, i) => {
          const isCurrent = s.id === pack.id;
          const band = bandForPack(s);
          const label = `${s.titleEnglish} (${BAND_META[band].label})`;
          return (
            <li key={s.id} className="flex items-center gap-1.5">
              {isCurrent ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-1 text-xs font-black text-amber-900">
                  {s.titleEnglish}
                  <span className="text-amber-700 text-[10px] uppercase tracking-widest">
                    you're here
                  </span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenSibling?.(s.id)}
                  disabled={!onOpenSibling}
                  className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2.5 py-1 text-xs font-black text-slate-700 hover:border-orange-400 hover:text-orange-700 transition-colors disabled:cursor-default disabled:hover:border-slate-200 disabled:hover:text-slate-700"
                  aria-label={`Open ${label}`}
                >
                  {s.titleEnglish}
                  <span className="text-slate-400 text-[10px] uppercase tracking-widest">
                    {BAND_META[band].label}
                  </span>
                </button>
              )}
              {i < siblings.length - 1 && (
                <span aria-hidden className="text-slate-300 text-xs">
                  ·
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
