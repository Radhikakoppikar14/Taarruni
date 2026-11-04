import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SectionArt } from './SectionArt';

interface TileData {
  id: number;
  title: string;
  category: string;
  accent: string;
  gradient: string;
  pattern: string;
  deliverables: string;
}

const SHADER_TILES: TileData[] = [
  {
    id: 1,
    title: 'Corporate Web Portals',
    category: 'Corporate Web Architecture',
    accent: '#3ef0ff',
    gradient: 'from-[#3ef0ff]/20 via-[#16181d] to-[#ff2e88]/20',
    pattern: 'radial-gradient(circle at 30% 30%, rgba(62,240,255,0.4), transparent 60%)',
    deliverables: 'Headless CMS · Micro-frontends · Next-Gen UX',
  },
  {
    id: 2,
    title: '3D Visualisation & Immersive Media',
    category: '3D Multimedia & CGI',
    accent: '#ff2e88',
    gradient: 'from-[#ff2e88]/20 via-[#16181d] to-[#ffd36b]/20',
    pattern: 'conic-gradient(from 180deg at 50% 50%, #ff2e88, #3ef0ff, #ffd36b, #ff2e88)',
    deliverables: 'WebGL 60FPS · Exploded Assemblies · Real-Time Shaders',
  },
  {
    id: 3,
    title: 'LED Signage & Outdoor Displays',
    category: 'All India Outdoor Branding',
    accent: '#ffd36b',
    gradient: 'from-[#ffd36b]/20 via-[#16181d] to-[#3ef0ff]/20',
    pattern: 'linear-gradient(135deg, rgba(255,211,107,0.3) 0%, transparent 70%)',
    deliverables: 'Architectural 3D LED Letters · ACP Cladding · 45+ Cities',
  },
  {
    id: 4,
    title: 'E-Commerce Platforms',
    category: 'E-Commerce Portals',
    accent: '#3ef0ff',
    gradient: 'from-[#16181d] via-[#3ef0ff]/15 to-[#ff2e88]/20',
    pattern: 'radial-gradient(circle at 70% 70%, rgba(255,46,136,0.35), transparent 50%)',
    deliverables: 'Instant Checkout · ERP Warehouse Sync · Multi-Currency',
  },
  {
    id: 5,
    title: 'SEO & Search Marketing',
    category: 'Digital Marketing & SEO',
    accent: '#ff2e88',
    gradient: 'from-[#ff2e88]/25 via-[#16181d] to-[#3ef0ff]/15',
    pattern: 'conic-gradient(from 45deg at 60% 40%, #3ef0ff, #ff2e88, #ffd36b)',
    deliverables: 'Page 1 Keyword Domination · Google Ads PPC · Growth Funnels',
  },
  {
    id: 6,
    title: 'Cooperative Banking Software',
    category: 'Enterprise IT Solutions',
    accent: '#ffd36b',
    gradient: 'from-[#ffd36b]/20 via-[#16181d] to-[#16181d]',
    pattern: 'radial-gradient(circle at 50% 20%, rgba(62,240,255,0.3), transparent 60%)',
    deliverables: 'Cooperative Banking Management · Audit Ledgers · Failover Cloud',
  },
  {
    id: 7,
    title: 'Exhibition & Interactive Displays',
    category: '3D Multimedia & Displays',
    accent: '#3ef0ff',
    gradient: 'from-[#3ef0ff]/25 via-[#16181d] to-[#ffd36b]/20',
    pattern: 'linear-gradient(45deg, rgba(62,240,255,0.25) 0%, rgba(255,46,136,0.2) 100%)',
    deliverables: 'Modular Trade Expo Stalls · LED Video Walls · Walkthroughs',
  },
  {
    id: 8,
    title: 'Content Management Systems',
    category: 'Corporate Web Architecture',
    accent: '#ff2e88',
    gradient: 'from-[#ff2e88]/20 via-[#16181d] to-[#3ef0ff]/20',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(255,211,107,0.35), transparent 60%)',
    deliverables: 'Static Site Generators · Edge CDN Deployment · Bank-Grade SSL',
  },
  {
    id: 9,
    title: 'Hoardings & Tower Branding',
    category: 'All India Outdoor Branding',
    accent: '#ffd36b',
    gradient: 'from-[#ffd36b]/25 via-[#16181d] to-[#ff2e88]/20',
    pattern: 'conic-gradient(from 270deg at 50% 50%, #ffd36b, #ff2e88, #3ef0ff, #ffd36b)',
    deliverables: 'Highway Hoardings · Turnkey Municipal Safety Compliance',
  },
];

const C = '#3ef0ff';
const P = '#ff2e88';
const Y = '#ffd36b';

const ART: Record<number, React.ReactNode> = {
  // 1 Corporate web portal: browser wireframe
  1: (
    <g fill="none" strokeWidth="1.6">
      <rect x="40" y="26" width="240" height="148" rx="10" stroke={C} fill="rgba(62,240,255,0.06)" />
      <line x1="40" y1="46" x2="280" y2="46" stroke={C} opacity=".6" />
      <circle cx="54" cy="36" r="3" fill={P} stroke="none" /><circle cx="65" cy="36" r="3" fill={Y} stroke="none" /><circle cx="76" cy="36" r="3" fill={C} stroke="none" />
      <rect x="56" y="58" width="130" height="44" rx="6" stroke={P} fill="rgba(255,46,136,0.12)" />
      <line x1="66" y1="72" x2="150" y2="72" stroke="#fff" opacity=".8" /><line x1="66" y1="84" x2="120" y2="84" stroke="#fff" opacity=".45" />
      <rect x="198" y="58" width="68" height="44" rx="6" stroke={Y} />
      <rect x="56" y="114" width="64" height="46" rx="6" stroke={C} /><rect x="128" y="114" width="64" height="46" rx="6" stroke={C} /><rect x="200" y="114" width="66" height="46" rx="6" stroke={C} />
      <path d="M66 148 l14 -14 l12 10 l14 -16" stroke={Y} /><path d="M138 148 h44 M138 138 h30" stroke="#fff" opacity=".5" /><circle cx="233" cy="137" r="12" stroke={P} />
    </g>
  ),
  // 2 3D / CGI: cube, sphere, light rays
  2: (
    <g fill="none" strokeWidth="1.6">
      <defs>
        <radialGradient id="tileSphere" cx="35%" cy="30%" r="75%"><stop offset="0" stopColor="#fff" stopOpacity=".95" /><stop offset=".45" stopColor={P} /><stop offset="1" stopColor="#2a0a1c" /></radialGradient>
      </defs>
      <circle cx="218" cy="98" r="46" fill="url(#tileSphere)" stroke="none" />
      <ellipse cx="218" cy="160" rx="48" ry="8" fill="rgba(0,0,0,.45)" stroke="none" />
      <path d="M70 70 L110 52 L150 70 L110 88 Z" stroke={C} fill="rgba(62,240,255,.15)" />
      <path d="M70 70 V118 L110 138 V88 Z" stroke={C} fill="rgba(62,240,255,.06)" />
      <path d="M150 70 V118 L110 138 V88 Z" stroke={C} fill="rgba(62,240,255,.22)" />
      <path d="M20 30 L90 80 M20 30 L170 100" stroke={Y} strokeDasharray="4 4" opacity=".8" />
      <circle cx="20" cy="30" r="6" fill={Y} stroke="none" />
    </g>
  ),
  // 3 Outdoor signage: building with glowing 3D letters
  3: (
    <g strokeWidth="1.4">
      <defs>
        <filter id="tileGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <rect x="50" y="40" width="220" height="132" fill="rgba(255,211,107,0.06)" stroke={Y} opacity=".9" />
      {[0, 1, 2, 3, 4].map((i) => [0, 1].map((j) => <rect key={`${i}${j}`} x={64 + i * 42} y={120 + j * 26} width="24" height="16" fill="rgba(62,240,255,.18)" stroke={C} opacity=".6" />))}
      <rect x="62" y="52" width="196" height="56" rx="4" fill="rgba(0,0,0,.45)" stroke={Y} />
      <text x="160" y="94" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="42" letterSpacing="8" fill={Y} filter="url(#tileGlow)">TDS</text>
      <text x="163" y="97" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="42" letterSpacing="8" fill="none" stroke={P} opacity=".6">TDS</text>
      <line x1="20" y1="172" x2="300" y2="172" stroke="#fff" opacity=".25" />
    </g>
  ),
  // 4 E-commerce grid
  4: (
    <g fill="none" strokeWidth="1.6">
      {[0, 1, 2].map((i) => [0, 1].map((j) => (
        <g key={`${i}${j}`}>
          <rect x={30 + i * 70} y={26 + j * 64} width="60" height="54" rx="6" stroke={C} fill="rgba(62,240,255,.07)" />
          <rect x={38 + i * 70} y={34 + j * 64} width="44" height="26" rx="3" stroke={(i + j) % 2 ? P : Y} opacity=".85" />
          <line x1={38 + i * 70} y1={68 + j * 64} x2={64 + i * 70} y2={68 + j * 64} stroke="#fff" opacity=".6" />
        </g>
      )))}
      <rect x="244" y="26" width="52" height="118" rx="8" stroke={P} fill="rgba(255,46,136,.1)" />
      <path d="M256 56 h6 l5 20 h18 l4 -14 h-26" stroke="#fff" />
      <circle cx="268" cy="84" r="2.5" fill="#fff" /><circle cx="282" cy="84" r="2.5" fill="#fff" />
      <rect x="252" y="112" width="36" height="20" rx="5" fill={Y} stroke="none" />
      <path d="M262 122 l5 5 l9 -9" stroke="#000" strokeWidth="2.4" />
    </g>
  ),
  // 5 SEO / search
  5: (
    <g fill="none" strokeWidth="1.8">
      <circle cx="120" cy="92" r="52" stroke={P} fill="rgba(255,46,136,.08)" />
      <line x1="158" y1="130" x2="196" y2="168" stroke={P} strokeWidth="9" strokeLinecap="round" />
      <path d="M86 112 l22 -22 l16 14 l26 -30" stroke={C} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={218 + i * 18} y={150 - (i + 1) * 20} width="12" height={(i + 1) * 20} rx="2" fill={i === 3 ? Y : 'rgba(62,240,255,.45)'} stroke="none" />)}
      <rect x="232" y="30" width="58" height="24" rx="12" fill={Y} stroke="none" />
      <text x="261" y="47" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="14" fill="#000" stroke="none">#1</text>
    </g>
  ),
  // 6 Banking
  6: (
    <g fill="none" strokeWidth="1.6">
      <path d="M40 70 L130 28 L220 70 Z" stroke={Y} fill="rgba(255,211,107,.12)" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={58 + i * 22 + (i > 1 ? 4 : 0)} y="78" width="12" height="64" stroke={Y} fill="rgba(255,211,107,.08)" />)}
      <rect x="44" y="148" width="172" height="12" stroke={Y} />
      <rect x="232" y="40" width="58" height="82" rx="6" stroke={C} fill="rgba(62,240,255,.07)" />
      {[0, 1, 2, 3, 4].map((i) => <line key={i} x1="240" y1={54 + i * 13} x2={i % 2 ? 270 : 282} y2={54 + i * 13} stroke={C} opacity=".7" />)}
      <path d="M261 134 l22 8 v14 c0 10 -10 16 -22 20 c-12 -4 -22 -10 -22 -20 v-14 Z" stroke={P} fill="rgba(255,46,136,.15)" transform="translate(0,-8) scale(.9) translate(29 0)" />
    </g>
  ),
  // 7 Exhibition pavilion
  7: (
    <g fill="none" strokeWidth="1.6">
      <path d="M20 172 L60 140 H260 L300 172 Z" stroke={C} fill="rgba(62,240,255,.08)" />
      <rect x="70" y="50" width="180" height="90" stroke={C} fill="rgba(0,0,0,.35)" />
      <rect x="82" y="62" width="106" height="66" stroke={P} fill="rgba(255,46,136,.18)" />
      <path d="M96 116 l20 -28 l18 18 l16 -22 l22 32" stroke={Y} strokeWidth="2.4" />
      <rect x="198" y="62" width="40" height="30" stroke={Y} /><rect x="198" y="98" width="40" height="30" stroke={C} />
      <path d="M62 50 H258 M70 50 V140 M250 50 V140" stroke="#fff" opacity=".5" />
      <circle cx="42" cy="148" r="5" stroke={Y} /><circle cx="278" cy="152" r="5" stroke={Y} />
    </g>
  ),
  // 8 Global CMS / edge CDN
  8: (
    <g fill="none" strokeWidth="1.5">
      <circle cx="160" cy="100" r="62" stroke={P} fill="rgba(255,46,136,.07)" />
      <ellipse cx="160" cy="100" rx="26" ry="62" stroke={P} opacity=".7" /><ellipse cx="160" cy="100" rx="62" ry="22" stroke={P} opacity=".7" /><line x1="160" y1="38" x2="160" y2="162" stroke={P} opacity=".5" />
      {[[70, 50], [250, 54], [262, 140], [58, 148], [160, 22]].map(([x, y], i) => (
        <g key={i}><line x1="160" y1="100" x2={x} y2={y} stroke={C} strokeDasharray="3 4" /><circle cx={x} cy={y} r="7" fill="#101218" stroke={i % 2 ? Y : C} strokeWidth="2" /></g>
      ))}
      <circle cx="160" cy="100" r="10" fill={Y} stroke="none" />
    </g>
  ),
  // 9 Illuminated tower + highway hoarding
  9: (
    <g fill="none" strokeWidth="1.6">
      <path d="M0 172 H320" stroke="#fff" opacity=".25" />
      <path d="M120 172 L140 24 H180 L200 172" stroke={Y} fill="rgba(255,211,107,.07)" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={142 - i * 3} y={40 + i * 28} width={36 + i * 6} height="10" rx="2" fill={i % 2 ? P : Y} stroke="none" opacity=".85" />)}
      <path d="M160 24 V8" stroke={C} strokeWidth="2" /><circle cx="160" cy="8" r="4" fill={C} stroke="none" />
      <rect x="226" y="92" width="76" height="40" rx="3" stroke={C} fill="rgba(62,240,255,.1)" />
      <text x="264" y="118" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill={C} stroke="none">TDS</text>
      <path d="M264 132 V172 M240 172 V132" stroke={C} opacity=".6" />
      <rect x="20" y="104" width="76" height="28" rx="3" stroke={P} fill="rgba(255,46,136,.1)" /><path d="M58 132 V172" stroke={P} opacity=".6" />
    </g>
  ),
};

/* Real photo for a card. Put files in public/images/tiles/ named tile-1.jpg ... tile-9.jpg.
   Until a file exists, the illustration underneath stays visible. */
const TilePhoto: React.FC<{ id: number; alt: string }> = ({ id, alt }) => {
  const [state, setState] = React.useState<'loading' | 'ok' | 'missing'>('loading');
  if (state === 'missing') return null;
  return (
    <img
      src={`/images/tiles/tile-${id}.jpg`}
      alt={alt}
      loading="lazy"
      onLoad={() => setState('ok')}
      onError={() => setState('missing')}
      className={`absolute inset-0 w-full h-full object-cover z-[1] transition-all duration-700 group-hover:scale-110 ${
        state === 'ok' ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};

const TileArt: React.FC<{ id: number }> = ({ id }) => (
  <svg
    viewBox="0 0 320 200"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-hidden="true"
    className="absolute inset-0 w-full h-full z-[1] p-3 transition-transform duration-700 group-hover:scale-105"
  >
    {ART[id]}
  </svg>
);

export const PortfolioShaderTiles: React.FC<{ limit?: number }> = ({ limit }) => {
  // On the Portfolio page itself the button is hidden (it would only reload the same page).
  const onPortfolioPage = /^#\/?portfolio\/?$/.test(window.location.hash);
  return (
    <section className="py-6 sm:py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
          <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-display tracking-[0.25em] text-[#3ef0ff] uppercase mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#3ef0ff]" />
              <span>Selected Work</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              Our Portfolio
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9a9ca8] leading-relaxed max-w-xl">
              A selection of our work across corporate web portals, e-commerce, 3D visualisation, search marketing and outdoor branding, delivered for clients in India and abroad.
            </p>
          </div>

          </div>
          <div className="lg:col-span-5">
            <SectionArt variant="portfolio" />
          </div>
        </div>

        {/* Tile grid – the home page passes `limit` to show only the first few */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(limit ? SHADER_TILES.slice(0, limit) : SHADER_TILES).map((tile, idx) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateX: 4,
                rotateY: -4,
                boxShadow: `0 25px 40px -10px ${tile.accent}33`,
              }}
              className="holo-border-wrap group cursor-pointer"
            >
              <div className="holo-content p-6 sm:p-7 flex flex-col justify-between min-h-[360px] relative overflow-hidden">
                
                {/* Procedural Generative Shader Canvas / Visual Surface */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-[#0c0d10] border border-white/10 flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ background: tile.pattern }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} opacity-60 group-hover:opacity-90 transition-opacity duration-500`} />
                  
                  {/* Topic illustration */}
                  <TileArt id={tile.id} />
                  <TilePhoto id={tile.id} alt={tile.title} />
                  <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0c0d10]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 z-[3] px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm border border-white/20 font-mono text-[10px] font-bold text-white/90">
                    0{tile.id}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono tracking-wider uppercase mb-1.5" style={{ color: tile.accent }}>
                    {tile.category}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#3ef0ff] transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-[#9a9ca8] leading-relaxed">
                    {tile.deliverables}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9a9ca8] group-hover:text-white transition-colors">
                  <span>TDS PROJECT 0{tile.id}</span>
                  <span className="group-hover:translate-x-1 transition-transform">EXPLORE →</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {limit && limit < SHADER_TILES.length && !onPortfolioPage && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <span className="text-xs font-mono tracking-wider uppercase text-[#9a9ca8]">
              +{SHADER_TILES.length - limit} more projects
            </span>
            <a
              href="#/portfolio"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 rounded-2xl border border-white/20 hover:border-[#3ef0ff] text-white font-display text-xs font-bold tracking-wider uppercase flex items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span>See all projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

      </div>
    </section>
  );
};