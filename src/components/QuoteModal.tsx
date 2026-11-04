import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, MessageSquare, Phone, ArrowRight } from 'lucide-react';
import { TDS_SERVICES, TDS_COMPANY_INFO } from '../data/taarruniData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialScope?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialScope = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'web-design-cms',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialScope) {
      setFormData((prev) => ({
        ...prev,
        message: initialScope,
      }));
    }
  }, [initialScope]);

  if (!isOpen) return null;

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Please provide your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      err.email = 'Valid corporate email address required';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      err.phone = 'Valid phone number required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate instant successful submission
    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 my-8 max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Proposal Request Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our technical director from the Basavanagudi headquarters will review your specifications and reach out within 4 business hours.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-left">
              <div><strong className="text-slate-700">Organization:</strong> {formData.company || 'Direct Client'}</div>
              <div><strong className="text-slate-700">Contact:</strong> {formData.email} · {formData.phone}</div>
              <div><strong className="text-slate-700">Discipline:</strong> {formData.service}</div>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
              >
                Done
              </button>
              <a
                href={TDS_COMPANY_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Follow up on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
              Taarruni Design Solutions · RFP
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              Request Project Proposal & Scope
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Share your project requirements to receive a detailed technical architecture, milestone schedule, and commercial quote.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-slate-900 placeholder:text-slate-400 outline-hidden"
                  />
                  {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-slate-900 placeholder:text-slate-400 outline-hidden"
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98800 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-slate-900 placeholder:text-slate-400 outline-hidden"
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-slate-900 placeholder:text-slate-400 outline-hidden"
                  />
                </div>
              </div>

              {/* Primary Service Discipline */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Service Needed
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-slate-900 bg-white outline-hidden cursor-pointer"
                >
                  {TDS_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                  <option value="multidisciplinary">Integrated Multi-Discipline Package</option>
                </select>
              </div>

              {/* Scope & Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Details / Scope
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, objectives, deliverables, and target timeline..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-slate-900 placeholder:text-slate-400 outline-hidden resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Proposal Request</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
                <span>Direct phone: +91 80 26561646</span>
                <span>Basavanagudi, Bangalore HQ</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
