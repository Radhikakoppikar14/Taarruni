import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { ArrowRight, Palette, ShieldCheck, Rocket, MapPin, Cpu, Sparkles, Mail, Phone, ExternalLink, Building2, Globe, Users, Award } from 'lucide-react';

interface PageProps {
  onNavigate: (route: string) => void;
  onOpenQuickContact: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

/** Headline whose words slide up one after another. */
const RevealText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className = '', delay = 0 }) => {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.12em] mr-[0.28em]">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.06, ease: EASE }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/** Number that counts up the first time it scrolls into view. */
const CountUp: React.FC<{ from?: number; to: number; suffix?: string }> = ({ from = 0, to, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : from);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(from, to, { duration: 1.8, ease: EASE, onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, from, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
};

/** One word of the scroll-linked statement. */
const Word: React.FC<{ word: string; index: number; total: number; progress: MotionValue<number> }> = ({ word, index, total, progress }) => {
  const start = index / total;
  const end = Math.min(1, start + 1.6 / total);
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.26em]">
      {word}
    </motion.span>
  );
};

const ScrollStatement: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="text-2xl sm:text-3xl lg:text-[2.1rem] font-semibold text-white leading-[1.35]">
      {words.map((w, i) => (
        <Word key={i} word={w} index={i} total={words.length} progress={scrollYProgress} />
      ))}
    </p>
  );
};

/** Card that tilts in 3D toward the pointer and has a moving glare. */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string; max?: number; glow?: string }> = ({
  children,
  className = '',
  max = 10,
  glow = '62,240,255',
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 220, damping: 20 });
  const sy = useSpring(py, { stiffness: 220, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glare = useTransform([sx, sy], ([x, y]: number[]) => `radial-gradient(360px circle at ${x * 100}% ${y * 100}%, rgba(${glow},0.20), transparent 60%)`);

  const move = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} />
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Hero: 3D "AI core" built from CSS 3D transforms                     */
/* ------------------------------------------------------------------ */

const ORBIT_NODES = [
  { label: 'Web', angle: 0, color: '#3ef0ff' },
  { label: '2D/3D', angle: 72, color: '#ff2e88' },
  { label: 'E-com', angle: 144, color: '#ffd36b' },
  { label: 'SEO', angle: 216, color: '#3ef0ff' },
  { label: 'Print', angle: 288, color: '#ff2e88' },
];

/** Pre-computed neural network drawn on the back plane of the hero scene. */
const NET_LAYERS = [3, 5, 5, 3];
const NET_POINTS = NET_LAYERS.flatMap((count, l) =>
  Array.from({ length: count }, (_, i) => ({
    l,
    i,
    x: 40 + l * 106,
    y: 190 / (count + 1) * (i + 1) + 20,
  })),
);
const NET_LINES = NET_POINTS.flatMap((a) => NET_POINTS.filter((b) => b.l === a.l + 1).map((b) => ({ a, b })));

const AICore: React.FC = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18 });
  const sy = useSpring(py, { stiffness: 90, damping: 18 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const rotX = useTransform(sy, [-0.5, 0.5], [18, -18]);

  const move = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative mx-auto w-full max-w-[460px] aspect-square"
      style={{ perspective: 1100 }}
    >
      <motion.div className="absolute inset-0" style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}>
        {/* back plane: neural network */}
        <svg
          viewBox="0 0 400 230"
          className="absolute left-0 right-0 top-[8%] w-full opacity-70"
          style={{ transform: 'translateZ(-120px) scale(1.25)' }}
          aria-hidden="true"
        >
          {NET_LINES.map(({ a, b }, k) => (
            <line
              key={k}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgb(var(--fg-rgb) / 0.14)"
              strokeWidth="1"
            />
          ))}
          {NET_LINES.filter((_, k) => k % 4 === 0).map(({ a, b }, k) => (
            <line
              key={`p${k}`}
              className="ab-pulse"
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#3ef0ff"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{ animationDelay: `${(k * 0.37) % 3}s` }}
            />
          ))}
          {NET_POINTS.map((p) => (
            <circle
              key={`${p.l}-${p.i}`}
              className="ab-blink"
              cx={p.x}
              cy={p.y}
              r="5"
              fill={p.l % 2 ? '#ff2e88' : '#3ef0ff'}
              style={{ animationDelay: `${(p.l * 0.6 + p.i * 0.25) % 2.4}s` }}
            />
          ))}
        </svg>

        {/* rings */}
        {[
          { size: '92%', rx: 72, ry: 0, dur: 18, color: '#3ef0ff' },
          { size: '74%', rx: 72, ry: 60, dur: 14, color: '#ff2e88' },
          { size: '56%', rx: 72, ry: 120, dur: 10, color: '#ffd36b' },
        ].map((r, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: r.size,
              height: r.size,
              marginLeft: `calc(${r.size} / -2)`,
              marginTop: `calc(${r.size} / -2)`,
              transform: `rotateX(${r.rx}deg) rotateY(${r.ry}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="ab-spin w-full h-full rounded-full"
              style={{
                border: `1.5px solid ${r.color}`,
                boxShadow: `0 0 18px ${r.color}55, inset 0 0 18px ${r.color}22`,
                animationDuration: `${r.dur}s`,
                animationDirection: i % 2 ? 'reverse' : 'normal',
              }}
            />
          </div>
        ))}

        {/* orbiting service chips */}
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {ORBIT_NODES.map((n) => (
            <div
              key={n.label}
              className="ab-orbit absolute left-1/2 top-1/2"
              style={{ ['--a' as string]: `${n.angle}deg`, transformStyle: 'preserve-3d' } as React.CSSProperties}
            >
              <div
                className="ab-face absolute px-3 py-1.5 rounded-full text-[11px] font-display font-bold whitespace-nowrap bg-[#16181d]/90 backdrop-blur-md text-white"
                style={{
                  ['--a' as string]: `${n.angle}deg`,
                  border: `1px solid ${n.color}`,
                  boxShadow: `0 0 16px ${n.color}66`,
                  translate: '-50% -50%',
                  transform: 'translateZ(190px)',
                } as React.CSSProperties}
              >
                {n.label}
              </div>
            </div>
          ))}
        </div>

        {/* glowing core */}
        <div
          className="absolute left-1/2 top-1/2 w-[34%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center text-black ab-core"
          style={{
            background: 'var(--iridescent)',
            transform: 'translate(-50%,-50%) translateZ(30px)',
          }}
        >
          <Cpu className="w-6 h-6 mb-0.5" />
          <span className="font-display text-xl sm:text-2xl font-black leading-none">360°</span>
        </div>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Images: the company's own photos, with graceful fallbacks           */
/* ------------------------------------------------------------------ */

const SITE = 'https://www.taarruni.com';

/** Tries the local /images copy first, then taarruni.com, then shows a fallback node. */
const SmartImg: React.FC<{ file: string; alt: string; className?: string; fallback: React.ReactNode }> = ({ file, alt, className = '', fallback }) => {
  const sources = [`/images/${file}`, `${SITE}/images/${file}`];
  const [i, setI] = useState(0);
  if (i >= sources.length) return <>{fallback}</>;
  return <img src={sources[i]} alt={alt} loading="lazy" draggable={false} onError={() => setI((n) => n + 1)} className={className} />;
};

/** Slow scanning line + corner brackets laid over a photo: a light "AI vision" look. */
const ScanOverlay: React.FC = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    <span className="ab-scan absolute left-0 right-0 h-16" style={{ background: 'linear-gradient(180deg, transparent, rgba(62,240,255,0.28), transparent)' }} />
    {['top-3 left-3 border-t-2 border-l-2', 'top-3 right-3 border-t-2 border-r-2', 'bottom-3 left-3 border-b-2 border-l-2', 'bottom-3 right-3 border-b-2 border-r-2'].map((c) => (
      <span key={c} className={`absolute w-6 h-6 ${c}`} style={{ borderColor: '#3ef0ff' }} />
    ))}
    {[[18, 30], [62, 22], [78, 58], [34, 70]].map(([x, y], k) => (
      <span key={k} className="ab-blink absolute w-2.5 h-2.5 rounded-full" style={{ left: `${x}%`, top: `${y}%`, background: '#ff2e88', boxShadow: '0 0 12px #ff2e88', animationDelay: `${k * 0.5}s` }} />
    ))}
  </div>
);

/* ---- small SVG illustrations (theme aware, animated) ---- */
const ART_BOX = 'w-full h-auto';
const stroke = 'rgb(var(--fg-rgb) / 0.22)';

const GlobeArt: React.FC = () => (
  <svg viewBox="0 0 300 200" className={ART_BOX} aria-hidden="true">
    <defs>
      <radialGradient id="abg" cx="35%" cy="30%"><stop offset="0%" stopColor="#3ef0ff" stopOpacity="0.35" /><stop offset="100%" stopColor="#3ef0ff" stopOpacity="0.03" /></radialGradient>
    </defs>
    <circle cx="150" cy="100" r="78" fill="url(#abg)" stroke="#3ef0ff" strokeOpacity="0.7" />
    {[28, 52, 72].map((rx) => <ellipse key={rx} cx="150" cy="100" rx={rx} ry="78" fill="none" stroke={stroke} className="ab-meridian" />)}
    {[-45, -15, 15, 45].map((y) => <ellipse key={y} cx="150" cy={100 + y} rx={Math.sqrt(78 * 78 - y * y)} ry="9" fill="none" stroke={stroke} />)}
    <path className="ab-pulse" d="M112 110 Q 150 20 214 78" fill="none" stroke="#ff2e88" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M112 110 Q 150 20 214 78" fill="none" stroke="#ff2e88" strokeOpacity="0.25" strokeWidth="1.5" />
    {[[112, 110, 'IN'], [214, 78, 'USA']].map(([x, y, t]) => (
      <g key={t as string}>
        <circle cx={x as number} cy={y as number} r="5" fill="#ffd36b" />
        <circle className="ab-ping" cx={x as number} cy={y as number} r="5" fill="none" stroke="#ffd36b" />
        <text x={(x as number) + (t === 'IN' ? -10 : 10)} y={(y as number) + 16} textAnchor={t === 'IN' ? 'end' : 'start'} fontSize="10" fontWeight="800" fill="var(--text-strong)" style={{ fontFamily: 'Unbounded, sans-serif' }}>{t}</text>
      </g>
    ))}
  </svg>
);

/* ------------------------------------------------------------------ */
/* Content (taken from taarruni.com/about-us.html)                      */
/* ------------------------------------------------------------------ */

const STATS = [
  { from: 1995, to: 2005, suffix: '', label: 'Incorporated in Bangalore' },
  { from: 0, to: 20, suffix: '+', label: 'Years of team experience' },
  { from: 0, to: 2, suffix: '', label: 'Offices: India & USA' },
  { from: 0, to: 3, suffix: '', label: 'Countries served' },
];

const STATEMENT =
  'Taarruni-360° is a measurable IT & marketing solutions company. Incorporated way back in 2005, Taarruni presents itself as a trustworthy friend who will come forward to support you in your IT & marketing requirements.';

const WE_ARE_REST = [
  'For us, work is to present you great solutions for your pressing pain points and to help you achieve your goal. We understand very well that our success is in yours: when you reach your goal, we will reach ours.',
  'Our IT solutions & marketing solutions will help our customers get low cost, yet effective, top-notch quality products & services. Our rates are way below the average rates of similar service-offering companies, as we have kept our overheads low and a lower cap on margin. Come, explore our services to know how they can support you in your day-to-day needs.',
];

const STORY_TABS = [
  {
    id: 'history',
    title: 'Company history',
    content: [
      'Incorporated in 2005 at Bangalore, India, the company presents itself as a prominent brand widely known for delivering an array of services in the field of designing and development for web designing, multimedia development services (2D/3D animation), web application development, Flash programming, and e-commerce programming services, SEO (Search Engine Optimization) - SEM (Search Engine Marketing) and print media.',
      'With a brilliant track record in the international market, our presence in the domestic market is equally creditable. We follow strict conformity with the international standards for our business practices and ensure that every service we provide is fault free and on time.',
    ],
  },
  {
    id: 'team',
    title: 'Our team',
    content: [
      'Our team of dedicated experts has more than 20 years of experience in the field of web designing, web programming, Flash designing, Flash programming, web application development, search engine optimization, search engine marketing, and print media services like logo designing, business card designing, catalog and brochure designing, and printing. A good number of our clients are from ad agencies, multinational corporate companies, and software development companies.',
      'We assure you quality work that is highly aesthetic and functional in our service offerings in multimedia, graphics, print media designing, and web designing services, creating a dynamic presence to improve your online business. The services are provided under the aegis of our experts, mostly trained from IIM Bangalore, IAMAI, and other premier institutions. Our team members get to know you, partner with you, and think for you.',
    ],
  },
  {
    id: 'what',
    title: 'What we do',
    content: [
      'We offer creative and cost-effective services to the international markets with clients in the USA, UAE, Muscat, Russia, UK and other parts of the world, besides serving Bangalore and other locations in India. TDS works on the ideology of creativity, quality and delivery. The company is dedicated to providing the most innovative, competitive and technically state-of-the-art solutions to its clients so as to help them get an edge over their competitors. We ascertain distinct and absolutely different creations for all of our clients. Run-of-the-mill web solutions do not have any space in our creations.',
      'Despite the multifarious functional requirements for website designing, we tend to keep the most striking and simple interfaces for our users. This technique helps us abridge any gap between the technological aspects and the user’s ease. The overall looks, consistency of content and quality of execution are a few benchmarks that substantiate our services.',
      'We understand the value of every client’s requirements, irrespective of the company’s size, turnover and past track record. As every customer seeks quick, authentic and user-friendly web solutions, we make sure that our services are streamlined with your business needs. At Taarruni, we conceptualize web designs and multimedia packages, and develop Flash and animation programs that bring out the right solutions to your business objectives.',
      'We first recognize clients’ demands, then conceive their ideas and work in close adroitness with them to bring solutions that are in accordance with global standards, yet affordable. We give you solutions that are customized, timely, reliable and highly prudent for your needs. We maintain the uniqueness of the design and content, which is far from any duplicity. The online identity of each of our works reflects the client’s typical business objectives, services and products, which stand out from the rest.',
      'Web designers at Taarruni not only design websites but optimize and help promote them through the right marketing techniques. Our programmers, web designers, search engine optimizers and marketing team assure unconventional and competitive multimedia, e-commerce solutions and web application development.',
      'Taarruni is a one-stop web solution for web development orientations and internet application development. Our people are perpetually available round the clock to serve and support our customers.',
    ],
  },
];

const JOURNEY = [
  {
    tag: '2005',
    title: 'Incorporated in Bangalore',
    text: 'Taarruni presents itself as a prominent brand known for web designing, multimedia development (2D/3D animation), web application development, Flash and e-commerce programming, SEO - SEM and print media.',
    icon: Building2,
    color: '#3ef0ff',
    fact: 'Bangalore · 2005',
  },
  {
    tag: 'Going global',
    title: 'Clients across the world',
    text: 'Creative and cost-effective services for international markets, with clients in the USA, UAE, Muscat, Russia and the UK, besides Bangalore and other locations in India.',
    icon: Globe,
    color: '#ff2e88',
    fact: 'USA · UAE · UK',
  },
  {
    tag: 'The team',
    title: 'Experts who think for you',
    text: 'More than 20 years of experience in web, programming, search marketing and print. Our experts are mostly trained at IIM Bangalore, IAMAI and other premier institutions. Our team members get to know you, partner with you and think for you.',
    icon: Users,
    color: '#ffd36b',
    fact: '20+ years of experience',
  },
  {
    tag: 'Today',
    title: 'Taarruni-360°',
    text: 'A trustworthy friend for your IT and marketing requirements: when you reach your goal, we reach ours. Incubated at NSRCEL, IIM Bangalore, with offices in Bangalore (head office) and Union City, USA.',
    icon: Award,
    color: '#3ef0ff',
    fact: 'NSRCEL · IIM Bangalore',
  },
];

const PRINCIPLES = [
  {
    icon: Palette,
    color: '#3ef0ff',
    title: 'Creativity',
    text: 'We ascertain distinct and absolutely different creations for all of our clients. Run-of-the-mill web solutions do not have any space in our creations.',
  },
  {
    icon: ShieldCheck,
    color: '#ff2e88',
    title: 'Quality',
    text: 'We follow strict conformity with the international standards for our business practices and ensure that every service we provide is fault free and on time.',
  },
  {
    icon: Rocket,
    color: '#ffd36b',
    title: 'Delivery',
    text: 'Our people are perpetually available round the clock to serve and support our customers, with solutions that are customized, timely and reliable.',
  },
];

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

const Timeline: React.FC = () => (
  <div className="relative max-w-6xl mx-auto">
    {/* connector: horizontal on desktop, vertical on mobile */}
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="hidden lg:block absolute top-[44px] left-[12.5%] right-[12.5%] h-1.5 rounded-full origin-left"
      style={{ background: 'linear-gradient(90deg, #3ef0ff, #ff2e88 55%, #ffd36b)' }}
    />
    <div aria-hidden="true" className="lg:hidden absolute left-[43px] top-6 bottom-6 w-1.5 rounded-full" style={{ background: 'linear-gradient(180deg, #3ef0ff, #ff2e88 55%, #ffd36b)' }} />

    <ol className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 list-none">
      {JOURNEY.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            className="relative flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0"
          >
            {/* numbered badge */}
            <div className="relative shrink-0">
              <div
                className="w-[88px] h-[88px] rounded-full flex items-center justify-center"
                style={{ background: 'var(--bg-surface)', border: `5px solid ${item.color}`, boxShadow: `0 12px 28px -10px ${item.color}99` }}
              >
                <Icon className="w-9 h-9" style={{ color: item.color }} />
              </div>
              <span
                className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center font-display text-[11px] font-black text-black"
                style={{ background: item.color }}
              >
                {i + 1}
              </span>
            </div>

            {/* info card */}
            <div className="flex-1 w-full lg:mt-6 rounded-3xl p-5 border border-white/10 bg-[#16181d]/80 backdrop-blur-md lg:text-center" style={{ borderTop: `4px solid ${item.color}` }}>
              <div className="font-display text-xs font-black tracking-[0.2em] uppercase mb-1" style={{ color: item.color === '#ffd36b' ? 'var(--accent-gold-ink)' : item.color === '#ff2e88' ? 'var(--accent-magenta-ink)' : 'var(--accent-cyan-ink)' }}>{item.tag}</div>
              <h3 className="font-display text-lg font-bold text-white mb-2 leading-snug">{item.title}</h3>
              <p className="text-[13px] text-[#9a9ca8] leading-relaxed">{item.text}</p>
              <div className="mt-4 inline-block rounded-full px-3 py-1.5 text-[11px] font-display font-bold" style={{ background: `${item.color}22`, color: 'var(--text-strong)', border: `1px solid ${item.color}66` }}>
                {item.fact}
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  </div>
);

/* ------------------------------------------------------------------ */
/* Hero 3D stage: the four company facts as stacked glass plates       */
/* ------------------------------------------------------------------ */

const PLATE_POS = [
  { left: '2%', top: '4%' },
  { left: '46%', top: '21%' },
  { left: '6%', top: '45%' },
  { left: '48%', top: '63%' },
];
const PLATE_COLORS = ['62,240,255', '255,46,136', '255,211,107', '62,240,255'];

const HeroStage: React.FC = () => (
  <TiltCard max={11} glow="62,240,255" className="rounded-[2rem]">
    <div className="relative mx-auto w-full max-w-[470px] aspect-square" style={{ transformStyle: 'preserve-3d' }}>
      {/* back disc + rings give the scene depth */}
      <div
        aria-hidden="true"
        className="absolute inset-[4%] rounded-full border"
        style={{
          borderColor: 'rgb(var(--fg-rgb) / 0.14)',
          background: 'radial-gradient(circle at 35% 30%, rgba(62,240,255,0.22), rgba(255,46,136,0.10) 58%, transparent 72%)',
          transform: 'translateZ(-60px)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-[14%] rounded-full border border-dashed" style={{ borderColor: 'rgb(var(--fg-rgb) / 0.22)', transform: 'translateZ(-24px)' }} />

      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
          className="absolute w-[50%]"
          style={{ ...PLATE_POS[i], transform: `translateZ(${24 + i * 34}px)`, transformStyle: 'preserve-3d' }}
        >
          <div
            className="rounded-2xl p-4 sm:p-5 border backdrop-blur-md"
            style={{
              background: `linear-gradient(150deg, rgba(${PLATE_COLORS[i]},0.20), var(--bg-surface) 70%)`,
              borderColor: `rgba(${PLATE_COLORS[i]},0.55)`,
              boxShadow: `0 ${14 + i * 6}px ${28 + i * 8}px -12px rgba(${PLATE_COLORS[i]},0.55)`,
            }}
          >
            <div className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
              <CountUp from={s.from} to={s.to} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-[11px] sm:text-xs text-[#9a9ca8] leading-snug">{s.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </TiltCard>
);

/* ------------------------------------------------------------------ */
/* "We get to know you / partner with you / think for you" 3D layers   */
/* ------------------------------------------------------------------ */

const LAYERS = [
  { no: '01', label: 'We get to know you', color: '#3ef0ff' },
  { no: '02', label: 'We partner with you', color: '#ff2e88' },
  { no: '03', label: 'We think for you', color: '#ffd36b' },
];

const LayerScene: React.FC = () => (
  <div className="group relative w-full h-full min-h-[340px] rounded-[1.4rem] overflow-hidden flex flex-col items-center justify-between py-6 px-4" style={{ background: 'linear-gradient(160deg, rgba(62,240,255,0.14), rgba(255,46,136,0.10) 60%, rgba(255,211,107,0.12))' }}>
    <div className="relative flex-1 w-full flex items-center justify-center" style={{ perspective: 900 }}>
      <div className="relative w-[200px] h-[200px]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(58deg) rotateZ(-38deg)' }}>
        {LAYERS.map((l, i) => (
          <div
            key={l.no}
            className="absolute inset-0 rounded-3xl border-2 flex items-start justify-start p-4 transition-transform duration-300 ease-out"
            style={{
              background: `linear-gradient(135deg, ${l.color}55, ${l.color}1a)`,
              borderColor: l.color,
              boxShadow: `0 10px 30px -8px ${l.color}88`,
              transform: `translateZ(${i * 52}px)`,
            }}
          >
            <span className="font-display text-2xl font-black" style={{ color: l.color }}>{l.no}</span>
          </div>
        ))}
        <div
          className="absolute left-1/2 top-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full flex items-center justify-center font-display text-sm font-black text-black"
          style={{ background: 'var(--iridescent)', transform: 'translateZ(150px) rotateZ(38deg) rotateX(-58deg)', boxShadow: '0 10px 24px -6px rgba(255,46,136,0.6)' }}
        >
          360°
        </div>
      </div>
    </div>
    <ul className="w-full max-w-[260px] space-y-2 list-none">
      {LAYERS.map((l) => (
        <li key={l.no} className="flex items-center gap-3 text-xs font-display font-bold text-white">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l.color }} />
          {l.label}
        </li>
      ))}
    </ul>
  </div>
);

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

const Heading: React.FC<{ kicker: string; title: string; center?: boolean }> = ({ kicker, title, center }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.7, ease: EASE }}
    className={`mb-10 ${center ? 'text-center' : ''}`}
  >
    <div className="font-display text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--accent-cyan-ink)' }}>{kicker}</div>
    <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">{title}</h2>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const AboutUsPage: React.FC<PageProps> = ({ onNavigate, onOpenQuickContact }) => {
  const [tab, setTab] = useState(STORY_TABS[0].id);
  const active = STORY_TABS.find((t) => t.id === tab) ?? STORY_TABS[0];

  return (
    <div className="py-6 sm:py-8 space-y-8 sm:space-y-12 overflow-x-clip">
      {/* ---------------------------- 1. HERO ---------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--accent-cyan-ink)' }}>
              About us
            </motion.div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-white tracking-tight leading-[1.1]">
              <RevealText text="A journey started before two decades with a mountain load of trust acquired on the way." delay={0.1} />
            </h1>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0, ease: EASE }} className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('quote')} className="group px-6 py-3 rounded-full bg-gradient-to-r from-[#3ef0ff] via-[#ff2e88] to-[#ffd36b] text-black font-display text-xs font-black tracking-wide flex items-center gap-2 hover:scale-[1.03] transition-transform cursor-pointer">
                Request a quote <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => onNavigate('services')} className="px-6 py-3 rounded-full border border-white/20 hover:border-[#3ef0ff] hover:text-[#3ef0ff] text-white font-display text-xs font-bold tracking-wide transition-colors cursor-pointer">
                See our services
              </button>
            </motion.div>
          </div>

          {/* 3D stage: stat plates floating in depth */}
          <div className="lg:col-span-5">
            <HeroStage />
          </div>
        </div>
      </section>

      {/* ------------------------ 3. WE ARE ------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Heading kicker="We are" title="Taarruni-360°" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <ScrollStatement text={STATEMENT} />
            <div className="mt-8 space-y-4 text-sm sm:text-base text-[#9a9ca8] leading-relaxed">
              {WE_ARE_REST.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {['We get to know you', 'We partner with you', 'We think for you'].map((t, i) => (
                <React.Fragment key={t}>
                  <span className="ab-cycle px-4 py-2 rounded-full border border-white/15 text-xs font-display font-bold text-white" style={{ animationDelay: `${i * 2}s` }}>{t}</span>
                  {i < 2 && <ArrowRight className="w-4 h-4 text-[#9a9ca8]" aria-hidden="true" />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5"><AICore /></div>
        </div>
      </section>

      {/* ------------- 4. STORY: photo + history / team / what we do ------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5">
            <TiltCard max={8} glow="255,46,136" className="rounded-[2rem] p-3 border border-white/15 bg-[#16181d]/70 backdrop-blur-md">
              <div className="relative h-full" style={{ transform: 'translateZ(26px)' }}>
                <LayerScene />
              </div>
            </TiltCard>
          </div>

          <div className="lg:col-span-7">
            <TiltCard max={3} className="rounded-3xl">
              <div className="holo-border-wrap">
                <div className="holo-content p-6 sm:p-8">
                  <div role="tablist" aria-label="Company story" className="flex gap-2 overflow-x-auto pb-4 mb-4 border-b border-white/10">
                    {STORY_TABS.map((t) => {
                      const isActive = t.id === tab;
                      return (
                        <button key={t.id} role="tab" aria-selected={isActive} onClick={() => setTab(t.id)} className={`relative shrink-0 px-4 py-2 rounded-full font-display text-xs font-bold transition-colors cursor-pointer ${isActive ? 'text-[#0c0d10]' : 'text-[#f2f2f4] hover:text-[#3ef0ff]'}`}>
                          {isActive && <motion.span layoutId="about-tab-pill" className="absolute inset-0 rounded-full" style={{ background: 'var(--iridescent)' }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                          <span className="relative z-10">{t.title}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="max-h-[420px] overflow-y-auto pr-2">
                    <AnimatePresence mode="wait">
                      <motion.div key={active.id} role="tabpanel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-4">
                        {active.content.map((p) => <p key={p.slice(0, 30)} className="text-sm text-[#9a9ca8] leading-relaxed">{p}</p>)}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* -------------------------- 5. TIMELINE -------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Heading kicker="Our journey" title="From a studio to a 360° partner" center />
        <Timeline />
      </section>

      {/* ------------------------- 6. PRINCIPLES ------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Heading kicker="Creativity · Quality · Delivery" title="The ideology we work on" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} initial={{ opacity: 0, y: 40, rotateX: -20 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }} style={{ transformPerspective: 900 }}>
                <TiltCard max={14} glow={p.color.replace('#', '').match(/../g)!.map((h) => parseInt(h, 16)).join(',')} className="group rounded-3xl p-7 bg-[#16181d]/80 border border-white/10 overflow-hidden">
                  <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ab-float" style={{ background: `${p.color}1f`, border: `1px solid ${p.color}66`, color: p.color, boxShadow: `0 14px 30px ${p.color}33`, transform: 'translateZ(50px)', animationDelay: `${i * 0.4}s` }}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="relative font-display text-xl font-bold text-white mb-2" style={{ transform: 'translateZ(30px)' }}>{p.title}</h3>
                  <p className="relative text-sm text-[#9a9ca8] leading-relaxed" style={{ transform: 'translateZ(14px)' }}>{p.text}</p>
                  <span className="absolute left-0 bottom-0 h-[3px] w-0 group-hover:w-full transition-all duration-500" style={{ background: p.color }} />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ------------------- 7. TAKE A TOUR / OFFICES ------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Heading kicker="Take a tour" title="Meet us where we work" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5">
            <TiltCard max={7} className="rounded-3xl p-6 border border-white/10 bg-[#16181d]/80 backdrop-blur-md">
              <p className="text-sm sm:text-base text-[#9a9ca8] leading-relaxed" style={{ transform: 'translateZ(20px)' }}>
                Taarruni Design Solutions (TDS) is a leading multimedia and web solutions provider. Taarruni is a one-stop web solution for web development orientations and internet application development.
              </p>
              <div className="mt-5 max-w-[340px] mx-auto ab-float-slow" style={{ transform: 'translateZ(50px)' }}><GlobeArt /></div>
            </TiltCard>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { t: 'Head office', n: 'Taarruni Design Solutions', a: 'No. 67/1-1, “PRAVARA”, H.B. Samaja Road, Basavanagudi, Bangalore – 560004', c: '62,240,255' },
              { t: 'USA office', n: 'Taarruni', a: 'C/o. Izen Ai Inc, 4556 Fernandez Street, Union City, CA 94587, USA', c: '255,46,136' },
            ].map((o) => (
              <TiltCard key={o.t} max={9} glow={o.c} className="rounded-3xl p-6 border border-white/10 bg-[#16181d]/80 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${o.c})`, transform: 'translateZ(24px)' }}><MapPin className="w-4 h-4" />{o.t}</div>
                <div className="font-display text-base font-bold text-white mb-1" style={{ transform: 'translateZ(20px)' }}>{o.n}</div>
                <p className="text-sm text-[#9a9ca8] leading-relaxed" style={{ transform: 'translateZ(10px)' }}>{o.a}</p>
              </TiltCard>
            ))}
            <TiltCard max={6} className="sm:col-span-2 rounded-3xl p-6 border border-white/10 bg-[#16181d]/80 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="space-y-2 text-sm text-[#9a9ca8]">
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#3ef0ff]" /> +91 80 26561646, +91 98804 77344</div>
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#ff2e88]" /> info@taarruni.com</div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="https://www.nsrcel.org/start-up/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 hover:scale-105 transition-transform">
                    <SmartImg file="nsrcel1.jpg" alt="NSRCEL, IIM Bangalore" className="h-9 w-auto object-contain" fallback={<span className="text-xs font-bold text-black">NSRCEL · IIMB</span>} />
                  </a>
                  <a href="http://discovery.ariba.com/profile/AN01045665902" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-white/20 text-xs font-display font-bold text-white hover:border-[#3ef0ff] hover:text-[#3ef0ff] transition-colors">
                    Ariba profile <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ----------------------------- 8. CTA ----------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: EASE }} className="rounded-[2rem] p-[1.5px]" style={{ background: 'var(--iridescent)' }}>
          <div className="rounded-[calc(2rem-1.5px)] bg-[#16181d] px-7 py-10 sm:px-12 sm:py-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">Come, explore our services</h2>
              <p className="text-sm sm:text-base text-[#9a9ca8] leading-relaxed">Know how Taarruni can support you in your day-to-day IT and marketing needs.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => onNavigate('quote')} className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-[#3ef0ff] via-[#ff2e88] to-[#ffd36b] text-black font-display text-xs font-black tracking-wide flex items-center gap-2 hover:scale-[1.03] transition-transform cursor-pointer">
                Request a quote <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={onOpenQuickContact} className="px-7 py-3.5 rounded-full border border-white/20 hover:border-[#3ef0ff] hover:text-[#3ef0ff] text-white font-display text-xs font-bold tracking-wide transition-colors cursor-pointer">
                Quick contact
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <style>{`
        .ab-cycle { animation: abCycle 6s ease-in-out infinite; }
        @keyframes abCycle {
          0%, 28%, 100% { background: transparent; border-color: rgb(var(--fg-rgb) / 0.15); transform: none; }
          6%, 22% { background: rgba(62,240,255,0.14); border-color: #3ef0ff; transform: translateY(-3px); }
        }
        .ab-spin { animation: abSpin 14s linear infinite; }
        @keyframes abSpin { to { transform: rotateZ(360deg); } }
        .ab-orbit { animation: abOrbit 22s linear infinite; }
        @keyframes abOrbit { from { transform: rotateY(var(--a)); } to { transform: rotateY(calc(var(--a) + 360deg)); } }
        .ab-face { animation: abFace 22s linear infinite; }
        @keyframes abFace {
          from { transform: translateZ(190px) rotateY(calc(var(--a) * -1)); }
          to   { transform: translateZ(190px) rotateY(calc(var(--a) * -1 - 360deg)); }
        }
        .ab-core { animation: abCore 3.2s ease-in-out infinite; }
        @keyframes abCore {
          0%, 100% { box-shadow: 0 0 40px rgba(62,240,255,0.45), 0 0 90px rgba(255,46,136,0.25); }
          50% { box-shadow: 0 0 70px rgba(62,240,255,0.7), 0 0 130px rgba(255,46,136,0.45); }
        }
        .ab-float { animation: abFloat 4s ease-in-out infinite; }
        .ab-float-slow { animation: abFloat 6s ease-in-out infinite; }
        @keyframes abFloat { 0%,100% { translate: 0 0; } 50% { translate: 0 -8px; } }
        .ab-pulse { stroke-dasharray: 6 60; animation: abPulse 2.4s linear infinite; }
        @keyframes abPulse { from { stroke-dashoffset: 66; } to { stroke-dashoffset: 0; } }
        .ab-blink { animation: abBlink 2.4s ease-in-out infinite; }
        @keyframes abBlink { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        .ab-scan { animation: abScan 4.5s ease-in-out infinite; }
        @keyframes abScan { 0% { top: -20%; } 100% { top: 105%; } }
        .ab-ping { transform-box: fill-box; transform-origin: center; animation: abPing 2s ease-out infinite; }
        @keyframes abPing { from { transform: scale(1); opacity: 0.9; } to { transform: scale(3.2); opacity: 0; } }
        .ab-meridian { transform-box: fill-box; transform-origin: center; animation: abMer 9s ease-in-out infinite alternate; }
        @keyframes abMer { from { transform: scaleX(1); } to { transform: scaleX(0.55); } }
        @media (prefers-reduced-motion: reduce) {
          .ab-cycle, .ab-spin, .ab-orbit, .ab-face, .ab-core, .ab-float, .ab-float-slow, .ab-pulse, .ab-blink, .ab-scan, .ab-ping, .ab-meridian { animation: none; }
        }
      `}</style>
    </div>
  );
};