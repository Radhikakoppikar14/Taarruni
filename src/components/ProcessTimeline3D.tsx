import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Code, Rocket, TrendingUp, Sparkles } from 'lucide-react';
import { SectionArt } from './SectionArt';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understand your need',
    desc: "Comprehensive diagnostic discovery session to understand your business model, executive pain points, target demographic, and digital ambitions.",
    icon: Search,
    accent: '#3ef0ff',
  },
  {
    step: '02',
    title: 'Plan and design',
    desc: 'Translating strategic insights into high-fidelity interactive wireframes, 3D spatial models, design systems, and software engineering architectural roadmaps.',
    icon: Compass,
    accent: '#ff2e88',
  },
  {
    step: '03',
    title: 'Develop',
    desc: 'Engineering with precision: custom web portals, responsive CMS architectures, ray-traced 3D assets, e-commerce checkouts, and clean, scalable code.',
    icon: Code,
    accent: '#ffd36b',
  },
  {
    step: '04',
    title: 'Test and launch',
    desc: 'Multi-device responsive stress tests, penetration audits, OWASP security hardening, and zero-downtime deployment to production cloud servers.',
    icon: Rocket,
    accent: '#3ef0ff',
  },
  {
    step: '05',
    title: 'Promote and support',
    desc: 'Full-funnel search engine optimization (SEO), targeted Google Ads campaigns, pan-India outdoor retail signage rollout, and round-the-clock maintenance.',
    icon: TrendingUp,
    accent: '#ff2e88',
  },
];

export const ProcessTimeline3D: React.FC = () => {
  return (
    <div className="py-6 sm:py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-6">
          <div className="lg:col-span-7">
          <div className="text-xs font-display tracking-[0.25em] text-[#3ef0ff] uppercase mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#3ef0ff]" />
            <span>Delivery Methodology · Illustrative Flow</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Our 5-Stage Engineering Process
          </h2>
          <p className="text-base text-[#9a9ca8] leading-relaxed">
            Taarruni design solutions (TDS) is A leading digital marketing and IT solutions company. Rebuilt as an interactive animated 3D timeline path.
          </p>
          </div>
          <div className="lg:col-span-5">
            <SectionArt variant="process" />
          </div>
        </div>

        {/* 3D Timeline Path Grid */}
        <div className="relative">
          {/* Animated Glowing Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#3ef0ff] via-[#ff2e88] to-[#ffd36b] -translate-y-1/2 opacity-30 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="holo-border-wrap relative z-10 group"
                >
                  <div className="holo-content p-6 sm:p-7 min-h-[340px] flex flex-col justify-between">
                    <div>
                      {/* Step Badge & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-black"
                          style={{ background: step.accent }}
                        >
                          <Icon className="w-6 h-6 text-black" />
                        </div>
                        <span className="font-mono text-xs font-bold text-white/40 group-hover:text-white transition-colors">
                          STEP {step.step}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-[#3ef0ff] transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-xs text-[#9a9ca8] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 text-[10px] font-mono tracking-widest text-[#9a9ca8] uppercase">
                      Phase 0{idx + 1} Execution
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};