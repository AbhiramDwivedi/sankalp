
import React, { useState, useEffect } from 'react';
import { StudentProfile, ProficiencyLevel, EvaluationResult, migrateProfile } from './types';
import type { TopicPack, Capstone } from './content/schema';
import { Onboarding } from './components/Onboarding';
import { Layout } from './components/Layout';
import { LibraryView } from './components/pages/LibraryView';
import { DashboardView } from './components/pages/DashboardView';
import { HowThisWorksView } from './components/pages/HowThisWorksView';
import { RubricReferenceView } from './components/pages/RubricReferenceView';
import { CreditAuditView } from './components/pages/CreditAuditView';
import { StudyPlanView } from './components/pages/StudyPlanView';
import { CapstonesLibraryView } from './components/pages/CapstonesLibraryView';
import { CapstoneView } from './components/capstone/CapstoneView';
import { FlashcardsLibraryView } from './components/pages/FlashcardsLibraryView';
import { DeckRunner } from './components/flashcards/DeckRunner';
import { PrintSheet } from './components/flashcards/PrintSheet';
import { TopicPackView } from './components/topic/TopicPackView';
import { TOPIC_PACKS_BY_ID } from './content';
import { CAPSTONES_BY_ID } from './content/capstones';
import { DECKS_BY_ID } from './content/flashcards';
import type { Deck } from './content/schema';
import { studyPlanForLevel } from './content/studyPlans';
import { Search, PlusCircle, GraduationCap, CheckCircle2, Info } from 'lucide-react';

const APP_STORAGE_KEY = 'sankalpa_hindi_profiles';
const ACTIVE_PROFILE_KEY = 'sankalpa_active_id';

type Tab = 'dashboard' | 'library' | 'capstones' | 'flashcards' | 'plan' | 'rubric' | 'audit' | 'settings';

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<StudentProfile[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [openPack, setOpenPack] = useState<TopicPack | null>(null);
  const [openCapstone, setOpenCapstone] = useState<Capstone | null>(null);
  const [openDeck, setOpenDeck] = useState<Deck | null>(null);
  const [showHowThisWorks, setShowHowThisWorks] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const profile = profiles.find((p) => p.id === activeId) || null;

  useEffect(() => {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    const savedId = localStorage.getItem(ACTIVE_PROFILE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const migrated = Array.isArray(parsed) ? parsed.map(migrateProfile) : [];
        setProfiles(migrated);
        if (savedId && migrated.some((p: StudentProfile) => p.id === savedId)) {
          setActiveId(savedId);
        }
      } catch (e) {
        console.error('Failed to load profiles', e);
      }
    }
  }, []);

  useEffect(() => {
    if (profile && !profile.howThisWorksSeen) {
      setShowHowThisWorks(true);
    }
  }, [profile?.id]);

  const saveAllProfiles = (updated: StudentProfile[]) => {
    setProfiles(updated);
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(updated));
  };

  const updateActiveProfile = (updater: (p: StudentProfile) => StudentProfile) => {
    if (!activeId) return;
    const updated = profiles.map((p) => (p.id === activeId ? updater(p) : p));
    saveAllProfiles(updated);
  };

  const handleOnboarding = (data: {
    name: string;
    level: ProficiencyLevel;
    examDate: string;
    selectedStudyPlanId: string;
  }) => {
    const newProfile: StudentProfile = {
      id: crypto.randomUUID(),
      name: data.name,
      currentLevel: data.level,
      startDate: new Date().toISOString(),
      examDate: data.examDate,
      completedTopicIds: [],
      completedCapstoneIds: [],
      flashcardsSeen: [],
      flashcardsMastered: [],
      evaluations: {},
      aiAssessmentEnabled: false,
      howThisWorksSeen: false,
      selectedStudyPlanId: data.selectedStudyPlanId,
    };
    const updated = [...profiles, newProfile];
    saveAllProfiles(updated);
    setActiveId(newProfile.id);
    localStorage.setItem(ACTIVE_PROFILE_KEY, newProfile.id);
    setActiveTab('dashboard');
    setShowOnboarding(false);
    setShowHowThisWorks(true);
  };

  const handleSwitchStudent = () => {
    setActiveId(null);
    localStorage.removeItem(ACTIVE_PROFILE_KEY);
    setActiveTab('dashboard');
    setOpenPack(null);
    setOpenCapstone(null);
    setOpenDeck(null);
  };

  const openDeckById = (deckId: string) => {
    const d = DECKS_BY_ID[deckId];
    if (!d) return;
    setOpenPack(null);
    setOpenCapstone(null);
    setOpenDeck(d);
  };

  const markCardSeen = (cardId: string) => {
    updateActiveProfile((p) => ({
      ...p,
      flashcardsSeen: Array.from(new Set([...(p.flashcardsSeen || []), cardId])),
    }));
  };

  const markCardMastered = (cardId: string) => {
    updateActiveProfile((p) => ({
      ...p,
      flashcardsSeen: Array.from(new Set([...(p.flashcardsSeen || []), cardId])),
      flashcardsMastered: Array.from(new Set([...(p.flashcardsMastered || []), cardId])),
    }));
  };

  const markCardNotYet = (cardId: string) => {
    updateActiveProfile((p) => ({
      ...p,
      flashcardsMastered: (p.flashcardsMastered || []).filter((id) => id !== cardId),
    }));
  };

  const handleMarkComplete = () => {
    if (!openPack) return;
    updateActiveProfile((p) => ({
      ...p,
      completedTopicIds: Array.from(new Set([...(p.completedTopicIds || []), openPack.id])),
      inProgressTopicId: undefined,
    }));
    setOpenPack(null);
  };

  const handleMarkCapstoneComplete = () => {
    if (!openCapstone) return;
    updateActiveProfile((p) => ({
      ...p,
      completedCapstoneIds: Array.from(new Set([...(p.completedCapstoneIds || []), openCapstone.id])),
      inProgressCapstoneId: undefined,
    }));
    setOpenCapstone(null);
  };

  const handleAddEvaluation = (result: EvaluationResult) => {
    if (!openPack) return;
    updateActiveProfile((p) => {
      const evals = { ...(p.evaluations || {}) };
      evals[openPack.id] = [...(evals[openPack.id] || []), result];
      return { ...p, evaluations: evals };
    });
  };

  const markHowThisWorksSeen = () => {
    updateActiveProfile((p) => ({ ...p, howThisWorksSeen: true }));
    setShowHowThisWorks(false);
  };

  const openPackById = (packId: string) => {
    const p = TOPIC_PACKS_BY_ID[packId];
    if (!p) return;
    setOpenCapstone(null);
    setOpenPack(p);
    updateActiveProfile((pr) => ({ ...pr, inProgressTopicId: p.id }));
  };

  const openCapstoneById = (capstoneId: string) => {
    const c = CAPSTONES_BY_ID[capstoneId];
    if (!c) return;
    setOpenPack(null);
    setOpenCapstone(c);
    updateActiveProfile((pr) => ({ ...pr, inProgressCapstoneId: c.id }));
  };

  const handleSelectPlan = (planId: string) => {
    updateActiveProfile((p) => ({ ...p, selectedStudyPlanId: planId }));
  };

  // ---- Profile picker (no active profile) ----
  if (!activeId || !profile) {
    const filtered = profiles.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-white flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-10 animate-in fade-in zoom-in duration-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-600 rounded-[1.5rem] flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-orange-200">
                स
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sankalp Hindi</h1>
                <p className="text-slate-500 font-semibold italic">
                  FCPS Credit Prep · Choose a student to begin
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowOnboarding(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-4 rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-200 transition-all"
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
              {filtered.map((p) => (
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
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                        {p.currentLevel}
                      </p>
                      <p className="text-xs font-semibold text-orange-600 mt-1">
                        {(p.completedTopicIds || []).length} / 26 packs · {(p.completedCapstoneIds || []).length} / 10 capstones
                      </p>
                    </div>
                  </div>
                  {(p.completedTopicIds?.length || 0) > 0 && (
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  )}
                </div>
              ))}
              {profiles.length === 0 && (
                <div className="col-span-2 py-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <GraduationCap size={40} />
                  </div>
                  <p className="text-slate-400 font-bold italic">
                    No students yet. Click "Add Student" to begin.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {showOnboarding && (
          <div className="fixed inset-0 z-[100]">
            <Onboarding onComplete={handleOnboarding} />
          </div>
        )}
      </div>
    );
  }

  // Auto-adopt a default study plan for profiles that never got one.
  const ensuredPlan = profile.selectedStudyPlanId || studyPlanForLevel(profile.currentLevel).id;

  // ---- Main app (active profile) ----

  // A) Topic pack overlay
  if (openPack) {
    return (
      <Layout
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t as Tab)}
        brandingName="सङ्कल्प"
        onSwitch={handleSwitchStudent}
      >
        <TopicPackView
          pack={openPack}
          aiEnabled={!!profile.aiAssessmentEnabled}
          onBack={() => setOpenPack(null)}
          onMarkComplete={handleMarkComplete}
          onEvaluation={handleAddEvaluation}
        />
      </Layout>
    );
  }

  // B) Capstone overlay
  if (openCapstone) {
    return (
      <Layout
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t as Tab)}
        brandingName="सङ्कल्प"
        onSwitch={handleSwitchStudent}
      >
        <CapstoneView
          capstone={openCapstone}
          isCompleted={(profile.completedCapstoneIds || []).includes(openCapstone.id)}
          onBack={() => setOpenCapstone(null)}
          onMarkComplete={handleMarkCapstoneComplete}
          onOpenPack={openPackById}
        />
      </Layout>
    );
  }

  // C) Flashcard deck runner overlay
  if (openDeck) {
    return (
      <Layout
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t as Tab)}
        brandingName="सङ्कल्प"
        onSwitch={handleSwitchStudent}
      >
        <DeckRunner
          deck={openDeck}
          seenIds={profile.flashcardsSeen || []}
          masteredIds={profile.flashcardsMastered || []}
          onCardSeen={markCardSeen}
          onCardMastered={markCardMastered}
          onCardNotYet={markCardNotYet}
          onBack={() => setOpenDeck(null)}
          onPrint={() => window.print()}
        />
        <PrintSheet deck={openDeck} />
      </Layout>
    );
  }

  // D) First-run explainer
  if (showHowThisWorks) {
    return (
      <Layout
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t as Tab)}
        brandingName="सङ्कल्प"
        onSwitch={handleSwitchStudent}
      >
        <HowThisWorksView onContinue={markHowThisWorksSeen} />
      </Layout>
    );
  }

  // D) Tab content
  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            profile={{ ...profile, selectedStudyPlanId: ensuredPlan }}
            onOpenTopic={(p) => openPackById(p.id)}
            onOpenCapstone={(cid) => openCapstoneById(cid)}
            onOpenLibrary={() => setActiveTab('library')}
            onOpenCapstonesTab={() => setActiveTab('capstones')}
            onOpenPlanTab={() => setActiveTab('plan')}
          />
        );
      case 'library':
        return (
          <LibraryView
            completedIds={profile.completedTopicIds || []}
            onOpenTopic={(p) => openPackById(p.id)}
            onOpenHowThisWorks={() => setShowHowThisWorks(true)}
          />
        );
      case 'capstones':
        return (
          <CapstonesLibraryView
            completedIds={profile.completedCapstoneIds || []}
            onOpenCapstone={openCapstoneById}
          />
        );
      case 'plan':
        return (
          <StudyPlanView
            profile={{ ...profile, selectedStudyPlanId: ensuredPlan }}
            onSelectPlan={handleSelectPlan}
            onOpenPack={openPackById}
            onOpenCapstone={openCapstoneById}
          />
        );
      case 'flashcards':
        return (
          <FlashcardsLibraryView
            seenIds={profile.flashcardsSeen || []}
            masteredIds={profile.flashcardsMastered || []}
            onOpenDeck={openDeckById}
          />
        );
      case 'rubric':
        return <RubricReferenceView onBack={() => setActiveTab('dashboard')} />;
      case 'audit':
        return <CreditAuditView onBack={() => setActiveTab('dashboard')} />;
      case 'settings':
        return (
          <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Settings</h1>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                  Active profile
                </p>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-xl">
                      {profile.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{profile.name}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {profile.currentLevel}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSwitchStudent}
                    className="text-sm font-black text-orange-600 hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 flex justify-between items-start gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                    AI Assessment
                  </p>
                  <p className="font-black text-slate-900">Allow optional AI grading on prompts</p>
                  <p className="text-xs text-slate-600 italic mt-1">
                    When off, prompts are read-only (ideal for hand grading). When on, a
                    "Grade with AI" button appears under each writing prompt.
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateActiveProfile((p) => ({
                      ...p,
                      aiAssessmentEnabled: !p.aiAssessmentEnabled,
                    }))
                  }
                  className={`px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest shrink-0 ${
                    profile.aiAssessmentEnabled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {profile.aiAssessmentEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              <button
                onClick={() => setShowHowThisWorks(true)}
                className="w-full flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-100 text-slate-700 hover:border-orange-400 rounded-2xl font-black"
              >
                <Info size={18} /> Re-read "How this works"
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 hover:bg-emerald-100 rounded-2xl font-black"
              >
                <GraduationCap size={18} /> View 3-credit audit
              </button>

              <button
                onClick={() => {
                  if (confirm(`Delete student "${profile.name}" and all their progress?`)) {
                    const updated = profiles.filter((p) => p.id !== profile.id);
                    saveAllProfiles(updated);
                    handleSwitchStudent();
                  }
                }}
                className="w-full py-4 bg-rose-50 text-rose-700 font-black rounded-2xl border border-rose-100 hover:bg-rose-100"
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
    <Layout
      activeTab={activeTab}
      setActiveTab={(t) => setActiveTab(t as Tab)}
      brandingName="सङ्कल्प"
      onSwitch={handleSwitchStudent}
    >
      {renderTab()}
    </Layout>
  );
};

export default App;
