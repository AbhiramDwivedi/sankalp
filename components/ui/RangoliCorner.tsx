import React from 'react';

interface RangoliCornerProps {
  className?: string;
  color?: string;
  corner?: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;
}

const cornerRotation = {
  tl: 0,
  tr: 90,
  br: 180,
  bl: 270,
};

export const RangoliCorner: React.FC<RangoliCornerProps> = ({
  className = '',
  color = '#ea580c',
  corner = 'tl',
  size = 80,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ transform: `rotate(${cornerRotation[corner]}deg)` }}
    aria-hidden
  >
    <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.7">
      <path d="M6 74 Q 6 30 50 30" />
      <path d="M12 74 Q 12 36 50 36" />
      <circle cx="22" cy="58" r="3" fill={color} opacity="0.3" />
      <circle cx="38" cy="44" r="2" fill={color} opacity="0.5" />
      <path d="M8 8 L 20 20 M 14 8 L 22 16 M 8 14 L 16 22" strokeLinecap="round" />
      <path d="M 6 22 Q 18 22 22 6" />
    </g>
  </svg>
);
