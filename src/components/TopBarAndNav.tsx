import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Phone,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { FacebookIcon, TwitterIcon, LinkedInIcon, WhatsAppIcon } from './SocialIcons';

interface TopBarAndNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenQuickContact: () => void;
}

/* ---------------------------- menu data ---------------------------- */
const MAIN_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services', menu: 'services' as const },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'clients', label: 'Clients' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact Us' },
  { id: 'more', label: 'More', menu: 'more' as const },
];

const SERVICE_COLS = [
  { no: '01', title: 'Marketing', color: '#3ef0ff', route: 'marketing', links: [['Digital / Online Marketing', 'marketing/online'], ['Traditional / Offline Marketing', 'marketing']] },
  { no: '02', title: 'All India Branding', color: '#ff2e88', route: 'branding', links: [['Internal Signage', 'branding'], ['External Signage', 'branding'], ['Hoardings & Billboards', 'branding'], ['Outdoor Retail Branding', 'branding']] },
  { no: '03', title: 'IT Services', color: '#ffd36b', route: 'it', links: [['CMS Development', 'it'], ['E-Commerce Development', 'it'], ['Architectural and Civil', 'it']] },
];

const MORE_LINKS = [
  { id: 'process', label: 'Our Process', hint: 'How we deliver' },
  { id: 'careers', label: 'Careers', hint: 'Join the team' },
];

/* simple, quick fade used by both dropdowns */
const unfold = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: 'easeOut' as const },
};

export const TopBarAndNav: React.FC<TopBarAndNavProps> = ({ currentRoute, onNavigate, onOpenQuickContact }) => {
  const [openMenu, setOpenMenu] = useState<null | 'services' | 'more'>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const inServices = ['services', 'marketing', 'branding', 'it'].some((r) => currentRoute === r || currentRoute.startsWith(r + '/'));
  const inMore = currentRoute === 'process' || currentRoute === 'careers';
  const isActive = (l: (typeof MAIN_LINKS)[number]) => (l.id === 'services' ? inServices : l.id === 'more' ? inMore : currentRoute === l.id);

  return (
    <header
      className="sticky top-0 z-40 border-b"
      data-scrolled={scrolled}
      style={{
        background: 'var(--glass-nav)',
        WebkitBackdropFilter: 'blur(14px)',
        backdropFilter: 'blur(14px)',
        borderColor: 'rgb(var(--fg-rgb) / 0.1)',
        boxShadow: scrolled ? '0 8px 24px -16px rgba(30,50,100,0.35)' : 'none',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <button onClick={() => go('home')} className="flex items-center shrink-0 group cursor-pointer focus-visible:outline-hidden" aria-label="Taarruni Design Solutions Home">
          <BrandLogo height={36} />
        </button>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center">
          {MAIN_LINKS.map((l) => {
            const active = isActive(l);
            const menuOpen = l.menu && openMenu === l.menu;
            return (
              <div
                key={l.id}
                className="relative"
                onMouseEnter={() => {
                  setOpenMenu(l.menu ?? null);
                }}
              >
                <button
                  onClick={() => (l.menu === 'more' ? setOpenMenu(menuOpen ? null : 'more') : go(l.id))}
                  className="relative px-3.5 py-2 rounded-lg text-[13px] font-semibold flex items-center gap-1 cursor-pointer transition-colors hover:bg-[rgb(var(--fg-rgb)/0.07)]"
                  style={{ color: active || menuOpen ? 'var(--accent-cyan-ink)' : 'var(--text-soft)' }}
                >
                  <span className="relative">{l.label}</span>
                  {l.menu && <ChevronDown className={`relative w-3.5 h-3.5 transition-transform duration-150 ${menuOpen ? 'rotate-180' : ''}`} />}
                  {active && (
                    <span
                      className="absolute left-3.5 right-3.5 -bottom-px h-0.5 rounded-full"
                      style={{ background: 'var(--accent-cyan)' }}
                    />
                  )}
                </button>

                {/* ---------------- Services: three unfolding cards ---------------- */}
                <AnimatePresence>
                  {l.menu === 'services' && menuOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4" onMouseLeave={() => setOpenMenu(null)}>
                      <motion.div
                        {...unfold}
                        style={{ background: 'color-mix(in srgb, var(--bg-surface) 96%, transparent)', borderColor: 'rgb(var(--fg-rgb) / 0.14)' }}
                        className="w-[780px] rounded-2xl border p-3 shadow-xl"
                      >
                        <div className="grid grid-cols-3 gap-3">
                          {SERVICE_COLS.map((c) => (
                            <div
                              key={c.title}
                              className="relative overflow-hidden rounded-2xl p-5 border"
                              style={{ borderColor: 'rgb(var(--fg-rgb) / 0.1)', background: `linear-gradient(180deg, ${c.color}1c, transparent 60%)` }}
                            >
                              <span className="absolute -right-2 -top-4 font-display text-7xl font-black select-none" style={{ color: `${c.color}22` }}>{c.no}</span>
                              <button onClick={() => go(c.route)} className="relative flex items-center gap-1.5 font-display text-sm font-black cursor-pointer" style={{ color: c.color }}>
                                {c.title}
                                <ArrowUpRight className="w-4 h-4" />
                              </button>
                              <ul className="relative mt-4 space-y-1">
                                {c.links.map(([label, route]) => (
                                  <li key={label}>
                                    <button
                                      onClick={() => go(route)}
                                      className="group/l w-full text-left text-[13px] py-1.5 flex items-center gap-2 cursor-pointer transition-colors"
                                      style={{ color: 'var(--text-muted)' }}
                                    >
                                      <span className="h-px w-0 group-hover/l:w-4 transition-all duration-300" style={{ background: c.color }} />
                                      <span className="group-hover/l:text-[color:var(--text-strong)] transition-colors">{label}</span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between px-3 py-2.5 text-xs">
                          <button onClick={() => go('services')} className="flex items-center gap-1.5 font-display font-bold cursor-pointer hover:text-[#3ef0ff] transition-colors" style={{ color: 'var(--text-soft)' }}>
                            Browse all services <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => go('quote')} className="font-display font-bold cursor-pointer hover:text-[#ff2e88] transition-colors" style={{ color: 'var(--text-muted)' }}>
                            Not sure? Request a quote →
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* ---------------- More: compact unfolding list ---------------- */}
                  {l.menu === 'more' && menuOpen && (
                    <div className="absolute top-full right-0 pt-4" onMouseLeave={() => setOpenMenu(null)}>
                      <motion.div
                        {...unfold}
                        style={{ background: 'color-mix(in srgb, var(--bg-surface) 96%, transparent)', borderColor: 'rgb(var(--fg-rgb) / 0.14)' }}
                        className="w-[270px] rounded-2xl border p-2 shadow-xl"
                      >
                        {MORE_LINKS.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => go(m.id)}
                            className="group/m w-full flex items-center justify-between rounded-2xl px-4 py-3 text-left cursor-pointer transition-colors hover:bg-[rgb(var(--fg-rgb)/0.07)]"
                          >
                            <span>
                              <span className="block font-display text-sm font-bold" style={{ color: 'var(--text-strong)' }}>{m.label}</span>
                              <span className="block text-[11px]" style={{ color: 'var(--text-muted)' }}>{m.hint}</span>
                            </span>
                            <ArrowRight className="w-4 h-4 -translate-x-1 opacity-0 group-hover/m:translate-x-0 group-hover/m:opacity-100 transition-all" style={{ color: 'var(--accent-cyan)' }} />
                          </button>
                        ))}
                        <a
                          href="http://taarruni.blogspot.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/m flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-[rgb(var(--fg-rgb)/0.07)]"
                        >
                          <span>
                            <span className="block font-display text-sm font-bold" style={{ color: 'var(--text-strong)' }}>Blog</span>
                            <span className="block text-[11px]" style={{ color: 'var(--text-muted)' }}>Opens in a new tab</span>
                          </span>
                          <ExternalLink className="w-4 h-4 opacity-60" style={{ color: 'var(--text-muted)' }} />
                        </a>
                        <div className="mt-1 flex items-center gap-4 px-4 pt-3 pb-2 border-t" style={{ borderColor: 'rgb(var(--fg-rgb) / 0.1)', color: 'var(--text-muted)' }}>
                          <a href="https://www.facebook.com/taarruni" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#3ef0ff] transition-colors"><FacebookIcon className="w-4 h-4" /></a>
                          <a href="https://twitter.com/taarruni" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#3ef0ff] transition-colors"><TwitterIcon className="w-4 h-4" /></a>
                          <a href="https://www.linkedin.com/company/taarruni-design-solutions/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#3ef0ff] transition-colors"><LinkedInIcon className="w-4 h-4" /></a>
                          <a href="https://api.whatsapp.com/send?phone=919880477344&text=Yes%20I%20am%20Interested" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[#25D366] hover:opacity-80 transition-opacity"><WhatsAppIcon className="w-4 h-4" /></a>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenQuickContact}
            className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center border cursor-pointer transition-colors hover:border-[#3ef0ff] hover:text-[#3ef0ff]"
            style={{ borderColor: 'rgb(var(--fg-rgb) / 0.2)', color: 'var(--text-soft)' }}
            aria-label="Quick contact"
            title="Quick contact"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => go('quote')}
            className="hidden sm:flex items-center gap-1.5 h-10 px-5 rounded-full text-black text-[11px] font-display font-black uppercase tracking-wider cursor-pointer"
            style={{ background: 'var(--iridescent)' }}
          >
            Request quote
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[rgb(var(--fg-rgb)/0.1)] transition-colors"
            style={{ color: 'var(--text-strong)' }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden mx-auto max-w-7xl border-t p-5 max-h-[75vh] overflow-y-auto"
            style={{ background: 'var(--bg-surface)', borderColor: 'rgb(var(--fg-rgb) / 0.14)' }}
          >
            <div className="flex flex-col">
              {[
                ...MAIN_LINKS.filter((l) => l.id !== 'more').map((l) => ({ id: l.id, label: l.label })),
                { id: 'process', label: 'Our Process' },
                { id: 'careers', label: 'Careers' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-left py-2.5 text-base font-semibold border-b"
                  style={{ borderColor: 'rgb(var(--fg-rgb) / 0.07)', color: currentRoute === l.id ? 'var(--accent-cyan-ink)' : 'var(--text-soft)' }}
                >
                  {l.label}
                </button>
              ))}
              <a href="http://taarruni.blogspot.com/" target="_blank" rel="noopener noreferrer" className="py-2.5 text-base font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-soft)' }}>
                Blog <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={() => go('quote')} className="py-3 rounded-full text-black font-display font-black text-[11px] uppercase tracking-wider" style={{ background: 'var(--iridescent)' }}>
                Request quote
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuickContact();
                }}
                className="py-3 rounded-full font-display font-bold text-[11px] uppercase tracking-wider border"
                style={{ borderColor: 'rgb(var(--fg-rgb) / 0.2)', color: 'var(--text-strong)' }}
              >
                Quick contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};