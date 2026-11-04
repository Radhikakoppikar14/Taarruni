import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionArt } from './SectionArt';

export const TESTIMONIALS_DATA = [
  {
    name: 'Donna Hamlin',
    role: 'Founder',
    company: 'Board Governance Group',
    quote: 'I am a perpetual client and fan of TDS work. They designed and managed two websites for my companies which were well thought out, creative and practical. They offers clever and helpful suggestions for improvements and is timely whenever we have a request for changes. In addition, I am delighted to continuously provide referrals to my clients for TDS because I know their work will be appreciated. Hats off for TDS!!',
  },
  {
    name: 'Tracy Ann Curtis',
    role: 'Executive Coach',
    company: 'TAC Global Coaching',
    quote: 'TDS was originally referred to me by a colleague who raved about their work. When I met TDS team for the first time I immediately understood why. Vasant comes highly technically qualified and balances this with a strong emotional intelligence and ability to build rapport and trust. He is able to translate the technical to both a technical and non technical audience. While building my website, Vasant carefully listened to my requirements and asked all the right questions - enabling he and his team to build my website economically - in a short time frame with minimal "back and forth". He was proactive in offering designs and his work resulted in an engaging website that I am proud of - which is also mobile friendly and aesthetically relevant. After the site was built, the collaboration with Vasant continues to be easy, thoughtful and professional. Vasant proactively manages updates, supports me with necessary changes and offers ideas to help my business. I confidently and strongly recommend Vasant and his team at Taarruni Design Solutions for Website, Digital Marketing & SEO Services. Vasant and his team are trusted colleagues now and for the future. Vasant is a joy to collaborate with.',
  },
  {
    name: 'Wren Solares',
    role: 'Creative Director',
    company: 'Art & Motion Media',
    quote: 'TDS is an excellent website designer Company with a superb team to ensure that you see results when it matters. They communicates clear and concise actions to achieve your project requirements and is always available to discuss the details no matter what the request. They manages a skilled team - they are accountable, reliable and problem solvers at all levels.',
  },
  {
    name: 'Vasudevan Murthy',
    role: 'Principal Consultant',
    company: 'Strategic Consulting',
    quote: 'Vasanth Yaji was a person who always works with a smile on his face, I can never forget the spares offers which he used to design which was perfect and complete in all respects, lovely person to work with, known for his cool & calm posture always ....... I wish him all the best in his new ventures',
  },
  {
    name: 'Wilson John',
    role: 'Head Marketing',
    company: 'Industrial Manufacturing',
    quote: 'Highly recommended... as i find the team very professional, creative and co-operative and time bound. All the best TDS team ..Cheers !!',
  },
  {
    name: 'Abhijeet Prahlad',
    role: 'CEO',
    company: 'NexGen Enterprise',
    quote: 'Excellent services! I have been working with team at Taarruni for several years now and always have had great & friendly experience working with the design and development teams. Detail oriented, professional and somebody whom one can count on for all your business office needs.',
  },
  {
    name: 'Sunil Kumar',
    role: 'Head Business Strategies',
    company: 'Growth Ventures',
    quote: "One of the best I've come across. I hired them for digital marketing services and honestly I will never look for others henceforth. Keep rocking guys! Got loads of untapped potential in you guys.. Continued Blessings!",
  },
  {
    name: 'Dr. Prashanth Jana',
    role: 'CEO',
    company: 'Healthcare Systems',
    quote: 'Top notch service from a thoroughly professional organization. Customer satisfaction seems to be the only motto. Anybody needing any kind of service in the digital world, approach Taarruni and you will not be disappointed.',
  },
];


/* =========================================================================
   VOICE WALL  –  testimonials, redesigned
   Structure: an index rail of voices on the left (each with a live progress
   line) and a large "stage" on the right. The stage leads with a huge pull
   quote that reveals word by word, a live equalizer for the "voice" motif,
   a spinning-ring monogram, and a collapsible full story. Auto-plays, pauses
   on hover, supports arrows / swipe, and replays its entrance every visit.
========================================================================= */

const AUTOPLAY_MS = 9000;

/** Split a quote into a short pull-quote and the remainder. */
function splitQuote(q: string): { pull: string; rest: string } {
  const m = q.match(/^(.+?[.!?])(\s|$)/);
  if (m && m[1].length >= 40 && m[1].length <= 200) {
    return { pull: m[1], rest: q.slice(m[0].length).trim() };
  }
  if (q.length <= 190) return { pull: q, rest: '' };
  const cut = q.slice(0, 150);
  const at = cut.lastIndexOf(' ');
  return { pull: cut.slice(0, at > 60 ? at : 150).replace(/[ ,.\-]+$/, '') + '…', rest: q };
}

const ACCENTS = ['var(--accent-cyan-ink)', 'var(--accent-magenta-ink)', 'var(--accent-gold-ink)'];

export const TestimonialsCoverflow3D: React.FC = () => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const pausedRef = useRef(false);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const total = TESTIMONIALS_DATA.length;

  const go = useCallback(
    (to: number, d?: number) => {
      const nextIdx = (to + total) % total;
      setDir(d ?? (nextIdx >= active ? 1 : -1));
      setActive(nextIdx);
      setExpanded(false);
    },
    [total, active],
  );
  const next = useCallback(() => go(active + 1, 1), [go, active]);
  const prev = useCallback(() => go(active - 1, -1), [go, active]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // Autoplay with a live progress line (written straight to the DOM – no re-render per frame)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let t = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current && !reduce && !expanded) t += dt;
      const p = Math.min(1, t / AUTOPLAY_MS);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (p >= 1) {
        go(active + 1, 1);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, go, expanded]);

  const current = TESTIMONIALS_DATA[active];
  const { pull, rest } = useMemo(() => splitQuote(current.quote), [current]);
  const accent = ACCENTS[active % 3];
  const words = pull.split(' ');

  return (
    <section
      className="py-6 sm:py-8 relative overflow-hidden"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ------------------------------ header ----------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6"
        >
          <div>
            <div className="text-xs font-display tracking-[0.25em] text-[#ff2e88] uppercase mb-2">
              Words of Appreciation
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              Client <span className="text-gradient-iridescent">Voices</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#9a9ca8] leading-relaxed max-w-md">
              What our clients say about working with Taarruni Design Solutions, in their own words.
            </p>
          </div>

          <div className="w-full max-w-[300px] lg:w-[280px]">
            <SectionArt variant="testimonials" bare />
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="font-display text-3xl font-black text-white leading-none">
                5.0<span className="text-[#ffd36b]">★</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#9a9ca8] mt-1">
                {total} verified voices
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-white/20 hover:border-[#3ef0ff] text-white hover:text-[#3ef0ff] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-white/20 hover:border-[#3ef0ff] text-white hover:text-[#3ef0ff] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ----------------------------- index rail ---------------------------- */}
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0"
          >
            {TESTIMONIALS_DATA.map((t, i) => {
              const isActive = i === active;
              return (
                <motion.li
                  key={t.name}
                  variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                  className="shrink-0 lg:shrink"
                >
                  <button
                    onClick={() => go(i)}
                    className={`group relative w-[220px] lg:w-full text-left rounded-2xl px-4 py-3 border transition-colors duration-300 cursor-pointer overflow-hidden ${
                      isActive ? 'border-white/20 bg-white/10' : 'border-transparent hover:bg-white/5'
                    }`}
                    aria-current={isActive}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono text-xs tabular-nums w-6"
                        style={{ color: isActive ? ACCENTS[i % 3] : 'var(--text-muted)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <div className={`font-display text-sm font-bold truncate transition-colors ${isActive ? 'text-white' : 'text-[#9a9ca8] group-hover:text-white'}`}>
                          {t.name}
                        </div>
                        <div className="text-[11px] text-[#9a9ca8] truncate">{t.company}</div>
                      </div>
                    </div>
                    {/* live progress line on the active voice */}
                    {isActive && (
                      <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/10">
                        <span
                          ref={barRef}
                          className="absolute inset-0 origin-left"
                          style={{ background: 'var(--iridescent)', transform: 'scaleX(0)' }}
                        />
                      </span>
                    )}
                  </button>
                </motion.li>
              );
            })}
          </motion.ol>

          {/* -------------------------------- stage ------------------------------ */}
          <div className="lg:col-span-8 relative">
            {/* ambient glow in the active accent */}
            <div
              className="absolute -inset-6 rounded-[40px] opacity-40 blur-3xl pointer-events-none transition-colors duration-700"
              style={{ background: `radial-gradient(circle at 70% 20%, ${accent}, transparent 60%)`, opacity: 0.18 }}
            />

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) next();
                else if (info.offset.x > 70) prev();
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[32px] border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ background: 'var(--glass)', backdropFilter: 'blur(18px)', boxShadow: 'var(--card-shadow)' }}
            >
              {/* oversized quote mark */}
              <Quote
                className="absolute -top-4 -left-2 w-44 h-44 pointer-events-none -scale-x-100"
                strokeWidth={1.2}
                style={{ color: accent, opacity: 0.14 }}
              />

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={active}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: 60 * d, filter: 'blur(8px)' }),
                    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    exit: (d: number) => ({ opacity: 0, x: -60 * d, filter: 'blur(8px)' }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative p-7 sm:p-12"
                >
                  {/* stars */}
                  <div className="flex items-center gap-1.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 400, damping: 14 }}
                      >
                        <Star className="w-4 h-4 fill-[#ffd36b] text-[#ffd36b]" />
                      </motion.span>
                    ))}
                  </div>

                  {/* pull quote, revealed word by word */}
                  <p className="font-display font-bold text-white text-2xl sm:text-3xl lg:text-4xl leading-[1.25] tracking-tight mb-8">
                    {words.map((w, i) => (
                      <span key={i} className="inline-block overflow-hidden align-bottom">
                        <motion.span
                          className="inline-block"
                          initial={{ y: '110%', opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.12 + i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {w}&nbsp;
                        </motion.span>
                      </span>
                    ))}
                  </p>

                  {/* full story (collapsible) */}
                  {rest && (
                    <div className="mb-8">
                      <motion.div
                        initial={false}
                        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm sm:text-base text-[#9a9ca8] leading-relaxed max-h-[260px] overflow-y-auto pr-3 pb-1">
                          {rest}
                        </p>
                      </motion.div>
                      <button
                        onClick={() => setExpanded((v) => !v)}
                        className="mt-3 inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-widest cursor-pointer"
                        style={{ color: accent }}
                      >
                        <span>{expanded ? 'Show less' : 'Read full story'}</span>
                        <motion.span animate={{ rotate: expanded ? 180 : 0 }} className="inline-block">↓</motion.span>
                      </button>
                    </div>
                  )}

                  {/* author + equalizer */}
                  <div className="flex items-center justify-between gap-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-14 h-14 shrink-0">
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'conic-gradient(from 0deg, #3ef0ff, #ff2e88, #ffd36b, #3ef0ff)',
                            animation: 'spinConic 6s linear infinite',
                          }}
                        />
                        <span className="absolute inset-[3px] rounded-full flex items-center justify-center font-display font-black text-lg text-white" style={{ background: 'var(--bg-surface)' }}>
                          {current.name.replace(/^Dr\.\s*/, '').charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-display text-base font-bold text-white truncate">{current.name}</div>
                        <div className="text-xs text-[#9a9ca8] truncate">
                          {current.role} · <span className="text-white/80">{current.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* equalizer – the "voice" motif */}
                    <div className="hidden sm:flex items-end gap-[3px] h-9 shrink-0" aria-hidden="true">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <span
                          key={i}
                          className="w-[3px] rounded-full origin-bottom"
                          style={{
                            height: '100%',
                            background: i % 3 === 0 ? 'var(--accent-cyan)' : i % 3 === 1 ? 'var(--accent-magenta)' : 'var(--accent-gold)',
                            animation: `vwEq ${0.7 + (i % 5) * 0.18}s ease-in-out ${i * 0.05}s infinite alternate`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="mt-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#9a9ca8]">
              <span>{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              <span>← drag · swipe · arrow keys →</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes vwEq { from { transform: scaleY(0.15); } to { transform: scaleY(1); } }
        @media (prefers-reduced-motion: reduce) { [style*="vwEq"] { animation: none !important; } }
      `}</style>
    </section>
  );
};