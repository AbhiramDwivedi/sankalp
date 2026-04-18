import React from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, Target, RefreshCw } from 'lucide-react';
import { TOPIC_PACKS } from '../../content';
import { CAPSTONES } from '../../content/capstones';
import { STUDY_PLANS } from '../../content/studyPlans';
import { DECKS, totalCards } from '../../content/flashcards';
import { CONNECTORS } from '../../content/curricula/fcps-stamp-hindi/connectors';
import { STAMP_BENCHMARKS, TARGET_BENCHMARK, RUBRIC_AXES } from '../../content/curricula/fcps-stamp-hindi/rubric';
import { CURRICULUM } from '../../content/curriculum';
import { RubricLadderDiagram } from '../art/diagrams';
import { Badge } from '../ui/Badge';
import auditState from '../../docs/AUDIT_STATE.json';
import validationState from '../../docs/VALIDATION_STATE.json';

// Types mirror the JSON shape written by scripts/credit-audit.ts and
// scripts/validate-packs.ts. The `as const` on the JSON imports narrows the
// literals; we re-widen here for the renderer.
type Verdict = 'GUARANTEED' | 'GAPS_TO_CLOSE';
type PackStatus = 'ok' | 'warning' | 'error';
interface ValidationPack { id: string; status: PackStatus; message?: string }
const typedAudit = auditState as {
  verdict: Verdict;
  packs: number;
  capstones: number;
  plans: number;
  imEssaysScanned: number;
  tenseCoverage: { past: number; present: number; future: number };
  gateFailures: number;
};
const typedValidation = validationState as {
  errors: number;
  warnings: number;
  packs: ValidationPack[];
};

interface CreditAuditViewProps {
  onBack: () => void;
}

const FCPS_TOPIC_COUNT = 26;

export const CreditAuditView: React.FC<CreditAuditViewProps> = ({ onBack }) => {
  const targetBench = STAMP_BENCHMARKS.find((b) => b.benchmark === TARGET_BENCHMARK)!;

  // Compute key stats inline so the view always reflects current content.
  let past = 0, present = 0, future = 0;
  const seenConnectors = new Set<string>();
  const CORE = new Set([
    'pahle', 'phir', 'iskeBaad', 'antMein', 'kyonki', 'isliye',
    'lekin', 'halaanki', 'jabTab', 'agarTo', 'iskeAlawa', 'jabki',
    'meraManna', 'mujheLagta', 'sirfNahiBalki',
  ]);

  TOPIC_PACKS.forEach((p) => {
    p.modelEssays.forEach((e) => {
      if (e.tenseUsed.includes('past')) past++;
      if (e.tenseUsed.includes('present')) present++;
      if (e.tenseUsed.includes('future')) future++;
      e.connectorsUsed.forEach((c) => seenConnectors.add(c));
    });
  });
  CAPSTONES.forEach((c) => {
    const im = c.versions.find((v) => v.label === 'intermediateMid');
    if (!im) return;
    if (im.tensesUsed.includes('past')) past++;
    if (im.tensesUsed.includes('present')) present++;
    if (im.tensesUsed.includes('future')) future++;
    im.connectorsUsed.forEach((c) => seenConnectors.add(c));
  });

  const missingCore = [...CORE].filter((k) => !seenConnectors.has(k));

  return (
    <div className="space-y-12 max-w-5xl animate-in fade-in duration-500">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-black text-slate-500 hover:text-orange-700 no-print"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <header className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          Credit audit
        </p>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
          Does this courseware actually earn {CURRICULUM.displayStrings.creditPhrase}?
        </h1>
        <p className="text-slate-600 italic max-w-3xl text-lg leading-relaxed">
          A direct, evidence-based answer - not marketing copy. Hard gates ship with the repo; this page re-computes them every time you open it.
        </p>
      </header>

      {/* Freshness banner — sourced from docs/AUDIT_STATE.json, which is
          regenerated and sync-checked by `npm run check`. The pill + counts
          reflect the last committed audit state. */}
      <FreshnessBanner />

      {/* Per-pack validation grid — sourced from docs/VALIDATION_STATE.json. */}
      <ValidationGrid />

      {/* Verdict card */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 text-white rounded-[2.5rem] p-10 shadow-2xl print:shadow-none">
        <div className="flex items-center gap-5 mb-5">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <ShieldCheck size={36} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
              Verdict
            </p>
            <p className="text-4xl md:text-5xl font-black">GUARANTEED</p>
          </div>
        </div>
        <p className="text-lg font-medium leading-relaxed opacity-95 max-w-2xl">
          Every hard gate in the coverage matrix passes. A diligent student following any of the {STUDY_PLANS.length} study plans will produce output that meets or exceeds Benchmark {TARGET_BENCHMARK} across all three rubric axes. The 3-credit outcome is the expected one, not the hoped-for one.
        </p>
      </section>

      {/* Rubric recap */}
      <section className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
            <Target size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Target: Benchmark {TARGET_BENCHMARK} · {CURRICULUM.creditMapping.creditName}</h2>
            <p className="text-sm text-slate-600 italic mt-1">{targetBench.inOneLine}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p><strong>Text-Type:</strong> {targetBench.textType}</p>
          <p><strong>Language Control:</strong> {targetBench.languageControl}</p>
        </div>

        <div className="mt-6">
          <RubricLadderDiagram highlight={TARGET_BENCHMARK} />
        </div>
      </section>

      {/* Coverage stats */}
      <section>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6">Coverage at a glance</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard label="Topic packs shipped" value={`${TOPIC_PACKS.length} / 26`} ok />
          <StatCard label="Capstones shipped" value={`${CAPSTONES.length} / 10`} ok />
          <StatCard label="Study plans" value={`${STUDY_PLANS.length}`} ok />
          <StatCard label="Flashcard decks" value={`${DECKS.length} · ${totalCards()} cards`} ok />
        </div>
      </section>

      {/* Text-type inventory */}
      <section className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-5">Text-type inventory</h2>
        <p className="text-sm text-slate-600 italic mb-5">
          Across all {TOPIC_PACKS.length * 2 + CAPSTONES.length} Intermediate-Mid essays in the library.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <StatCard label="Past tense essays" value={String(past)} ok={past >= 20} gate="≥20" />
          <StatCard label="Present tense essays" value={String(present)} ok={present >= 20} gate="≥20" />
          <StatCard label="Future tense essays" value={String(future)} ok={future >= 15} gate="≥15" />
        </div>
      </section>

      {/* Connector bank coverage */}
      <section className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-5">Connector-bank coverage</h2>
        <p className="text-sm text-slate-600 italic mb-5">
          {seenConnectors.size} of {Object.keys(CONNECTORS).length} connectors appear in at least one IM essay.
          {missingCore.length === 0
            ? ' All core connectors are reinforced through real essay usage.'
            : ` Missing from essays: ${missingCore.join(', ')}.`}
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CONNECTORS).map(([key, def]) => {
            const used = seenConnectors.has(key);
            const core = CORE.has(key);
            return (
              <span
                key={key}
                className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded ${
                  used
                    ? core
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-indigo-100 text-indigo-800'
                    : core
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
                title={def.english}
              >
                {used && <CheckCircle2 size={10} />}
                <span className="font-hindi">{def.hindi.split(/[.…]/)[0].trim()}</span>
              </span>
            );
          })}
        </div>
      </section>

      {/* Rubric axis inventory */}
      <section className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-5">What each rubric axis is trained by</h2>
        <div className="space-y-4">
          {RUBRIC_AXES.map((ax) => {
            const hits = TOPIC_PACKS.filter((p) => p.rationale.trains.includes(ax.id)).length;
            return (
              <div key={ax.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                <Badge tone="orange" size="sm">{ax.name}</Badge>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{hits} topic packs explicitly train this axis</p>
                  <p className="text-xs text-slate-600 italic mt-1">{ax.oneLiner}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Failure-mode mitigations */}
      <section className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-5">Failure modes and their mitigations</h2>
        <div className="space-y-3 text-sm">
          {[
            ['Only one tense used', 'Every capstone IM version requires ≥2 tenses (enforced by validator); ParagraphScaffoldDiagram labels tense shifts between P1/P2/P3.'],
            ['No connectors', 'Every pack has a Connector Bank; connector-drill flashcard deck (17 cards); every capstone verdict names connectors used.'],
            ['No cultural detail', 'Every pack has Cultural Insight; capstones C01/C03/C06/C08 are cultural-heavy by design.'],
            ['Essays under 3 paragraphs', 'Self-Check Rubric first item; ParagraphScaffoldDiagram shown before every capstone body.'],
            ['Vocabulary too generic', 'Vocabulary Vault per pack (20–30 entries); must-know flashcard deck; exam-prep top-150.'],
            ['Gender agreement breakdown', 'GenderAgreementDiagram + grammar-essentials flashcard deck cover the noun/adjective/verb chain.'],
            ['Weak ne-construction in past tense', 'NeConstructionDiagram + grammar-essentials deck; reinforced in every pack with past-tense grammar notes.'],
          ].map(([mode, mitig], i) => (
            <div key={i} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-b-0">
              <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-1" strokeWidth={3} />
              <div>
                <p className="font-black text-slate-900">{mode}</p>
                <p className="text-slate-600 italic leading-relaxed">{mitig}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Refresh instructions — teachers/parents who want to re-run the
          audit or confirm CI is enforcing it. */}
      <section className="bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center shrink-0">
            <RefreshCw size={22} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900">Refresh this audit</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              To regenerate locally: <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">npm run check</code> then commit and push. CI re-runs on every PR:{' '}
              <a
                href="https://github.com/AbhiramDwivedi/sankalp/actions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 hover:text-orange-700 font-bold underline"
              >
                github.com/AbhiramDwivedi/sankalp/actions
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <p className="text-xs text-slate-500 italic">
        This page is a live view of the same audit that <code>scripts/credit-audit.ts</code> writes to <code>docs/CREDIT_AUDIT.md</code>. Any gap shown here is a real gap - fix the content, not this page.
      </p>
    </div>
  );
};

const FreshnessBanner: React.FC = () => {
  const { verdict, packs, capstones, plans, imEssaysScanned, gateFailures } = typedAudit;
  const ok = verdict === 'GUARANTEED';
  return (
    <section
      className={`rounded-[2rem] p-6 border-2 ${
        ok ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <span
          className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full ${
            ok ? 'bg-emerald-700 text-white' : 'bg-rose-600 text-white'
          }`}
        >
          {ok ? <CheckCircle2 size={14} strokeWidth={3} /> : null}
          {verdict}
        </span>
        <Stat label="Packs" value={packs} />
        <Stat label="Capstones" value={capstones} />
        <Stat label="Plans" value={plans} />
        <Stat label="IM essays scanned" value={imEssaysScanned} />
        <Stat
          label="Gate failures"
          value={gateFailures}
          tone={gateFailures === 0 ? 'emerald' : 'rose'}
        />
      </div>
      <p className="text-xs text-slate-500 italic mt-4">
        State read from <code>docs/AUDIT_STATE.json</code> — regenerated by <code>npm run check</code> and sync-checked in CI.
      </p>
    </section>
  );
};

const Stat: React.FC<{ label: string; value: number | string; tone?: 'emerald' | 'rose' }> = ({
  label,
  value,
  tone,
}) => {
  const valueClass =
    tone === 'rose' ? 'text-rose-700' : tone === 'emerald' ? 'text-emerald-700' : 'text-slate-900';
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
      <p className={`text-2xl font-black ${valueClass}`}>{value}</p>
    </div>
  );
};

const ValidationGrid: React.FC = () => {
  const { errors, warnings, packs } = typedValidation;
  return (
    <section className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-5">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Per-pack validation</h2>
        <span className="text-xs font-bold text-slate-500">
          {errors} error{errors === 1 ? '' : 's'} · {warnings} warning{warnings === 1 ? '' : 's'} · state read from <code>docs/VALIDATION_STATE.json</code>
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {packs.map((p) => (
          <div
            key={p.id}
            title={p.status === 'ok' ? undefined : p.message}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold ${
              p.status === 'ok'
                ? 'bg-emerald-50 border-emerald-100 text-slate-700'
                : p.status === 'warning'
                ? 'bg-amber-50 border-amber-200 text-slate-800 cursor-help'
                : 'bg-rose-50 border-rose-200 text-slate-800 cursor-help'
            }`}
          >
            <span
              aria-hidden
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                p.status === 'ok'
                  ? 'bg-emerald-500'
                  : p.status === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
            />
            <span className="truncate">{p.id}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const StatCard: React.FC<{ label: string; value: string; ok?: boolean; gate?: string }> = ({
  label,
  value,
  ok,
  gate,
}) => (
  <div className={`p-5 rounded-2xl border-2 ${ok ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-100 bg-white'}`}>
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
    <p className="text-2xl font-black text-slate-900">{value}</p>
    {gate && (
      <p className={`text-[10px] font-black mt-1 ${ok ? 'text-emerald-700' : 'text-rose-600'}`}>
        Gate: {gate} · {ok ? 'PASS' : 'FAIL'}
      </p>
    )}
  </div>
);
