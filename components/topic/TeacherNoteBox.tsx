import React from 'react';
import { GraduationCap, ChevronDown, ChevronRight } from 'lucide-react';
import type { TeacherNote } from '../../content/schema';
import { RubricAxisTags } from './RubricAxisTag';

interface TeacherNoteBoxProps {
  note: TeacherNote;
  /** When true, the online view renders expanded by default. Print is always expanded. */
  defaultOpen?: boolean;
}

export const TeacherNoteBox: React.FC<TeacherNoteBoxProps> = ({
  note,
  defaultOpen = true,
}) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="bg-amber-50/70 border-l-4 border-amber-300 rounded-xl px-5 py-4 print:bg-amber-50 print:break-inside-avoid">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 text-left no-print"
      >
        <div className="flex items-center gap-2 text-amber-900">
          <GraduationCap size={16} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-[0.25em]">
            Teacher Note - Why This Section
          </span>
        </div>
        {open ? (
          <ChevronDown size={16} className="text-amber-700" />
        ) : (
          <ChevronRight size={16} className="text-amber-700" />
        )}
      </button>

      {/* Print always shows the eyebrow even if collapsed online */}
      <div className="hidden print:flex items-center gap-2 text-amber-900 mb-1">
        <GraduationCap size={14} />
        <span className="text-[9px] font-black uppercase tracking-[0.25em]">
          Teacher Note - Why This Section
        </span>
      </div>

      {(open || true) && (
        <div className={`${open ? 'mt-3' : 'hidden'} print:block print:mt-2 space-y-3`}>
          <p className="text-amber-900 text-sm leading-relaxed font-medium">
            {note.why}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">
              Trains rubric axes:
            </span>
            <RubricAxisTags axes={note.trains} />
          </div>
          {note.examLink && (
            <p className="text-[11px] font-semibold italic text-amber-800">
              Rubric reference: {note.examLink}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
