import React from 'react';
import { CalendarDays, Target, PlayCircle, CheckCircle2, Flag, ArrowRight } from 'lucide-react';
import type { StudyPlan } from '../../content/schema';
import { STUDY_PLANS, planCursor, getStudyPlan, studyPlanForLevel } from '../../content/studyPlans';
import type { StudentProfile } from '../../types';
import { TOPIC_PACKS_BY_ID } from '../../content';
import { Badge } from '../ui/Badge';
import { CURRICULUM } from '../../content/curriculum';

interface StudyPlanViewProps {
  profile: StudentProfile;
  onSelectPlan: (planId: string) => void;
  onOpenPack: (packId: string) => void;
  onOpenCapstone: (capstoneId: string) => void;
}

export const StudyPlanView: React.FC<StudyPlanViewProps> = ({
  profile,
  onSelectPlan,
  onOpenPack,
  onOpenCapstone,
}) => {
  const currentPlan: StudyPlan =
    getStudyPlan(profile.selectedStudyPlanId) || studyPlanForLevel(profile.currentLevel);
  const cursor = planCursor(
    currentPlan,
    profile.completedTopicIds || [],
    profile.completedCapstoneIds || [],
    profile.currentLevel,
    profile.deferredIds || [],
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          Study plan
        </p>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
          How to use this library
        </h1>
        <p className="text-slate-600 italic max-w-3xl text-lg leading-relaxed">
          Five named plans map your current level to a week-by-week path through the 26 topic packs and 10 capstones. Your plan is printable, movable, and explains every step.
        </p>
      </header>

      {/* Current plan card */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white rounded-[2.5rem] p-10 shadow-2xl print:shadow-none">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <Badge tone="amber" size="xs" className="!bg-white !text-orange-700 !border-white mb-3">
              Your plan
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black">{currentPlan.titleEnglish}</h2>
            <p className="font-hindi-display text-3xl mt-1 opacity-90">{currentPlan.titleHindi}</p>
            <p className="mt-4 text-lg font-medium italic max-w-2xl leading-relaxed opacity-95">
              {currentPlan.headline}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-white/15 rounded-2xl px-5 py-4 flex items-center gap-3 backdrop-blur">
              <CalendarDays size={22} />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-70">
                  Duration
                </p>
                <p className="text-xl font-black">{currentPlan.durationWeeks} weeks</p>
              </div>
            </div>
            <div className="bg-white/15 rounded-2xl px-5 py-4 flex items-center gap-3 backdrop-blur">
              <Target size={22} />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-70">
                  Target
                </p>
                <p className="text-xl font-black">{CURRICULUM.displayStrings.targetPhrase} · {CURRICULUM.creditMapping.credits} credits</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-5 backdrop-blur text-sm leading-relaxed">
          <p className="font-black text-[10px] uppercase tracking-widest opacity-80 mb-1">Pacing note</p>
          <p className="opacity-95">{currentPlan.pacingNote}</p>
        </div>
      </section>

      {/* Switch plan */}
      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">
          Not the right fit? Pick a different plan
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {STUDY_PLANS.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPlan(p.id)}
              className={`text-left p-6 rounded-3xl border-2 transition-all ${
                p.id === currentPlan.id
                  ? 'bg-orange-50 border-orange-400 shadow-lg'
                  : 'bg-white border-slate-100 hover:border-orange-300 hover:-translate-y-1'
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                {p.forLevels.join(' · ')}
              </p>
              <p className="font-black text-lg text-slate-900 mt-2">{p.titleEnglish}</p>
              <p className="text-sm text-slate-500 italic mt-1 leading-relaxed">{p.headline}</p>
              <p className="text-xs font-black text-orange-700 mt-3">{p.durationWeeks} weeks</p>
            </button>
          ))}
        </div>
      </section>

      {/* Weekly schedule */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">
            Weekly schedule
          </h3>
          <button
            onClick={() => window.print()}
            className="text-sm font-black text-orange-700 hover:text-orange-800"
          >
            Print this plan →
          </button>
        </div>

        <div className="space-y-5">
          {currentPlan.weeks.map((w) => {
            const isCurrent = w.weekIndex === cursor.currentWeekIndex;
            const isDone =
              w.weekIndex < cursor.currentWeekIndex ||
              (cursor.isAllDone && w.weekIndex <= cursor.currentWeekIndex);
            return (
              <div
                key={w.weekIndex}
                className={`border-2 rounded-[2rem] p-6 md:p-8 print:break-inside-avoid ${
                  isCurrent
                    ? 'border-orange-400 bg-orange-50/50 shadow-xl'
                    : isDone
                    ? 'border-slate-100 bg-slate-50/50 opacity-75'
                    : 'border-slate-100 bg-white'
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge tone={isCurrent ? 'orange' : isDone ? 'green' : 'slate'} size="xs">
                    Week {w.weekIndex}
                  </Badge>
                  <h4 className="text-xl md:text-2xl font-black text-slate-900">{w.focus}</h4>
                  {isCurrent && (
                    <Badge tone="amber" size="xs" className="ml-auto">
                      <PlayCircle size={12} className="inline mr-1" /> You are here
                    </Badge>
                  )}
                  {isDone && !isCurrent && (
                    <Badge tone="green" size="xs" className="ml-auto">
                      <CheckCircle2 size={12} className="inline mr-1" /> Done
                    </Badge>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                      Packs this week
                    </p>
                    {w.packs.length === 0 ? (
                      <p className="text-sm italic text-slate-500">No new packs - capstones only.</p>
                    ) : (
                      <ul className="space-y-1">
                        {w.packs.map((pid) => {
                          const p = TOPIC_PACKS_BY_ID[pid];
                          const done = (profile.completedTopicIds || []).includes(pid);
                          return (
                            <li key={pid}>
                              <button
                                onClick={() => p && onOpenPack(pid)}
                                className={`text-sm flex items-center gap-2 hover:underline text-left ${
                                  done ? 'text-emerald-700' : 'text-slate-700'
                                }`}
                              >
                                {done ? (
                                  <CheckCircle2 size={14} />
                                ) : (
                                  <ArrowRight size={14} className="text-slate-500" />
                                )}
                                <span className="font-bold">
                                  {p ? p.titleEnglish : pid}
                                </span>
                                {p && (
                                  <span className="font-hindi text-slate-500 text-sm">
                                    · {p.titleHindi}
                                  </span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                      Writing this week
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">{w.writingOutput}</p>

                    {w.capstones && w.capstones.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {w.capstones.map((cid) => {
                          const done = (profile.completedCapstoneIds || []).includes(cid);
                          return (
                            <button
                              key={cid}
                              onClick={() => onOpenCapstone(cid)}
                              className={`text-sm flex items-center gap-2 hover:underline text-left ${
                                done ? 'text-emerald-700' : 'text-orange-700'
                              }`}
                            >
                              {done ? <CheckCircle2 size={14} /> : <Flag size={14} />}
                              <span className="font-black">{cid}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <p className="text-xs font-bold italic text-slate-500 mt-3 leading-relaxed border-l-2 border-orange-300 pl-3">
                      {w.checkpoint}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
