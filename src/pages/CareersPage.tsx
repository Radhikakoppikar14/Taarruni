import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Lightbulb, MapPin, Palette, Search, Sparkles, TrendingUp, Users, CheckCircle2, Mail } from 'lucide-react';
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

const VALUES = [
  { icon: Search, color: '#3ef0ff', ink: 'var(--accent-cyan-ink)', title: 'We get to know you', text: 'Every hire starts with a real conversation about your craft and goals.' },
  { icon: Users, color: '#ff2e88', ink: 'var(--accent-magenta-ink)', title: 'We partner with you', text: 'Work alongside a small, senior team on projects for clients in India and the USA.' },
  { icon: Lightbulb, color: '#ffd36b', ink: 'var(--accent-gold-ink)', title: 'We think for you', text: 'Clear ownership, honest feedback and room to grow into bigger problems.' },
];

const ROLES = [
  { name: '3D Animator', blurb: '2D / 3D animation & CGI', icon: Sparkles, color: '#3ef0ff' },
  { name: 'Full-Stack Developer', blurb: 'Web apps, CMS & e-commerce', icon: Code, color: '#ff2e88' },
  { name: 'SEO Strategist', blurb: 'SEO, SEM & search marketing', icon: TrendingUp, color: '#ffd36b' },
  { name: 'UI/UX Designer', blurb: 'Web & print design', icon: Palette, color: '#3ef0ff' },
];

const STEPS = [
  { icon: ArrowRight, color: '#3ef0ff', text: 'Send your application' },
  { icon: Mail, color: '#ff2e88', text: 'We get back to you' },
  { icon: Users, color: '#ffd36b', text: 'A real conversation about your craft' },
];

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 24, rotateX: 10 },
  whileInView: { opacity: 1, y: 0, rotateX: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, delay: i * 0.08, ease: EASE },
  style: { transformPerspective: 900 },
});

export const CareersPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', message: '' });

  const pickRole = (role: string) => {
    setFormData((f) => ({ ...f, role }));
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Career Application: ${formData.role} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nRole Applied For: ${formData.role}\n\nCover Note / Experience Summary:\n${formData.message}`
    );
    window.location.href = `mailto:info@taarruni.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full overflow-x-clip py-6 sm:py-8">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        {/* 1. Banner */}
        <PageHeader
          kicker="Taarruni · Careers"
          title="Join the team."
          text="Join a team that thinks for you and with you. Tell us about yourself and we will get back to you."
          variant="careers"
        >
          <ul className="mt-5 flex list-none flex-wrap gap-2.5">
            {['Bangalore, India', 'California, USA', 'Design · Web · Marketing'].map((t, i) => (
              <li key={t} className="flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-display font-bold" style={{ borderColor: LINE, background: 'var(--bg-surface)', color: 'var(--text-soft)' }}>
                {i < 2 ? <MapPin className="h-4 w-4" style={{ color: i ? 'var(--accent-magenta-ink)' : 'var(--accent-cyan-ink)' }} /> : <Sparkles className="h-4 w-4" style={{ color: 'var(--accent-gold-ink)' }} />}
                {t}
              </li>
            ))}
          </ul>
        </PageHeader>

        {/* 2. Values – three equal cards */}
        <section aria-label="Why join us" className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, color, ink, title, text }, i) => (
            <motion.div key={title} {...rise(i)} className="h-full">
              <Tilt3D className="rounded-3xl">
                <div
                  className="relative flex h-full flex-col rounded-3xl border p-5"
                  style={{ borderColor: LINE, background: `linear-gradient(170deg, ${color}26, var(--bg-surface) 60%)`, transformStyle: 'preserve-3d' }}
                >
                  <span className="absolute inset-x-6 top-0 h-1 rounded-b-full" style={{ background: color }} />
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${color}33`, color: ink, transform: 'translateZ(34px)', boxShadow: `0 10px 20px -8px ${color}` }}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text-strong)', transform: 'translateZ(20px)' }}>{title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{text}</p>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </section>

        {/* 3. Domains – four equal cards */}
        <section aria-label="Pick your domain">
          <div className="mb-3 font-display text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent-magenta-ink)' }}>Pick your domain</div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {ROLES.map(({ name, blurb, icon: Icon, color }, i) => {
              const active = formData.role === name;
              return (
                <motion.div key={name} {...rise(i)} className="h-full">
                  <Tilt3D className="rounded-3xl">
                    <button
                      type="button"
                      onClick={() => pickRole(name)}
                      aria-pressed={active}
                      className="relative flex h-full w-full cursor-pointer flex-col items-center rounded-3xl border p-4 text-center transition-colors duration-300"
                      style={{
                        borderColor: active ? color : LINE,
                        background: active ? `linear-gradient(170deg, ${color}40, var(--bg-surface))` : `linear-gradient(170deg, ${color}1a, var(--bg-surface) 70%)`,
                        boxShadow: active ? `0 14px 30px -14px ${color}` : 'none',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {active && <CheckCircle2 className="absolute right-3 top-3 h-5 w-5" style={{ color: 'var(--accent-cyan-ink)' }} />}
                      <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: `${color}40`, color: 'var(--text-strong)', transform: 'translateZ(36px)', boxShadow: `0 10px 20px -8px ${color}` }}>
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="mt-3 font-display text-sm font-bold sm:text-base" style={{ color: 'var(--text-strong)', transform: 'translateZ(18px)' }}>{name}</span>
                      <span className="mt-1 text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{blurb}</span>
                    </button>
                  </Tilt3D>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 4. Apply – illustration panel + form, same height */}
        <motion.section
          id="apply-form"
          {...rise()}
          className="grid grid-cols-1 overflow-hidden rounded-[2rem] border lg:grid-cols-12"
          style={{ borderColor: LINE, background: 'var(--bg-surface)' }}
        >
          <aside
            className="flex flex-col gap-4 p-5 sm:p-6 lg:col-span-5"
            style={{ background: 'radial-gradient(70% 60% at 20% 0%, rgba(62,240,255,0.28), transparent 70%), radial-gradient(60% 60% at 100% 100%, rgba(255,46,136,0.20), transparent 70%)' }}
          >
            <div>
              <h2 className="font-display text-2xl font-black tracking-tight" style={{ color: 'var(--text-strong)' }}>Apply now</h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>Takes two minutes. Your application opens as an email to our team.</p>
            </div>
            <ul className="grid flex-1 list-none grid-rows-3 gap-3">
              {STEPS.map(({ icon: Icon, color, text }) => (
                <li key={text} className="group flex items-center gap-4 rounded-2xl border p-4 transition-transform duration-300 hover:translate-x-1" style={{ borderColor: LINE, background: `linear-gradient(110deg, ${color}2e, var(--bg-surface) 75%)` }}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" style={{ background: `${color}55`, color: 'var(--text-strong)' }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-bold" style={{ color: 'var(--text-strong)' }}>{text}</span>
                </li>
              ))}
            </ul>
          </aside>

          <form onSubmit={handleSubmit} className="min-w-0 space-y-4 p-5 sm:p-6 lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full name *">
                <input type="text" required placeholder="Your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} style={inputStyle} />
              </Field>
              <Field label="Role / domain *">
                <input type="text" required placeholder="Pick a domain above or type one" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className={inputCls} style={inputStyle} />
              </Field>
              <Field label="Email *">
                <input type="email" required placeholder="you@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} style={inputStyle} />
              </Field>
              <Field label="Phone *">
                <input type="tel" required placeholder="+91 ..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} style={inputStyle} />
              </Field>
            </div>

            <Field label="About you *">
              <textarea required rows={5} placeholder="Background, tools you master, portfolio link..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputCls} resize-none`} style={inputStyle} />
            </Field>

            <button
              type="submit"
              className="btn-shine-sweep group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl px-8 py-4 font-display text-xs font-black uppercase tracking-widest text-black transition-transform hover:-translate-y-0.5 sm:w-auto"
              style={{ background: 'var(--iridescent)' }}
            >
              Send application
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  );
};