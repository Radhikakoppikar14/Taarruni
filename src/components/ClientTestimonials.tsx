import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TDS_TESTIMONIALS } from '../data/taarruniData';

export const ClientTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TDS_TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TDS_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TDS_TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
              Client Speak · Words of Appreciation
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              What Global Executives Say About TDS
            </h2>
          </div>

          {/* Slider Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-500 tabular-nums px-2">
              {currentIndex + 1} / {TDS_TESTIMONIALS.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Featured Testimonial Card with Smooth AnimatePresence */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md relative overflow-hidden min-h-[300px]">
          <Quote className="w-16 h-16 text-red-100 absolute top-6 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg sm:text-2xl font-medium text-slate-900 leading-relaxed max-w-4xl mb-8">
                "{current.quote}"
              </blockquote>

              {/* Author Details */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 text-red-600 font-bold flex items-center justify-center text-base shrink-0">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">{current.name}</div>
                  <div className="text-xs text-slate-500 font-medium">
                    {current.title} · <span className="text-slate-700">{current.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3 Quick Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {TDS_TESTIMONIALS.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              onClick={() => setCurrentIndex(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'bg-white border-red-600 shadow-sm ring-1 ring-red-600/20'
                  : 'bg-white/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                "{item.quote}"
              </p>
              <div className="text-xs font-bold text-slate-900">{item.name}</div>
              <div className="text-[11px] text-slate-500 truncate">{item.company}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
