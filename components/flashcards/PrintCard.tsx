import React from 'react';
import type { Flashcard } from '../../content/schema';

/**
 * Purely presentational, print-only flashcard face.
 *
 * Intentionally decoupled from `FlashcardItem` (screen flip card) so print
 * layout changes never drag in screen-only state, animation, or click
 * handlers. Fixed dimensions (3.5in × 2.5in — standard US index-card size)
 * so the browser's print engine cannot flex or shrink cards to fit.
 *
 * `showIndex` is a debug affordance for fold-alignment verification; it is
 * wired to a `?printtest=1` URL flag by PrintSheet and is OFF by default.
 */

interface PrintCardProps {
  card: Flashcard;
  face: 'front' | 'back';
  /** Optional overlay index for duplex alignment verification. */
  showIndex?: number;
}

export const PrintCard: React.FC<PrintCardProps> = ({ card, face, showIndex }) => {
  const content = face === 'front' ? card.front : card.back;

  return (
    <div
      className="print-card"
      data-card-id={card.id}
      data-card-face={face}
      data-card-index={showIndex}
      style={{
        width: '3.5in',
        height: '2.5in',
        boxSizing: 'border-box',
        border: '1px solid #94a3b8',
        borderRadius: '0.08in',
        padding: '0.18in 0.22in',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        breakInside: 'avoid',
        pageBreakInside: 'avoid',
        background: 'white',
        color: '#0f172a',
        fontSize: '11pt',
        lineHeight: 1.25,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          fontSize: '6.5pt',
          fontWeight: 900,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#94a3b8',
        }}
      >
        <span>
          {card.kind} · {card.priority}
        </span>
        {typeof showIndex === 'number' && (
          <span style={{ color: '#dc2626', fontSize: '12pt' }}>#{showIndex}</span>
        )}
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: '0.04in',
          minHeight: 0,
        }}
      >
        {content.prompt && !content.hindi && (
          <div style={{ fontSize: '22pt', fontWeight: 800, color: '#334155' }}>
            {content.prompt}
          </div>
        )}
        {content.hindi && (
          <div
            className="font-hindi"
            style={{
              fontSize: '14pt',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.4,
            }}
          >
            {content.hindi}
          </div>
        )}
        {content.prompt && content.hindi && (
          <div style={{ fontSize: '8pt', fontStyle: 'italic', color: '#64748b' }}>
            {content.prompt}
          </div>
        )}
        {content.english && (
          <div style={{ fontSize: '10pt', fontWeight: 700, color: '#1e293b' }}>
            {content.english}
          </div>
        )}
        {content.example && (
          <div
            className="font-hindi"
            style={{ fontSize: '9pt', color: '#475569', lineHeight: 1.35 }}
          >
            {content.example}
          </div>
        )}
        {content.note && (
          <div style={{ fontSize: '7.5pt', fontStyle: 'italic', color: '#64748b' }}>
            {content.note}
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: '6pt',
          color: '#cbd5e1',
          textAlign: 'right',
        }}
      >
        {card.id}
      </div>
    </div>
  );
};

/**
 * Empty slot placeholder for partial final pages. Keeps the 4-row fold
 * grid dimensions intact so no card shifts position.
 */
export const PrintCardBlank: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      width: '3.5in',
      height: '2.5in',
      boxSizing: 'border-box',
      border: '1px dashed #e2e8f0',
      borderRadius: '0.08in',
      breakInside: 'avoid',
      pageBreakInside: 'avoid',
    }}
  />
);
