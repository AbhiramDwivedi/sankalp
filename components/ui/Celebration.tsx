import React, { useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import type { CelebrationMessage } from '../../content/celebrations';

// -----------------------------------------------------------------------------
// Celebration - lightweight overlay shown briefly when a student completes a
// meaningful thing (pack, capstone, deck, plan milestone, STAMP-ready).
//
// Design goals:
//   - Unobtrusive. Bottom-right card, not a full-screen modal. The student can
//     keep navigating; nav is not blocked.
//   - CSS-only animation. No deps. Respects prefers-reduced-motion.
//   - Auto-dismisses after ~6 seconds. Click outside or the X dismisses early.
//   - Screen-only. Never prints (the `no-print` utility + the print CSS in
//     index.html hides it on paper).
//
// Confetti: 20 particles with randomized translate/rotate/color. @keyframes
// lives in a <style> tag scoped via a data-attribute so we don't fight the
// Tailwind-via-CDN styling model. When the OS requests reduced motion, the
// particles render as a static sparkle burst instead.
// -----------------------------------------------------------------------------

interface CelebrationProps {
  message: CelebrationMessage;
  onDismiss: () => void;
  /** Auto-dismiss delay in ms. Default 6000. */
  autoDismissMs?: number;
}

const PARTICLE_COUNT = 20;
const PARTICLE_COLORS = [
  '#f97316', // orange-500
  '#f59e0b', // amber-500
  '#10b981', // emerald-500
  '#6366f1', // indigo-500
  '#ec4899', // pink-500
  '#eab308', // yellow-500
];

// Deterministic particle layout - cheaper than Math.random per mount and
// avoids a re-layout flash between renders.
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const seed = (i + 1) * 9301 + 49297;
  const rand = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return x - Math.floor(x);
  };
  return {
    id: i,
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    tx: (rand(1) - 0.5) * 240,
    ty: 60 + rand(2) * 140,
    rot: (rand(3) - 0.5) * 1440,
    delay: rand(4) * 200,
    size: 6 + rand(5) * 6,
  };
});

/**
 * The <style> block is rendered once per Celebration mount. Since the
 * component unmounts after the animation finishes we don't risk collisions.
 */
const CELEBRATION_STYLE = `
@keyframes sankalp-celebration-fly {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(0.6);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--sankalp-tx), var(--sankalp-ty)) rotate(var(--sankalp-rot)) scale(1);
    opacity: 0;
  }
}

@keyframes sankalp-celebration-enter {
  0% {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.sankalp-celebration-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 9999px;
  pointer-events: none;
  animation: sankalp-celebration-fly 1.6s cubic-bezier(0.2, 0.6, 0.3, 1) forwards;
}

.sankalp-celebration-card {
  animation: sankalp-celebration-enter 0.35s cubic-bezier(0.2, 0.7, 0.3, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .sankalp-celebration-particle {
    animation: none;
    opacity: 0.85;
  }
  .sankalp-celebration-card {
    animation: none;
  }
}
`;

export const Celebration: React.FC<CelebrationProps> = ({
  message,
  onDismiss,
  autoDismissMs = 6000,
}) => {
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;

  // Auto-dismiss.
  useEffect(() => {
    const t = window.setTimeout(() => dismissRef.current(), autoDismissMs);
    return () => window.clearTimeout(t);
  }, [autoDismissMs, message.id]);

  // Esc to dismiss.
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissRef.current();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  return (
    <div
      className="no-print fixed inset-0 z-[200] pointer-events-none"
      aria-live="polite"
      role="status"
    >
      <style dangerouslySetInnerHTML={{ __html: CELEBRATION_STYLE }} />
      {/* Card only - no full-screen scrim. Dismissal is X-button, Escape, or
          auto-timeout. This keeps the app underneath fully interactive. */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 w-[calc(100vw-3rem)] max-w-md pointer-events-auto"
        data-testid="celebration"
      >
        <div className="sankalp-celebration-card relative bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden">
          {/* Confetti burst originates from the icon area at top. */}
          <div className="relative h-0 overflow-visible">
            <div className="absolute top-6 left-8 w-0 h-0">
              {PARTICLES.map((p) => (
                <span
                  key={p.id}
                  className="sankalp-celebration-particle"
                  style={
                    {
                      background: p.color,
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      animationDelay: `${p.delay}ms`,
                      ['--sankalp-tx' as string]: `${p.tx}px`,
                      ['--sankalp-ty' as string]: `${p.ty}px`,
                      ['--sankalp-rot' as string]: `${p.rot}deg`,
                    } as React.CSSProperties
                  }
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="p-5 pr-12 flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md">
              <Sparkles size={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              {message.lead && (
                <p
                  className="text-lg font-black text-orange-700 leading-tight mb-1"
                  style={{ fontFamily: '"Tiro Devanagari Hindi", "Noto Sans Devanagari", serif' }}
                >
                  {message.lead}
                </p>
              )}
              <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed">
                {message.body}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
