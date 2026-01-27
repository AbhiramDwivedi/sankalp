
import React, { useState, useEffect } from 'react';
import { Lesson, Material, ProficiencyLevel, EvaluationResult } from '../types';
import { generateLessonMaterial } from '../geminiService';
import { Download, Loader2, Sparkles, BrainCircuit, Printer, FileDown, BookOpen, PenTool, CheckCircle, HelpCircle, Star } from 'lucide-react';
import { Evaluate } from './Evaluate';

interface LessonViewProps {
  lesson: Lesson;
  level: ProficiencyLevel;
  cachedMaterial?: Material;
  onBack: () => void;
  onComplete: (result: EvaluationResult) => void;
  onMaterialGenerated: (material: Material) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ 
  lesson, 
  level, 
  cachedMaterial, 
  onBack, 
  onComplete,
  onMaterialGenerated
}) => {
  const [loading, setLoading] = useState(!cachedMaterial);
  const [material, setMaterial] = useState<Material | null>(cachedMaterial || null);
  const [showEvaluate, setShowEvaluate] = useState(false);

  useEffect(() => {
    if (cachedMaterial) return;
    const fetchMaterial = async () => {
      try {
        setLoading(true);
        const data = await generateLessonMaterial(lesson.topic, level);
        setMaterial(data);
        onMaterialGenerated(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterial();
  }, [lesson, level, cachedMaterial]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in">
        <div className="relative">
          <div className="w-24 h-24 border-8 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-orange-600 font-black text-2xl">स</div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-800">Drafting Rich Narrative...</h2>
          <p className="text-slate-400 font-medium italic mt-2">Integrating muhavare and practice prompts for {level} proficiency.</p>
        </div>
      </div>
    );
  }

  if (!material) return null;

  if (showEvaluate) {
    return (
      <div className="space-y-10">
        <button onClick={() => setShowEvaluate(false)} className="text-slate-400 hover:text-orange-600 font-black flex items-center gap-2">← Back to Lesson</button>
        <Evaluate lessonTitle={lesson.title} onResult={onComplete} />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 max-w-5xl mx-auto printable-area pb-20">
      <div className="flex items-center justify-between no-print">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-800 font-black flex items-center gap-2 transition-all">
          ← Back to Map
        </button>
        <div className="flex gap-4">
          <button 
            onClick={() => window.print()}
            className="px-8 py-4 bg-white border-2 border-slate-100 hover:border-orange-500 text-slate-700 rounded-2xl flex items-center gap-3 font-black transition-all shadow-sm"
          >
            <Printer size={20} /> Save PDF / Print
          </button>
          <button 
            onClick={() => setShowEvaluate(true)}
            className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl flex items-center gap-3 font-black shadow-2xl shadow-orange-100 transition-all active:scale-95"
          >
            <PenTool size={20} /> Start Evaluation
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden print:border-none print:shadow-none">
        <div className="bg-orange-600 p-12 text-white flex justify-between items-start relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <span className="bg-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-white/30">Sankalpa Hindi</span>
               <span className="text-orange-100 text-xs font-bold italic">{level} Proficiency</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter leading-tight">{material.title}</h1>
            <p className="text-orange-100 font-bold mt-4 text-xl">Topic: {lesson.topic}</p>
          </div>
          <div className="w-24 h-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-5xl font-black backdrop-blur-lg border border-white/20 shadow-2xl">स</div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="p-12 md:p-20 space-y-20 print:p-10">
          {/* NARRATIVE SECTION */}
          <section className="space-y-10">
             <div className="flex items-center gap-4 text-orange-600 mb-2">
                <BookOpen size={32} strokeWidth={3} />
                <h2 className="text-2xl font-black uppercase tracking-[0.1em]">Reading Narrative</h2>
             </div>
             <div className="bg-slate-50 border-2 border-slate-100 rounded-[3rem] p-12 md:p-16 relative">
                <p className="font-hindi text-4xl md:text-5xl text-slate-900 text-center leading-[2.5] font-bold" dir="ltr">
                  {material.hindiText}
                </p>
                <div className="mt-16 pt-16 border-t-2 border-slate-200/50 space-y-4">
                   <p className="text-slate-400 text-center text-xl font-medium italic">{material.transliteration}</p>
                   <p className="text-slate-800 text-center text-2xl font-bold leading-relaxed">{material.englishTranslation}</p>
                </div>
                <div className="absolute top-6 left-6 text-slate-200 font-black text-8xl opacity-30">“</div>
             </div>
          </section>

          {/* IDIOMS (MUHAVARE) */}
          {material.idioms && material.idioms.length > 0 && (
            <section className="space-y-10">
              <div className="flex items-center gap-4 text-blue-600 mb-2">
                 <Star size={32} strokeWidth={3} fill="currentColor" />
                 <h2 className="text-2xl font-black uppercase tracking-[0.1em]">Muhavare (Idioms)</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {material.idioms.map((m, i) => (
                  <div key={i} className="bg-blue-50/50 border-2 border-blue-100 rounded-[2.5rem] p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
                    <p className="font-hindi text-3xl font-black text-blue-900">{m.phrase}</p>
                    <div className="space-y-1">
                       <p className="text-sm font-black text-blue-400 uppercase">Meaning</p>
                       <p className="text-blue-800 font-bold text-lg italic">{m.meaning}</p>
                    </div>
                    <div className="pt-4 border-t border-blue-200/50">
                       <p className="text-[10px] font-black text-blue-400 uppercase mb-2">Usage Example</p>
                       <p className="font-hindi text-xl text-slate-700 font-medium">{m.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PRACTICE QUESTIONS */}
          <section className="space-y-10">
             <div className="flex items-center gap-4 text-green-600 mb-2">
                <HelpCircle size={32} strokeWidth={3} />
                <h2 className="text-2xl font-black uppercase tracking-[0.1em]">Practice Tasks</h2>
             </div>
             <div className="space-y-6">
                {material.practiceQuestions?.map((q, i) => (
                  <div key={i} className="flex gap-8 items-start bg-green-50/30 p-8 rounded-3xl border-2 border-green-100">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-lg">?</div>
                    <div className="space-y-4">
                       <p className="font-hindi text-3xl font-black text-slate-800 leading-snug">{q.hindiQuestion}</p>
                       <p className="text-slate-500 font-semibold italic text-lg">{q.question}</p>
                       <div className="h-24 w-full border-b-2 border-dotted border-green-200 print:block"></div>
                    </div>
                  </div>
                ))}
             </div>
          </section>

          {/* PARENTAL THOUGHT PROMPTS */}
          <section className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10 space-y-8">
                <h2 className="text-3xl font-black flex items-center gap-4">
                  <BrainCircuit size={40} className="text-orange-500" />
                  Building The Logic
                </h2>
                <p className="text-slate-400 text-xl font-medium leading-relaxed italic">"Hindi isn't just a language, it's a way of viewing the world. Ask these to explore deep connections."</p>
                <div className="grid gap-6 mt-10">
                   {material.thoughtPrompts?.map((tp, i) => (
                     <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl font-hindi text-2xl font-bold tracking-wide">
                        {tp}
                     </div>
                   ))}
                </div>
             </div>
             <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px]"></div>
          </section>

          <footer className="pt-20 border-t-4 border-dotted border-slate-100 flex justify-between items-end text-xs font-black text-slate-300 uppercase tracking-[0.3em]">
             <span>Student: ____________________________</span>
             <span className="text-center">सङ्कल्प - Week {lesson.id.split('-').pop() || '1'}</span>
             <span>Date: ________________</span>
          </footer>
        </div>
      </div>
      
      <div className="bg-blue-600 rounded-[3rem] p-12 text-white flex items-center gap-10 no-print shadow-2xl shadow-blue-100">
         <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-xl border border-white/20"><PenTool size={48} /></div>
         <div className="space-y-2">
            <h4 className="text-3xl font-black">Next: Evaluation Gateway</h4>
            <p className="text-blue-100 text-xl font-medium leading-relaxed">Print this worksheet and have the student answer the Practice Tasks by hand. Once done, upload a photo for AI Evaluation to complete this lesson.</p>
         </div>
      </div>
    </div>
  );
};
