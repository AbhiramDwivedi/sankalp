
import React, { useState, useRef } from 'react';
import { Camera, Loader2, Sparkles, CheckCircle, RotateCcw, BrainCircuit, Save } from 'lucide-react';
import { evaluateHandwriting } from '../geminiService';
import { EvaluationResult } from '../types';

interface EvaluateProps {
  lessonTitle?: string;
  onResult?: (res: EvaluationResult) => void;
}

export const Evaluate: React.FC<EvaluateProps> = ({ lessonTitle = "General Practice", onResult }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEvaluate = async () => {
    if (!image) return;
    setLoading(true);
    setIsSaved(false);
    try {
      const base64 = image.split(',')[1];
      const evaluation = await evaluateHandwriting(base64, lessonTitle);
      const evalWithDate = { ...evaluation, date: new Date().toISOString() };
      setResult(evalWithDate);
    } catch (error) {
      console.error(error);
      alert("Evaluation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (result && onResult) {
      onResult(result);
      setIsSaved(true);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setIsSaved(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Evaluation Center</h1>
        <p className="text-slate-500 font-medium text-lg max-w-lg mx-auto leading-relaxed">Upload a photo of handwritten work. We analyze both Devanagari form and narrative logic.</p>
      </div>

      {!image && !result && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-[4/3] border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center gap-6 bg-white hover:bg-orange-50/30 hover:border-orange-200 transition-all cursor-pointer group shadow-xl shadow-slate-200/50"
        >
          <div className="w-24 h-24 bg-orange-100 rounded-[2rem] flex items-center justify-center text-orange-600 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-lg">
            <Camera size={48} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-slate-800">Capture Worksheet</p>
            <p className="text-slate-400 font-medium">Click to select photo or use camera</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      )}

      {image && !result && (
        <div className="space-y-8">
          <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl aspect-[4/3] bg-slate-900 group">
            <img src={image} alt="Student Work" className="w-full h-full object-contain" />
            <button 
              onClick={reset}
              className="absolute top-6 right-6 p-4 bg-black/60 text-white rounded-2xl hover:bg-red-600 transition-all backdrop-blur-md opacity-0 group-hover:opacity-100"
            >
              <RotateCcw size={24} />
            </button>
          </div>
          <button 
            disabled={loading}
            onClick={handleEvaluate}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-black py-6 rounded-3xl flex items-center justify-center gap-4 shadow-2xl shadow-orange-100 transition-all hover:-translate-y-1 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={28} /> : <Sparkles size={28} />}
            {loading ? "Analyzing Narrative Flow..." : "Perform Deep Evaluation"}
          </button>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden animate-in zoom-in duration-500">
          <div className="bg-slate-900 p-10 text-white flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-orange-500 text-sm font-black uppercase tracking-widest mb-2">Evaluation Report</p>
              <h2 className="text-4xl font-black tracking-tight">{lessonTitle}</h2>
            </div>
            <div className="text-center relative z-10 bg-white/5 p-4 rounded-3xl backdrop-blur-md border border-white/10">
              <div className="text-5xl font-black text-orange-500">{result.score}/10</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Mastery Score</div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full" />
          </div>
          
          <div className="p-10 md:p-14 space-y-12">
            <section className="bg-blue-50 border-2 border-blue-100 rounded-[2rem] p-10">
              <h3 className="text-xl font-black text-blue-900 flex items-center gap-3 mb-4">
                <BrainCircuit size={28} className="text-blue-500" /> Thought Process Analysis
              </h3>
              <p className="text-blue-800 text-lg leading-relaxed font-medium">{result.thoughtProcessAnalysis}</p>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">General Feedback</h3>
              <p className="text-slate-700 text-xl font-medium leading-relaxed italic">"{result.feedback}"</p>
            </section>

            <div className="grid md:grid-cols-2 gap-12">
              <section className="space-y-6">
                <h3 className="font-black text-green-600 text-xs uppercase tracking-[0.2em]">Identified Strengths</h3>
                <ul className="space-y-3">
                  {result.identifiedStrengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-lg font-bold text-slate-700 bg-green-50/50 p-4 rounded-2xl border border-green-100">
                      <CheckCircle size={22} className="text-green-600 shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-6">
                <h3 className="font-black text-orange-600 text-xs uppercase tracking-[0.2em]">Growth Opportunities</h3>
                <ul className="space-y-3">
                  {result.areasToImprove.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-lg font-bold text-slate-700 bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shrink-0 mt-2.5" /> {s}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="bg-slate-50 rounded-3xl p-10 border-2 border-slate-100">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-2">Recommended Next Step</h3>
              <p className="text-2xl font-black text-orange-600">{result.suggestedNextStep}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               {!isSaved ? (
                 <button 
                  onClick={handleSave}
                  className="flex-1 bg-slate-900 hover:bg-black text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95"
                >
                  <Save size={24} /> Record Result to History
                </button>
               ) : (
                 <div className="flex-1 bg-green-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl">
                   <CheckCircle size={24} /> Result Saved Successfully
                 </div>
               )}
               <button onClick={reset} className="flex-1 bg-white hover:bg-slate-50 text-slate-500 font-bold py-5 rounded-2xl border-2 border-slate-100 transition-all">
                Evaluate New Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
