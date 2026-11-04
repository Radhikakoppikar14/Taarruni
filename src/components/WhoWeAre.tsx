import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  Compass, 
  Users, 
  ArrowRight,
  Maximize2,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { TDS_COMPANY_INFO } from '../data/taarruniData';

interface WhoWeAreProps {
  onNavigate: (page: string) => void;
}

export const WhoWeAre: React.FC<WhoWeAreProps> = ({ onNavigate }) => {
  const [infographicZoomed, setInfographicZoomed] = useState(false);

  const pillars = [
    {
      icon: Award,
      title: 'Incorporated in 2005',
      desc: 'Over two decades of continuous, unbroken digital delivery for Indian enterprises and global institutions.',
    },
    {
      icon: Compass,
      title: 'Full-Spectrum Capabilities',
      desc: 'Seamless convergence of software engineering, 2D/3D animation, search marketing, and physical signage.',
    },
    {
      icon: ShieldCheck,
      title: 'NSRCEL (IIM Bangalore) Ecosystem',
      desc: 'Incubated at IIM Bangalore, setting our standard for institutional governance, security, and quality.',
    },
    {
      icon: Users,
      title: 'Pan-India & Global Footprint',
      desc: 'Headquartered in Basavanagudi, Bangalore, with branch operations in Kolkata and US presence in California.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Company Profile · Incorporated 2005</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance mb-4">
            Delivering Strategic Digital & IT Excellence for Over Two Decades.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Taarruni Design Solutions (TDS) is a leading multimedia and web solutions provider. Incorporated in 2005 at Bangalore, India, the company presents itself as a prominent brand widely known for delivering an array of services across creative design, software engineering, and physical branding.
          </p>
        </motion.div>

        {/* 2-Column Story & Infographic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-14">
          
          {/* Narrative & Capabilities (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                "is what we are known for."
              </h3>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                Taarruni Design Solutions delivers specialized capabilities in <strong>web designing, multimedia development services (2D/3D animation), web application development, Flash Programming, E-Commerce programming services, SEO (Search Engine Optimization) - SEM (Search Engine Marketing), and print media</strong>.
              </p>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                From our early days pioneering dynamic corporate portals to today's cloud-native enterprise platforms, ray-traced architectural walkthroughs, and pan-India outdoor retail signages, our multidisciplinary team combines artistic design sensibilities with rigorous software engineering.
              </p>
              
              {/* 4 Pillars Grid with Micro-Hover */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -2 }}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5 text-red-600">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{pillar.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-normal">{pillar.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Links */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors cursor-pointer group"
                >
                  <span>Explore Full History & Leadership Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>SAP Ariba Verified</span>
                </div>
              </div>
            </div>

            {/* NSRCEL Incubation Spotlight Banner with 3D Hover Effect */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.015, boxShadow: '0 15px 25px -8px rgba(0,0,0,0.08)' }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center gap-5 cursor-pointer"
            >
              <div className="w-24 sm:w-28 h-16 shrink-0 bg-white rounded-xl border border-slate-200/80 p-2 flex items-center justify-center overflow-hidden shadow-2xs">
                <img
                  src="/images/nsrcel1.jpg"
                  alt="NSRCEL IIM Bangalore Incubator"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="text-left flex-1">
                <div className="text-xs font-bold text-slate-900 mb-0.5">
                  Incubated at NSRCEL, IIM Bangalore
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  TDS was incubated within the premier entrepreneurship ecosystem of the Indian Institute of Management Bangalore (IIMB), instilling strict corporate governance and client-first ethics.
                </p>
              </div>
            </motion.div>

          </motion.div>

          {/* Authentic Taarruni Infographic Card (5 cols) with 3D Hover Elevation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, scale: 1.01, boxShadow: '0 20px 35px -10px rgba(0,0,0,0.1)' }}
            className="lg:col-span-5 transition-all"
          >
            <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm relative group overflow-hidden">
              <div className="text-xs font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                  <span>Integrated Service Ecosystem</span>
                </span>
                <button
                  onClick={() => setInfographicZoomed(true)}
                  className="text-red-600 hover:text-red-700 flex items-center gap-1 text-xs font-bold cursor-pointer transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand HD View</span>
                </button>
              </div>

              {/* Crisp HD Infographic Container */}
              <div 
                className="relative rounded-xl overflow-hidden bg-slate-50 border border-slate-200/60 cursor-pointer shadow-inner"
                onClick={() => setInfographicZoomed(true)}
              >
                <img
                  src="/images/taarruni-infographic1.jpg"
                  alt="Taarruni Design Solutions Service Ecosystem"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-red-600" />
                    <span>Click to Zoom & Inspect</span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Original TDS methodology asset</span>
                <span className="font-semibold text-slate-700">Design · Code · Marketing · Signage</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Infographic Zoom Lightbox Modal */}
      <AnimatePresence>
        {infographicZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setInfographicZoomed(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Taarruni Design Solutions — Integrated Service Matrix
                  </h4>
                  <p className="text-xs text-slate-500">
                    Official architectural blueprint across 4 corporate service disciplines
                  </p>
                </div>
                <button
                  onClick={() => setInfographicZoomed(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-auto max-h-[75vh] p-2 flex items-center justify-center">
                <img
                  src="/images/taarruni-infographic1.jpg"
                  alt="Taarruni Service Ecosystem Full HD"
                  className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Bangalore Head Office · Established 2005</span>
                <button
                  onClick={() => setInfographicZoomed(false)}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
