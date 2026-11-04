import React, { useState, useRef } from 'react';
import { Mail, Building2, Users, Send, CheckCircle2, ShieldCheck, Clock, FileText, ArrowRight, Sparkles } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    orgSize: 'MSME (20 - 99)',
    service: 'AI-Powered Enterprise Solutions',
    timeline: 'Within 30 Days',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 3D Tilt for form
  const formCardRef = useRef<HTMLDivElement>(null);
  const [formTilt, setFormTilt] = useState({ x: 0, y: 0 });
  const [formGlare, setFormGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleFormMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formCardRef.current) return;
    const rect = formCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setFormTilt({
      x: ((y - centerY) / centerY) * -5,
      y: ((x - centerX) / centerX) * 5,
    });
    setFormGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.14 });
  };

  const handleFormMouseLeave = () => {
    setFormTilt({ x: 0, y: 0 });
    setFormGlare({ x: 50, y: 50, opacity: 0 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      setErrorMessage('Please fill in your name, corporate email, and company name.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Simulate reliable enterprise form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-white border-b border-slate-200 overflow-hidden">
      {/* Ambient Lighting Orbs - NO GRIDS OR DOTS */}
      <div className="absolute top-10 right-[-10%] w-[550px] h-[550px] bg-gradient-to-bl from-rose-100/40 via-red-50/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/40 to-transparent rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Corporate Collaboration Info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-xs font-bold tracking-widest text-red-600 uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05. Initiate Collaboration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
              Partner with Taruni Technologies
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed mb-8 font-normal">
              We work exclusively with structured MSMEs and corporate enterprises ready for dedicated digital transformation, custom software engineering, and production-grade AI integration.
            </p>

            {/* B2B Assurance Points with 3D hover lift */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Standard Mutual NDA Protection</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-normal">All proprietary business workflows and data schemas are strictly confidential.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100 shadow-2xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">48-Hour Technical Assessment</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-normal">Our Enterprise Architects review your scope and provide a structured roadmap.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">100% Intellectual Property Sovereignty</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-normal">Complete code repository handover with zero vendor lock-in fees.</div>
                </div>
              </div>
            </div>

            {/* Corporate Inquiries Contact Card with 3D styling */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200 shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Official Corporate Headquarters & Website
              </div>
              <div className="text-base font-extrabold text-slate-900">
                Taarruni Technologies / Taarruni Design Solutions
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Official Web: <a href="https://www.taarruni.com/" target="_blank" rel="noreferrer" className="text-red-600 hover:underline font-bold">www.taarruni.com</a>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Enterprise B2B Relations · Architecture & Engineering Division
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture & Proposal Form with 3D Perspective */}
          <div 
            ref={formCardRef}
            onMouseMove={handleFormMouseMove}
            onMouseLeave={handleFormMouseLeave}
            style={{ perspective: '1200px' }}
            className="lg:col-span-7"
          >
            <div
              style={{
                transform: `rotateX(${formTilt.x}deg) rotateY(${formTilt.y}deg) translateZ(8px)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-2xl ring-1 ring-slate-900/5 overflow-hidden"
            >
              {/* Specular glare */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-200 z-10"
                style={{
                  background: `radial-gradient(circle 300px at ${formGlare.x}% ${formGlare.y}%, rgba(255,255,255,0.7), transparent)`,
                  opacity: formGlare.opacity,
                }}
              />

              <div className="relative z-0" style={{ transform: 'translateZ(10px)' }}>
                {submitted ? (
                  <div className="py-12 text-center animate-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                      Partnership Inquiry Received
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 font-normal">
                      Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our Lead Enterprise Architect has been notified regarding <span className="font-semibold text-slate-900">{formData.company}</span>.
                    </p>
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left mb-6 shadow-2xs">
                      <div className="font-bold text-slate-900 mb-1.5">Next Engagement Steps:</div>
                      <ol className="list-decimal list-inside space-y-1 font-normal">
                        <li>Execution of mutual NDA document</li>
                        <li>Technical discovery call scheduled via direct email</li>
                        <li>Preliminary architecture blueprint & timeline delivery</li>
                      </ol>
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          orgSize: 'MSME (20 - 99)',
                          service: 'AI-Powered Enterprise Solutions',
                          timeline: 'Within 30 Days',
                          message: '',
                        });
                      }}
                      className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-slate-100 pb-4 mb-2">
                      <h3 className="text-2xl font-extrabold text-slate-900">
                        Enterprise Partnership Brief
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 font-normal">
                        Please provide your operational details to connect directly with our engineering team.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                        {errorMessage}
                      </div>
                    )}

                    {/* Name & Corporate Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Rajesh Sharma"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-slate-50/50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Corporate Work Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. rajesh@enterprise.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-slate-50/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* Company & Organization Size */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Company / Organization Name *
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          placeholder="e.g. Havells Manufacturing Ltd."
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-slate-50/50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Organization Scale (Seats) *
                        </label>
                        <select
                          name="orgSize"
                          value={formData.orgSize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-slate-50/50 transition-all"
                        >
                          <option value="MSME (20 - 99)">MSME (20 - 99 Seats)</option>
                          <option value="Mid-Market (100 - 499)">Mid-Market Enterprise (100 - 499 Seats)</option>
                          <option value="Large Corporate (500+)">Large Corporate / Global (500+ Seats)</option>
                        </select>
                      </div>
                    </div>

                    {/* Service Pillar & Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Primary Engineering Requirement *
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-slate-50/50 transition-all"
                        >
                          <option value="AI-Powered Enterprise Solutions">AI-Powered Enterprise Solutions</option>
                          <option value="Custom Software & App Development">Custom Software & App Development</option>
                          <option value="Digital Transformation & Consulting">Digital Transformation & Consulting</option>
                          <option value="End-to-End Enterprise Modernization">End-to-End Enterprise Modernization</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Target Deployment Horizon
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-slate-50/50 transition-all"
                        >
                          <option value="Within 30 Days">Immediate (Within 30 Days)</option>
                          <option value="1 to 3 Months">1 to 3 Months</option>
                          <option value="3 to 6 Months">3 to 6 Months (Strategic Roadmap)</option>
                        </select>
                      </div>
                    </div>

                    {/* Project Scope / Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Technical Scope & Objective Overview
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Briefly describe your current legacy bottlenecks, integration objectives, or scaling expectations..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-slate-50/50 resize-none transition-all"
                      />
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit Enterprise Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="text-[11px] text-center text-slate-500 pt-1">
                      Strict B2B Confidentiality · Direct Lead Architect Assignment
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
