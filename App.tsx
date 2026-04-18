
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
import { CapstoneViewV2 as CapstoneView } from './components/capstone/CapstoneViewV2';
import { FlashcardsLibraryView } from './components/pages/FlashcardsLibraryView';
import { DeckRunner } from './components/flashcards/DeckRunner';
import { PrintSheet } from './components/flashcards/PrintSheet';
import { TopicPackViewV2 } from './components/topic/TopicPackViewV2';
import { LandingView } from './components/pages/LandingView';
import { TOPIC_PACKS_BY_ID, TOPIC_PACKS_BY_LEVEL } from './content';
import { CAPSTONES_BY_TIER, CAPSTONES_BY_ID } from './content/capstones';
import { DECKS_BY_ID } from './content/flashcards';
import type { Deck } from './content/schema';
import { studyPlanForLevel, getStudyPlan } from './content/studyPlans';
import { resolveNextUp, getPlanProgress } from './components/ui/nextUpResolver';
import type { NextUpCardProps } from './components/ui/NextUpCard';
import { GraduationCap, Info } from 'lucide-react';
import { Celebration } from './components/ui/Celebration';
import {
  packCompleteMessage,
  capstoneCompleteMessage,
  deckMasteredMessage,
  planMilestoneMessage,
  planMilestoneJustCrossed,
  stampReadyMessage,
  type CelebrationMessage,
} from './content/celebrations';

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
  const [currentCelebration, setCurrentCelebration] = useState<CelebrationMessage | null>(null);

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

  /**
   * Fire a one-shot completion celebration. If `message.id` is already in the
   * profile's `celebrationsShown`, this is a no-op. Otherwise the message
   * renders and its id is persisted so it won't fire again on reload.
   */
  const fireCelebration = (
    baseProfile: StudentProfile,
    message: CelebrationMessage,
  ): StudentProfile => {
    const already = (baseProfile.celebrationsShown || []).includes(message.id);
    if (already) return baseProfile;
    // Only show one celebration at a time (if multiple fire at once, the last
    // one wins - in practice pack-complete + plan-milestone could both trigger,
    // and the bigger milestone wins because it's fired second).
    setCurrentCelebration(message);
    return {
      ...baseProfile,
      celebrationsShown: [...(baseProfile.celebrationsShown || []), message.id],
    };
  };

  /**
   * After a completion update, check if the plan milestone threshold was just
   * crossed and fire the celebration. Returns the (possibly-mutated) profile.
   */
  const maybeFirePlanMilestone = (p: StudentProfile): StudentProfile => {
    const planId = p.selectedStudyPlanId;
    if (!planId) return p;
    const plan = getStudyPlan(planId);
    if (!plan) return p;
    const prog = getPlanProgress(plan, p, null);
    const crossed = planMilestoneJustCrossed(prog.percent, planId, p.celebrationsShown || []);
    if (crossed === null) return p;
    return fireCelebration(p, planMilestoneMessage(planId, crossed));
  };

  /**
   * STAMP-ready: all 12 L1 + 11 L2 packs + all 5 core capstones complete. The
   * single most important celebration in the app - fires exactly once.
   */
  const maybeFireStampReady = (p: StudentProfile): StudentProfile => {
    if ((p.celebrationsShown || []).includes('stamp-ready')) return p;
    const completedPacks = new Set(p.completedTopicIds || []);
    const completedCaps = new Set(p.completedCapstoneIds || []);
    const l1l2Done = [...TOPIC_PACKS_BY_LEVEL[1], ...TOPIC_PACKS_BY_LEVEL[2]].every((pk) =>
      completedPacks.has(pk.id),
    );
    const coreCapsDone = CAPSTONES_BY_TIER.core.every((c) => completedCaps.has(c.id));
    if (!(l1l2Done && coreCapsDone)) return p;
    return fireCelebration(p, stampReadyMessage());
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
    updateActiveProfile((p) => {
      const mastered = Array.from(new Set([...(p.flashcardsMastered || []), cardId]));
      let next: StudentProfile = {
        ...p,
        flashcardsSeen: Array.from(new Set([...(p.flashcardsSeen || []), cardId])),
        flashcardsMastered: mastered,
      };
      // Deck-mastered celebration: if the currently-open deck now has every
      // card in `mastered`, fire once.
      if (openDeck) {
        const masteredSet = new Set(mastered);
        const allMastered = openDeck.cards.every((c) => masteredSet.has(c.id));
        if (allMastered) {
          next = fireCelebration(next, deckMasteredMessage(openDeck));
        }
      }
      return next;
    });
  };

  const markCardNotYet = (cardId: string) => {
    updateActiveProfile((p) => ({
      ...p,
      flashcardsMastered: (p.flashcardsMastered || []).filter((id) => id !== cardId),
    }));
  };

  const handleMarkComplete = () => {
    if (!openPack) return;
    const pack = openPack;
    updateActiveProfile((p) => {
      const wasAlreadyComplete = (p.completedTopicIds || []).includes(pack.id);
      let next: StudentProfile = {
        ...p,
        completedTopicIds: Array.from(new Set([...(p.completedTopicIds || []), pack.id])),
        inProgressTopicId: undefined,
      };
      if (!wasAlreadyComplete) {
        // Chained against the new state so one completion can fire a pack
        // celebration AND cross a milestone threshold. The later call wins
        // on screen (by design - milestone > pack).
        next = fireCelebration(next, packCompleteMessage(pack));
        next = maybeFirePlanMilestone(next);
        next = maybeFireStampReady(next);
      }
      return next;
    });
    setOpenPack(null);
  };

  const handleMarkCapstoneComplete = () => {
    if (!openCapstone) return;
    const capstone = openCapstone;
    updateActiveProfile((p) => {
      const wasAlreadyComplete = (p.completedCapstoneIds || []).includes(capstone.id);
      let next: StudentProfile = {
        ...p,
        completedCapstoneIds: Array.from(new Set([...(p.completedCapstoneIds || []), capstone.id])),
        inProgressCapstoneId: undefined,
      };
      if (!wasAlreadyComplete) {
        // Word count from the intermediateMid (target) version.
        const imVersion = capstone.versions.find((v) => v.label === 'intermediateMid');
        const wc = imVersion?.wordCount ?? 0;
        next = fireCelebration(next, capstoneCompleteMessage(capstone, wc));
        next = maybeFirePlanMilestone(next);
        next = maybeFireStampReady(next);
      }
      return next;
    });
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

  // ---- Landing page (no active profile) ----
  if (!activeId || !profile) {
    const handleSelectProfile = (id: string) => {
      setActiveId(id);
      setActiveTab('dashboard');
      localStorage.setItem(ACTIVE_PROFILE_KEY, id);
    };

    return (
      <>
        <LandingView
          profiles={profiles}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSelectProfile={handleSelectProfile}
          onAddStudent={() => setShowOnboarding(true)}
        />
        {showOnboarding && (
          <div className="fixed inset-0 z-[100]">
            <Onboarding onComplete={handleOnboarding} />
          </div>
        )}
      </>
    );
  }

  // Auto-adopt a default study plan for profiles that never got one.
  const ensuredPlan = profile.selectedStudyPlanId || studyPlanForLevel(profile.currentLevel).id;

  // Active plan object (used for overlay progress + next-up resolution).
  const activePlan = getStudyPlan(ensuredPlan) || studyPlanForLevel(profile.currentLevel);

  const deferCurrentOverlay = (id: string) => {
    updateActiveProfile((p) => ({
      ...p,
      deferredIds: Array.from(new Set([...(p.deferredIds || []), id])),
      inProgressTopicId: p.inProgressTopicId === id ? undefined : p.inProgressTopicId,
      inProgressCapstoneId: p.inProgressCapstoneId === id ? undefined : p.inProgressCapstoneId,
    }));
  };

  const openNextPlanItem = (kind: 'pack' | 'capstone', id: string) => {
    // Clear whatever overlay is currently open, then open the new one.
    setOpenPack(null);
    setOpenCapstone(null);
    setOpenDeck(null);
    if (kind === 'pack') openPackById(id);
    else openCapstoneById(id);
  };

  /**
   * Build NextUpCard props + OverlayProgress props for a given overlay.
   * currentItemId is the pack/capstone id the student is viewing. For the
   * deck overlay we pass the in-progress pack/capstone id (or empty string,
   * which makes nextPlanItemAfter fall through to the first unfinished item).
   */
  const buildOverlayBundle = (
    currentItemId: string,
    finishedLabel: string,
    kind: 'pack' | 'capstone' | 'deck' = 'pack',
  ): { progress: { position: string; planName?: string; percent: number }; nextUp: NextUpCardProps } => {
    const resolved = resolveNextUp({ profile, plan: activePlan, currentItemId });
    const prog = getPlanProgress(activePlan, profile, currentItemId);

    let position: string;
    if (kind === 'deck') {
      position = `Drill · ${prog.completedItems}/${prog.totalItems} plan items done`;
    } else if (prog.currentPosition > 0 && prog.totalItems > 0) {
      const label = kind === 'capstone' ? 'Capstone' : 'Pack';
      position = `${label} ${prog.currentPosition} of ${prog.totalItems}`;
    } else if (prog.totalItems > 0) {
      position = `${prog.completedItems} of ${prog.totalItems} done`;
    } else {
      position = 'Plan';
    }

    const nextUp: NextUpCardProps = {
      finishedLabel,
      onContinue: null,
      isAllDone: !resolved.item,
    };

    if (resolved.pack) {
      nextUp.nextTitle = resolved.pack.titleEnglish;
      nextUp.nextTitleHindi = resolved.pack.titleHindi;
      nextUp.nextKindLabel = `Pack · L${resolved.pack.level}`;
      nextUp.nextReason = resolved.reason;
      nextUp.onContinue = () => openNextPlanItem('pack', resolved.pack!.id);
    } else if (resolved.capstone) {
      nextUp.nextTitle = resolved.capstone.titleEnglish;
      nextUp.nextTitleHindi = resolved.capstone.titleHindi;
      nextUp.nextKindLabel = resolved.capstone.isMockExam
        ? `Mock Exam · ${resolved.capstone.mockExamMinutes} min`
        : `Capstone · ${resolved.capstone.tier === 'push' ? 'Push tier' : 'Core tier'}`;
      nextUp.nextReason = resolved.reason;
      nextUp.onContinue = () => openNextPlanItem('capstone', resolved.capstone!.id);
    } else {
      nextUp.nextReason = '';
    }

    if (currentItemId) {
      nextUp.onSkip = () => {
        deferCurrentOverlay(currentItemId);
        // Close the overlay after skipping so the student returns to the library.
        setOpenPack(null);
        setOpenCapstone(null);
        setOpenDeck(null);
      };
    }

    return {
      progress: { position, planName: activePlan.titleEnglish, percent: prog.percent },
      nextUp,
    };
  };

  // ---- Main app (active profile) ----

  const celebrationOverlay = currentCelebration ? (
    <Celebration
      message={currentCelebration}
      onDismiss={() => setCurrentCelebration(null)}
    />
  ) : null;

  // A) Topic pack overlay
  if (openPack) {
    const { progress, nextUp } = buildOverlayBundle(openPack.id, `Pack: ${openPack.titleEnglish}`, 'pack');
    return (
      <>
        <Layout
          activeTab={activeTab}
          setActiveTab={(t) => setActiveTab(t as Tab)}
          brandingName="सङ्कल्प"
          onSwitch={handleSwitchStudent}
        >
          <TopicPackViewV2
            pack={openPack}
            aiEnabled={!!profile.aiAssessmentEnabled}
            level={profile.currentLevel}
            onBack={() => setOpenPack(null)}
            onMarkComplete={handleMarkComplete}
            onEvaluation={handleAddEvaluation}
            progress={progress}
            nextUp={nextUp}
          />
        </Layout>
        {celebrationOverlay}
      </>
    );
  }

  // B) Capstone overlay
  if (openCapstone) {
    const { progress, nextUp } = buildOverlayBundle(
      openCapstone.id,
      `Capstone: ${openCapstone.titleEnglish}`,
      'capstone',
    );
    return (
      <>
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
            progress={progress}
            nextUp={nextUp}
          />
        </Layout>
        {celebrationOverlay}
      </>
    );
  }

  // C) Flashcard deck runner overlay
  if (openDeck) {
    // Decks aren't in the plan sequence - use inProgress pack/capstone as an
    // anchor so NextUpCard surfaces the first plan item after that. If none,
    // the empty string falls through to "first unfinished item".
    const deckAnchorId =
      profile.inProgressTopicId || profile.inProgressCapstoneId || '';
    const { progress, nextUp } = buildOverlayBundle(deckAnchorId, `Deck: ${openDeck.title}`, 'deck');
    // A deck is not a plan item, so don't offer "skip for now" on decks (the
    // student isn't deferring a plan item - they're just browsing drills).
    const deckNextUp: NextUpCardProps = { ...nextUp, onSkip: undefined };
    return (
      <>
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
            progress={progress}
            nextUp={deckNextUp}
          />
          <PrintSheet deck={openDeck} />
        </Layout>
        {celebrationOverlay}
      </>
    );
  }

  // D) First-run explainer - dismissed by the CTA inside the view OR by
  // clicking any sidebar tab (otherwise the nav appears unresponsive).
  if (showHowThisWorks) {
    return (
      <>
        <Layout
          activeTab={activeTab}
          setActiveTab={(t) => {
            markHowThisWorksSeen();
            setActiveTab(t as Tab);
          }}
          brandingName="सङ्कल्प"
          onSwitch={handleSwitchStudent}
        >
          <HowThisWorksView onContinue={markHowThisWorksSeen} />
        </Layout>
        {celebrationOverlay}
      </>
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
            studentLevel={profile.currentLevel}
            onOpenTopic={(p) => openPackById(p.id)}
            onOpenHowThisWorks={() => setShowHowThisWorks(true)}
          />
        );
      case 'capstones':
        return (
          <CapstonesLibraryView
            completedIds={profile.completedCapstoneIds || []}
            studentLevel={profile.currentLevel}
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
            studentLevel={profile.currentLevel}
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
    <>
      <Layout
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t as Tab)}
        brandingName="सङ्कल्प"
        onSwitch={handleSwitchStudent}
      >
        {renderTab()}
      </Layout>
      {celebrationOverlay}
    </>
  );
};

export default App;
