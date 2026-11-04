import React from 'react';

/* =========================================================================
   BRAND LOGO – Taarruni Design Solutions
   Pure SVG so it needs no network request and its text colour follows the
   active theme through the `--text-strong` token:
     dark theme  -> white text
     light theme -> dark text
   The red ring and the "DESIGN SOLUTIONS" line stay brand red in both.
========================================================================= */

const RED = '#e8231f';
const TEXT = 'var(--text-strong)';

interface BrandLogoProps {
  /** Rendered height in px (width scales automatically). */
  height?: number;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ height = 40, className }) => (
  <svg
    viewBox="0 0 300 64"
    height={height}
    className={className}
    style={{ width: 'auto', display: 'block', overflow: 'visible' }}
    role="img"
    aria-label="Taarruni Design Solutions"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Red ring mark with the word "taarruni" inside */}
    <circle cx="32" cy="32" r="28" fill="none" stroke={RED} strokeWidth="4" />
    <circle cx="57" cy="45" r="3.2" fill="var(--bg-graphite)" />
    <text
      x="32"
      y="36.5"
      textAnchor="middle"
      fontSize="13"
      fontWeight="600"
      fontFamily="'Space Grotesk', 'Inter', system-ui, sans-serif"
      fill={TEXT}
      style={{ transition: 'fill 0.4s ease' }}
    >
      taarruni
    </text>

    {/* Wordmark */}
    <text
      x="78"
      y="30"
      fontSize="26"
      fontWeight="300"
      letterSpacing="5.5"
      fontFamily="'Space Grotesk', 'Inter', system-ui, sans-serif"
      fill={TEXT}
      style={{ transition: 'fill 0.4s ease' }}
    >
      TAARRUNI
    </text>
    <text
      x="79"
      y="50"
      fontSize="12.5"
      fontWeight="500"
      letterSpacing="2.6"
      fontFamily="'Space Grotesk', 'Inter', system-ui, sans-serif"
      fill={RED}
    >
      DESIGN SOLUTIONS
    </text>
  </svg>
);