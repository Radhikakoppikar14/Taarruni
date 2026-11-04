import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { TDS_OFFICES, TDS_COMPANY_INFO, TDS_SERVICES } from '../data/taarruniData';

export const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    service: 'web-design-cms',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Please provide your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      err.email = 'Valid corporate email required';
    }
    if (!formData.phone.trim()) err.phone = 'Phone number is required';
    if (!formData.message.trim()) err.message = 'Please provide brief project details';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
              Contact & Consultations
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Get in Touch with Taarruni Design Solutions
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Whether planning a new corporate web portal, launching a pan-India signage campaign, or requiring high-end 3D product animation, our leadership team is ready to consult.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Offices */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Message Delivered Successfully
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our Bangalore headquarters team has received your communication and will reply within 4 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Inquiry',
                        service: 'web-design-cms',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Send Direct Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Fill out the form below or message us via WhatsApp for instant response.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ramesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-slate-900 outline-hidden"
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
                        placeholder="ramesh@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-slate-900 outline-hidden"
                      />
                      {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98804 77344"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-slate-900 outline-hidden"
                      />
                      {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Service Discipline
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
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Message & Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project requirements, scope, target schedule..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-slate-900 outline-hidden resize-none"
                    />
                    {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to TDS Team</span>
                  </button>
                </form>
              )}
            </div>

            {/* Offices & Direct Support (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Quick Connect Actions */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-sm">
                <h3 className="text-base font-bold">Direct Channels</h3>
                <div className="space-y-3">
                  <a
                    href={TDS_COMPANY_INFO.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-xs font-semibold"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp: +91 98804 77344</span>
                  </a>
                  <a
                    href={`tel:${TDS_COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-xs font-semibold"
                  >
                    <Phone className="w-4 h-4 text-sky-400" />
                    <span>HQ Phone: {TDS_COMPANY_INFO.phones[0]}</span>
                  </a>
                  <a
                    href={`mailto:${TDS_COMPANY_INFO.emails[0]}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-xs font-semibold"
                  >
                    <Mail className="w-4 h-4 text-red-400" />
                    <span>Email: {TDS_COMPANY_INFO.emails[0]}</span>
                  </a>
                </div>
              </div>

              {/* Office Details */}
              <div className="space-y-4">
                {TDS_OFFICES.map((off) => (
                  <div
                    key={off.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5"
                  >
                    <div className="font-bold text-slate-900 text-sm">{off.city}</div>
                    <div className="text-[11px] font-semibold text-red-600">{off.type}</div>
                    <p className="pt-1">{off.address}</p>
                    <div className="pt-1 text-slate-500">{off.phone} · {off.email}</div>
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
