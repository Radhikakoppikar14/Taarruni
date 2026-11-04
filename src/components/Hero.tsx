import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';
import { TechTreeBackground3D } from './TechTreeBackground3D';
import { TDS_COMPANY_INFO } from '../data/taarruniData';

interface HeroProps {
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onRequestQuote }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white pt-10 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-200/80">
      
      {/* 1. Full-Page React Three Fiber Canvas Background Container */}
      <TechTreeBackground3D />

      {/* 2. Content Text as HTML Overlay (relative z-10) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pointer-events-auto">
        
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-16">
          
          {/* Left Column: Proposition, Metrics & Actions (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Clean Unboxed Metadata Kicker (Anti-Slop Rule §1.A) */}
            <motion.div 
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest mb-4"
            >
              <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
              <span>Incorporated 2005</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Bangalore, India</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>NSRCEL (IIMB) Alum</span>
            </motion.div>

            {/* Headline with Balanced Wrap */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] text-balance mb-6">
              A Leading <span className="text-red-600">Digital Marketing</span> and IT Solutions Company.
            </h1>

            {/* Subtitle with Glassmorphic Backdrop for Maximum Legibility over 3D Canvas */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mb-8 bg-white/60 backdrop-blur-xs p-2 rounded-xl border border-white/60">
              Taarruni Design Solutions (TDS) delivers integrated digital engineering and branding excellence—from high-performance corporate websites and search optimization to photorealistic 3D multimedia animations and pan-India outdoor signages.
            </p>

            {/* Action Buttons with 3D Hover Effects */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <motion.button
                whileHover={{ y: -3, scale: 1.02, boxShadow: '0 12px 24px -6px rgba(220, 38, 38, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onRequestQuote}
                className="px-6 py-3.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('about')}
                className="px-6 py-3.5 text-sm font-semibold text-slate-800 hover:text-slate-950 bg-white/90 backdrop-blur-md hover:bg-white border border-slate-300/80 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Our 20-Year Heritage
              </motion.button>
            </div>

            {/* Quantitative Proof Strip with Glassmorphism */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80">
              {[
                { value: '20+', label: 'Years Active' },
                { value: '500+', label: 'Projects Delivered' },
                { value: '45+', label: 'Pan-India Cities' },
                { value: '100%', label: 'Verified In-House' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, scale: 1.04 }}
                  className="p-3 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200/60 shadow-2xs transition-all"
                >
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: 3D Tech-Tree Live Spatial Viewport Indicator (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Floating Glassmorphic 3D Perspective Card */}
            <div className="w-full max-w-md p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xl space-y-4 pointer-events-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Interactive 3D Tech Tree
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-slate-400">
                  WebGL 60FPS
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Background R3F canvas actively maps Taarruni's multi-tier technology lattice, orbiting discipline satellites, and real-time scroll reactions.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500">
                <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/50">
                  <div className="font-bold text-slate-800">Dynamic Scroll</div>
                  <div>Reacts to viewport depth</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-200/50">
                  <div className="font-bold text-slate-800">Mouse Parallax</div>
                  <div>Smooth lerp rotation</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Section Lead-in: "is what we are known for." (Authentic from original taarruni.com) */}
        <div className="pt-6 border-t border-slate-200/70">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                Core Specializations
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                "is what we are known for."
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Two integrated pillars engineered to accelerate enterprise visibility and power business operations.
            </p>
          </div>

          {/* Dual Hallmark Cards with 3D live hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Marketing Solutions Card */}
            <motion.div
              whileHover={{ 
                y: -6, 
                scale: 1.015,
                boxShadow: '0 20px 30px -10px rgba(220, 38, 38, 0.15)',
                transition: { duration: 0.2 } 
              }}
              onClick={() => onNavigate('services')}
              className="p-6 sm:p-7 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 hover:border-red-300 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.08 }}
                    className="w-12 h-12 rounded-xl bg-red-50/90 border border-red-100 flex items-center justify-center p-2.5 shadow-2xs"
                  >
                    <img
                      src="/images/online-marketing-icon.png"
                      alt="Marketing Solutions"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <span className="text-xs font-bold text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore Marketing</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                  Marketing Solutions
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  These days, entrepreneurs are adopting various ways to enhance their business. Online marketing is one such way to attract high-intent customers and expand geographic reach. We engineer full-funnel search engine optimization (SEO), SEM, PPC, and brand strategy designed for measurable commercial ROI.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <span>Technical SEO</span>
                <span aria-hidden="true">·</span>
                <span>Google Ads PPC</span>
                <span aria-hidden="true">·</span>
                <span>Social Media Marketing</span>
              </div>
            </motion.div>

            {/* 2. IT Solutions Card */}
            <motion.div
              whileHover={{ 
                y: -6, 
                scale: 1.015,
                boxShadow: '0 20px 30px -10px rgba(2, 132, 199, 0.15)',
                transition: { duration: 0.2 } 
              }}
              onClick={() => onNavigate('services')}
              className="p-6 sm:p-7 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    whileHover={{ rotate: -5, scale: 1.08 }}
                    className="w-12 h-12 rounded-xl bg-sky-50/90 border border-sky-100 flex items-center justify-center p-2.5 shadow-2xs"
                  >
                    <img
                      src="/images/comprehensive-marketing-icon.png"
                      alt="IT Solutions"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <span className="text-xs font-bold text-sky-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore IT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                  IT Solutions
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We are a team of specialized, experienced software architects and developers working together to develop world-class IT solutions. From custom enterprise web applications and CMS architectures to Sahakari cooperative software and e-commerce programming, our code delivers high security and speed.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <span>Corporate Web & CMS</span>
                <span aria-hidden="true">·</span>
                <span>E-Commerce Portals</span>
                <span aria-hidden="true">·</span>
                <span>Sahakari Banking Software</span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
