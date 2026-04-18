// Hindi-specific grammar diagrams - hand-authored SVG/TSX teaching aids that
// encode Hindi-only constructions (ne/ergative, gender agreement). These live
// with the fcps-stamp-hindi curriculum so that adding a different Indian
// language curriculum means writing analogous per-language diagrams, not
// editing a shared file. Generic diagrams (tense timeline, rubric ladder,
// paragraph scaffold, rubric triangle) remain in components/art/diagrams.tsx.

import React from 'react';

// ---------------------------------------------------------------------------
// NeConstructionDiagram - subject + ने + object + verb (agrees w/ object).
// ---------------------------------------------------------------------------

export const NeConstructionDiagram: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 800 260" className={`w-full ${className}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hindi ne construction">
    {/* Row 1 sentence */}
    <g transform="translate(0, 50)">
      <rect x="40" y="0" width="140" height="50" rx="10" fill="#FECACA" stroke="#EF4444" strokeWidth="2" />
      <text x="110" y="24" textAnchor="middle" fontSize="16" fontWeight="800" fill="#7F1D1D">राम</text>
      <text x="110" y="42" textAnchor="middle" fontSize="10" fill="#7F1D1D">Subject</text>

      <rect x="200" y="0" width="80" height="50" rx="10" fill="#FED7AA" stroke="#F97316" strokeWidth="2" />
      <text x="240" y="24" textAnchor="middle" fontSize="16" fontWeight="800" fill="#9A3412">ने</text>
      <text x="240" y="42" textAnchor="middle" fontSize="10" fill="#9A3412">ergative</text>

      <rect x="300" y="0" width="140" height="50" rx="10" fill="#FDE68A" stroke="#EAB308" strokeWidth="2" />
      <text x="370" y="24" textAnchor="middle" fontSize="16" fontWeight="800" fill="#713F12">रोटियाँ</text>
      <text x="370" y="42" textAnchor="middle" fontSize="10" fill="#713F12">Object (fem pl)</text>

      <rect x="460" y="0" width="140" height="50" rx="10" fill="#A7F3D0" stroke="#10B981" strokeWidth="2" />
      <text x="530" y="24" textAnchor="middle" fontSize="16" fontWeight="800" fill="#064E3B">खाईं</text>
      <text x="530" y="42" textAnchor="middle" fontSize="10" fill="#064E3B">verb ← agrees w/ object</text>

      <line x1="370" y1="54" x2="530" y2="54" stroke="#10B981" strokeWidth="2" strokeDasharray="4 3" />
      <text x="450" y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill="#047857">agreement</text>
    </g>

    <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0F172A">
      Ram ate rotis - "रोटियाँ" (feminine plural) forces "खाईं" not "खाया".
    </text>
    <text x="400" y="186" textAnchor="middle" fontSize="12" fill="#64748B" fontStyle="italic">
      In the perfective past, transitive verbs take ने on the subject. The verb agrees with the OBJECT, not the subject.
    </text>
    <text x="400" y="216" textAnchor="middle" fontSize="11" fontWeight="700" fill="#DC2626">
      Getting this wrong is the #1 Language-Control dock for Hindi learners at this level.
    </text>
    <text x="400" y="30" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0F172A">
      ने construction · perfective past
    </text>
  </svg>
);

// ---------------------------------------------------------------------------
// GenderAgreementDiagram - noun gender → adjective ending → verb ending.
// ---------------------------------------------------------------------------

export const GenderAgreementDiagram: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 800 300" className={`w-full ${className}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hindi gender agreement">
    <text x="400" y="30" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0F172A">
      Gender agreement · noun → adjective → verb
    </text>

    {/* Masculine row */}
    <g transform="translate(0, 60)">
      <rect x="40" y="0" width="720" height="90" rx="14" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
      <text x="60" y="30" fontSize="13" fontWeight="900" fill="#1E3A8A">Masculine (पुल्लिंग)</text>
      <text x="60" y="60" fontSize="16" fontWeight="800" fill="#0F172A">बड़ा लड़का अच्छा खाना खाता है।</text>
      <text x="60" y="80" fontSize="11" fill="#475569" fontStyle="italic">
        बड़ा (m. adj) · लड़का (m. noun) · खाता (m. verb) - all ending in -ा.
      </text>
    </g>

    {/* Feminine row */}
    <g transform="translate(0, 170)">
      <rect x="40" y="0" width="720" height="90" rx="14" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2" />
      <text x="60" y="30" fontSize="13" fontWeight="900" fill="#831843">Feminine (स्त्रीलिंग)</text>
      <text x="60" y="60" fontSize="16" fontWeight="800" fill="#0F172A">बड़ी लड़की अच्छी रोटी खाती है।</text>
      <text x="60" y="80" fontSize="11" fill="#475569" fontStyle="italic">
        बड़ी (f. adj) · लड़की (f. noun) · खाती (f. verb) - all ending in -ी.
      </text>
    </g>
  </svg>
);
