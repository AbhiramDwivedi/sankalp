import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import type { Capstone, EssayVersion } from '../../content/schema';
import type { MockExamResult, EvaluationResult, StudentProfile } from '../../types';
import { DevanagariText } from '../ui/DevanagariText';
import { Badge } from '../ui/Badge';
import { evaluateWriting } from '../../geminiService';
import { CURRICULUM } from '../../content/curriculum';

// -----------------------------------------------------------------------------
// MockExamMode - a full-screen timed writing sitting for mock-flagged capstones.
//
//   - 20-minute (1200s) default countdown (or capstone.mockExamMinutes if set).
//   - The student sees ONLY the prompt. No model essays. No source packs. No
//     teacher note. No scrolling past the prompt while the timer runs.
//   - A single <textarea> captures the response.
//   - Auto-submits at 0:00. The Done button takes the same submit path.
//   - If AI is enabled, the response is graded via evaluateWriting() and the
//     result is shown. Otherwise, a self-check rubric (3 yes/no prompts keyed
//     to the core rubric axes) is shown alongside the three tiered model
//     versions (novice / intermediateMid / push) so the student can compare.
// -----------------------------------------------------------------------------

const DEFAULT_MOCK_MINUTES = 20;

interface MockExamModeProps {
  capstone: Capstone;
  profile: StudentProfile;
  aiEnabled: boolean;
  onExit: (result: MockExamResult | null) => void;
}

type Phase = 'writing' | 'grading' | 'done';

const SELF_CHECK_QUESTIONS = [
  {
    id: 'text-type',
    axis: 'Text-Type',
    question: 'Did you write three cohesive paragraphs (beginning / middle / end)?',
  },
  {
    id: 'language-control',
    axis: 'Language Control',
    question: 'Did you use at least two tenses (past / present / future) with correct verb forms?',
  },
  {
    id: 'topic-coverage',
    axis: 'Topic Coverage',
    question: 'Did you stay on topic and use specific vocabulary (not generic filler)?',
  },
];

function formatClock(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const mm = Math.floor(s / 60).toString().padStart(2, '0');
  const ss = (s % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

export const MockExamMode: React.FC<MockExamModeProps> = ({
  capstone,
  profile: _profile,
  aiEnabled,
  onExit,
}) => {
  const totalSeconds =
    (capstone.mockExamMinutes ?? DEFAULT_MOCK_MINUTES) * 60;

  const [secondsLeft, setSecondsLeft] = useState<number>(totalSeconds);
  const [text, setText] = useState<string>('');
  const [phase, setPhase] = useState<Phase>('writing');
  const [timedOut, setTimedOut] = useState<boolean>(false);
  const [result, setResult] = useState<MockExamResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [selfCheck, setSelfCheck] = useState<Record<string, boolean>>({});

  // Refs let the interval callback + auto-submit see the latest text/phase
  // without re-binding every second.
  const textRef = useRef<string>('');
  const phaseRef = useRef<Phase>('writing');
  const submitOnceRef = useRef<boolean>(false);
  textRef.current = text;
  phaseRef.current = phase;

  // Scroll-lock the page chrome while writing. Release when the exam ends so
  // the result panel scrolls normally.
  useEffect(() => {
    if (phase !== 'writing') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  const performSubmit = async (didTimeOut: boolean) => {
    if (submitOnceRef.current) return;
    submitOnceRef.current = true;
    setTimedOut(didTimeOut);

    const submittedText = textRef.current;
    const submittedAt = new Date().toISOString();
    const durationSeconds = totalSeconds - secondsLeft;

    const base: MockExamResult = {
      text: submittedText,
      submittedAt,
      durationSeconds,
      timedOut: didTimeOut,
    };

    if (aiEnabled && submittedText.trim().length > 0) {
      setPhase('grading');
      try {
        const ai = await evaluateWriting(
          { kind: 'text', text: submittedText },
          capstone.promptEnglish,
        );
        const finalResult: MockExamResult = { ...base, ai };
        setResult(finalResult);
        setPhase('done');
      } catch (e: any) {
        setAiError(e?.message || 'AI evaluation failed.');
        setResult(base);
        setPhase('done');
      }
    } else {
      setResult(base);
      setPhase('done');
    }
  };

  // Countdown — a single interval that decrements every second while writing.
  // Auto-submits at 0.
  useEffect(() => {
    if (phase !== 'writing') return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          // Defer submit to next tick so state settles.
          window.setTimeout(() => {
            if (phaseRef.current === 'writing') {
              void performSubmit(true);
            }
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleDone = () => {
    if (phase !== 'writing') return;
    void performSubmit(false);
  };

  const handleFinishAndExit = () => {
    onExit(result);
  };

  const wordCount = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [text]);

  const isWarning = phase === 'writing' && secondsLeft <= 60;
  const isCritical = phase === 'writing' && secondsLeft <= 30;

  return (
    <div
      className="fixed inset-0 z-[90] bg-slate-50 overflow-hidden flex flex-col"
      data-testid="mock-exam-mode"
      aria-label="Mock exam mode"
    >
      {/* Top bar: exit, timer, done */}
      <header className="shrink-0 border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              if (phase === 'writing') {
                const ok = window.confirm(
                  'Leave the mock exam? Your draft will not be saved.',
                );
                if (!ok) return;
              }
              onExit(phase === 'done' ? result : null);
            }}
            className="flex items-center gap-2 text-sm font-black text-slate-500 hover:text-orange-700"
          >
            <ArrowLeft size={16} /> {phase === 'done' ? 'Back to capstone' : 'Exit exam'}
          </button>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black tabular-nums ${
              isCritical
                ? 'bg-rose-600 text-white animate-pulse'
                : isWarning
                ? 'bg-amber-500 text-white'
                : 'bg-slate-900 text-white'
            }`}
            role="timer"
            aria-live={isCritical ? 'assertive' : 'polite'}
            data-testid="mock-exam-timer"
          >
            <Clock size={16} />
            <span className="text-xl tracking-widest">{formatClock(secondsLeft)}</span>
          </div>

          <button
            onClick={handleDone}
            disabled={phase !== 'writing'}
            data-testid="mock-exam-done"
            className={`px-5 py-2 rounded-xl font-black text-sm shadow-lg ${
              phase === 'writing'
                ? 'bg-emerald-700 text-white hover:bg-emerald-700'
                : 'bg-slate-200 text-slate-500 cursor-default'
            }`}
          >
            Done
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge tone="rose" size="xs">
              Mock Exam
            </Badge>
            <Badge tone="slate" size="xs">
              {capstone.id}
            </Badge>
            <Badge tone="amber" size="xs">
              {capstone.mockExamMinutes ?? DEFAULT_MOCK_MINUTES} min
            </Badge>
            {aiEnabled ? (
              <Badge tone="indigo" size="xs">
                AI grading on submit
              </Badge>
            ) : (
              <Badge tone="slate" size="xs">
                Self-check on submit
              </Badge>
            )}
          </div>

          {/* Prompt (visible in every phase) */}
          <section className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-[2rem] p-8 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-700">
              Prompt
            </p>
            <DevanagariText size="lg" weight="black" className="text-slate-900 leading-relaxed">
              {capstone.promptHindi}
            </DevanagariText>
            <p className="text-base text-slate-600 italic leading-relaxed">
              {capstone.promptEnglish}
            </p>
          </section>

          {phase === 'writing' && (
            <WritingArea
              text={text}
              onChange={setText}
              wordCount={wordCount}
              onDone={handleDone}
            />
          )}

          {phase === 'grading' && <GradingPanel />}

          {phase === 'done' && result && (
            <ResultPanel
              capstone={capstone}
              result={result}
              timedOut={timedOut}
              aiEnabled={aiEnabled}
              aiError={aiError}
              selfCheck={selfCheck}
              onSelfCheckChange={(id, value) => {
                const next = { ...selfCheck, [id]: value };
                setSelfCheck(next);
                // Persist the self-check answers onto the stored result so the
                // caller can save them into mockExamResults.
                setResult((r) => (r ? { ...r, selfCheck: next } : r));
              }}
              onFinish={handleFinishAndExit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// =============================================================================

const WritingArea: React.FC<{
  text: string;
  onChange: (v: string) => void;
  wordCount: number;
  onDone: () => void;
}> = ({ text, onChange, wordCount, onDone: _onDone }) => {
  return (
    <section className="space-y-3" data-testid="mock-exam-writing">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          Your response
        </p>
        <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
          {wordCount} words
        </p>
      </div>
      <textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`यहाँ लिखें... (${CURRICULUM.language.script})`}
        className="w-full min-h-[55vh] bg-white border-2 border-slate-200 rounded-2xl p-5 font-hindi text-lg leading-[2] placeholder:text-slate-500 focus:ring-2 focus:ring-orange-300 focus:border-orange-300 outline-none"
        data-testid="mock-exam-textarea"
        autoFocus
      />
      <p className="text-xs text-slate-500 italic">
        Three paragraphs. Two or three tenses. Four or more connectors. Click <b>Done</b>{' '}
        when you are finished, or the timer will submit for you.
      </p>
    </section>
  );
};

const GradingPanel: React.FC = () => (
  <section className="bg-slate-900 text-white rounded-[2rem] p-10 text-center space-y-4 shadow-xl" data-testid="mock-exam-grading">
    <Loader2 size={32} className="mx-auto animate-spin text-amber-300" />
    <p className="text-lg font-black uppercase tracking-widest">Grading your essay</p>
    <p className="text-sm text-slate-300 italic">
      The AI rater is comparing your writing to the {CURRICULUM.examSystem.shortName} rubric.
    </p>
  </section>
);

const ResultPanel: React.FC<{
  capstone: Capstone;
  result: MockExamResult;
  timedOut: boolean;
  aiEnabled: boolean;
  aiError: string | null;
  selfCheck: Record<string, boolean>;
  onSelfCheckChange: (id: string, value: boolean) => void;
  onFinish: () => void;
}> = ({
  capstone,
  result,
  timedOut,
  aiEnabled,
  aiError,
  selfCheck,
  onSelfCheckChange,
  onFinish,
}) => {
  return (
    <section className="space-y-6" data-testid="mock-exam-result">
      <div
        className={`rounded-[2rem] p-8 border-2 shadow-sm ${
          timedOut
            ? 'bg-amber-50 border-amber-200'
            : 'bg-emerald-50 border-emerald-200'
        }`}
      >
        <div className="flex items-start gap-4">
          {timedOut ? (
            <AlertTriangle size={28} className="text-amber-600 shrink-0 mt-1" />
          ) : (
            <CheckCircle2 size={28} className="text-emerald-700 shrink-0 mt-1" />
          )}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Mock exam submitted
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {timedOut ? 'Time is up' : 'Essay submitted'}
            </h2>
            <p className="text-sm text-slate-600 italic mt-1">
              {Math.floor(result.durationSeconds / 60)} min{' '}
              {result.durationSeconds % 60}s used.{' '}
              {result.text.trim().length === 0
                ? 'No text captured.'
                : `${result.text.trim().split(/\s+/).length} words written.`}
            </p>
          </div>
        </div>
      </div>

      {/* Student's submitted essay */}
      <section className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">
          Your essay
        </p>
        {result.text.trim() ? (
          <DevanagariText size="md" weight="medium" className="text-slate-900 leading-[2] whitespace-pre-wrap">
            {result.text}
          </DevanagariText>
        ) : (
          <p className="text-slate-500 italic text-sm">(Nothing written.)</p>
        )}
      </section>

      {aiEnabled && result.ai && !aiError && <AiResultBlock ai={result.ai} />}

      {aiEnabled && aiError && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-6">
          <p className="text-sm font-black text-rose-800">AI grading failed</p>
          <p className="text-xs text-rose-700 italic mt-1">{aiError}</p>
          <p className="text-xs text-rose-700 mt-2">
            Use the self-check below, or compare against the three tiered versions to estimate your benchmark.
          </p>
        </div>
      )}

      {(!aiEnabled || aiError) && (
        <SelfCheckBlock values={selfCheck} onChange={onSelfCheckChange} />
      )}

      {/* Side-by-side tier comparison */}
      <TierComparison versions={capstone.versions} />

      <div className="flex justify-end">
        <button
          onClick={onFinish}
          className="px-6 py-3 rounded-xl bg-slate-900 text-white font-black text-sm hover:bg-slate-700"
          data-testid="mock-exam-finish"
        >
          Back to capstone
        </button>
      </div>
    </section>
  );
};

const AiResultBlock: React.FC<{ ai: EvaluationResult }> = ({ ai }) => (
  <section className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl space-y-4">
    <div className="flex items-center gap-3">
      <Sparkles size={22} className="text-amber-300" />
      <h3 className="text-lg font-black uppercase tracking-widest">AI rubric result</h3>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-5xl font-black text-amber-300">{ai.score}/10</div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-amber-300">
          Rater score
        </p>
        <p className="text-sm italic text-slate-300">{ai.suggestedNextStep}</p>
      </div>
    </div>
    <p className="text-sm text-slate-200 leading-relaxed">{ai.feedback}</p>
    {ai.identifiedStrengths?.length > 0 && (
      <div>
        <p className="text-[10px] font-black uppercase text-emerald-300 mb-1">
          Strengths
        </p>
        <ul className="text-sm space-y-0.5 text-slate-200">
          {ai.identifiedStrengths.map((s, i) => (
            <li key={i}>✓ {s}</li>
          ))}
        </ul>
      </div>
    )}
    {ai.areasToImprove?.length > 0 && (
      <div>
        <p className="text-[10px] font-black uppercase text-rose-300 mb-1">
          Areas to improve
        </p>
        <ul className="text-sm space-y-0.5 text-slate-200">
          {ai.areasToImprove.map((s, i) => (
            <li key={i}>▸ {s}</li>
          ))}
        </ul>
      </div>
    )}
  </section>
);

const SelfCheckBlock: React.FC<{
  values: Record<string, boolean>;
  onChange: (id: string, value: boolean) => void;
}> = ({ values, onChange }) => (
  <section className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 shadow-sm space-y-4" data-testid="mock-exam-self-check">
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
        Self-check
      </p>
      <h3 className="text-xl font-black text-slate-900">
        How did you do on the three rubric axes?
      </h3>
    </div>
    <ul className="space-y-3">
      {SELF_CHECK_QUESTIONS.map((q) => {
        const val = values[q.id];
        return (
          <li
            key={q.id}
            className="border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-700">
                {q.axis}
              </p>
              <p className="text-sm font-bold text-slate-800">{q.question}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => onChange(q.id, true)}
                className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest ${
                  val === true
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => onChange(q.id, false)}
                className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest ${
                  val === false
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                Not yet
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  </section>
);

const TIER_LABELS: Record<EssayVersion['label'], { title: string; tone: string }> = {
  novice: { title: 'Novice', tone: 'bg-slate-500' },
  intermediateMid: { title: 'Intermediate-Mid (target)', tone: 'bg-orange-700' },
  push: { title: 'Push', tone: 'bg-indigo-600' },
};

const TierComparison: React.FC<{ versions: Capstone['versions'] }> = ({ versions }) => (
  <section className="space-y-3" data-testid="mock-exam-tier-comparison">
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
        Compare your essay to the three model tiers
      </p>
      <h3 className="text-xl font-black text-slate-900">
        Novice / Intermediate-Mid / Push
      </h3>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      {versions.map((v) => {
        const meta = TIER_LABELS[v.label];
        return (
          <article
            key={v.label}
            className="bg-white rounded-2xl border-2 border-slate-100 p-5 shadow-sm"
          >
            <header className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.2em] text-white px-2 py-1 rounded ${meta.tone}`}
              >
                {meta.title}
              </span>
              <Badge tone="amber" size="xs">
                B{v.targetBenchmark}
              </Badge>
              <Badge tone="slate" size="xs">
                {v.wordCount}w
              </Badge>
            </header>
            <DevanagariText
              size="sm"
              weight="medium"
              className="text-slate-800 leading-[1.9]"
            >
              {v.hindi}
            </DevanagariText>
          </article>
        );
      })}
    </div>
  </section>
);
