import React, { useEffect, useRef, useState } from 'react';
import { Mic, Square, Play, Pause, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import type { TopicPack } from '../../content/schema';
import type { EvaluationResult, SpeakingAttempt, StudentProfile } from '../../types';
import {
  getSpeakingPromptsFor,
  getSpeakingSelfCheckFor,
} from '../../content/speakingDefaults';
import { evaluateSpeaking } from '../../geminiService';
import { DevanagariText } from '../ui/DevanagariText';

// -----------------------------------------------------------------------------
// SpeakingPanel — in-pack practice panel for the Speaking section of STAMP.
//
// Phase A (always-free):
//   - prompt selector (1–5)
//   - in-browser MediaRecorder (webm/opus by default in Chromium)
//   - local playback via URL.createObjectURL
//   - 5-item self-check rubric persisted per (packId, promptIndex) in profile
//
// Phase B (optional AI): when `aiEnabled`, surface a "Get AI feedback" button
// that posts the audio Blob to Gemini 2.5 Flash via evaluateSpeaking(). Rate-
// limit and offline errors surface as user-friendly messages without losing
// the recording.
//
// The audio Blob is NOT serialized to localStorage — only the metadata,
// self-check ticks, and (optional) AI eval persist via `onPersistAttempt`.
// -----------------------------------------------------------------------------

interface SpeakingPanelProps {
  pack: TopicPack;
  profile: StudentProfile;
  aiEnabled: boolean;
  /** Persist a self-check or AI-eval update for (packId, promptIndex). */
  onPersistAttempt: (packId: string, attempt: SpeakingAttempt) => void;
}

type RecorderState = 'idle' | 'permission-denied' | 'recording' | 'stopped' | 'unsupported';

function isMediaRecorderSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.MediaRecorder !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function'
  );
}

function fmtSeconds(s: number): string {
  const mm = Math.floor(s / 60).toString();
  const ss = Math.floor(s % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

export const SpeakingPanel: React.FC<SpeakingPanelProps> = ({
  pack,
  profile,
  aiEnabled,
  onPersistAttempt,
}) => {
  const prompts = getSpeakingPromptsFor(pack);
  const selfCheckItems = getSpeakingSelfCheckFor(pack);

  const [promptIdx, setPromptIdx] = useState(0);
  const [recorderState, setRecorderState] = useState<RecorderState>(
    isMediaRecorderSupported() ? 'idle' : 'unsupported',
  );
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [elapsed, setElapsed] = useState(0); // seconds while recording
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<EvaluationResult | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const tickRef = useRef<number | null>(null);

  // Persisted attempt for the currently-selected prompt (if any).
  const existingAttempts = profile.speakingRecordings?.[pack.id] || [];
  const existingAttempt = existingAttempts.find((a) => a.promptIndex === promptIdx);

  // Local self-check ticks — initialized from persisted attempt or all-false.
  const [selfCheck, setSelfCheck] = useState<Record<string, boolean>>(
    () => existingAttempt?.selfCheck || {},
  );

  // Re-hydrate self-check ticks when the user switches prompts (or the
  // persisted attempt changes underneath us via a profile refresh).
  useEffect(() => {
    setSelfCheck(existingAttempt?.selfCheck || {});
    // Reset transient AI state when switching prompts.
    setAiResult(existingAttempt?.aiEval || null);
    setAiError(null);
    // The audio is per-recording, not per-prompt; if the user switches prompts
    // mid-session, we revoke the previous URL and clear the buffer.
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setAudioBlob(null);
    setElapsed(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptIdx, pack.id]);

  // Cleanup on unmount: stop active recorder, release tracks, revoke URL.
  useEffect(() => {
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
      if (recorderRef.current && recorderRef.current.state !== 'inactive') {
        try {
          recorderRef.current.stop();
        } catch {
          /* ignore */
        }
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = async () => {
    setAiError(null);
    if (!isMediaRecorderSupported()) {
      setRecorderState('unsupported');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      recorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      mr.onstop = () => {
        const mime = mr.mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type: mime });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        // Release the mic once the recording is sealed.
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
        if (tickRef.current) {
          window.clearInterval(tickRef.current);
          tickRef.current = null;
        }
        setRecorderState('stopped');
      };
      mr.start();
      setElapsed(0);
      tickRef.current = window.setInterval(() => {
        setElapsed((s) => s + 1);
      }, 1000);
      setRecorderState('recording');
    } catch (err) {
      // Permission denial, no device, etc. — surface a friendly state.
      setRecorderState('permission-denied');
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop();
    }
  };

  const toggleSelfCheck = (item: string) => {
    setSelfCheck((prev) => {
      const next = { ...prev, [item]: !prev[item] };
      // Persist immediately — feels snappier than waiting for an explicit
      // save button, and matches how the writing self-check works.
      onPersistAttempt(pack.id, {
        promptIndex: promptIdx,
        selfCheck: next,
        aiEval: existingAttempt?.aiEval,
        recordedAt: existingAttempt?.recordedAt || new Date().toISOString(),
      });
      return next;
    });
  };

  const submitForAi = async () => {
    if (!audioBlob) return;
    setAiError(null);
    setAiLoading(true);
    try {
      const promptContext = `${pack.titleEnglish} — Speaking prompt ${promptIdx + 1}: ${prompts[promptIdx]}`;
      const result = await evaluateSpeaking(audioBlob, promptContext);
      setAiResult(result);
      onPersistAttempt(pack.id, {
        promptIndex: promptIdx,
        selfCheck,
        aiEval: result,
        recordedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      setAiError(err?.message || 'AI evaluation failed.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <section
      data-testid="speaking-panel"
      className="bg-white rounded-[2rem] border-2 border-slate-100 p-6 md:p-8 space-y-6 print:break-inside-avoid"
    >
      <header className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">
          Speaking practice
        </p>
        <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
          Talk it out — STAMP Speaking section
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Record a 60–90 second response. Tick the self-check items you actually
          hit. {aiEnabled ? 'AI feedback is available below.' : 'Turn on AI in Settings to also get a Gemini speaking-rubric grade.'}
        </p>
      </header>

      {/* Prompt selector */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Speaking prompts">
        {prompts.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === promptIdx}
            data-testid={`speaking-prompt-tab-${i}`}
            onClick={() => setPromptIdx(i)}
            className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-colors ${
              i === promptIdx
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-900 hover:border-slate-400'
            }`}
          >
            Prompt {i + 1}
          </button>
        ))}
      </div>

      <div
        className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-5"
        data-testid="speaking-prompt-text"
      >
        <p className="text-sm md:text-base font-bold text-slate-900 leading-relaxed">
          {prompts[promptIdx]}
        </p>
      </div>

      {/* Recorder */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {recorderState === 'recording' ? (
              <button
                onClick={stopRecording}
                data-testid="speaking-stop"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm uppercase tracking-widest"
              >
                <Square size={16} /> Stop
              </button>
            ) : (
              <button
                onClick={startRecording}
                data-testid="speaking-start"
                disabled={recorderState === 'unsupported'}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 disabled:text-slate-500 text-white font-black text-sm uppercase tracking-widest"
              >
                <Mic size={16} /> {audioBlob ? 'Re-record' : 'Start recording'}
              </button>
            )}
            <span
              className="text-xs font-black uppercase tracking-widest text-slate-500"
              data-testid="speaking-state"
            >
              {recorderState === 'recording' && (
                <span className="text-rose-600">● Recording {fmtSeconds(elapsed)}</span>
              )}
              {recorderState === 'stopped' && (
                <span className="text-emerald-700">Recording ready</span>
              )}
              {recorderState === 'idle' && <span>Idle</span>}
              {recorderState === 'permission-denied' && (
                <span className="text-rose-600">Microphone permission required</span>
              )}
              {recorderState === 'unsupported' && (
                <span className="text-rose-600">Recording not supported in this browser</span>
              )}
            </span>
          </div>
        </div>

        {recorderState === 'permission-denied' && (
          <div className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              We need microphone permission to record. Click the lock icon in the
              address bar, allow Microphone for this site, and try again.
            </p>
          </div>
        )}

        {audioUrl && (
          <audio
            controls
            src={audioUrl}
            data-testid="speaking-audio"
            className="w-full"
          />
        )}
      </div>

      {/* Self-check rubric */}
      <div className="space-y-3" data-testid="speaking-self-check">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          Self-check (5 items)
        </p>
        <ul className="space-y-2">
          {selfCheckItems.map((item, i) => {
            const checked = !!selfCheck[item];
            return (
              <li key={i}>
                <label className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:border-slate-400 transition-colors">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSelfCheck(item)}
                    data-testid={`speaking-self-check-item-${i}`}
                    className="mt-0.5 w-4 h-4 accent-amber-500"
                  />
                  <DevanagariText
                    as="span"
                    size="sm"
                    weight="bold"
                    className={`flex-1 leading-relaxed ${checked ? 'text-emerald-800' : 'text-slate-800'}`}
                  >
                    {item}
                  </DevanagariText>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Phase B — AI feedback */}
      {aiEnabled && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 no-print">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-300" />
            <h4 className="text-sm font-black uppercase tracking-widest">
              Optional AI feedback
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sends your recording to Gemini 2.5 Flash with the STAMP speaking
            rubric. Free tier is 15 requests/minute, 1500/day — heavy use will
            be rate-limited.
          </p>
          <button
            onClick={submitForAi}
            disabled={!audioBlob || aiLoading}
            data-testid="speaking-ai-submit"
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {aiLoading ? 'Grading…' : 'Get AI feedback'}
          </button>
          {aiError && (
            <p className="text-rose-300 text-xs font-bold leading-relaxed">{aiError}</p>
          )}
          {aiResult && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-black text-amber-300">{aiResult.score}/10</div>
                <p className="text-xs text-slate-300 italic">{aiResult.suggestedNextStep}</p>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{aiResult.feedback}</p>
              {aiResult.identifiedStrengths?.length > 0 && (
                <div>
                  <p className="text-[10px] font-black uppercase text-emerald-300 mb-0.5">
                    Strengths
                  </p>
                  <ul className="text-xs space-y-0.5 text-slate-200">
                    {aiResult.identifiedStrengths.map((s, i) => (
                      <li key={i}>✓ {s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {aiResult.areasToImprove?.length > 0 && (
                <div>
                  <p className="text-[10px] font-black uppercase text-rose-300 mb-0.5">
                    Areas to improve
                  </p>
                  <ul className="text-xs space-y-0.5 text-slate-200">
                    {aiResult.areasToImprove.map((s, i) => (
                      <li key={i}>▸ {s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
