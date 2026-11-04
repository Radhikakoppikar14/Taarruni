import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  Maximize2, 
  X, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { TDS_PORTFOLIO, PortfolioItem } from '../data/taarruniData';

interface PortfolioShowcaseProps {
  onNavigate?: (page: string) => void;
  onRequestQuote?: () => void;
  showAll?: boolean;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  onNavigate,
  onRequestQuote,
  showAll = false,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'multimedia' | 'signage' | 'ecommerce'>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Corporate Web' },
    { id: 'multimedia', label: '3D Multimedia' },
    { id: 'signage', label: 'Signage & Outdoor' },
    { id: 'ecommerce', label: 'E-Commerce' },
  ];

  const filteredItems = TDS_PORTFOLIO.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const displayItems = showAll ? filteredItems : filteredItems.slice(0, 6);

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
              Featured Case Studies & Work
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Proven Execution Across Industries & Geographies
            </h2>
          </div>

          {/* Functional Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
            {filters.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Gallery Grid with Framer Motion Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setActiveItem(item)}
              className="group rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-box')) {
                        const box = document.createElement('div');
                        box.className = 'fallback-box w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 text-xs font-bold text-center';
                        box.innerText = item.title;
                        parent.appendChild(box);
                      }
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-[11px] font-bold text-slate-800 shadow-2xs">
                    {item.categoryLabel}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>View Case</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="text-[11px] font-semibold text-slate-400 mb-1">
                    {item.client} · {item.year}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs font-semibold text-red-600">
                <span className="truncate max-w-[200px] text-slate-700">{item.impact}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button if not on dedicated page */}
        {!showAll && onNavigate && (
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('portfolio')}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Complete 9-Project Case Archive</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}

      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                    {activeItem.categoryLabel} · Case Archive
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {activeItem.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1">
                    Client: {activeItem.client} · Year: {activeItem.year}
                  </div>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close case"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="rounded-xl overflow-hidden aspect-[16/9] bg-slate-100 mb-6 border border-slate-200">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description & Impact */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Project Background
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-red-50/70 border border-red-100">
                  <div className="text-xs font-bold text-red-800 uppercase tracking-wider mb-1">
                    Measurable Business Impact
                  </div>
                  <div className="text-base font-extrabold text-red-900">
                    {activeItem.impact}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Key Scope Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeItem.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
                {onRequestQuote && (
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onRequestQuote();
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm cursor-pointer"
                  >
                    Request Similar Solution
                  </button>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
