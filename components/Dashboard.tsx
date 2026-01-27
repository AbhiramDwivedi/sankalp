
import React from 'react';
import { StudentProfile, Lesson } from '../types';
import { CheckCircle2, Circle, Clock, Flame, Star, BrainCircuit, LayoutGrid, ArrowRight } from 'lucide-react';

interface DashboardProps {
  profile: StudentProfile;
  onSelectLesson: (lesson: Lesson) => void;
  onSwitchStudent: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, onSelectLesson, onSwitchStudent }) => {
  const plan = profile.plan || [];
  const currentUnit = plan.find(u => u.lessons?.some(l => l.status !== 'completed')) || plan[0];
  const nextLesson = currentUnit?.lessons?.find(l => l.status !== 'completed');
  
  const completedCount = profile.completedLessonIds?.length || 0;
  const totalCount = plan.reduce((acc, u) => acc + (u.lessons?.length || 0), 0);
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <button 
            onClick={onSwitchStudent}
            className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-orange-600 transition-colors"
          >
            <LayoutGrid size={14} /> Classroom Overview
          </button>
          <h1 className="text-6xl font-black text-slate-900 tracking-tight">नमस्ते, {profile.name}!</h1>
          <p className="text-slate-500 font-bold text-xl italic">{profile.currentLevel} Learning Path</p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center"><Flame size={24} /></div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Streak</p>
                 <p className="text-2xl font-black">1 Day</p>
              </div>
           </div>
           <div className="bg-slate-900 border-2 border-slate-800 rounded-[2rem] p-5 shadow-xl text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 text-orange-500 rounded-2xl flex items-center justify-center"><Star size={24} fill="currentColor" /></div>
              <div>
                 <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Mastery</p>
                 <p className="text-2xl font-black">Explorer</p>
              </div>
           </div>
        </div>
      </header>

      {/* Progress Card */}
      <section className="bg-white rounded-[3rem] p-10 border-2 border-slate-50 shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Linguistic Readiness</h2>
              <p className="text-4xl font-black text-slate-900">{progressPercent}% Path Completed</p>
            </div>
            <p className="text-lg font-bold text-slate-400">{completedCount} of {totalCount} weekly milestones</p>
          </div>
          <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden shadow-inner border border-slate-200 p-1">
            <div 
              className="bg-gradient-to-r from-orange-600 to-amber-500 h-full rounded-full transition-all duration-1000 ease-out shadow-lg" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110" />
      </section>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
             <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
               <Clock className="text-orange-600" size={28} />
               Up Next
             </h3>
             {currentUnit?.cognitiveGoal && (
               <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 uppercase tracking-widest">
                 <BrainCircuit size={14} /> {currentUnit.cognitiveGoal}
               </div>
             )}
          </div>
          
          {nextLesson ? (
            <div 
              onClick={() => onSelectLesson(nextLesson)}
              className="bg-white border-2 border-slate-100 hover:border-orange-600 transition-all rounded-[3.5rem] p-10 cursor-pointer group shadow-xl hover:shadow-orange-100 relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col md:flex-row gap-10">
                 <div className="w-32 h-32 bg-orange-600 rounded-[2.5rem] flex items-center justify-center text-white shrink-0 shadow-2xl group-hover:rotate-6 transition-transform">
                    <BookOpen size={48} />
                 </div>
                 <div className="space-y-4">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-md">Month {plan.indexOf(currentUnit) + 1} Milestone</span>
                    <h4 className="text-4xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">{nextLesson.title}</h4>
                    <p className="text-slate-500 text-lg font-medium line-clamp-2 italic leading-relaxed">"{nextLesson.description}"</p>
                    <div className="flex items-center gap-6 pt-4">
                      <div className="flex items-center gap-2 text-sm font-black text-slate-800">
                        <Star size={18} className="text-yellow-500 fill-yellow-500" /> 
                        Difficulty {nextLesson.difficulty}
                      </div>
                      <div className="h-4 w-px bg-slate-200"></div>
                      <div className="text-sm font-black text-slate-400 uppercase tracking-widest">{nextLesson.topic}</div>
                    </div>
                 </div>
              </div>
              <div className="absolute right-10 bottom-10 w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                <ArrowRight size={32} />
              </div>
            </div>
          ) : (
            <div className="bg-green-600 border-4 border-green-500 rounded-[3.5rem] p-20 text-center shadow-2xl text-white">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-lg">
                <CheckCircle2 size={48} />
              </div>
              <p className="text-4xl font-black mb-4">Path Mastered! 🎉</p>
              <p className="text-green-100 text-xl font-bold italic">Prepared for the FCPS World Language Credit exam.</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-black text-slate-800">Monthly Pillars</h3>
          <div className="grid gap-4">
            {plan.map((unit, idx) => {
              const unitCompleted = unit.lessons?.every(l => profile.completedLessonIds.includes(l.id));
              return (
                <div key={unit.id} className="flex items-center gap-6 p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm transition-all hover:shadow-lg">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    unitCompleted ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-300'
                  }`}>
                    {unitCompleted ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Pillar {idx + 1}</p>
                    <p className="font-black text-slate-800 text-lg leading-tight">{unit.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookOpen = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
);
