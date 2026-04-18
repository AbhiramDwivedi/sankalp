// Explainer diagrams - hand-authored SVG/TSX teaching aids that appear
// throughout the app (grammar sections, rubric page, capstones). All
// deterministic, theme-aware, and printable.

import React from 'react';
import type { StampBenchmark } from '../../content/schema';
import { CURRICULUM } from '../../content/curriculum';

// ---------------------------------------------------------------------------
// TenseTimelineDiagram - past / present / future horizontal bar with
// example verb endings and sentences. Teaches "one essay = many tenses".
// ---------------------------------------------------------------------------

export const TenseTimelineDiagram: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 800 280" className={`w-full ${className}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hindi tense timeline">
    <defs>
      <linearGradient id="tt-past" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#FB923C" />
      </linearGradient>
      <linearGradient id="tt-present" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="tt-future" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
    </defs>

    {/* Axis */}
    <line x1="40" y1="140" x2="760" y2="140" stroke="#0F172A" strokeWidth="2" />
    <polygon points="760,140 748,134 748,146" fill="#0F172A" />

    {/* Past block */}
    <rect x="40" y="100" width="220" height="80" rx="12" fill="url(#tt-past)" opacity="0.92" />
    <text x="150" y="132" textAnchor="middle" fill="white" fontWeight="900" fontSize="22">भूतकाल · Past</text>
    <text x="150" y="158" textAnchor="middle" fill="white" fontSize="14">mainne khaaya</text>
    <text x="150" y="176" textAnchor="middle" fill="white" fontSize="11" opacity="0.9">-या / -यी / -ए</text>

    {/* Present block */}
    <rect x="290" y="100" width="220" height="80" rx="12" fill="url(#tt-present)" opacity="0.92" />
    <text x="400" y="132" textAnchor="middle" fill="white" fontWeight="900" fontSize="22">वर्तमान · Present</text>
    <text x="400" y="158" textAnchor="middle" fill="white" fontSize="14">main khaata hoon</text>
    <text x="400" y="176" textAnchor="middle" fill="white" fontSize="11" opacity="0.9">-ता / -ती + हूँ/हैं</text>

    {/* Future block */}
    <rect x="540" y="100" width="220" height="80" rx="12" fill="url(#tt-future)" opacity="0.92" />
    <text x="650" y="132" textAnchor="middle" fill="white" fontWeight="900" fontSize="22">भविष्य · Future</text>
    <text x="650" y="158" textAnchor="middle" fill="white" fontSize="14">main khaaunga</text>
    <text x="650" y="176" textAnchor="middle" fill="white" fontSize="11" opacity="0.9">-ऊँगा / -ऊँगी / -एँगे</text>

    {/* Labels top */}
    <text x="150" y="88" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="700">kal / पहले</text>
    <text x="400" y="88" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="700">अभी / रोज़</text>
    <text x="650" y="88" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="700">कल / आगे</text>

    {/* Reader hint */}
    <text x="400" y="240" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="700">
      A Benchmark-5 essay moves through at least two of these zones - not all three, just more than one.
    </text>
    <text x="400" y="260" textAnchor="middle" fill="#64748B" fontSize="11" fontStyle="italic">
      Staying in one zone alone caps your score at Intermediate-Low (2 credits).
    </text>
  </svg>
);

// ---------------------------------------------------------------------------
// RubricLadderDiagram - 8-step stairway. Highlights Benchmark 5 as target.
// ---------------------------------------------------------------------------

interface RubricLadderProps {
  highlight?: StampBenchmark;
  className?: string;
}

const LADDER_STEPS: Array<{ bm: StampBenchmark; actfl: string; credit: 0 | 1 | 2 | 3; short: string }> = [
  { bm: 1, actfl: 'Novice Low', credit: 0, short: 'Words only' },
  { bm: 2, actfl: 'Novice Mid', credit: 0, short: 'Memorized chunks' },
  { bm: 3, actfl: 'Novice High', credit: 1, short: 'Simple sentences' },
  { bm: 4, actfl: 'Intermediate Low', credit: 2, short: 'Strings of sentences' },
  { bm: 5, actfl: 'Intermediate Mid', credit: 3, short: 'Connected paragraphs' },
  { bm: 6, actfl: 'Intermediate High', credit: 3, short: 'Cohesive discourse' },
  { bm: 7, actfl: 'Advanced Low', credit: 3, short: 'Narration + description' },
  { bm: 8, actfl: 'Advanced Mid', credit: 3, short: 'Multi-para discourse' },
];

export const RubricLadderDiagram: React.FC<RubricLadderProps> = ({ highlight = 5, className = '' }) => {
  const stepH = 52;
  const totalH = stepH * LADDER_STEPS.length + 100;
  const stepW = 210;

  return (
    <svg viewBox={`0 0 760 ${totalH}`} className={`w-full ${className}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`${CURRICULUM.examSystem.shortName} benchmark ladder`}>
      {LADDER_STEPS.map((step, i) => {
        const y = totalH - 60 - (i + 1) * stepH;
        const w = stepW + i * 48;
        const isTarget = step.bm === highlight;
        const fill = step.credit === 0 ? '#E2E8F0' : step.credit === 1 ? '#FEF3C7' : step.credit === 2 ? '#FED7AA' : '#BBF7D0';
        const stroke = isTarget ? '#EA580C' : '#CBD5E1';
        const textColor = isTarget ? '#9A3412' : '#334155';
        const rightX = 40 + w + 14;
        return (
          <g key={step.bm}>
            <rect x="40" y={y} width={w} height={stepH - 8} rx="8" fill={fill} stroke={stroke} strokeWidth={isTarget ? 3 : 1} />
            <text x="54" y={y + 21} fontSize="14" fontWeight="800" fill={textColor}>
              B{step.bm}
            </text>
            <text x="86" y={y + 21} fontSize="12" fontWeight="700" fill={textColor}>
              {step.actfl}
            </text>

            {/* Short description: sub-text inside the bar */}
            <text
              x="86"
              y={y + 38}
              fontSize="10"
              fontStyle="italic"
              fill={textColor}
              opacity="0.75"
            >
              {step.short}
            </text>

            {/* Credit dots: small chip to the right of the bar */}
            <g transform={`translate(${rightX}, ${y + 22})`}>
              {[0, 1, 2].map((n) => (
                <circle
                  key={n}
                  cx={n * 11}
                  cy={0}
                  r="4"
                  fill={n < step.credit ? '#F59E0B' : 'none'}
                  stroke={n < step.credit ? '#F59E0B' : '#CBD5E1'}
                  strokeWidth="1.3"
                />
              ))}
            </g>

            {/* Target callout: inside the highlighted bar, right-aligned */}
            {isTarget && (
              <text
                x={40 + w - 12}
                y={y + 21}
                textAnchor="end"
                fontSize="11"
                fontWeight="900"
                fill="#EA580C"
              >
                🎯 3 credits - TARGET
              </text>
            )}
          </g>
        );
      })}
      <text x="40" y={totalH - 20} fontSize="12" fill="#64748B" fontWeight="700">
        {CURRICULUM.creditMapping.issuer} credit ladder - reach Benchmark {CURRICULUM.creditMapping.benchmark} on writing AND speaking for the full {CURRICULUM.creditMapping.credits} credits.
      </text>
      <text x="40" y={24} fontSize="13" fontWeight="900" fill="#0F172A">
        {CURRICULUM.examSystem.shortName} benchmarks · {CURRICULUM.creditMapping.issuer} {CURRICULUM.language.name} Credit by Exam
      </text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// ParagraphScaffoldDiagram - three stacked boxes: P1 setup, P2 middle,
// P3 close. Connector callouts between them.
// ---------------------------------------------------------------------------

export const ParagraphScaffoldDiagram: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 800 460" className={`w-full ${className}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three-paragraph essay scaffold">
    {/* P1 */}
    <rect x="40" y="30" width="720" height="110" rx="16" fill="#FFEDD5" stroke="#F97316" strokeWidth="2" />
    <text x="60" y="58" fontSize="14" fontWeight="900" fill="#9A3412">Paragraph 1 · Setup</text>
    <text x="60" y="82" fontSize="12" fill="#7C2D12">Who, where, when. A hook sentence + 2–3 scene-setting sentences.</text>
    <text x="60" y="104" fontSize="11" fontStyle="italic" fill="#9A3412">Tense mix: mostly present or past. 2–3 sentences.</text>
    <text x="60" y="124" fontSize="11" fontWeight="700" fill="#EA580C">Starter connectors: पहले · जब</text>

    {/* Connector P1 → P2 */}
    <g>
      <line x1="400" y1="140" x2="400" y2="180" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrow)" />
      <text x="415" y="165" fontSize="11" fontWeight="700" fill="#C2410C">फिर · इसके बाद</text>
    </g>

    {/* P2 */}
    <rect x="40" y="180" width="720" height="120" rx="16" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
    <text x="60" y="208" fontSize="14" fontWeight="900" fill="#065F46">Paragraph 2 · Middle</text>
    <text x="60" y="232" fontSize="12" fill="#064E3B">What happened / what you do. Details, feelings, one cultural touch.</text>
    <text x="60" y="254" fontSize="11" fontStyle="italic" fill="#065F46">This is where you shift tense at least once. 3–4 sentences.</text>
    <text x="60" y="274" fontSize="11" fontWeight="700" fill="#047857">Connectors: क्योंकि · लेकिन · इसलिए</text>
    <text x="60" y="292" fontSize="11" fontWeight="700" fill="#047857">One muhavara here lifts your register.</text>

    {/* Connector P2 → P3 */}
    <g>
      <line x1="400" y1="300" x2="400" y2="340" stroke="#6366F1" strokeWidth="3" markerEnd="url(#arrow)" />
      <text x="415" y="325" fontSize="11" fontWeight="700" fill="#4338CA">अंत में</text>
    </g>

    {/* P3 */}
    <rect x="40" y="340" width="720" height="100" rx="16" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
    <text x="60" y="368" fontSize="14" fontWeight="900" fill="#3730A3">Paragraph 3 · Close</text>
    <text x="60" y="392" fontSize="12" fill="#312E81">Your opinion + what's next / what you learned.</text>
    <text x="60" y="414" fontSize="11" fontStyle="italic" fill="#3730A3">Tense shift to future or reflection. 2 sentences is enough.</text>
    <text x="60" y="432" fontSize="11" fontWeight="700" fill="#4F46E5">Close with: मुझे लगता है कि · मेरा मानना है</text>

    {/* Arrow marker */}
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <polygon points="0 0, 10 5, 0 10" fill="currentColor" />
      </marker>
    </defs>
  </svg>
);

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

// ---------------------------------------------------------------------------
// RubricAxisTriangle - three-axis balance: TextType, LanguageControl,
// TopicCoverage. Shows what a B5 essay looks like across all three.
// ---------------------------------------------------------------------------

export const RubricAxisTriangle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 500 440" className={`w-full ${className}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rubric axis balance">
    {/* Outer triangle (B5 target) */}
    <polygon
      points="250,80 430,360 70,360"
      fill="rgba(249, 115, 22, 0.12)"
      stroke="#EA580C"
      strokeWidth="2"
    />
    {/* Inner filled triangle showing typical B4 */}
    <polygon
      points="250,170 370,330 130,330"
      fill="rgba(100, 116, 139, 0.15)"
      stroke="#64748B"
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />
    {/* Vertex labels */}
    <text x="250" y="62" textAnchor="middle" fontWeight="900" fontSize="15" fill="#0F172A">Text-Type</text>
    <text x="250" y="78" textAnchor="middle" fontSize="11" fill="#64748B">connected paragraphs</text>

    <text x="440" y="380" textAnchor="middle" fontWeight="900" fontSize="15" fill="#0F172A">Language Control</text>
    <text x="440" y="396" textAnchor="middle" fontSize="11" fill="#64748B">gender · tense · agreement</text>

    <text x="60" y="380" textAnchor="middle" fontWeight="900" fontSize="15" fill="#0F172A">Topic Coverage</text>
    <text x="60" y="396" textAnchor="middle" fontSize="11" fill="#64748B">on-theme vocab</text>

    {/* Center label */}
    <circle cx="250" cy="260" r="48" fill="white" stroke="#EA580C" strokeWidth="2" />
    <text x="250" y="256" textAnchor="middle" fontWeight="900" fontSize="14" fill="#9A3412">B5</text>
    <text x="250" y="274" textAnchor="middle" fontSize="10" fill="#9A3412">3 credits</text>

    <text x="250" y="430" textAnchor="middle" fontSize="11" fill="#64748B" fontStyle="italic">
      Orange = {CURRICULUM.displayStrings.targetPhrase} (IM). Grey dashed = Benchmark 4 (IL). You need balance across all three to reach orange.
    </text>
  </svg>
);
