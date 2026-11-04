import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Layers, 
  Globe2, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { TDS_SERVICES, ServiceDetail } from '../data/taarruniData';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onRequestQuote,
}) => {
  const [selectedSlug, setSelectedSlug] = useState(TDS_SERVICES[0].slug);

  const activeService = TDS_SERVICES.find((s) => s.slug === selectedSlug) || TDS_SERVICES[0];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
              Capabilities Directory
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Comprehensive Creative, Digital & IT Services
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore Taarruni Design Solutions' full spectrum of technical disciplines—engineered for enterprises, high-growth brands, and cooperative institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Services Explorer */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Service List (4 cols) */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
                Select Discipline
              </div>
              {TDS_SERVICES.map((s, idx) => {
                const isSelected = s.slug === selectedSlug;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSlug(s.slug)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-150 flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center p-1.5 ${
                        isSelected ? 'bg-white/10' : 'bg-slate-100'
                      }`}>
                        <img
                          src={s.icon}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-xs font-bold leading-tight">{s.title}</div>
                    </div>
                    <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-red-400' : 'text-slate-400'}`}>
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Service Content Details (8 cols) */}
            <div className="lg:col-span-8 bg-slate-50/60 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
              
              {/* Service Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-2xs p-3 flex items-center justify-center">
                    <img
                      src={activeService.icon}
                      alt={activeService.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {activeService.title}
                    </h2>
                    <div className="text-xs text-red-600 font-semibold mt-0.5">
                      Established TDS Discipline
                    </div>
                  </div>
                </div>

                <button
                  onClick={onRequestQuote}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  Request Quote
                </button>
              </div>

              {/* In-Depth Description */}
              <div className="space-y-4 mb-8">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {activeService.fullDesc}
                </p>
              </div>

              {/* Deliverables Grid */}
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Key Scope Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-normal">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Supported Technologies & Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeService.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantitative Metrics Strip */}
              <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-white border border-slate-200">
                {activeService.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
