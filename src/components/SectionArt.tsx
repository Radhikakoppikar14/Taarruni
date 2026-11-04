import React from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/* =========================================================================
   SECTION ART
   Theme-aware illustrated "images" for page headers. Drawn as inline SVG, so
   there is no network request that can fail, they recolour instantly with the
   light/dark theme (colours come from the CSS variables), and they animate
   every time the page is opened: float, pointer tilt, and per-scene motion.
========================================================================= */

export type ArtVariant = 'about' | 'services' | 'marketing' | 'it' | 'branding' | 'careers' | 'contact' | 'portfolio' | 'clients' | 'testimonials' | 'process';

const FONT = "Unbounded, Manrope, system-ui, sans-serif";
const C = 'var(--accent-cyan)';
const M = 'var(--accent-magenta)';
const G = 'var(--accent-gold)';
const LINE = 'rgb(var(--fg-rgb) / 0.16)';
const SOFT = 'rgb(var(--fg-rgb) / 0.07)';
const INK = 'var(--text-strong)';
const MUTED = 'var(--text-muted)';

/* ------------------------------- scenes -------------------------------- */

const About: React.FC = () => (
  <>
    {/* skyline */}
    {[
      [28, 120, 34], [68, 90, 30], [104, 140, 40], [150, 105, 32], [188, 160, 44], [238, 115, 34], [278, 135, 38], [322, 95, 30],
    ].map(([x, h, w], i) => (
      <g key={i}>
        <rect x={x} y={230 - h} width={w} height={h} rx="3" style={{ fill: SOFT, stroke: LINE }} />
        {Array.from({ length: Math.floor(h / 22) }).map((_, r) => (
          <rect
            key={r}
            className="sa-twinkle"
            x={x + 7}
            y={230 - h + 10 + r * 20}
            width={w - 14}
            height="6"
            rx="2"
            style={{ fill: i % 3 === 0 ? C : i % 3 === 1 ? M : G, animationDelay: `${(i * 0.37 + r * 0.53) % 3}s` }}
          />
        ))}
      </g>
    ))}
    {/* timeline path */}
    <path d="M20 232 H380" style={{ stroke: LINE }} strokeWidth="2" />
    <path className="sa-draw" d="M24 200 C 90 190, 120 150, 180 140 S 300 80, 376 50" fill="none" style={{ stroke: M }} strokeWidth="3" strokeLinecap="round" />
    {[
      [24, 200, '2005'],
      [180, 140, '2015'],
      [376, 50, 'NOW'],
    ].map(([x, y, t], i) => (
      <g key={i}>
        <circle cx={x as number} cy={y as number} r="7" style={{ fill: 'var(--bg-surface)', stroke: C }} strokeWidth="3" />
        <circle className="sa-pulse" cx={x as number} cy={y as number} r="7" style={{ fill: 'none', stroke: C }} />
        <text x={x as number} y={(y as number) - 16} textAnchor="middle" fontSize="11" fontWeight="800" style={{ fill: INK, fontFamily: FONT }}>
          {t}
        </text>
      </g>
    ))}
  </>
);

const Services: React.FC = () => {
  const pillars = [
    { x: 40, color: C, h: 150, label: 'MARKETING', glyph: '↗' },
    { x: 150, color: M, h: 190, label: 'BRANDING', glyph: '◆' },
    { x: 260, color: G, h: 130, label: 'IT', glyph: '</>' },
  ];
  return (
    <>
      {pillars.map((p, i) => (
        <g key={p.label}>
          <rect
            className="sa-rise"
            x={p.x}
            y={230 - p.h}
            width="100"
            height={p.h}
            rx="16"
            style={{ fill: SOFT, stroke: p.color, animationDelay: `${i * 0.15}s` }}
            strokeWidth="2"
          />
          <rect x={p.x} y={230 - p.h} width="100" height="46" rx="16" style={{ fill: p.color, opacity: 0.22 }} />
          <text x={p.x + 50} y={230 - p.h + 31} textAnchor="middle" fontSize="22" fontWeight="800" style={{ fill: p.color, fontFamily: FONT }}>
            {p.glyph}
          </text>
          <text x={p.x + 50} y={230 - 16} textAnchor="middle" fontSize="9.5" fontWeight="800" letterSpacing="1.4" style={{ fill: INK, fontFamily: FONT }}>
            {p.label}
          </text>
          {[0, 1, 2].map((r) => (
            <rect key={r} x={p.x + 16} y={230 - p.h + 64 + r * 16} width={68 - r * 14} height="6" rx="3" style={{ fill: LINE }} />
          ))}
        </g>
      ))}
      <path d="M20 232 H380" style={{ stroke: LINE }} strokeWidth="2" />
    </>
  );
};

const Marketing: React.FC = () => (
  <>
    {[40, 75, 60, 110, 95, 150, 185].map((h, i) => (
      <rect
        key={i}
        className="sa-bar"
        x={36 + i * 46}
        y={230 - h}
        width="30"
        height={h}
        rx="6"
        style={{ fill: i % 2 ? M : C, animationDelay: `${i * 0.12}s`, opacity: 0.9 }}
      />
    ))}
    <path className="sa-draw" d="M40 190 L120 150 L190 165 L260 100 L330 70 L372 40" fill="none" style={{ stroke: G }} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M360 36 L376 38 L368 52" fill="none" style={{ stroke: G }} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 232 H380" style={{ stroke: LINE }} strokeWidth="2" />
    {/* reach badge */}
    <g className="sa-float">
      <rect x="30" y="22" width="118" height="42" rx="12" style={{ fill: 'var(--bg-surface)', stroke: LINE }} />
      <text x="44" y="40" fontSize="9" fontWeight="700" style={{ fill: MUTED, fontFamily: FONT }}>ORGANIC REACH</text>
      <text x="44" y="56" fontSize="15" fontWeight="800" style={{ fill: C, fontFamily: FONT }}>+248%</text>
    </g>
  </>
);

const IT: React.FC = () => (
  <>
    <rect x="40" y="34" width="320" height="196" rx="16" style={{ fill: 'var(--bg-surface)', stroke: LINE }} strokeWidth="2" />
    <path d="M40 66 H360" style={{ stroke: LINE }} strokeWidth="2" />
    {[M, G, C].map((c, i) => (
      <circle key={i} cx={62 + i * 18} cy="50" r="5" style={{ fill: c }} />
    ))}
    {[
      [64, 90, 90, C], [160, 90, 60, M], [64, 110, 130, G], [208, 110, 70, C], [80, 130, 100, M],
      [64, 150, 70, C], [144, 150, 110, G], [80, 170, 60, M], [148, 170, 90, C], [64, 190, 50, G],
    ].map(([x, y, w, c], i) => (
      <rect key={i} className="sa-type" x={x as number} y={y as number} width={w as number} height="8" rx="4" style={{ fill: c as string, opacity: 0.85, animationDelay: `${i * 0.18}s` }} />
    ))}
    <rect className="sa-blink" x="118" y="188" width="8" height="12" style={{ fill: INK }} />
    {/* floating gear + badge */}
    <g className="sa-spin" style={{ transformOrigin: '332px 200px' }}>
      <circle cx="332" cy="200" r="24" fill="none" style={{ stroke: M }} strokeWidth="6" strokeDasharray="7 6" />
      <circle cx="332" cy="200" r="9" style={{ fill: M }} />
    </g>
    <g className="sa-float">
      <rect x="276" y="20" width="108" height="34" rx="10" style={{ fill: 'var(--bg-surface)', stroke: C }} />
      <text x="330" y="42" textAnchor="middle" fontSize="12" fontWeight="800" style={{ fill: C, fontFamily: FONT }}>{'</> LIVE'}</text>
    </g>
  </>
);

const Branding: React.FC = () => (
  <>
    {/* light beams */}
    {[120, 200, 280].map((x, i) => (
      <polygon key={i} className="sa-beam" points={`${x},46 ${x - 30},230 ${x + 30},230`} style={{ fill: [C, M, G][i], animationDelay: `${i * 0.5}s` }} />
    ))}
    {/* posts */}
    <rect x="150" y="150" width="10" height="82" style={{ fill: LINE }} />
    <rect x="240" y="150" width="10" height="82" style={{ fill: LINE }} />
    {/* billboard */}
    <rect x="60" y="50" width="280" height="110" rx="12" style={{ fill: 'var(--bg-surface)', stroke: LINE }} strokeWidth="3" />
    <rect x="72" y="62" width="256" height="86" rx="8" style={{ fill: 'url(#sa-brand-grad)' }} />
    <text x="200" y="116" textAnchor="middle" fontSize="38" fontWeight="900" style={{ fill: '#0b1220', fontFamily: FONT }}>TDS</text>
    <rect className="sa-shine" x="72" y="62" width="50" height="86" rx="8" style={{ fill: 'white', opacity: 0.35 }} />
    <path d="M20 232 H380" style={{ stroke: LINE }} strokeWidth="2" />
  </>
);

const Careers: React.FC = () => (
  <>
    {[
      [78, C], [158, M], [238, G], [318, C],
    ].map(([x, c], i) => (
      <g key={i} className="sa-float" style={{ animationDelay: `${i * 0.4}s` }}>
        <circle cx={x as number} cy="118" r="26" style={{ fill: c as string, opacity: 0.9 }} />
        <path d={`M${(x as number) - 38} 200 a38 38 0 0 1 76 0 v28 h-76z`} style={{ fill: c as string, opacity: 0.35 }} />
        <circle cx={(x as number) - 8} cy="114" r="3" style={{ fill: '#0b1220' }} />
        <circle cx={(x as number) + 8} cy="114" r="3" style={{ fill: '#0b1220' }} />
        <path d={`M${(x as number) - 8} 126 q8 7 16 0`} fill="none" style={{ stroke: '#0b1220' }} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    ))}
    <path d="M104 150 H132 M184 150 H212 M264 150 H292" style={{ stroke: LINE }} strokeWidth="2" strokeDasharray="4 5" />
    <g className="sa-float">
      <rect x="120" y="22" width="160" height="40" rx="20" style={{ fill: 'var(--bg-surface)', stroke: M }} strokeWidth="2" />
      <text x="200" y="47" textAnchor="middle" fontSize="12" fontWeight="800" style={{ fill: M, fontFamily: FONT }}>WE'RE HIRING</text>
    </g>
  </>
);

const Contact: React.FC = () => (
  <>
    <circle cx="200" cy="130" r="98" style={{ fill: SOFT, stroke: LINE }} strokeWidth="2" />
    <ellipse cx="200" cy="130" rx="98" ry="38" fill="none" style={{ stroke: LINE }} />
    <ellipse cx="200" cy="130" rx="42" ry="98" fill="none" style={{ stroke: LINE }} />
    <path d="M102 130 H298 M200 32 V228" style={{ stroke: LINE }} />
    <g className="sa-spin-slow" style={{ transformOrigin: '200px 130px' }}>
      <circle cx="200" cy="130" r="108" fill="none" style={{ stroke: C }} strokeWidth="1.5" strokeDasharray="3 9" />
    </g>
    {/* arc between the two offices */}
    <path className="sa-draw" d="M262 168 Q 200 40 122 100" fill="none" style={{ stroke: M }} strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" />
    {[
      [262, 168, 'BANGALORE', C],
      [122, 100, 'CALIFORNIA', G],
    ].map(([x, y, t, c], i) => (
      <g key={i}>
        <circle className="sa-pulse" cx={x as number} cy={y as number} r="8" style={{ fill: 'none', stroke: c as string }} />
        <circle cx={x as number} cy={y as number} r="7" style={{ fill: c as string }} />
        <text x={x as number} y={(y as number) + (i === 0 ? 26 : -14)} textAnchor="middle" fontSize="9.5" fontWeight="800" letterSpacing="1.2" style={{ fill: INK, fontFamily: FONT }}>
          {t}
        </text>
      </g>
    ))}
  </>
);

/* star polygon helper */
const star = (cx: number, cy: number, r: number) =>
  Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`;
  }).join(' ');

const Portfolio: React.FC = () => (
  <>
    {/* side frames */}
    {[[24, 70, C], [286, 70, M]].map(([x, y, c], i) => (
      <g key={i} className="sa-float" style={{ animationDelay: `${i * 0.6}s` }}>
        <rect x={x as number} y={y as number} width="90" height="116" rx="8" style={{ fill: 'var(--bg-surface)', stroke: LINE }} strokeWidth="3" />
        <rect x={(x as number) + 9} y={(y as number) + 9} width="72" height="98" rx="4" style={{ fill: c as string, opacity: 0.22 }} />
        <circle cx={(x as number) + 56} cy={(y as number) + 38} r="11" style={{ fill: G }} />
        <polygon points={`${(x as number) + 9},${(y as number) + 107} ${(x as number) + 38},${(y as number) + 56} ${(x as number) + 64},${(y as number) + 107}`} style={{ fill: c as string, opacity: 0.85 }} />
      </g>
    ))}
    {/* centre monitor */}
    <g className="sa-float">
      <rect x="108" y="28" width="184" height="124" rx="12" style={{ fill: 'var(--bg-surface)', stroke: LINE }} strokeWidth="3" />
      <rect x="120" y="40" width="160" height="100" rx="6" style={{ fill: 'url(#sa-brand-grad)' }} />
      <circle cx="238" cy="68" r="14" style={{ fill: 'white', opacity: 0.85 }} />
      <polygon points="120,140 168,84 206,124 232,102 280,140" style={{ fill: '#0b1220', opacity: 0.35 }} />
      <rect className="sa-shine" x="120" y="40" width="44" height="100" rx="6" style={{ fill: 'white', opacity: 0.3 }} />
      <rect x="190" y="152" width="20" height="20" style={{ fill: LINE }} />
      <rect x="164" y="172" width="72" height="8" rx="4" style={{ fill: LINE }} />
    </g>
    {/* thumbnail strip */}
    {[[116, C], [160, M], [204, G], [248, C]].map(([x, c], i) => (
      <rect key={i} className="sa-rise" x={x as number} y="198" width="36" height="28" rx="6" style={{ fill: c as string, opacity: 0.8, animationDelay: `${0.2 + i * 0.12}s` }} />
    ))}
    {[[60, 36], [350, 48], [38, 214], [372, 204]].map(([x, y], i) => (
      <polygon key={i} className="sa-twinkle" points={star(x, y, 6)} style={{ fill: G, animationDelay: `${i * 0.5}s` }} />
    ))}
  </>
);

const Clients: React.FC = () => (
  <>
    <g className="sa-spin-slow" style={{ transformOrigin: '200px 125px' }}>
      <circle cx="200" cy="125" r="88" fill="none" style={{ stroke: LINE }} strokeDasharray="3 7" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i;
        const x = 200 + Math.cos(a) * 88;
        const y = 125 + Math.sin(a) * 88;
        const c = [C, M, G][i % 3];
        return (
          <g key={i}>
            <path d={`M200 125 L${x} ${y}`} style={{ stroke: c }} strokeWidth="1.5" opacity="0.5" />
            <rect x={x - 20} y={y - 14} width="40" height="28" rx="7" style={{ fill: '#ffffff', stroke: c }} strokeWidth="2" />
            <rect x={x - 11} y={y - 4} width="22" height="8" rx="4" style={{ fill: c }} opacity="0.85" />
          </g>
        );
      })}
    </g>
    {/* centre hub */}
    <circle className="sa-pulse" cx="200" cy="125" r="30" style={{ fill: 'none', stroke: C }} />
    <circle cx="200" cy="125" r="32" style={{ fill: 'var(--bg-surface)', stroke: 'url(#sa-brand-grad)' }} strokeWidth="4" />
    <text x="200" y="131" textAnchor="middle" fontSize="17" fontWeight="900" style={{ fill: INK, fontFamily: FONT }}>TDS</text>
    <text x="200" y="238" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="3" style={{ fill: MUTED, fontFamily: FONT }}>76 CLIENTS</text>
  </>
);

const Testimonials: React.FC = () => (
  <>
    {/* big bubble */}
    <g className="sa-float">
      <rect x="40" y="30" width="230" height="112" rx="18" style={{ fill: 'var(--bg-surface)', stroke: M }} strokeWidth="2.5" />
      <path d="M92 142 L82 172 L124 142 Z" style={{ fill: 'var(--bg-surface)', stroke: M }} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="86" y="138" width="40" height="6" style={{ fill: 'var(--bg-surface)' }} />
      <text x="64" y="84" fontSize="56" fontWeight="900" style={{ fill: M, fontFamily: FONT }}>“</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon key={i} className="sa-twinkle" points={star(98 + i * 26, 56, 9)} style={{ fill: G, animationDelay: `${i * 0.25}s` }} />
      ))}
      <rect className="sa-type" x="96" y="84" width="150" height="8" rx="4" style={{ fill: LINE }} />
      <rect className="sa-type" x="96" y="102" width="120" height="8" rx="4" style={{ fill: LINE, animationDelay: '0.3s' }} />
    </g>
    {/* small bubble */}
    <g className="sa-float" style={{ animationDelay: '0.8s' }}>
      <rect x="226" y="140" width="140" height="70" rx="16" style={{ fill: 'var(--bg-surface)', stroke: C }} strokeWidth="2.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon key={i} points={star(250 + i * 22, 164, 7)} style={{ fill: G }} />
      ))}
      <rect x="240" y="182" width="100" height="7" rx="3.5" style={{ fill: LINE }} />
    </g>
    {/* avatars */}
    {[[64, 206, C], [104, 206, G]].map(([x, y, c], i) => (
      <g key={i}>
        <circle cx={x as number} cy={y as number} r="15" style={{ fill: c as string }} opacity="0.9" />
        <circle cx={x as number} cy={(y as number) - 3} r="5" style={{ fill: '#0b1220' }} opacity="0.7" />
      </g>
    ))}
  </>
);

const Process: React.FC = () => (
  <>
    <path className="sa-draw" d="M34 170 C 90 60, 140 210, 200 120 S 320 60, 366 90" fill="none" style={{ stroke: 'url(#sa-brand-grad)' }} strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8" />
    {[
      [34, 170, C, '1'], [117, 118, M, '2'], [200, 120, G, '3'], [283, 82, C, '4'], [366, 90, M, '5'],
    ].map(([x, y, c, n], i) => (
      <g key={i} className="sa-float" style={{ animationDelay: `${i * 0.3}s` }}>
        <circle cx={x as number} cy={y as number} r="20" style={{ fill: 'var(--bg-surface)', stroke: c as string }} strokeWidth="3" />
        <text x={x as number} y={(y as number) + 6} textAnchor="middle" fontSize="16" fontWeight="900" style={{ fill: c as string, fontFamily: FONT }}>{n as string}</text>
      </g>
    ))}
    {/* rocket */}
    <g className="sa-float" style={{ animationDelay: '0.5s' }}>
      <path d="M352 46 q18 -18 34 -12 q6 16 -12 34 l-14 2 z" style={{ fill: M }} />
      <circle cx="372" cy="46" r="5" style={{ fill: '#ffffff' }} />
      <path d="M338 70 l-12 12 M346 78 l-8 14" style={{ stroke: G }} strokeWidth="3" strokeLinecap="round" />
    </g>
    {/* labels */}
    {[['DISCOVER', 34], ['DESIGN', 117], ['BUILD', 200], ['LAUNCH', 283], ['GROW', 366]].map(([t, x], i) => (
      <text key={i} x={x as number} y={i === 0 ? 214 : 226} textAnchor="middle" fontSize="8.5" fontWeight="800" letterSpacing="1.2" style={{ fill: MUTED, fontFamily: FONT }}>{t as string}</text>
    ))}
  </>
);

const SCENES: Record<ArtVariant, React.FC> = { about: About, services: Services, marketing: Marketing, it: IT, branding: Branding, careers: Careers, contact: Contact, portfolio: Portfolio, clients: Clients, testimonials: Testimonials, process: Process };

/* ------------------------------- photos -------------------------------- */

/* Real photos shown instead of the drawn scene, only in the large page-header panels (never the small `bare` cards). Files live in public/images/.
   If a file is missing the drawn scene is shown, so nothing breaks. */
const PHOTOS: Partial<Record<ArtVariant, { src: string; alt: string }>> = {
  about: { src: '/images/site/team-office.jpg', alt: 'The Taarruni team working together in the office' },
  careers: { src: '/images/site/team-office.jpg', alt: 'Colleagues working together at their desks' },
  services: { src: '/images/site/ai-brain.jpg', alt: 'Illustration of AI, data and analytics' },
  it: { src: '/images/site/smart-factory.jpg', alt: 'Engineer using a tablet in a smart factory' },
  branding: { src: '/images/tiles/tile-9.jpg', alt: 'Glass office towers seen from below' },
  // marketing, contact, portfolio, clients, process and testimonials keep their animated scenes
};

/* ------------------------------- frame --------------------------------- */

export const SectionArt: React.FC<{ variant: ArtVariant; className?: string; bare?: boolean }> = ({ variant, className = '', bare = false }) => {
  const Scene = SCENES[variant];
  const photo = PHOTOS[variant];
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = !!photo && !photoFailed && !bare;

  // Re-run the scene's own CSS animations (draw-on lines, rising bars, ...) every time it scrolls into view
  const holderRef = useRef<HTMLDivElement>(null);
  const inView = useInView(holderRef, { amount: 0.25 });
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (inView) setCycle((c) => c + 1);
  }, [inView]);

  // Pointer tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={holderRef}
      data-live={inView ? 'true' : 'false'}
      initial={{ opacity: 0, y: 30, scale: 0.92, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 900 }}
      className={`sa-root w-full ${className}`}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={bare ? '' : 'holo-border-wrap'}
      >
        <div className={bare ? '' : 'holo-content p-3 sm:p-4'}>
          {showPhoto && photo ? (
            <div className="relative aspect-[8/5] w-full overflow-hidden rounded-xl">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                onError={() => setPhotoFailed(true)}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            <svg key={cycle} viewBox="0 0 400 250" className="w-full h-auto block" role="img" aria-label={`${variant} illustration`}>
              <defs>
                <linearGradient id="sa-brand-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3ef0ff" />
                  <stop offset="50%" stopColor="#ff2e88" />
                  <stop offset="100%" stopColor="#ffd36b" />
                </linearGradient>
              </defs>
              <Scene />
            </svg>
          )}
        </div>
      </motion.div>

      <style>{`
        .sa-float { animation: saFloat 4.2s ease-in-out infinite alternate; }
        .sa-twinkle { opacity: .7; }
        .sa-root:hover .sa-twinkle { animation: saTwinkle 3s ease-in-out infinite; }
        .sa-pulse { transform-box: fill-box; transform-origin: center; animation: saPulse 2.4s ease-out infinite; }
        .sa-draw { stroke-dasharray: 600; stroke-dashoffset: 600; animation: saDraw 2.2s 0.4s ease-out forwards; }
        .sa-bar { transform-box: fill-box; transform-origin: 50% 100%; animation: saBar 1.1s cubic-bezier(.16,1,.3,1) backwards; }
        .sa-rise { transform-box: fill-box; transform-origin: 50% 100%; animation: saBar 1s cubic-bezier(.16,1,.3,1) backwards; }
        .sa-type { transform-box: fill-box; transform-origin: 0 50%; animation: saType 2.6s ease-in-out infinite alternate; }
        .sa-blink { animation: saBlink 1s steps(2) infinite; }
        .sa-spin { animation: saSpin 8s linear infinite; }
        .sa-spin-slow { animation: saSpin 30s linear infinite; }
        .sa-beam { opacity: 0.12; animation: saBeam 3.2s ease-in-out infinite alternate; }
        .sa-shine { animation: saShine 3.6s ease-in-out infinite; }
        @keyframes saFloat { to { transform: translateY(-7px); } }
        @keyframes saTwinkle { 0%,100% { opacity: .25; } 50% { opacity: 1; } }
        @keyframes saPulse { from { transform: scale(1); opacity: .9; } to { transform: scale(3); opacity: 0; } }
        @keyframes saDraw { to { stroke-dashoffset: 0; } }
        @keyframes saBar { from { transform: scaleY(0); } }
        @keyframes saType { from { transform: scaleX(.45); } to { transform: scaleX(1); } }
        @keyframes saBlink { 50% { opacity: 0; } }
        @keyframes saSpin { to { transform: rotate(360deg); } }
        @keyframes saBeam { from { opacity: .05; } to { opacity: .28; } }
        @keyframes saShine { 0% { transform: translateX(-60px); opacity: 0; } 30% { opacity: .4; } 100% { transform: translateX(300px); opacity: 0; } }
        /* looping motion only runs while the illustration is on screen */
        .sa-root[data-live='false'] :is(.sa-float,.sa-pulse,.sa-type,.sa-blink,.sa-spin,.sa-spin-slow,.sa-beam,.sa-shine) { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .sa-float,.sa-twinkle,.sa-pulse,.sa-blink,.sa-spin,.sa-spin-slow,.sa-beam,.sa-shine,.sa-type { animation: none !important; }
          .sa-draw { stroke-dashoffset: 0; animation: none; }
        }
      `}</style>
    </motion.div>
  );
};