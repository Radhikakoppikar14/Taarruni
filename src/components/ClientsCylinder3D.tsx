import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SectionArt } from './SectionArt';

/** All 76 client logos published on https://www.taarruni.com/clients.html — [file slug, display name]. */
const CLIENT_LOGOS: [string, string][] = [
  ['acuity', 'Acuity Pest Control'],
  ['adarsh', 'Adarsh Foundation'],
  ['akka', 'Akka'],
  ['amartech', 'Amartech'],
  ['aneri-arts', 'Aneri Arts'],
  ['ankur', 'Ankur'],
  ['anvi', 'Anvi'],
  ['artbandhu', 'Artbandhu'],
  ['ayurveda-sanctuary', 'Ayurveda Sanctuary'],
  ['bhoomika', 'Bhoomika'],
  ['blue-square', 'Blue Square'],
  ['boardwise', 'Boardwise'],
  ['bss', 'BSS'],
  ['corporate-lieseure', 'Corporate Lieseure'],
  ['customkings', 'Customkings'],
  ['datron', 'Datron'],
  ['dell', 'Dell'],
  ['dhyaan-foods', 'Dhyaan Foods'],
  ['diqutech', 'Diqutech'],
  ['disha', 'Disha'],
  ['docventures-pharma', 'Docventures Pharma'],
  ['doosan', 'Doosan'],
  ['ferns', 'Ferns'],
  ['foodpath', 'Foodpath'],
  ['go-activ', 'Go Activ'],
  ['graco', 'Graco'],
  ['gvk', 'GVK'],
  ['hamlin-harkins', 'Hamlin Harkins'],
  ['havells', 'Havells'],
  ['henkel', 'Henkel'],
  ['idagunji', 'Idagunji'],
  ['indian-bank', 'Indian Bank'],
  ['izen', 'Izen'],
  ['jana', 'Jana'],
  ['kern-liebers', 'Kern-Liebers'],
  ['kpmg', 'KPMG'],
  ['lapp', 'Lapp'],
  ['laveena', 'Laveena'],
  ['lincoln', 'Lincoln'],
  ['maangalya', 'Maangalya'],
  ['manifest', 'Manifest'],
  ['mann', 'Mann'],
  ['mapei', 'Mapei'],
  ['metlife', 'MetLife'],
  ['monark-it', 'Monark IT'],
  ['nandini', 'Nandini'],
  ['nexteer', 'Nexteer'],
  ['nimble-machines', 'Nimble Machines'],
  ['onam', 'Onam'],
  ['passion-fruit', 'Passion Fruit'],
  ['paul', 'Paul'],
  ['pm-consulting', 'PM Consulting'],
  ['reichenbacher', 'Reichenbacher'],
  ['rns', 'RNS'],
  ['rs-sanchike', 'RS Sanchike'],
  ['sabre-holdings', 'Sabre Holdings'],
  ['safetech', 'Safetech'],
  ['sannidhi', 'Sannidhi'],
  ['sevakirana', 'Sevakirana'],
  ['siddhi-kabel', 'Siddhi Kabel'],
  ['supertech', 'Supertech'],
  ['tanoti', 'Tanoti'],
  ['terraform', 'Terraform'],
  ['thermet-solutions', 'Thermet Solutions'],
  ['tnt', 'TNT'],
  ['ucam', 'UCAM'],
  ['uniliver', 'Unilever'],
  ['vaidyars', 'Vaidyars'],
  ['vcare-lab', 'Vcare Lab'],
  ['venturesoft-global', 'Venturesoft Global'],
  ['vijaya-bank', 'Vijaya Bank'],
  ['vinayak-auxi-chem', 'Vinayak Auxi Chem'],
  ['vinity-wine', 'Vinity Wine'],
  ['weir', 'Weir'],
  ['wildwood-spa', 'Wildwood Spa Lab'],
  ['yestates', 'Yestates Global'],
];

/**
 * Logos are plain <img> elements (CSS 3D, not WebGL), so they load from any origin.
 * Your own copy in /public/images/clients is tried first, then the live site; if both
 * fail, the tile shows the client name instead.
 */
const LOGO_SOURCES = (file: string) => [
  `/images/clients/${file}.jpg`,
  `https://www.taarruni.com/images/clients/${file}.jpg`,
];

const LogoImage: React.FC<{ file: string; name: string; className?: string }> = ({ file, name, className = '' }) => {
  const sources = LOGO_SOURCES(file);
  const [i, setI] = useState(0);
  if (i >= sources.length) {
    return (
      <span className="w-full h-full flex items-center justify-center p-2 text-center font-display text-[11px] font-black text-[#0b1220] leading-tight">
        {name}
      </span>
    );
  }
  return (
    <img
      src={sources[i]}
      alt={name}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setI((n) => n + 1)}
      className={`w-full h-full object-contain select-none ${className}`}
    />
  );
};

/* ---------------------------- CSS 3D cylinder ---------------------------- */

const PER_ROW = 19;
const CARD_W = 150;
const CARD_H = 100;
const ROW_GAP = 116;
const RADIUS = 520;
const STAGE_H = 640;

const LogoCylinder: React.FC<{ filter: string }> = ({ filter }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const state = useRef({ rot: 0, vel: 0, dragging: false, lastX: 0, tiltX: 0, tiltTarget: 0, t: 0, scale: 1 });

  const rows = Math.ceil(CLIENT_LOGOS.length / PER_ROW);
  const q = filter.trim().toLowerCase();

  useEffect(() => {
    const wrap = wrapRef.current!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phis = CLIENT_LOGOS.map((_, i) => {
      const row = Math.floor(i / PER_ROW);
      const col = i % PER_ROW;
      return ((col + (row % 2) * 0.5) / PER_ROW) * 360;
    });

    const resize = () => {
      state.current.scale = Math.min(1.1, wrap.clientWidth / 1050);
      wrap.style.height = `${Math.round(rows * ROW_GAP * state.current.scale + 190)}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const down = (e: PointerEvent) => {
      state.current.dragging = true;
      state.current.lastX = e.clientX;
      wrap.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      const s = state.current;
      const r = wrap.getBoundingClientRect();
      s.tiltTarget = ((e.clientY - r.top) / r.height - 0.5) * -10;
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      s.lastX = e.clientX;
      s.rot += dx * 0.35;
      s.vel = dx * 0.35;
    };
    const up = () => {
      state.current.dragging = false;
    };
    const leave = () => {
      state.current.tiltTarget = 0;
    };
    wrap.addEventListener('pointerdown', down);
    wrap.addEventListener('pointermove', move);
    wrap.addEventListener('pointerup', up);
    wrap.addEventListener('pointercancel', up);
    wrap.addEventListener('pointerleave', leave);

    // Replay the swell-in + fast-spin entrance whenever the cylinder scrolls back into view
    let visible = false;
    const io = new IntersectionObserver(
      (entries) => {
        visible = !!entries[0]?.isIntersecting;
        if (visible) state.current.t = 0;
      },
      { threshold: 0.2 },
    );
    io.observe(wrap);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) {
        raf = requestAnimationFrame(tick); // off-screen: skip all DOM work
        return;
      }
      const s = state.current;

      // Entrance (replays every time the page is opened): swells in while spinning fast, then settles
      s.t = Math.min(1, s.t + dt / 1.0);
      const e = 1 - Math.pow(1 - s.t, 3);
      const intro = reduce ? 1 : 0.35 + 0.65 * e;

      if (!s.dragging) {
        s.rot += dt * ((reduce ? 0 : 6) + (1 - e) * 40) + s.vel * dt * 6;
        s.vel *= Math.pow(0.04, dt);
      }
      s.tiltX += (s.tiltTarget - s.tiltX) * Math.min(1, dt * 4);

      if (stageRef.current) {
        stageRef.current.style.transform = `translateZ(${-RADIUS}px) rotateX(${s.tiltX}deg) rotateY(${s.rot}deg)`;
      }
      if (scalerRef.current) scalerRef.current.style.transform = `scale(${s.scale * intro})`;
      // fade on the (flat) wrapper – opacity on a preserve-3d element would flatten the cylinder
      wrap.style.opacity = String(Math.min(1, e * 1.6));
      // Depth cue: front cards crisp, sides fade, back cards hidden by backface-visibility
      for (let i = 0; i < phis.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const facing = Math.cos(((phis[i] + s.rot) * Math.PI) / 180);
        el.style.opacity = String(Math.max(0, 0.25 + 0.75 * facing));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener('pointerdown', down);
      wrap.removeEventListener('pointermove', move);
      wrap.removeEventListener('pointerup', up);
      wrap.removeEventListener('pointercancel', up);
      wrap.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
      style={{ height: STAGE_H, perspective: '2000px', touchAction: 'pan-y', opacity: 0 }}
    >
      <div
        ref={scalerRef}
        className="absolute left-1/2 top-1/2"
        style={{ width: 0, height: 0, transformStyle: 'preserve-3d' }}
      >
        <div ref={stageRef} className="absolute" style={{ left: 0, top: 0, transformStyle: 'preserve-3d' }}>
          {/* guide rings */}
          {[-1, 1].map((k) => (
            <div
              key={k}
              aria-hidden="true"
              className="absolute rounded-full pointer-events-none"
              style={{
                width: RADIUS * 2,
                height: RADIUS * 2,
                left: -RADIUS,
                top: -RADIUS,
                border: '1px solid color-mix(in srgb, var(--accent-cyan) 38%, transparent)',
                transform: `translateY(${k * (rows * ROW_GAP) / 2 + k * 6}px) rotateX(90deg)`,
              }}
            />
          ))}

          {CLIENT_LOGOS.map(([file, name], i) => {
            const row = Math.floor(i / PER_ROW);
            const col = i % PER_ROW;
            const phi = ((col + (row % 2) * 0.5) / PER_ROW) * 360;
            const y = (row - (rows - 1) / 2) * ROW_GAP;
            const active = !q || name.toLowerCase().includes(q);
            return (
              <div
                key={file}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="absolute"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  left: -CARD_W / 2,
                  top: -CARD_H / 2,
                  transform: `translateY(${y}px) rotateY(${phi}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <div
                  className="w-full h-full rounded-xl overflow-hidden bg-white p-2.5 transition-all duration-500"
                  style={{
                    border: '1px solid rgba(0,0,0,0.12)',
                    boxShadow: '0 10px 28px -12px rgba(0,0,0,0.55)',
                    opacity: active ? 1 : 0.1,
                    filter: active ? 'none' : 'grayscale(1)',
                  }}
                >
                  <LogoImage file={file} name={name} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ name wall -------------------------------- */
/* Text-only client index: names set at mixed sizes in solid, outlined and coloured type. */

const NAME_SIZES = ['text-2xl sm:text-4xl', 'text-xl sm:text-3xl', 'text-3xl sm:text-5xl', 'text-lg sm:text-2xl', 'text-2xl sm:text-3xl'];

const nameStyle = (i: number): React.CSSProperties => {
  switch (i % 5) {
    case 1:
      return { color: 'transparent', WebkitTextStroke: '1.4px var(--accent-cyan-ink)' };
    case 2:
      return { color: 'var(--accent-gold-ink)' };
    case 3:
      return { color: 'transparent', WebkitTextStroke: '1.4px var(--accent-magenta)' };
    case 4:
      return { color: 'rgb(var(--fg-rgb) / 0.55)' };
    default:
      return { color: 'rgb(var(--fg-rgb) / 0.95)' };
  }
};

const wallParent = { hidden: {}, show: { transition: { staggerChildren: 0.018 } } };
const wallChild = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const NameWall: React.FC<{ filter: string }> = ({ filter }) => {
  const q = filter.trim().toLowerCase();
  const names = CLIENT_LOGOS.map(([, name]) => name).filter((n) => !q || n.toLowerCase().includes(q));

  return (
    <div className="mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 mb-6">
        <span className="font-display text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-gold-ink)' }}>
          Trusted by {CLIENT_LOGOS.length} organisations
        </span>
        <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, var(--accent-magenta), transparent)' }} />
      </div>

      <motion.ul
        variants={wallParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center items-baseline gap-x-5 sm:gap-x-8 gap-y-3 sm:gap-y-5 list-none"
      >
        {names.map((name, i) => (
          <motion.li key={name} variants={wallChild} className="flex items-baseline gap-5 sm:gap-8">
            <span
              className={`cn-name font-display font-black tracking-tight leading-none cursor-default ${NAME_SIZES[(i * 7) % NAME_SIZES.length]}`}
              style={nameStyle(i)}
            >
              {name}
            </span>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0 self-center" style={{ background: 'var(--iridescent)' }} />
          </motion.li>
        ))}
        {names.length === 0 && (
          <li className="text-sm text-[#9a9ca8]">No client matches your search.</li>
        )}
      </motion.ul>

      <style>{`
        .cn-name { display: inline-block; transition: transform .35s cubic-bezier(.16,1,.3,1), filter .35s; }
        .cn-name:hover {
          transform: translateY(-4px) scale(1.06);
          background: var(--iridescent);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0;
          filter: drop-shadow(0 6px 14px rgba(62,240,255,.25));
        }
        @media (prefers-reduced-motion: reduce) { .cn-name { transition: none; } .cn-name:hover { transform: none; } }
      `}</style>
    </div>
  );
};

/* --------------------------------- page -------------------------------- */

export const ClientsCylinder3D: React.FC<{ showNameIndex?: boolean }> = ({ showNameIndex = true }) => {
  const [filter, setFilter] = useState('');

  return (
    <div className="relative py-8 overflow-hidden">
      {/* Header – same structure as the Process section: text left, illustration card right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="text-xs font-display tracking-[0.25em] text-[#3ef0ff] uppercase mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#3ef0ff]" />
              <span>Enterprise Partnership Roster</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Trusted Global Client Network
            </h2>
            <p className="text-base text-[#9a9ca8] leading-relaxed">
              Over {CLIENT_LOGOS.length - 1} enterprise and institutional partners across India, the United States, UAE, UK, and worldwide.
            </p>

            {/* Search Filter Input */}
            <div className="mt-6 max-w-md">
              <input
                type="text"
                placeholder="Search client roster..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl bg-[#16181d] border border-white/10 text-white placeholder-[#9a9ca8] text-sm focus:outline-hidden focus:border-[#3ef0ff] transition-colors"
              />
            </div>
          </div>
          <div className="lg:col-span-5">
            <SectionArt variant="clients" />
          </div>
        </div>
      </div>

      {/* Interactive 3D cylinder of client logos */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <LogoCylinder filter={filter} />
      </motion.div>

      {/* Text-only client name wall (hidden on the Home page) */}
      {showNameIndex && <NameWall filter={filter} />}
    </div>
  );
};