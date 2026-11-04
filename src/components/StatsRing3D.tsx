import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

/**
 * Company facts as compact "plate" cards.
 * - Numbers are sized with clamp() so they can never overflow the screen
 * - Each plate tilts toward the pointer, with a soft glare following the cursor
 * - Digits have a shallow extrusion that swings opposite to the tilt
 * - Numbers count up when the section scrolls into view
 */
const STATS = [
  { n: '2005', label: 'Incorporated in Bangalore', sub: 'Two decades of continuous delivery', face: '#1cc6e4', side: [8, 105, 125] },
  { n: '02', label: 'Global offices', sub: 'Bangalore, India & California, USA', face: '#ff2e88', side: [120, 10, 55] },
  { n: '03', label: 'Integrated service areas', sub: 'Marketing, All India Branding & IT Solutions', face: '#f2b127', side: [140, 98, 8] },
];

const LAYERS = 7;

const CountUp: React.FC<{ value: string; run: boolean; reduce: boolean | null }> = ({ value, run, reduce }) => {
  const target = parseInt(value, 10);
  const [shown, setShown] = useState(reduce ? value : value.replace(/\d/g, '0'));

  useEffect(() => {
    if (reduce) {
      setShown(value);
      return;
    }
    if (!run) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(String(Math.round(v)).padStart(value.length, '0')),
    });
    return () => controls.stop();
  }, [run, reduce, target, value]);

  return <>{shown}</>;
};

const StatPlate: React.FC<{ s: (typeof STATS)[number]; i: number; reduce: boolean | null }> = ({ s, i, reduce }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const glare = useTransform([sx, sy], ([x, y]: number[]) => `radial-gradient(420px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${s.face}22, transparent 60%)`);

  const shadow = useTransform([sx, sy], ([x, y]: number[]) => {
    const parts: string[] = [];
    for (let k = 1; k <= LAYERS; k++) {
      const dx = (-x * k * 1.1).toFixed(1);
      const dy = (-y * k * 1.1 + k * 0.6).toFixed(1);
      const f = 1 - (k / LAYERS) * 0.4;
      parts.push(`${dx}px ${dy}px 0 rgb(${Math.round(s.side[0] * f)},${Math.round(s.side[1] * f)},${Math.round(s.side[2] * f)})`);
    }
    parts.push(`${(-x * 16).toFixed(1)}px ${(-y * 16 + 14).toFixed(1)}px 22px rgba(30,50,100,0.28)`);
    return parts.join(',');
  });

  const move = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
      className="min-w-0"
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-3xl p-6 sm:p-7"
        whileHover={reduce ? undefined : { scale: 1.02 }}
        style={{
          rotateX: reduce ? 0 : rotX,
          rotateY: reduce ? 0 : rotY,
          transformStyle: 'preserve-3d',
          background: `linear-gradient(160deg, ${s.face}26 0%, var(--bg-surface) 55%, var(--bg-surface) 100%)`,
          border: `1.5px solid ${s.face}88`,
          boxShadow: `0 18px 40px -22px ${s.face}aa, 0 2px 8px -2px rgba(30,50,100,0.12)`,
        }}
      >
        {/* cursor glare */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: reduce ? 'none' : glare }} />

        {/* top accent bar draws in */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 h-[3px] w-full origin-left"
          style={{ background: s.face }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* one soft shine sweep when the card appears */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)' }}
            initial={{ x: '-120%' }}
            animate={{ x: inView ? '420%' : '-120%' }}
            transition={{ duration: 1.3, delay: 0.5 + i * 0.15, ease: 'easeInOut' }}
          />
        )}

        {/* number */}
        <div className="relative mt-2 mb-5 min-w-0" style={{ transform: 'translateZ(40px)' }}>
          <motion.div
            className="font-display font-black leading-none tracking-tight select-none whitespace-nowrap"
            style={{ color: s.face, textShadow: reduce ? 'none' : shadow, fontSize: 'clamp(2.5rem, 4.4vw, 4.25rem)', fontVariantNumeric: 'tabular-nums' }}
          >
            <CountUp value={s.n} run={inView} reduce={reduce} />
          </motion.div>
        </div>

        {/* text */}
        <div className="relative" style={{ transform: 'translateZ(20px)' }}>
          <div className="font-display text-sm sm:text-base font-bold uppercase tracking-wide leading-snug" style={{ color: 'var(--text-strong)' }}>
            {s.label}
          </div>
          <div className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {s.sub}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const StatsRing3D: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-5 sm:py-8 overflow-x-clip">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {STATS.map((s, i) => (
            <StatPlate key={s.n} s={s} i={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
};