import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import type { TeacherNote } from '../../content/schema';
import { Section } from '../ui/Section';
import { TeacherNoteBox } from './TeacherNoteBox';

interface SelfCheckRubricProps {
  note: TeacherNote;
}

interface CheckRow {
  label: string;
  pass: string;
  borderline: string;
  notYet: string;
}

const CHECK_ROWS: CheckRow[] = [
  {
    label: 'Paragraph count',
    pass: '3 or more cohesive paragraphs',
    borderline: '2 paragraphs, separated',
    notYet: '1 long paragraph / scattered sentences',
  },
  {
    label: 'Time frames',
    pass: 'Past, present, AND future all present',
    borderline: 'Two time frames used',
    notYet: 'One time frame only',
  },
  {
    label: 'Connectors',
    pass: '3+ different connectors used correctly',
    borderline: '1–2 connectors',
    notYet: 'No connectors; sentences stand alone',
  },
  {
    label: 'Topic-specific vocab',
    pass: '8+ words specific to the topic',
    borderline: '4–7 specific words',
    notYet: 'Generic words only ("good", "nice", "do")',
  },
  {
    label: 'Idiom or cultural detail',
    pass: '≥1 idiom OR cultural specific',
    borderline: 'Weak cultural reference',
    notYet: 'None',
  },
  {
    label: 'Gender / number agreement',
    pass: 'Errors rare; meaning always clear',
    borderline: 'Occasional errors; meaning still clear',
    notYet: 'Frequent errors; meaning unclear in places',
  },
];

export const SelfCheckRubric: React.FC<SelfCheckRubricProps> = ({ note }) => (
  <Section
    title="Self-Check Rubric"
    eyebrow="Grade your own essay before anyone else does"
    accent="slate"
    icon={<ClipboardCheck size={28} strokeWidth={2.5} />}
    pageBreakBefore
  >
    <TeacherNoteBox note={note} />

    <div className="bg-white border-4 border-dashed border-slate-300 rounded-[2rem] p-8 md:p-10 print:break-inside-avoid">
      <div className="text-center mb-6">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          ✂ Tear-off page
        </p>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Essay Self-Check</h3>
        <p className="text-sm text-slate-500 italic mt-1">
          Tick one box per row. Mostly "Pass" ≈ Intermediate-Mid ≈ 3 credits.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="text-left p-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                Criterion
              </th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                Pass ✓
              </th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-amber-700">
                Borderline ~
              </th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-rose-700">
                Not Yet ✗
              </th>
            </tr>
          </thead>
          <tbody>
            {CHECK_ROWS.map((r, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="p-3 font-black text-slate-800 align-top">{r.label}</td>
                <td className="p-3 align-top">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <span className="w-4 h-4 border-2 border-slate-300 rounded flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 leading-snug">{r.pass}</span>
                  </label>
                </td>
                <td className="p-3 align-top">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <span className="w-4 h-4 border-2 border-slate-300 rounded flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 leading-snug">{r.borderline}</span>
                  </label>
                </td>
                <td className="p-3 align-top">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <span className="w-4 h-4 border-2 border-slate-300 rounded flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 leading-snug">{r.notYet}</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-3 text-center">
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">4+ Pass marks</p>
          <p className="text-sm font-black text-emerald-900">≈ Intermediate-Mid → 3 credits</p>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">2–3 Pass marks</p>
          <p className="text-sm font-black text-amber-900">≈ Intermediate-Low → 2 credits</p>
        </div>
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-700">0–1 Pass marks</p>
          <p className="text-sm font-black text-rose-900">Keep drilling before testing</p>
        </div>
      </div>
    </div>
  </Section>
);
