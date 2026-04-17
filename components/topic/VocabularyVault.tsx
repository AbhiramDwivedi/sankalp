import React, { useMemo } from 'react';
import { BookMarked } from 'lucide-react';
import type { TeacherNote, VocabEntry } from '../../content/schema';
import { Section } from '../ui/Section';
import { VocabCard } from './VocabCard';
import { TeacherNoteBox } from './TeacherNoteBox';
import { Badge } from '../ui/Badge';

interface VocabularyVaultProps {
  vocabulary: VocabEntry[];
  note: TeacherNote;
}

export const VocabularyVault: React.FC<VocabularyVaultProps> = ({ vocabulary, note }) => {
  const grouped: Record<string, VocabEntry[]> = useMemo(() => {
    const g: Record<string, VocabEntry[]> = {};
    vocabulary.forEach((v) => {
      const key = v.subgroup || v.partOfSpeech;
      (g[key] = g[key] || []).push(v);
    });
    return g;
  }, [vocabulary]);

  if (!vocabulary.length) {
    return (
      <Section
        title="Vocabulary Vault"
        eyebrow={`0 entries — coming soon`}
        accent="orange"
        icon={<BookMarked size={28} strokeWidth={2.5} />}
      >
        <TeacherNoteBox note={note} />
        <p className="text-sm italic text-slate-500 text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
          This topic pack's vocabulary is being authored.
        </p>
      </Section>
    );
  }

  return (
    <Section
      title="Vocabulary Vault"
      eyebrow={`${vocabulary.length} high-yield words`}
      accent="orange"
      icon={<BookMarked size={28} strokeWidth={2.5} />}
    >
      <TeacherNoteBox note={note} />
      <div className="space-y-8">
        {Object.entries(grouped).map(([group, entries]) => (
          <div key={group}>
            <div className="flex items-center gap-3 mb-4">
              <Badge tone="orange" size="xs">{group.replace(/-/g, ' ')}</Badge>
              <span className="text-xs font-semibold text-slate-400">{entries.length} words</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
              {entries.map((e, i) => (
                <VocabCard key={`${e.hindi}-${i}`} entry={e} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
