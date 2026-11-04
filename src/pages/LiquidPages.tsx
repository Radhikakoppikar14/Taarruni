import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  Compass, 
  Code, 
  Layers, 
  Cpu, 
  Globe 
} from 'lucide-react';
import { StatsRing3D } from '../components/StatsRing3D';
import { ClientsCylinder3D } from '../components/ClientsCylinder3D';
import { TestimonialsCoverflow3D } from '../components/TestimonialsCoverflow3D';
import { PortfolioShaderTiles } from '../components/PortfolioShaderTiles';
import { ProcessTimeline3D } from '../components/ProcessTimeline3D';
import { HeroServicesScene } from '../components/HeroServicesScene';
import { SectionArt } from '../components/SectionArt';
import { StudioHub } from '../components/StudioHub';

interface PageProps {
  onNavigate: (route: string) => void;
  onOpenQuickContact: () => void;
}

/* =========================================================================
   1. HOME PAGE
========================================================================= */
export const HomePage: React.FC<PageProps> = ({ onNavigate, onOpenQuickContact }) => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline & CTAs (7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Character-Split Style Headline */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] text-balance">
                Digital work that <span className="text-outline">moves</span> your <span className="text-gradient-iridescent">brand.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#9a9ca8] max-w-xl leading-relaxed">
                A leading Digital Marketing and IT Solutions company.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => onNavigate('quote')}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#3ef0ff] via-[#ff2e88] to-[#ffd36b] text-black font-display font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl btn-shine-sweep cursor-pointer"
                >
                  Start a project
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="px-7 py-4 rounded-2xl bg-[#16181d] border border-white/20 hover:border-[#3ef0ff] text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer"
                >
                  See what we do
                </button>
              </div>
            </motion.div>

            {/* Right: services 3D scene – website, app, growth chart, billboard (5 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <HeroServicesScene />
            </motion.div>

          </div>
        </div>
      </section>

      {/* "is what we are known for" - Two Cards */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center sm:text-left">
            <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
              "is what we are known for"
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#3ef0ff] to-[#ff2e88] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Marketing Solutions Card */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onNavigate('marketing')}
              className="holo-border-wrap group cursor-pointer"
            >
              <div className="holo-content p-8 sm:p-10 min-h-[260px] flex flex-col justify-between">
                <div>
                  <SectionArt variant="marketing" bare className="mb-5 max-w-[320px] mx-auto" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-xs tracking-widest uppercase text-[#3ef0ff]">
                      Service 01
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#3ef0ff] transition-colors">
                    Marketing Solutions
                  </h3>
                  <p className="text-sm text-[#9a9ca8] leading-relaxed">
                    These days, entrepreneurs are adopting various ways to enhance their business. Online marketing is one such way to attract customers.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs font-mono text-[#3ef0ff]">
                  Explore Marketing Capabilities →
                </div>
              </div>
            </motion.div>

            {/* IT Solutions Card */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onNavigate('it')}
              className="holo-border-wrap group cursor-pointer"
            >
              <div className="holo-content p-8 sm:p-10 min-h-[260px] flex flex-col justify-between">
                <div>
                  <SectionArt variant="it" bare className="mb-5 max-w-[320px] mx-auto" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-xs tracking-widest uppercase text-[#ff2e88]">
                      Service 02
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#ff2e88] transition-colors">
                    IT Solutions
                  </h3>
                  <p className="text-sm text-[#9a9ca8] leading-relaxed">
                    We are team of specialized, experienced, software architect and developers working together to develop world class IT solutions.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs font-mono text-[#ff2e88]">
                  Explore IT Architecture →
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who we are + Explore more – one combined studio hub */}
      <StudioHub onNavigate={onNavigate} />

      {/* Stats with Rotating 3D Rings */}
      <StatsRing3D />

      {/* Portfolio teaser – only 3 projects here, the rest live on the Portfolio page */}
      <PortfolioShaderTiles limit={3} />

      {/* 3D Cylinder of Client Names */}
      <ClientsCylinder3D showNameIndex={false} />

      {/* Testimonials 3D Coverflow */}
      <TestimonialsCoverflow3D />

      {/* 5-Stage Process Timeline */}
      <ProcessTimeline3D />
    </div>
  );
};

/* =========================================================================
   2. ABOUT US PAGE (#/about)
========================================================================= */
// The About Us page lives in its own file.
export { AboutUsPage } from './AboutStoryPage';

/* =========================================================================
   3. SERVICES OVERVIEW (#/services)
========================================================================= */
export const ServicesOverviewPage: React.FC<PageProps> = ({ onNavigate }) => {
  const categories = [
    {
      id: 'marketing',
      title: 'Marketing Solutions',
      desc: 'Online marketing, SEO/SEM, email campaigns, domain hosting, and traditional offline marketing.',
      link: 'marketing',
      accent: '#3ef0ff',
    },
    {
      id: 'it',
      title: 'IT Solutions',
      desc: 'Software development, technical evaluation, software consulting, CMS, e-commerce, and architectural/civil.',
      link: 'it',
      accent: '#ffd36b',
    },
    {
      id: 'branding',
      title: 'All India Branding',
      desc: 'Internal signage, external signage, hoardings, billboards, and turnkey nationwide retail branding.',
      link: 'branding',
      accent: '#ff2e88',
    },
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
          <div className="lg:col-span-7 max-w-3xl">
          <div className="text-xs font-display tracking-[0.25em] text-[#3ef0ff] uppercase mb-2">
            Integrated Disciplines
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Services Overview
          </h1>
          <p className="text-[#9a9ca8] text-base">
            Select a service pillar below to view technical specifications, sub-services, and execution frameworks.
          </p>
          </div>
          <div className="lg:col-span-5">
            <SectionArt variant="services" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => onNavigate(cat.link)}
              className="holo-border-wrap group cursor-pointer"
            >
              <div className="holo-content p-8 min-h-[320px] flex flex-col justify-between">
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-black mb-6"
                    style={{ background: cat.accent }}
                  >
                    0{idx + 1}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#3ef0ff] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9a9ca8] leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold" style={{ color: cat.accent }}>
                  <span>ACCESS HUB</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. MARKETING SOLUTIONS (#/marketing) & (#/marketing/online)
========================================================================= */
export const MarketingSolutionsPage: React.FC<PageProps & { isOnlineSub?: boolean }> = ({
  onNavigate,
  onOpenQuickContact,
  isOnlineSub = false,
}) => {
  const cards = [
    {
      title: 'Online Marketing Services',
      desc: 'Web applications development is critical requirement of any business to sustain and succeed online.',
      route: 'marketing/online',
    },
    {
      title: 'Offline Marketing Services',
      desc: 'The email server and control panel comes with every Domain. The web mail facility is provided by any site administrator...',
      route: 'marketing',
    },
    {
      title: 'Comprehensive',
      desc: 'These days, entrepreneurs are adopting various ways to enhance their business. Online marketing is one such way to attract...',
      route: 'marketing',
    },
  ];

  const onlineItems = [
    {
      title: 'Web Development',
      desc: 'Web applications development is critical requirement of any business to sustain and succeed online.',
    },
    {
      title: 'Email Marketing',
      desc: 'The email server and control panel comes with every Domain. The web mail facility is provided by any site administrator...',
    },
    {
      title: 'Digital Marketing',
      desc: 'These days, entrepreneurs are adopting various ways to enhance their business. Online marketing is one such way to attract...',
    },
    {
      title: 'SEO',
      desc: 'With the dynamics of the industry, the jargons used to change. New sectors are identified, developed and accordingly their business...',
    },
    {
      title: 'Domain Registration and Hosting',
      desc: 'Domain name is the unique identity given to your business and company on the web...',
    },
    {
      title: 'Email/Landing Page Design',
      desc: 'Be it a small business enterprise or a big one, quick and reliable communication is always a challenge....',
    },
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
          <div className="lg:col-span-7 max-w-3xl">
          <div className="text-xs font-display tracking-[0.25em] text-[#3ef0ff] uppercase mb-2">
            Marketing Solutions
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {isOnlineSub ? 'Online Marketing Services' : 'Marketing Solutions'}
          </h1>
          <p className="text-sm sm:text-base text-[#9a9ca8] leading-relaxed">
            Taarruni design solutions (TDS) is A leading digital marketing and IT solutions company.
          </p>
          </div>
          <div className="lg:col-span-5">
            <SectionArt variant="marketing" />
          </div>
        </div>

        {/* 3 Core Cards */}
        {!isOnlineSub && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {cards.map((c, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                onClick={() => onNavigate(c.route)}
                className="holo-border-wrap cursor-pointer group"
              >
                <div className="holo-content p-8 min-h-[260px] flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#3ef0ff] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9a9ca8] leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 text-xs font-mono text-[#3ef0ff]">
                    Learn More →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 6 Online Marketing Items */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-xl font-bold text-white">
              Online Marketing Capabilities
            </h2>
            {isOnlineSub && (
              <button
                onClick={() => onNavigate('marketing')}
                className="text-xs font-mono text-[#3ef0ff] hover:underline"
              >
                ← Back to Marketing Overview
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onlineItems.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#16181d] border border-white/10 space-y-3">
                <div className="text-xs font-mono text-[#3ef0ff]">MODULE 0{idx + 1}</div>
                <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-[#9a9ca8] leading-relaxed">{item.desc}</p>
                <button
                  onClick={onOpenQuickContact}
                  className="text-xs font-bold text-[#ff2e88] hover:underline pt-2 block cursor-pointer"
                >
                  Inquire Now →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   5. IT SOLUTIONS (#/it)
========================================================================= */
export const ITSolutionsPage: React.FC<PageProps> = ({ onNavigate, onOpenQuickContact }) => {
  const cards = [
    {
      title: 'Software Development',
      desc: 'We should be glad to support you in your software development needs. we can handle online and offline application development from small to medium scale..',
    },
    {
      title: 'Technical Evalution',
      desc: 'Achieve more profitability by reducing placement time for a given technical postion by using a technical evalution..',
    },
    {
      title: 'Software Consulting',
      desc: 'Our experienced and certified tech consultant can help you in achieving your digital transformation goals..',
    },
  ];

  const subPages = [
    { title: 'CMS Development', desc: 'Custom enterprise content management systems built for scale and ease of operation.' },
    { title: 'E-Commerce Development', desc: 'Secure digital storefronts with integrated payment processing and real-time inventory.' },
    { title: 'Architectural and Civil', desc: 'High-precision 3D digital visualizations, wireframe modeling, and structural layouts.' },
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
          <div className="lg:col-span-7 max-w-3xl">
          <div className="text-xs font-display tracking-[0.25em] text-[#ffd36b] uppercase mb-2">
            Engineering & Technology
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            IT Solutions
          </h1>
          <p className="text-sm sm:text-base text-[#9a9ca8]">
            World-class enterprise software architecture, rapid technical evaluations, and custom development.
          </p>
          </div>
          <div className="lg:col-span-5">
            <SectionArt variant="it" />
          </div>
        </div>

        {/* 3 Core Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {cards.map((c, idx) => (
            <motion.div key={idx} whileHover={{ y: -8 }} className="holo-border-wrap group">
              <div className="holo-content p-8 min-h-[260px] flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#ffd36b] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9a9ca8] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <button
                  onClick={onOpenQuickContact}
                  className="pt-4 border-t border-white/10 text-xs font-mono text-[#ffd36b] text-left cursor-pointer"
                >
                  Request Technical Brief →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub-Pages List */}
        <div className="space-y-6">
          <h2 className="font-display text-xl font-bold text-white border-b border-white/10 pb-4">
            Specialized Sub-Disciplines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subPages.map((sub, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#16181d] border border-white/10 space-y-3">
                <h3 className="font-display text-base font-bold text-white">{sub.title}</h3>
                <p className="text-xs text-[#9a9ca8] leading-relaxed">{sub.desc}</p>
                <button
                  onClick={onOpenQuickContact}
                  className="text-xs font-bold text-[#3ef0ff] hover:underline cursor-pointer"
                >
                  Consult on this →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   6. ALL INDIA BRANDING (#/branding)
========================================================================= */
export const BrandingPage: React.FC<PageProps> = ({ onOpenQuickContact }) => {
  const cards = [
    {
      title: 'Internal Signage',
      desc: 'Precision wayfinding, reception 3D metal acrylic logos, floor directories, and corporate interior branding.',
    },
    {
      title: 'External Signage',
      desc: 'Illuminated 3D LED letters, ACP building facades, architectural pylons, and weatherproof exterior signboards.',
    },
    {
      title: 'Hoardings',
      desc: 'High-impact highway billboards, large-format unipoles, and prime urban visual outdoor media networks.',
    },
    {
      title: 'Outdoor Branding',
      desc: 'Turnkey retail store cladding, nationwide dealer point-of-sale branding, and nationwide fleet graphics across 45+ cities.',
    },
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
          <div className="lg:col-span-7 max-w-3xl">
          <div className="text-xs font-display tracking-[0.25em] text-[#ff2e88] uppercase mb-2">
            Outdoor Media & Display Systems
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            All India Branding
          </h1>
          <p className="text-sm sm:text-base text-[#9a9ca8]">
            Complete physical fabrication, municipal safety adherence, and turnkey installation across India.
          </p>
          </div>
          <div className="lg:col-span-5">
            <SectionArt variant="branding" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c, idx) => (
            <motion.div key={idx} whileHover={{ y: -8 }} className="holo-border-wrap group">
              <div className="holo-content p-8 min-h-[240px] flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#ff2e88] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9a9ca8] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={onOpenQuickContact}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2e88] to-[#ffd36b] text-black font-display font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Talk to us
                  </button>
                  <span className="text-[11px] font-mono text-[#9a9ca8]">Nationwide SLAs</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   Floating3D – pointer-parallax CSS 3D scene (cube, rings, orbs)
========================================================================= */
const Floating3D: React.FC<{ className?: string; side?: 'left' | 'right' }> = ({ className = '', side = 'right' }) => {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 16 });
  const sy = useSpring(py, { stiffness: 60, damping: 16 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-25, 25]);
  const rotX = useTransform(sy, [-0.5, 0.5], [20, -20]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [px, py]);

  const face = (t: string) => (
    <div
      key={t}
      className="absolute inset-0"
      style={{
        transform: t,
        border: '1.5px solid var(--accent-cyan)',
        background: 'rgba(62,240,255,0.06)',
        boxShadow: '0 0 24px rgba(62,240,255,0.25) inset',
      }}
    />
  );
  const S = 70;

  return (
    <div aria-hidden="true" className={`absolute pointer-events-none ${side === 'right' ? 'right-[6%]' : 'left-[6%]'} bottom-[8%] w-[260px] h-[260px] ${className}`} style={{ perspective: 900, zIndex: 0 }}>
      <motion.div className="absolute inset-0" style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}>
        {/* cube */}
        <div className="fx-cube absolute left-1/2 top-1/2" style={{ width: S * 2, height: S * 2, marginLeft: -S, marginTop: -S, transformStyle: 'preserve-3d' }}>
          {[`rotateY(0deg) translateZ(${S}px)`, `rotateY(90deg) translateZ(${S}px)`, `rotateY(180deg) translateZ(${S}px)`, `rotateY(-90deg) translateZ(${S}px)`, `rotateX(90deg) translateZ(${S}px)`, `rotateX(-90deg) translateZ(${S}px)`].map(face)}
        </div>
        {/* rings */}
        {[{ s: 240, c: 'var(--accent-magenta)', r: 'rotateX(70deg)', d: 12 }, { s: 200, c: 'var(--accent-gold)', r: 'rotateY(70deg)', d: 9 }].map((r, i) => (
          <div key={i} className="absolute left-1/2 top-1/2" style={{ width: r.s, height: r.s, marginLeft: -r.s / 2, marginTop: -r.s / 2, transform: r.r, transformStyle: 'preserve-3d' }}>
            <div className="fx-spin w-full h-full rounded-full" style={{ border: `1.5px solid ${r.c}`, boxShadow: `0 0 18px ${r.c}`, animationDuration: `${r.d}s`, animationDirection: i ? 'reverse' : 'normal' }} />
          </div>
        ))}
        {/* orbs */}
        {[{ x: 10, y: 20, z: 90, c: 'var(--accent-cyan)' }, { x: 85, y: 70, z: 130, c: 'var(--accent-magenta)' }, { x: 70, y: 8, z: -60, c: 'var(--accent-gold)' }].map((o, i) => (
          <span key={i} className="fx-bob absolute w-4 h-4 rounded-full" style={{ left: `${o.x}%`, top: `${o.y}%`, background: o.c, boxShadow: `0 0 20px ${o.c}`, transform: `translateZ(${o.z}px)`, animationDelay: `${i * 0.7}s` }} />
        ))}
      </motion.div>
      <style>{`
        .fx-cube { animation: fxCube 16s linear infinite; }
        @keyframes fxCube { from { transform: rotateX(-20deg) rotateY(0deg); } to { transform: rotateX(340deg) rotateY(360deg); } }
        .fx-spin { animation: fxSpin 12s linear infinite; }
        @keyframes fxSpin { to { transform: rotateZ(360deg); } }
        .fx-bob { animation: fxBob 4s ease-in-out infinite; }
        @keyframes fxBob { 0%,100% { margin-top: 0; } 50% { margin-top: -16px; } }
        @media (prefers-reduced-motion: reduce) { .fx-cube, .fx-spin, .fx-bob { animation: none; } }
      `}</style>
    </div>
  );
};

/* =========================================================================
   7. CAREERS (#/careers) – full-screen split, underline-only form
========================================================================= */
const LINE = 'rgb(var(--fg-rgb) / 0.16)';
const underlineInput =
  'w-full bg-transparent border-0 border-b py-3 text-base focus:outline-hidden focus:border-[#3ef0ff] transition-colors placeholder:text-[#9a9ca8]/60';

export const CareersPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', message: '' });
  const roles = ['3D Animator', 'Full-Stack Developer', 'SEO Strategist', 'UI/UX Designer'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Career Application: ${formData.role} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nRole Applied For: ${formData.role}\n\nCover Note / Experience Summary:\n${formData.message}`
    );
    window.location.href = `mailto:info@taarruni.com?subject=${subject}&body=${body}`;
  };

  const field = (n: string, label: string, el: React.ReactNode) => (
    <motion.label
      className="block group"
      initial={{ opacity: 0, x: 40, rotateY: -25 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.7, delay: 0.3 + parseInt(n, 10) * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 800, transformOrigin: 'left center' }}
    >
      <span className="flex items-baseline gap-3 text-[11px] font-display font-bold uppercase tracking-[0.2em] transition-transform duration-300 group-focus-within:translate-x-1" style={{ color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--accent-cyan-ink)' }}>{n}</span>
        {label}
      </span>
      <span className="relative block">
        {el}
        <span aria-hidden="true" className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" style={{ background: 'var(--iridescent)', boxShadow: '0 4px 14px rgba(62,240,255,0.5)' }} />
      </span>
    </motion.label>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100svh-6rem)] w-full">
      {/* Left: statement */}
      <div className="relative overflow-hidden flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-12 lg:py-20 border-b lg:border-b-0 lg:border-r" style={{ borderColor: LINE }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative z-10 font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--accent-cyan-ink)' }}>
          Taarruni · Careers
        </motion.div>
        <Floating3D />

        <div className="relative z-10 py-12">
          <h1 className="font-display font-black tracking-tight leading-[0.95] text-[4.5rem] sm:text-[7rem] xl:text-[9rem]" style={{ color: 'var(--text-strong)' }}>
            {['Join', 'the', 'team.'].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={i === 2 ? { color: 'var(--accent-cyan-ink)' } : undefined}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-md text-lg" style={{ color: 'var(--text-muted)' }}>
            Join a team that thinks for you and with you.
          </p>
        </div>

        <ul className="relative z-10 flex flex-wrap gap-x-8 gap-y-2 text-sm font-display font-bold" style={{ color: 'var(--text-strong)' }}>
          {['We get to know you', 'We partner with you', 'We think for you'].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-magenta)' }} />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: plain form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-center gap-8 px-6 sm:px-12 lg:px-16 py-12 lg:py-20"
      >
        {field('01', 'Name *', <input type="text" required placeholder="Your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={underlineInput} style={{ borderColor: LINE, color: 'var(--text-strong)' }} />)}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {field('02', 'Email *', <input type="email" required placeholder="you@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={underlineInput} style={{ borderColor: LINE, color: 'var(--text-strong)' }} />)}
          {field('03', 'Phone *', <input type="tel" required placeholder="+91 ..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={underlineInput} style={{ borderColor: LINE, color: 'var(--text-strong)' }} />)}
        </div>

        <div>
          {field('04', 'Role / Domain *', <input type="text" required placeholder="Type a role or pick one below" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className={underlineInput} style={{ borderColor: LINE, color: 'var(--text-strong)' }} />)}
          <div className="mt-3 flex flex-wrap gap-2">
            {roles.map((r) => (
              <motion.button
                type="button"
                key={r}
                whileHover={{ y: -4, scale: 1.07, rotateX: 12 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormData({ ...formData, role: r })}
                className="px-3 py-1.5 rounded-full text-xs font-display font-bold border transition-colors cursor-pointer hover:border-[#3ef0ff] hover:text-[#3ef0ff]"
                style={{ transformPerspective: 500, borderColor: LINE, color: formData.role === r ? 'var(--accent-cyan-ink)' : 'var(--text-muted)' }}
              >
                {r}
              </motion.button>
            ))}
          </div>
        </div>

        {field('05', 'About you *', <textarea required rows={3} placeholder="Background, tools you master, portfolio link..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${underlineInput} resize-none`} style={{ borderColor: LINE, color: 'var(--text-strong)' }} />)}

        <motion.button
          type="submit"
          whileHover={{ y: -4, scale: 1.05, rotateX: 10, boxShadow: '0 18px 30px -10px rgba(62,240,255,0.55)' }}
          whileTap={{ scale: 0.97 }}
          className="btn-shine-sweep group self-start flex items-center gap-3 px-8 py-4 rounded-full font-display text-xs font-black uppercase tracking-widest cursor-pointer"
          style={{ background: 'var(--text-strong)', color: 'var(--bg-graphite)', transformPerspective: 600 }}
        >
          Send application
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.form>
    </div>
  );
};

/* =========================================================================
   8. REQUEST QUOTE (#/quote) – a form you read as a sentence
========================================================================= */
export const RequestQuotePage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'Web Development', budget: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Formal RFP / Quote Request: ${formData.service} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nBudget Range: ${formData.budget || 'Flexible'}\n\nProject Scope & Timeline:\n${formData.message}`
    );
    window.location.href = `mailto:info@taarruni.com?subject=${subject}&body=${body}`;
  };

  const included = ['A formal written proposal', 'A transparent line-item timeline', 'Prepared directly by our engineering team'];

  // inline "blank" inside the sentence
  const blank = 'inline-block align-baseline bg-transparent border-0 border-b-2 px-1 mx-1 focus:outline-hidden focus:border-[#3ef0ff] focus:-translate-y-0.5 focus:shadow-[0_10px_18px_-12px_#3ef0ff] transition-all placeholder:text-[#9a9ca8]/50';
  const ink = { borderColor: 'rgb(var(--fg-rgb) / 0.3)', color: 'var(--accent-cyan-ink)' } as React.CSSProperties;

  return (
    <form onSubmit={handleSubmit} className="relative overflow-hidden min-h-[calc(100svh-6rem)] w-full flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-10 lg:py-14">
      <Floating3D className="!right-[3%] !bottom-[22%] scale-125 opacity-70" />
      {/* top bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--accent-magenta-ink)' }}>Request a quote</div>
        <div className="flex flex-wrap gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
          <a href="mailto:info@taarruni.com" className="flex items-center gap-2 hover:text-[#3ef0ff] transition-colors"><Mail className="w-4 h-4" /> info@taarruni.com</a>
          <a href="https://api.whatsapp.com/send?phone=919880477344&text=Yes%20I%20am%20Interested" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#3ef0ff] transition-colors"><Phone className="w-4 h-4" /> +91 98804 77344</a>
        </div>
      </div>

      {/* the sentence */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -18 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1200, transformOrigin: 'top center', color: 'var(--text-strong)' }}
        className="relative z-10 py-12 font-display font-bold tracking-tight leading-[1.9] text-2xl sm:text-4xl xl:text-5xl"
      >
        Hi, I’m
        <input required placeholder="your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`${blank} w-[9ch] sm:w-[11ch]`} style={{ ...ink, width: `${Math.max(9, formData.name.length + 1)}ch` }} />
        . Reach me at
        <input required type="email" placeholder="email@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={blank} style={{ ...ink, width: `${Math.max(16, formData.email.length + 1)}ch`, maxWidth: '100%' }} />
        or
        <input required type="tel" placeholder="+91 / +1 ..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={blank} style={{ ...ink, width: `${Math.max(11, formData.phone.length + 1)}ch` }} />
        . I need help with
        <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={`${blank} cursor-pointer`} style={ink}>
          <option value="Web Development">Web Development</option>
          <option value="Digital Marketing/SEO">Digital Marketing / SEO</option>
          <option value="Printing">Printing &amp; Signage</option>
        </select>
        with a budget of
        <input placeholder="₹2L – ₹5L / $5K" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={blank} style={{ ...ink, width: `${Math.max(13, formData.budget.length + 1)}ch` }} />
        . Here is what we are building:
        <textarea required rows={2} placeholder="deliverables, objectives, target launch date..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="block w-full mt-2 bg-transparent border-0 border-b-2 text-xl sm:text-2xl font-normal leading-snug focus:outline-hidden focus:border-[#3ef0ff] transition-colors resize-none placeholder:text-[#9a9ca8]/50" style={{ ...ink, color: 'var(--text-strong)' }} />
      </motion.div>

      {/* bottom: what you get + send */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-6 border-t" style={{ borderColor: 'rgb(var(--fg-rgb) / 0.16)' }}>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          {included.map((t) => (
            <li key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-cyan)' }} />{t}</li>
          ))}
        </ul>
        <motion.button
          type="submit"
          whileHover={{ y: -4, scale: 1.05, rotateX: 10, boxShadow: '0 18px 30px -10px rgba(255,46,136,0.55)' }}
          whileTap={{ scale: 0.97 }}
          className="btn-shine-sweep group self-start lg:self-auto flex items-center gap-3 px-8 py-4 rounded-full font-display text-xs font-black uppercase tracking-widest cursor-pointer"
          style={{ background: 'var(--text-strong)', color: 'var(--bg-graphite)', transformPerspective: 600 }}
        >
          Send to info@taarruni.com
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </form>
  );
};

/* =========================================================================
   9. CONTACT (#/contact)
========================================================================= */
export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:info@taarruni.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
          <div className="lg:col-span-7 max-w-3xl">
          <div className="text-xs font-display tracking-[0.25em] text-[#3ef0ff] uppercase mb-2">
            Direct Coordinates
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-base text-[#9a9ca8]">
            Headquartered in Bangalore, India with North America client operations in California, USA.
          </p>
          </div>
          <div className="lg:col-span-5">
            <SectionArt variant="contact" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Block + Abstract 3D Location Marker (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Abstract 3D Location Marker (Code Generated, No External Maps) */}
            <div className="p-8 rounded-3xl bg-[#16181d] border border-white/10 relative overflow-hidden text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-dashed border-[#3ef0ff] flex items-center justify-center animate-spin" style={{ animationDuration: '12s' }}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3ef0ff] to-[#ff2e88] flex items-center justify-center text-black font-black">
                  TDS
                </div>
              </div>
              <div className="font-display text-base font-bold text-white mb-1">
                Bangalore Studio Coordinates
              </div>
              <div className="text-xs font-mono text-[#3ef0ff]">
                12.9406° N, 77.5738° E · Basavanagudi
              </div>
            </div>

            {/* Offices */}
            <div className="p-8 rounded-3xl bg-[#16181d] border border-white/10 space-y-6 text-xs text-[#9a9ca8]">
              <div>
                <div className="font-display font-bold text-white text-sm mb-1">Head Office (India):</div>
                <p className="leading-relaxed">
                  Taarruni Design Solutions, No. 67/1-1, "PRAVARA", H.B. Samaja Road, Basavanagudi, Bangalore – 560004
                </p>
              </div>

              <div>
                <div className="font-display font-bold text-white text-sm mb-1">USA Office:</div>
                <p className="leading-relaxed">
                  Taarruni, C/o. Izen Ai Inc, 4556 Fernandez Street, Union City, CA 94587, USA
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#3ef0ff]" />
                  <span>+91 80 26561646 / +91 98804 77344</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#ff2e88]" />
                  <span>info@taarruni.com</span>
                </div>
              </div>

              <a
                href="https://api.whatsapp.com/send?phone=919880477344&text=Yes%20I%20am%20Interested"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] text-black font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span>WhatsApp Instant Connect</span>
              </a>
            </div>

          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="holo-border-wrap">
              <div className="holo-content p-8 sm:p-12">
                <h3 className="font-display text-xl font-bold text-white mb-6">
                  Send a Direct Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#9a9ca8] mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-white/10 text-white text-sm focus:border-[#3ef0ff] focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#9a9ca8] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-white/10 text-white text-sm focus:border-[#3ef0ff] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#9a9ca8] mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 / +1 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-white/10 text-white text-sm focus:border-[#3ef0ff] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#9a9ca8] mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can Taarruni Design Solutions assist your enterprise?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-white/10 text-white text-sm focus:border-[#3ef0ff] focus:outline-hidden resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3ef0ff] via-[#ff2e88] to-[#ffd36b] text-black font-display font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity btn-shine-sweep cursor-pointer shadow-lg"
                  >
                    Send to info@taarruni.com
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};