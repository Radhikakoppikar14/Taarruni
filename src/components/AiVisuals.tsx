import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SectionArt, ArtVariant } from './SectionArt';

/* =========================================================================
   AI VISUALS – original inline SVG illustrations + a shared page banner.
   Animation is deliberately light: a slow opacity pulse and one gentle float,
   both switched off for prefers-reduced-motion.
========================================================================= */

const STYLE = `
@keyframes aivPulse { 0%,100% { opacity: .22 } 50% { opacity: 1 } }
@keyframes aivFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
.aiv-pulse { animation: aivPulse 3.2s ease-in-out infinite; }
.aiv-float { animation: aivFloat 6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .aiv-pulse, .aiv-float { animation: none; } }
`;

const LINE = 'rgb(var(--fg-rgb) / 0.22)';
const FONT = { fontFamily: 'Unbounded, sans-serif' } as const;
const NODE_COLORS = ['#3ef0ff', '#ff2e88', '#ffd36b'];

/* ------------------------- neural network + AI chip ------------------------- */

const NODES: [number, number][] = [
  [64, 58], [200, 22], [336, 58], [372, 160], [336, 262], [200, 298], [64, 262], [28, 160],
];

export const AiNeuralOrb: React.FC = () => (
  <svg viewBox="0 0 400 320" className="block h-auto w-full" role="img" aria-label="AI neural network illustration">
    <style>{STYLE}</style>
    <defs>
      <radialGradient id="aivGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#3ef0ff" stopOpacity="0.30" />
        <stop offset="0.6" stopColor="#ff2e88" stopOpacity="0.10" />
        <stop offset="1" stopColor="#ff2e88" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="aivChip" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3ef0ff" />
        <stop offset="0.55" stopColor="#ff2e88" />
        <stop offset="1" stopColor="#ffd36b" />
      </linearGradient>
    </defs>

    <circle cx="200" cy="160" r="150" fill="url(#aivGlow)" />
    {[62, 100, 136].map((r) => (
      <circle key={r} cx="200" cy="160" r={r} fill="none" stroke={LINE} strokeDasharray="3 7" />
    ))}

    {NODES.map(([x, y], i) => (
      <g key={i}>
        <line x1="200" y1="160" x2={x} y2={y} stroke={LINE} />
        <line className="aiv-pulse" x1="200" y1="160" x2={x} y2={y} stroke={NODE_COLORS[i % 3]} strokeWidth="2" style={{ animationDelay: `${i * 0.35}s` }} />
        <circle cx={x} cy={y} r="13" fill="var(--bg-surface)" stroke={NODE_COLORS[i % 3]} strokeWidth="2.5" />
        <circle cx={x} cy={y} r="4.5" fill={NODE_COLORS[i % 3]} />
      </g>
    ))}

    {/* chip */}
    <g className="aiv-float">
      {[-28, -9, 10, 29].map((o) => (
        <g key={o} stroke="url(#aivChip)" strokeWidth="3" strokeLinecap="round">
          <line x1={200 + o} y1="108" x2={200 + o} y2="120" />
          <line x1={200 + o} y1="200" x2={200 + o} y2="212" />
          <line x1="148" y1={160 + o} x2="160" y2={160 + o} />
          <line x1="240" y1={160 + o} x2="252" y2={160 + o} />
        </g>
      ))}
      <rect x="158" y="118" width="84" height="84" rx="18" fill="var(--bg-surface)" stroke="url(#aivChip)" strokeWidth="3.5" />
      <text x="200" y="171" textAnchor="middle" fontSize="28" fontWeight="900" fill="var(--text-strong)" style={FONT}>AI</text>
    </g>
  </svg>
);

/* ------------------------------ friendly AI robot ------------------------------ */

export const AiRobot: React.FC = () => (
  <svg viewBox="0 0 400 320" className="block h-auto w-full" role="img" aria-label="AI assistant illustration">
    <style>{STYLE}</style>
    <defs>
      <radialGradient id="aivBg2" cx="50%" cy="55%" r="50%">
        <stop offset="0" stopColor="#ff2e88" stopOpacity="0.22" />
        <stop offset="0.65" stopColor="#3ef0ff" stopOpacity="0.08" />
        <stop offset="1" stopColor="#3ef0ff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="aivHead" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3ef0ff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#ff2e88" stopOpacity="0.45" />
      </linearGradient>
    </defs>
    <circle cx="200" cy="170" r="140" fill="url(#aivBg2)" />

    <g className="aiv-float">
      {/* antenna */}
      <line x1="200" y1="70" x2="200" y2="96" stroke="#ff2e88" strokeWidth="4" strokeLinecap="round" />
      <circle className="aiv-pulse" cx="200" cy="62" r="9" fill="#ff2e88" />
      {/* ears */}
      <rect x="96" y="132" width="16" height="40" rx="7" fill="#3ef0ff" fillOpacity="0.5" stroke="#3ef0ff" strokeWidth="2" />
      <rect x="288" y="132" width="16" height="40" rx="7" fill="#3ef0ff" fillOpacity="0.5" stroke="#3ef0ff" strokeWidth="2" />
      {/* head */}
      <rect x="110" y="96" width="180" height="112" rx="34" fill="url(#aivHead)" stroke="var(--text-strong)" strokeOpacity="0.55" strokeWidth="2.5" />
      <rect x="128" y="112" width="144" height="80" rx="24" fill="#0b1220" />
      {/* eyes + mouth */}
      <circle className="aiv-pulse" cx="170" cy="146" r="11" fill="#3ef0ff" />
      <circle className="aiv-pulse" cx="230" cy="146" r="11" fill="#3ef0ff" style={{ animationDelay: '0.4s' }} />
      <path d="M180 172 Q200 184 220 172" fill="none" stroke="#ffd36b" strokeWidth="4" strokeLinecap="round" />
      {/* neck + body */}
      <rect x="186" y="208" width="28" height="14" rx="4" fill="rgb(var(--fg-rgb) / 0.25)" />
      <rect x="140" y="222" width="120" height="74" rx="26" fill="var(--bg-surface)" stroke="var(--text-strong)" strokeOpacity="0.55" strokeWidth="2.5" />
      <circle cx="200" cy="259" r="14" fill="none" stroke="#ff2e88" strokeWidth="3" />
      <circle className="aiv-pulse" cx="200" cy="259" r="5" fill="#ff2e88" />
      {/* arms */}
      <path d="M140 244 Q112 252 108 280" fill="none" stroke="#3ef0ff" strokeWidth="9" strokeLinecap="round" />
      <path d="M260 244 Q288 252 292 280" fill="none" stroke="#3ef0ff" strokeWidth="9" strokeLinecap="round" />
    </g>

    {/* speech bubble */}
    <g>
      <path d="M262 24 h104 a14 14 0 0 1 14 14 v36 a14 14 0 0 1 -14 14 h-78 l-18 16 v-16 h-8 a14 14 0 0 1 -14 -14 v-36 a14 14 0 0 1 14 -14z" fill="var(--bg-surface)" stroke="#ff2e88" strokeWidth="2.5" />
      <text x="320" y="50" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="var(--text-strong)" style={FONT}>Tell us your</text>
      <text x="320" y="68" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="var(--text-strong)" style={FONT}>big idea</text>
    </g>

    {/* floating tags */}
    {[
      { x: 22, y: 98, t: '</>', c: '#3ef0ff' },
      { x: 18, y: 188, t: 'SEO', c: '#ffd36b' },
      { x: 318, y: 190, t: '3D', c: '#ff2e88' },
    ].map((g, i) => (
      <g key={g.t} className="aiv-pulse" style={{ animationDelay: `${i * 0.7}s` }}>
        <rect x={g.x} y={g.y} width="62" height="30" rx="15" fill="var(--bg-surface)" stroke={g.c} strokeWidth="2.5" />
        <text x={g.x + 31} y={g.y + 20} textAnchor="middle" fontSize="12" fontWeight="900" fill="var(--text-strong)" style={FONT}>{g.t}</text>
      </g>
    ))}
  </svg>
);

/* ------------------------------- 3D tilt wrapper ------------------------------- */
/* Pointer-driven tilt with a soft glare. Cheap: one transform write per move,
   skipped on touch screens and for prefers-reduced-motion. */

export const Tilt3D: React.FC<{ children: React.ReactNode; className?: string; max?: number }> = ({ children, className = '', max = 7 }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const glare = React.useRef<HTMLSpanElement>(null);
  const enabled = () =>
    typeof window !== 'undefined' &&
    !window.matchMedia('(pointer: coarse)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transition = 'transform 0.12s ease-out';
    el.style.transform = `perspective(900px) rotateX(${((0.5 - y) * max * 2).toFixed(2)}deg) rotateY(${((x - 0.5) * max * 2).toFixed(2)}deg) translateY(-4px)`;
    if (glare.current) {
      glare.current.style.opacity = '1';
      glare.current.style.background = `radial-gradient(220px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.45), transparent 62%)`;
    }
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.45s cubic-bezier(0.16,1,0.3,1)';
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    if (glare.current) glare.current.style.opacity = '0';
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`relative h-full ${className}`} style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
      {children}
      <span ref={glare} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300" />
    </div>
  );
};

/* ------------------------------- shared banner ------------------------------- */

export interface BannerChip {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
}

export const PageBanner: React.FC<{
  kicker: string;
  kickerColor?: string;
  title: React.ReactNode;
  text: string;
  chips?: BannerChip[];
  art: React.ReactNode;
  tint?: 'cyan' | 'magenta';
}> = ({ kicker, kickerColor = 'var(--accent-cyan-ink)', title, text, chips = [], art, tint = 'cyan' }) => {
  const wash =
    tint === 'cyan'
      ? 'radial-gradient(60% 80% at 0% 0%, rgba(62,240,255,0.30), transparent 70%), radial-gradient(55% 70% at 100% 100%, rgba(255,46,136,0.18), transparent 70%)'
      : 'radial-gradient(60% 80% at 0% 0%, rgba(255,46,136,0.22), transparent 70%), radial-gradient(55% 70% at 100% 100%, rgba(62,240,255,0.26), transparent 70%)';
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2rem] border p-5 sm:p-8"
      style={{ borderColor: 'rgb(var(--fg-rgb) / 0.12)', background: `${wash}, var(--bg-surface)` }}
    >
      <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: kickerColor }}>{kicker}</div>
          <h1 className="mt-3 font-display font-black leading-[1.05] tracking-tight" style={{ color: 'var(--text-strong)', fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>{text}</p>
          {chips.length > 0 && (
            <ul className="mt-6 flex list-none flex-wrap gap-2.5">
              {chips.map(({ icon: Icon, label }, i) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-display font-bold"
                  style={{ borderColor: 'rgb(var(--fg-rgb) / 0.14)', background: 'var(--bg-surface)', color: 'var(--text-soft)' }}
                >
                  <Icon className="h-4 w-4" style={{ color: ['var(--accent-cyan-ink)', 'var(--accent-magenta-ink)', 'var(--accent-gold-ink)'][i % 3] }} />
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mx-auto w-full max-w-[400px] lg:col-span-5"><Tilt3D max={6} className="rounded-3xl"><div className="h-full" style={{ transform: 'translateZ(30px)' }}>{art}</div></Tilt3D></div>
      </div>
    </motion.section>
  );
};

/* ------------- page header: same structure as the Clients / Process sections ------------- */

export const PageHeader: React.FC<{
  kicker: string;
  title: string;
  text: string;
  variant: ArtVariant;
  children?: React.ReactNode;
}> = ({ kicker, title, text, variant, children }) => (
  <motion.header
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
  >
    <div className="lg:col-span-7">
      <div className="mb-2 flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-[#3ef0ff]">
        <Sparkles className="h-3.5 w-3.5 text-[#3ef0ff]" />
        <span>{kicker}</span>
      </div>
      <h1 className="mb-4 font-display text-3xl font-black tracking-tight text-white sm:text-5xl">{title}</h1>
      <p className="text-base leading-relaxed text-[#9a9ca8]">{text}</p>
      {children}
    </div>
    <div className="lg:col-span-5">
      <SectionArt variant={variant} />
    </div>
  </motion.header>
);