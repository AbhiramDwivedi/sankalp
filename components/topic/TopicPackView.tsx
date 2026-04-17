import React, { useState } from 'react';
import { ArrowLeft, Printer, Sparkles } from 'lucide-react';
import type { TopicPack } from '../../content/schema';
import type { EvaluationResult } from '../../types';
import { ProficiencyLevel } from '../../types';
import { HeroBanner } from './HeroBanner';
import { WhyThisPack } from './WhyThisPack';
import { LearningObjectives } from './LearningObjectives';
import { VocabularyVault } from './VocabularyVault';
import { GrammarCornerstones } from './GrammarCornerstones';
import { ConnectorBank } from './ConnectorBank';
import { AnchorPassage } from './AnchorPassage';
import { ModelTexts } from './ModelText';
import { CulturalInsights } from './CulturalInsight';
import { MuhavareCards } from './MuhavareCards';
import { ModelEssays } from './ModelEssay';
import { WritingPrompts } from './WritingPrompts';
import { SelfCheckRubric } from './SelfCheckRubric';
import { AiAssessmentPanel } from './AiAssessmentPanel';
import { PaisleyDivider } from '../ui/PaisleyDivider';
import { tokensFor } from '../ui/themeTokens';
import { LevelLens } from './LevelLens';
import { PackLevelIntro } from './PackLevelIntro';

interface TopicPackViewProps {
  pack: TopicPack;
  aiEnabled?: boolean;
  level?: ProficiencyLevel;
  onBack: () => void;
  onMarkComplete?: () => void;
  onEvaluation?: (result: EvaluationResult) => void;
}

export const TopicPackView: React.FC<TopicPackViewProps> = ({
  pack,
  aiEnabled = false,
  level,
  onBack,
  onMarkComplete,
  onEvaluation,
}) => {
  const [openAiFor, setOpenAiFor] = useState<number | null>(null);
  const tokens = tokensFor(pack.themeGroup);

  return (
    <div className="max-w-5xl mx-auto pb-32 space-y-10 animate-in fade-in duration-500 printable-area">
      {/* Toolbar */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-black transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm uppercase tracking-widest">Back to Library</span>
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-3 bg-white border-2 border-slate-100 hover:border-orange-400 text-slate-700 rounded-2xl flex items-center gap-2 font-black text-sm transition-all shadow-sm"
          >
            <Printer size={16} /> Print / Save PDF
          </button>
          {onMarkComplete && (
            <button
              onClick={onMarkComplete}
              className={`px-5 py-3 text-white rounded-2xl font-black text-sm shadow-lg ${tokens.accentBg} hover:opacity-90`}
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>

      <HeroBanner pack={pack} />

      <PackLevelIntro level={level} packTitleEnglish={pack.titleEnglish} />

      <WhyThisPack pack={pack} />

      <LearningObjectives objectives={pack.objectives} />

      <PaisleyDivider color={tokens.primaryHex} />

      <LevelLens
        tier="foundation"
        level={level}
        title="Vocabulary vault"
        skimSummary={`${pack.vocabulary.length} words across ${new Set(pack.vocabulary.map(v => v.subgroup)).size} groups — expand if you want to verify.`}
      >
        <VocabularyVault vocabulary={pack.vocabulary} note={pack.vocabularyNote} />
      </LevelLens>

      <PaisleyDivider color={tokens.primaryHex} />

      <LevelLens tier="core" level={level} title="Grammar cornerstones">
        <GrammarCornerstones grammar={pack.grammar} note={pack.grammarNote} />
      </LevelLens>

      <PaisleyDivider color={tokens.primaryHex} />

      <LevelLens tier="core" level={level} title="Connector bank">
        <ConnectorBank connectors={pack.connectors} note={pack.connectorsNote} />
      </LevelLens>

      <PaisleyDivider color={tokens.primaryHex} />

      <LevelLens tier="core" level={level} title="Reading sample">
        <AnchorPassage passage={pack.anchor} note={pack.anchorNote} />
      </LevelLens>

      <PaisleyDivider color={tokens.primaryHex} />

      <LevelLens
        tier="foundation"
        level={level}
        title="Model texts (email · sms · diary · letter)"
        skimSummary="Four short registers of self-introduction — same facts, different politeness."
      >
        <ModelTexts texts={pack.modelTexts} note={pack.modelTextsNote} />
      </LevelLens>

      <PaisleyDivider color={tokens.primaryHex} />

      <LevelLens tier="stretch" level={level} title="Cultural insights">
        <CulturalInsights insights={pack.cultural} note={pack.culturalNote} />
      </LevelLens>

      <PaisleyDivider color={tokens.primaryHex} />

      <LevelLens tier="stretch" level={level} title="Muhavare">
        <MuhavareCards muhavare={pack.muhavare} note={pack.muhavareNote} />
      </LevelLens>

      <PaisleyDivider color={tokens.primaryHex} />

      <LevelLens tier="core" level={level} title="Model essays">
        <ModelEssays essays={pack.modelEssays} note={pack.modelEssaysNote} />
      </LevelLens>

      <PaisleyDivider color={tokens.primaryHex} />

      <WritingPrompts
        prompts={pack.prompts}
        note={pack.promptsNote}
        aiEnabled={aiEnabled}
        onOpenAi={(idx) => setOpenAiFor(idx)}
      />

      {openAiFor !== null && onEvaluation && pack.prompts[openAiFor] && (
        <div className="my-10">
          <AiAssessmentPanel
            promptContext={`${pack.titleEnglish} — Prompt: ${pack.prompts[openAiFor].english}`}
            onResult={onEvaluation}
          />
        </div>
      )}

      <PaisleyDivider color={tokens.primaryHex} />

      <SelfCheckRubric note={pack.rubricNote} />

      {/* Print footer */}
      <footer className="pt-10 border-t-4 border-dotted border-slate-100 flex justify-between items-end text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] print:text-slate-400">
        <span>Student: ____________________________</span>
        <span className="text-center">सङ्कल्प · {pack.id}</span>
        <span>Date: ________________</span>
      </footer>
    </div>
  );
};
