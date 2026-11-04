import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Cpu, 
  Globe2, 
  X,
  ExternalLink
} from 'lucide-react';
import { TDS_SERVICES, ServiceDetail } from '../data/taarruniData';

interface CoreOfferingsProps {
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
}

export const CoreOfferings: React.FC<CoreOfferingsProps> = ({
  onNavigate,
  onRequestQuote,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
              Our Capabilities & Disciplines
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              End-to-End Creative, Technology & Branding Solutions
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-bold text-slate-800 hover:text-red-600 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>View All Service Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* 6-Card Services Grid with Framer Motion Stagger & 3D Live Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TDS_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -8, 
                scale: 1.02, 
                boxShadow: '0 22px 35px -10px rgba(220, 38, 38, 0.12)',
                borderColor: '#FCA5A5',
                transition: { duration: 0.2 } 
              }}
              className="group rounded-2xl bg-white border border-slate-200/90 hover:border-red-300 p-6 sm:p-7 transition-all duration-200 shadow-xs flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Card Header with Icon & Index */}
                <div className="flex items-center justify-between mb-5">
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs flex items-center justify-center p-2.5 transition-transform"
                  >
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <span className="text-xs font-bold text-slate-400 font-mono tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {service.shortDesc}
                </p>

                {/* Key Deliverables Bullet Points */}
                <ul className="space-y-1.5 mb-6">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Scope & Tech Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <div className="text-[11px] font-bold text-slate-500">
                  {service.metrics[0]?.value} {service.metrics[0]?.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-2.5 flex items-center justify-center">
                    <img
                      src={selectedService.icon}
                      alt={selectedService.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedService.title}</h3>
                    <div className="text-xs text-red-600 font-semibold">TDS Core Competency</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {selectedService.fullDesc}
              </p>

              {/* Deliverables */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Core Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Frameworks, Tools & Standards
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-6">
                {selectedService.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-lg font-black text-slate-900">{m.value}</div>
                    <div className="text-[11px] text-slate-500">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onRequestQuote();
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
                >
                  Inquire About This Service
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
