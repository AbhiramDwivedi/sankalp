import React, { useState } from 'react';
import { Sparkles, Upload, Loader2 } from 'lucide-react';
import { evaluateWriting } from '../../geminiService';
import type { EvaluationResult } from '../../types';

interface AiAssessmentPanelProps {
  promptContext: string;
  onResult: (r: EvaluationResult) => void;
}

export const AiAssessmentPanel: React.FC<AiAssessmentPanelProps> = ({
  promptContext,
  onResult,
}) => {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('');
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = (reader.result as string).split(',')[1];
      setImageData(data);
    };
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    setError(null);
    setLoading(true);
    try {
      const payload =
        mode === 'text'
          ? { kind: 'text' as const, text }
          : { kind: 'image' as const, data: imageData || '' };
      const r = await evaluateWriting(payload, promptContext);
      setResult(r);
      onResult(r);
    } catch (e: any) {
      setError(e?.message || 'AI evaluation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-[2rem] p-8 no-print shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles size={22} className="text-amber-300" />
        <h3 className="text-lg font-black uppercase tracking-widest">Optional AI Grading</h3>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('text')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
            mode === 'text' ? 'bg-amber-400 text-slate-900' : 'bg-white/10 text-white/70'
          }`}
        >
          Typed Essay
        </button>
        <button
          onClick={() => setMode('image')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
            mode === 'image' ? 'bg-amber-400 text-slate-900' : 'bg-white/10 text-white/70'
          }`}
        >
          Handwriting Photo
        </button>
      </div>

      {mode === 'text' ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="पेस्ट या टाइप करें..."
          className="w-full min-h-[180px] bg-slate-800 border border-slate-700 rounded-2xl p-4 font-hindi text-lg placeholder:text-slate-500 focus:ring-2 focus:ring-amber-300 outline-none"
        />
      ) : (
        <label className="block bg-slate-800 border-2 border-dashed border-slate-600 rounded-2xl p-8 text-center cursor-pointer hover:border-amber-300 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
          <Upload size={28} className="mx-auto mb-2 text-slate-400" />
          <p className="text-sm font-bold">
            {imageData ? 'Image ready — click to change' : 'Upload a photo of handwritten essay'}
          </p>
        </label>
      )}

      <button
        onClick={submit}
        disabled={loading || (mode === 'text' ? !text.trim() : !imageData)}
        className="mt-5 w-full py-4 bg-amber-400 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
        {loading ? 'Grading...' : 'Grade this essay'}
      </button>

      {error && (
        <p className="mt-4 text-rose-300 text-sm font-bold">{error}</p>
      )}

      {result && (
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-black text-amber-300">{result.score}/10</div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-amber-300">AI Rubric Score</p>
              <p className="text-sm italic text-slate-300">{result.suggestedNextStep}</p>
            </div>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">{result.feedback}</p>
          {result.identifiedStrengths?.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase text-emerald-300 mb-1">Strengths</p>
              <ul className="text-sm space-y-0.5 text-slate-200">
                {result.identifiedStrengths.map((s, i) => <li key={i}>✓ {s}</li>)}
              </ul>
            </div>
          )}
          {result.areasToImprove?.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase text-rose-300 mb-1">Areas to Improve</p>
              <ul className="text-sm space-y-0.5 text-slate-200">
                {result.areasToImprove.map((s, i) => <li key={i}>▸ {s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
