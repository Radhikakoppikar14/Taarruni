import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionArt, ArtVariant } from './SectionArt';

/* =========================================================================
   STUDIO HUB
   One combined section that replaces the separate "Who we are" card and the
   "Explore more of Taarruni" cards:

   - left  : the company story and a quick-facts grid
   - right : a numbered directory of the four shortcuts, each with its small
             illustration, as rows instead of four separate cards

   It is deliberately light: static gradients, CSS hover transitions only,
   no looping animation of its own.
========================================================================= */

interface StudioHubProps {
  onNavigate: (route: string) => void;
}

const FACTS: [string, string][] = [
  ['Incorporated', '2005 · Bangalore, India'],
  ['Global presence', 'India (HQ) & USA (Union City)'],
  ['Incubation', 'NSRCEL, IIM Bangalore'],
  ['Procurement', 'SAP Ariba Verified'],
];

const LINKS: [ArtVariant, string, string, string][] = [
  ['branding', 'branding', 'All India Branding', 'Signage, hoardings and outdoor branding.'],
  ['portfolio', 'portfolio', 'Our Portfolio', 'A look at the work we have shipped.'],
  ['clients', 'clients', 'Our Clients', '76 brands that trust our team.'],
  ['contact', 'contact', 'Contact Us', 'Bangalore and California offices.'],
];

export const StudioHub: React.FC<StudioHubProps> = ({ onNavigate }) => {
  return (
    <section className="py-5 sm:py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* gradient hairline frame */}
        <div
          className="rounded-[32px] p-px"
          style={{
            background:
              'linear-gradient(135deg, rgba(62,240,255,0.55), rgba(255,46,136,0.45) 50%, rgba(255,211,107,0.55))',
          }}
        >
          <div
            className="relative overflow-hidden rounded-[31px]"
            style={{ background: 'var(--bg-surface)' }}
          >
            {/* static colour wash */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(60% 70% at 0% 0%, rgba(62,240,255,0.14), transparent 70%), radial-gradient(50% 60% at 100% 100%, rgba(255,46,136,0.10), transparent 70%)',
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12">
              {/* ----------------------------- story ----------------------------- */}
              <div className="lg:col-span-7 p-8 sm:p-12 relative overflow-hidden">
                <div className="relative space-y-6">
                  <div className="text-xs font-display tracking-[0.25em] text-[#ffd36b] uppercase">
                    Who We Are · Established 2005
                  </div>
                  <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight max-w-xl">
                    Taarruni Design Solutions (TDS)
                  </h2>
                  <p className="text-sm sm:text-base text-[#9a9ca8] leading-relaxed max-w-2xl">
                    Taarruni Design Solutions (TDS) is a leading Multimedia and web solutions provider. Incorporated in 2005 at Bangalore, India, the company presents itself as a prominent brand widely known for delivering array of services in the field of designing and development for web designing, multimedia development services (2D/ 3D animation), web application development, Flash Programming, and E - Commerce programming services, SEO (Search Engine Optimization) - SEM (Search Engine Marketing) and print media.
                  </p>

                  {/* quick facts with a timeline spine */}
                  <div className="relative pl-5">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 bottom-1 w-px"
                      style={{ background: 'linear-gradient(to bottom, #3ef0ff, #ff2e88, #ffd36b)' }}
                    />
                    <div className="text-[11px] font-mono text-[#3ef0ff] uppercase tracking-widest mb-3">
                      Corporate Blueprint
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                      {FACTS.map(([k, v]) => (
                        <div key={k}>
                          <dt className="font-bold text-white">{k}</dt>
                          <dd className="text-[#9a9ca8] mt-0.5">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <button
                    onClick={() => onNavigate('about')}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#3ef0ff] to-[#ff2e88] text-black font-display font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    <span>Know more</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ---------------------------- directory --------------------------- */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/10 bg-white/5">
                <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight">
                  Explore more of Taarruni
                </h3>
                <div className="w-20 h-1 mt-2 mb-6 rounded-full bg-gradient-to-r from-[#ff2e88] to-[#ffd36b]" />

                <ul className="space-y-3">
                  {LINKS.map(([variant, route, title, blurb], i) => (
                    <li key={route}>
                      <button
                        type="button"
                        onClick={() => onNavigate(route)}
                        className="group w-full flex items-center gap-4 p-3 rounded-2xl border border-white/10 hover:border-[#3ef0ff] bg-white/5 hover:bg-white/10 text-left cursor-pointer transition-colors"
                      >
                        <span className="font-mono text-[11px] text-[#9a9ca8] w-5 shrink-0">0{i + 1}</span>
                        <div className="w-24 sm:w-28 shrink-0">
                          <SectionArt variant={variant} bare />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-display text-base font-bold text-white group-hover:text-[#3ef0ff] transition-colors">
                            {title}
                          </div>
                          <div className="text-xs text-[#9a9ca8] mt-0.5 leading-snug">{blurb}</div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 shrink-0 text-[#9a9ca8] group-hover:text-[#3ef0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};