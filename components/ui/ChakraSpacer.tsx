import React from 'react';

interface ChakraSpacerProps {
  className?: string;
  color?: string;
  size?: number;
}

export const ChakraSpacer: React.FC<ChakraSpacerProps> = ({
  className = '',
  color = '#ea580c',
  size = 32,
}) => (
  <div className={`flex items-center justify-center my-6 ${className}`} aria-hidden>
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="3" fill={color} />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 16 + Math.cos(angle) * 6;
        const y1 = 16 + Math.sin(angle) * 6;
        const x2 = 16 + Math.cos(angle) * 13;
        const y2 = 16 + Math.sin(angle) * 13;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="16" cy="16" r="15" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
    </svg>
  </div>
);
