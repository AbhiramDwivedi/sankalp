
import React, { useState, useEffect } from 'react';
import { ProficiencyLevel } from '../types';
import { PROFICIENCY_ORDER, AVANT_RUBRIC_SUMMARY, calculateRecommendedDate } from '../constants';
import { Calendar, User, Trophy, ArrowRight, Clock } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: { name: string; level: ProficiencyLevel; examDate: string }) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    level: ProficiencyLevel.NOVICE_LOW,
    examDate: ''
  });

  // Calculate recommended date whenever level changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, examDate: calculateRecommendedDate(prev.level) }));
  }, [formData.level]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[3rem] shadow-2xl max-w-xl w-full p-8 md:p-12 border border-orange-100">
        <div className="flex justify-between mb-10">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-2 flex-1 mx-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-orange-600 shadow-sm' : 'bg-slate-100'}`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="w-20 h-20 bg-orange-100 rounded-[2rem] flex items-center justify-center text-orange-600 mb-8 shadow-inner">
                <User size={40} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Student Details</h2>
              <p className="text-slate-500 mb-10 font-medium">Every child's journey is unique. Let's name the hero of this story.</p>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Student Name</label>
                <input
                  required
                  autoFocus
                  type="text"
                  placeholder="e.g. Aarav"
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-xl font-bold placeholder:font-normal"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="w-20 h-20 bg-blue-100 rounded-[2rem] flex items-center justify-center text-blue-600 mb-8 shadow-inner">
                <Trophy size={40} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Current Level</h2>
              <p className="text-slate-500 mb-8 font-medium">Select the starting point. This adjusts the preparation speed automatically.</p>
              <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-3 custom-scrollbar">
                {PROFICIENCY_ORDER.map((lvl) => (
                  <label 
                    key={lvl}
                    className={`flex items-start gap-4 p-5 border-2 rounded-[1.5rem] cursor-pointer transition-all ${
                      formData.level === lvl ? 'border-orange-600 bg-orange-50/50 shadow-lg shadow-orange-100' : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="level"
                      className="mt-1.5 w-5 h-5 accent-orange-600"
                      checked={formData.level === lvl}
                      onChange={() => setFormData({ ...formData, level: lvl })}
                    />
                    <div>
                      <p className="font-bold text-slate-800 text-lg">{lvl}</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{AVANT_RUBRIC_SUMMARY[lvl]}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="w-20 h-20 bg-green-100 rounded-[2rem] flex items-center justify-center text-green-600 mb-8 shadow-inner">
                <Calendar size={40} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">The Big Day</h2>
              <p className="text-slate-500 mb-10 font-medium">The FCPS exam happens every November. Based on <strong>{formData.level}</strong> level, here is a doable plan:</p>
              
              <div className="bg-orange-50 border border-orange-200 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm"><Clock size={24}/></div>
                  <div>
                    <p className="text-xs font-black text-orange-400 uppercase tracking-widest">Recommended Readiness</p>
                    <p className="text-xl font-black text-slate-900">{new Date(formData.examDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                   <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Manual Date Adjustment</label>
                   <input
                    required
                    type="date"
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-bold"
                    value={formData.examDate}
                    onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-orange-200"
          >
            {step === 3 ? "Generate Curriculum" : "Continue"}
            <ArrowRight size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};
