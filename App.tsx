
import React, { useState, useEffect } from 'react';
import { StudentProfile, ProficiencyLevel, Lesson, Material, EvaluationResult } from './types';
import { generateCoursePlan } from './geminiService';
import { Onboarding } from './components/Onboarding';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { Evaluate } from './components/Evaluate';
import { Loader2, Users, Search, PlusCircle, Trash2, GraduationCap } from 'lucide-react';

const APP_STORAGE_KEY = 'sankalpa_hindi_profiles';
const ACTIVE_PROFILE_KEY = 'sankalpa_active_id';

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<StudentProfile[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const profile = profiles.find(p => p.id === activeId) || null;

  useEffect(() => {
    const savedProfiles = localStorage.getItem(APP_STORAGE_KEY);
    const savedActiveId = localStorage.getItem(ACTIVE_PROFILE_KEY);
    if (savedProfiles) {
      const parsed = JSON.parse(savedProfiles);
      setProfiles(parsed);
      if (savedActiveId && parsed.some((p: any) => p.id === savedActiveId)) {
        setActiveId(savedActiveId);
      }
    }
  }, []);

  const saveAllProfiles = (updated: StudentProfile[]) => {
    setProfiles(updated);
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleOnboarding = async (data: { name: string; level: ProficiencyLevel; examDate: string }) => {
    setIsGenerating(true);
    try {
      const start = new Date();
      const end = new Date(data.examDate);
      const diffMonths = Math.max(1, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
      
      const plan = await generateCoursePlan(data.name, data.level, diffMonths);
      
      const newProfile: StudentProfile = {
        id: crypto.randomUUID(),
        name: data.name,
        currentLevel: data.level,
        startDate: start.toISOString(),
        examDate: data.examDate,
        plan: plan || [],
        completedLessonIds: [],
        generatedMaterials: {},
        evaluations: {}
      };
      
      const updated = [...profiles, newProfile];
      saveAllProfiles(updated);
      setActiveId(newProfile.id);
      setActiveTab('dashboard'); 
      localStorage.setItem(ACTIVE_PROFILE_KEY, newProfile.id);
    } catch (error) {
      console.error(error);
      alert("Failed to generate plan.");
    } finally {
      setIsGenerating(false);
    }
  };

  const updateActiveProfile = (updater: (p: StudentProfile) => StudentProfile) => {
    if (!activeId) return;
    const updated = profiles.map(p => p.id === activeId ? updater(p) : p);
    saveAllProfiles(updated);
  };

  const saveMaterial = (lessonId: string, material: Material) => {
    updateActiveProfile(p => ({
      ...p,
      generatedMaterials: { ...(p.generatedMaterials || {}), [lessonId]: material }
    }));
  };

  const addEvaluation = (lessonId: string, result: EvaluationResult) => {
    updateActiveProfile(p => {
      const evals = { ...(p.evaluations || {}) };
      evals[lessonId] = [...(evals[lessonId] || []), result];
      const newCompleted = [...new Set([...p.completedLessonIds, lessonId])];
      return { ...p, evaluations: evals, completedLessonIds: newCompleted };
    });
  };

  const handleSwitchStudent = () => {
    setActiveId(null);
    localStorage.removeItem(ACTIVE_PROFILE_KEY);
    setActiveTab('dashboard');
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="animate-spin text-orange-600 mb-6" size={64} />
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">सङ्कल्प: Mapping the Path</h1>
        <p className="text-slate-500 mt-2 max-w-md italic font-medium">Strategizing monthly milestones from foundations to credit-level fluency...</p>
      </div>
    );
  }

  if (!activeId || !profile) {
    const filtered = profiles.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-10 animate-in fade-in zoom-in duration-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-orange-600 rounded-[1.5rem] flex items-center justify-center text-white font-black text-3xl shadow-2xl">स</div>
               <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Teacher's Classroom</h1>
                  <p className="text-slate-500 font-semibold italic">Individual Learning Pathways</p>
               </div>
            </div>
            <button 
              onClick={() => setActiveTab('onboarding')}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-4 rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-100 transition-all"
            >
              <PlusCircle size={20} /> Add Student
            </button>
          </div>

          <div className="bg-white rounded-[3rem] shadow-2xl p-10 border border-slate-100">
            <div className="relative mb-10">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
              <input 
                type="text" 
                placeholder="Find student..." 
                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all text-xl font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-h-[50vh] overflow-y-auto custom-scrollbar pr-4">
              {filtered.map(p => (
                <div 
                  key={p.id}
                  onClick={() => {
                    setActiveId(p.id);
                    setActiveTab('dashboard');
                    localStorage.setItem(ACTIVE_PROFILE_KEY, p.id);
                  }}
                  className="flex items-center justify-between p-6 bg-white border-2 border-slate-100 hover:border-orange-500 rounded-[2rem] cursor-pointer transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-black text-2xl group-hover:bg-orange-600 group-hover:text-white transition-all shadow-inner">
                      {p.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800">{p.name}</h3>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{p.currentLevel}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full" style={{ width: `${(p.completedLessonIds.length / Math.max(1, p.plan.length * 4)) * 100}%` }} />
                        </div>
                        <span className="text-[10px] font-black text-orange-600">{((p.completedLessonIds.length / Math.max(1, p.plan.length * 4)) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {profiles.length === 0 && (
                <div className="col-span-2 py-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <GraduationCap size={40} />
                  </div>
                  <p className="text-slate-400 font-bold italic">No students registered yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {activeTab === 'onboarding' && <div className="fixed inset-0 z-[100]"><Onboarding onComplete={handleOnboarding} /></div>}
      </div>
    );
  }

  const renderContent = () => {
    if (selectedLesson) {
      const cachedMaterial = profile.generatedMaterials?.[selectedLesson.id];
      return (
        <LessonView 
          lesson={selectedLesson} 
          level={profile.currentLevel}
          cachedMaterial={cachedMaterial}
          onBack={() => setSelectedLesson(null)}
          onComplete={(evalResult) => {
            addEvaluation(selectedLesson.id, evalResult);
            setSelectedLesson(null);
          }}
          onMaterialGenerated={(material) => saveMaterial(selectedLesson.id, material)}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard profile={profile} onSelectLesson={setSelectedLesson} onSwitchStudent={handleSwitchStudent} />;
      case 'curriculum':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Learning Path</h1>
            <div className="space-y-16">
              {profile.plan.map((unit, uIdx) => (
                <div key={unit.id} className="space-y-8 relative">
                  {uIdx < profile.plan.length - 1 && (
                    <div className="absolute left-8 top-20 bottom-0 w-1.5 bg-slate-100 rounded-full" />
                  )}
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex flex-col items-center justify-center shadow-2xl border-4 border-white">
                      <span className="text-[10px] font-black uppercase opacity-50">Month</span>
                      <span className="text-2xl font-black">{uIdx + 1}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800">{unit.name}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">{unit.targetProficiency}</span>
                        <span className="text-xs font-bold text-slate-400 italic">{unit.cognitiveGoal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-20 grid md:grid-cols-2 gap-6">
                    {unit.lessons.map((lesson, lIdx) => (
                      <div 
                        key={lesson.id} 
                        onClick={() => setSelectedLesson(lesson)}
                        className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer shadow-sm group relative overflow-hidden ${
                          profile.completedLessonIds.includes(lesson.id)
                          ? 'bg-green-50 border-green-100'
                          : 'bg-white border-slate-100 hover:border-orange-500'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Week {lIdx + 1}</p>
                            <h4 className="text-xl font-black text-slate-800">{lesson.title}</h4>
                          </div>
                          {profile.completedLessonIds.includes(lesson.id) && (
                            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg"><CheckCircle size={20} /></div>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2">{lesson.description}</p>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <span>{lesson.topic}</span>
                          <span className="bg-slate-50 px-3 py-1 rounded-full group-hover:bg-orange-600 group-hover:text-white transition-colors">Begin →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'progress':
        const totalL = profile.plan.reduce((acc, u) => acc + u.lessons.length, 0);
        const doneL = profile.completedLessonIds.length;
        const allEvalResults = Object.values(profile.evaluations || {}).flat() as EvaluationResult[];
        const avg = allEvalResults.length > 0 ? (allEvalResults.reduce((s, e) => s + e.score, 0) / allEvalResults.length).toFixed(1) : "0";

        return (
          <div className="space-y-12 animate-in fade-in duration-700">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Performance Analytics</h1>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-orange-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-orange-200 flex flex-col justify-between aspect-square">
                 <h3 className="text-lg font-black uppercase tracking-widest opacity-60">Path Completion</h3>
                 <div>
                    <div className="text-8xl font-black mb-2">{((doneL / Math.max(1, totalL)) * 100).toFixed(0)}%</div>
                    <p className="text-orange-100 font-bold">{doneL} of {totalL} milestones</p>
                 </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl flex flex-col justify-between aspect-square">
                 <h3 className="text-lg font-black uppercase tracking-widest text-slate-300">Logic Score</h3>
                 <div>
                    <div className="text-8xl font-black text-slate-900 mb-2">{avg}</div>
                    <p className="text-slate-400 font-bold">Intentional narrative average</p>
                 </div>
              </div>
              <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl flex flex-col justify-between aspect-square">
                 <h3 className="text-lg font-black uppercase tracking-widest opacity-60">FCPS Goal</h3>
                 <div>
                    <div className="text-3xl font-black mb-2">Intermediate-Mid</div>
                    <p className="text-slate-400 font-bold italic">Preparation for 3 World Language Credits</p>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in">
             <h1 className="text-4xl font-black text-slate-900">Settings</h1>
             <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-10">
                <div>
                   <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Active Profile</h3>
                   <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-orange-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl">{profile.name[0]}</div>
                        <p className="text-xl font-black text-slate-800">{profile.name}</p>
                      </div>
                      <button onClick={handleSwitchStudent} className="text-orange-600 font-bold hover:underline">Change Profile</button>
                   </div>
                </div>
                <button 
                  onClick={() => {
                    if(confirm("Delete student " + profile.name + "?")) {
                      const updated = profiles.filter(p => p.id !== profile.id);
                      saveAllProfiles(updated);
                      handleSwitchStudent();
                    }
                  }}
                  className="w-full py-5 bg-red-50 text-red-600 font-bold rounded-2xl border border-red-100 hover:bg-red-100"
                >
                  Remove Profile
                </button>
             </div>
          </div>
        );
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} brandingName="सङ्कल्प" onSwitch={handleSwitchStudent}>
      {renderContent()}
    </Layout>
  );
};

const CheckCircle = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

export default App;
