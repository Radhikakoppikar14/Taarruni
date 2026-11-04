import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Code, FileText, ListChecks, Mail, MapPin, Palette, Phone, TrendingUp, Users, UserRound } from 'lucide-react';
import { PageHeader, Tilt3D } from '../components/AiVisuals';

const LINE = 'rgb(var(--fg-rgb) / 0.14)';
const SURFACE = 'rgb(var(--fg-rgb) / 0.04)';
const EASE = [0.16, 1, 0.3, 1] as const;

const inputCls =
  'w-full rounded-xl border px-4 py-3 text-sm sm:text-base outline-hidden transition-colors focus:border-[#3ef0ff] focus:ring-2 focus:ring-[#3ef0ff]/25 placeholder:text-[#9a9ca8]/60';
const inputStyle: React.CSSProperties = { borderColor: LINE, background: SURFACE, color: 'var(--text-strong)' };

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block min-w-0">
    <span className="mb-2 block text-[11px] font-display font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
      {label}
    </span>
    {children}
  </label>
);

const StepTitle: React.FC<{ icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <div className="mb-3 flex items-center gap-3">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-black" style={{ background: 'var(--iridescent)' }}><Icon className="h-4 w-4" /></span>
    <span className="font-display text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-strong)' }}>{children}</span>
  </div>
);

const SERVICES = [
  { value: 'Web Development', label: 'Web Development', blurb: 'Portals, CMS & e-commerce', icon: Code, color: '#3ef0ff' },
  { value: 'Digital Marketing/SEO', label: 'Digital Marketing / SEO', blurb: 'SEO, SEM & online campaigns', icon: TrendingUp, color: '#ff2e88' },
  { value: 'Printing', label: 'Printing & Signage', blurb: 'Print and all-India branding', icon: Palette, color: '#ffd36b' },
];

const CONTACTS = [
  { icon: Mail, label: 'Email', value: 'info@taarruni.com', href: 'mailto:info@taarruni.com', color: '#ff2e88' },
  { icon: Phone, label: 'Phone / WhatsApp', value: '+91 98804 77344', href: 'https://api.whatsapp.com/send?phone=919880477344&text=Yes%20I%20am%20Interested', color: '#3ef0ff' },
  { icon: MapPin, label: 'Offices', value: 'Bangalore, India · California, USA', href: '', color: '#ffd36b' },
];

const INCLUDED = [
  { icon: FileText, text: 'A formal written proposal', color: '#3ef0ff' },
  { icon: ListChecks, text: 'A transparent line-item timeline', color: '#ff2e88' },
  { icon: Users, text: 'Prepared directly by our engineering team', color: '#ffd36b' },
];

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 24, rotateX: 10 },
  whileInView: { opacity: 1, y: 0, rotateX: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay: i * 0.08, ease: EASE },
  style: { transformPerspective: 900 },
});

export const RequestQuotePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    message: '',
  });

  // live completion meter: fills as the required fields are filled in
  const filled = [formData.name, formData.email, formData.phone, formData.message].filter((v) => v.trim()).length;
  const pct = Math.round(((filled + 1) / 5) * 100); // +1 for the service, which is always chosen

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Formal RFP / Quote Request: ${formData.service} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nProject Scope & Timeline:\n${formData.message}`
    );
    window.location.href = `mailto:info@taarruni.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full overflow-x-clip py-6 sm:py-8">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        {/* 1. Banner */}
        <PageHeader
          kicker="Request a quote"
          title="Tell us about your project."
          text="Share a few details and our team will send a formal proposal with scope, timeline and pricing."
          variant="contact"
        />

        {/* 2. What you get – three equal tiles */}
        <section aria-label="What you get" className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {INCLUDED.map(({ icon: Icon, text, color }, i) => (
            <motion.div key={text} {...rise(i)} className="h-full">
              <Tilt3D className="rounded-3xl">
                <div className="flex h-full items-center gap-4 rounded-3xl border p-5" style={{ borderColor: LINE, background: `linear-gradient(120deg, ${color}2e, var(--bg-surface) 75%)`, transformStyle: 'preserve-3d' }}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${color}4d`, color: 'var(--text-strong)', transform: 'translateZ(34px)', boxShadow: `0 10px 20px -8px ${color}` }}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-sm font-bold leading-snug" style={{ color: 'var(--text-strong)', transform: 'translateZ(18px)' }}>{text}</span>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </section>

        {/* 3. Form + contact */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          <motion.form
            onSubmit={handleSubmit}
            {...rise()}
            className="min-w-0 space-y-5 rounded-[2rem] border p-5 sm:p-6 lg:col-span-8"
            style={{ borderColor: LINE, background: 'var(--bg-surface)' }}
          >
            {/* live progress */}
            <div>
              <div className="mb-2 flex items-center justify-between text-[11px] font-display font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                <span>Your request</span>
                <span style={{ color: 'var(--accent-cyan-ink)' }}>{pct}% ready</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full" style={{ background: 'rgb(var(--fg-rgb) / 0.08)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--iridescent)' }}
                  animate={{ width: `${pct}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </div>
            </div>

            {/* service */}
            <div>
              <StepTitle icon={Code}>Service needed</StepTitle>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {SERVICES.map(({ value, label, blurb, icon: Icon, color }) => {
                  const active = formData.service === value;
                  return (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setFormData({ ...formData, service: value })}
                      aria-pressed={active}
                      className="relative flex h-full cursor-pointer flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1"
                      style={{
                        borderColor: active ? color : LINE,
                        background: active ? `linear-gradient(160deg, ${color}33, var(--bg-surface))` : SURFACE,
                        boxShadow: active ? `0 12px 26px -14px ${color}` : 'none',
                      }}
                    >
                      {active && <CheckCircle2 className="absolute right-3 top-3 h-4 w-4" style={{ color: 'var(--accent-cyan-ink)' }} />}
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}40`, color: 'var(--text-strong)' }}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="mt-3 font-display text-sm font-bold" style={{ color: 'var(--text-strong)' }}>{label}</span>
                      <span className="mt-1 text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{blurb}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* details */}
            <div>
              <StepTitle icon={UserRound}>Your details</StepTitle>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Full name *">
                  <input type="text" required placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} style={inputStyle} />
                </Field>
                <Field label="Email *">
                  <input type="email" required placeholder="email@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} style={inputStyle} />
                </Field>
                <Field label="Phone *">
                  <input type="tel" required placeholder="+91 / +1 ..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} style={inputStyle} />
                </Field>
              </div>
              <div className="mt-4">
                <Field label="Project details *">
                  <textarea required rows={4} placeholder="Deliverables, objectives, target launch date..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputCls} resize-none`} style={inputStyle} />
                </Field>
              </div>
            </div>

            <button
              type="submit"
              className="btn-shine-sweep group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl px-8 py-4 font-display text-xs font-black uppercase tracking-widest text-black transition-transform hover:-translate-y-0.5 sm:w-auto"
              style={{ background: 'var(--iridescent)' }}
            >
              Send to info@taarruni.com
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>

          <motion.aside {...rise(1)} className="min-w-0 lg:sticky lg:top-24 lg:col-span-4">
            <Tilt3D className="rounded-[2rem]">
              <div
                className="rounded-[2rem] border p-5"
                style={{ borderColor: LINE, background: 'radial-gradient(80% 60% at 0% 0%, rgba(62,240,255,0.26), transparent 70%), radial-gradient(70% 60% at 100% 100%, rgba(255,46,136,0.16), transparent 70%), var(--bg-surface)', transformStyle: 'preserve-3d' }}
              >
                <div className="font-display text-base font-black tracking-tight" style={{ color: 'var(--text-strong)' }}>Prefer to talk?</div>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>Reach our team directly and we will take it from there.</p>

                <ul className="mt-4 list-none space-y-3">
                  {CONTACTS.map(({ icon: Icon, label, value, href, color }) => {
                    const inner = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ background: `${color}40`, color: 'var(--text-strong)' }}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-display font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>{label}</span>
                          <span className="block break-words text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>{value}</span>
                        </span>
                      </>
                    );
                    const cls = 'group flex items-center gap-3 rounded-2xl border p-3 transition-all duration-300 hover:translate-x-1 hover:border-[#3ef0ff]';
                    const st = { borderColor: LINE, background: `linear-gradient(110deg, ${color}1f, var(--bg-surface) 70%)` };
                    return (
                      <li key={label}>
                        {href ? (
                          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={cls} style={st}>{inner}</a>
                        ) : (
                          <div className={cls} style={st}>{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <a
                  href="https://api.whatsapp.com/send?phone=919880477344&text=Yes%20I%20am%20Interested"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine-sweep group mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-display text-xs font-black uppercase tracking-widest text-black transition-transform hover:-translate-y-0.5"
                  style={{ background: 'var(--iridescent)' }}
                >
                  Chat on WhatsApp
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Tilt3D>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};