import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Phone, Mail } from 'lucide-react';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickContactModal: React.FC<QuickContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    const subject = encodeURIComponent(`Project Inquiry: ${formData.service} from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService Required: ${formData.service}\n\nProject Brief / Message:\n${formData.message}`
    );

    window.location.href = `mailto:info@taarruni.com?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-md">
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-full max-w-lg h-full bg-[#16181d] border-l border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                <div>
                  <div className="text-xs font-display tracking-[0.25em] text-[#3ef0ff] uppercase mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Direct Engagement</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Quick Contact
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                  aria-label="Close Contact Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9a9ca8] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-white/10 focus:border-[#3ef0ff] text-white text-sm focus:outline-hidden transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#9a9ca8] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-white/10 focus:border-[#3ef0ff] text-white text-sm focus:outline-hidden transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#9a9ca8] mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 / +1 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-white/10 focus:border-[#3ef0ff] text-white text-sm focus:outline-hidden transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9a9ca8] mb-2">
                    Services Required *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-white/10 focus:border-[#3ef0ff] text-white text-sm focus:outline-hidden transition-colors"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Digital Marketing/SEO">Digital Marketing/SEO</option>
                    <option value="Printing">Printing & Signage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9a9ca8] mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your objectives, timeline, or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0d10] border border-white/10 focus:border-[#3ef0ff] text-white text-sm focus:outline-hidden transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3ef0ff] via-[#ff2e88] to-[#ffd36b] text-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity btn-shine-sweep shadow-xl cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request to info@taarruni.com</span>
                </button>
              </form>
            </div>

            {/* Quick Contact Coordinates Footer */}
            <div className="pt-6 border-t border-white/10 text-xs text-[#9a9ca8] space-y-2 mt-8">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#3ef0ff]" />
                <span>+91 80 26561646 / +91 98804 77344</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ff2e88]" />
                <span>info@taarruni.com</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
