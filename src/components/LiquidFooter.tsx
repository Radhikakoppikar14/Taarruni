import React from 'react';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { FacebookIcon, TwitterIcon, LinkedInIcon, WhatsAppIcon } from './SocialIcons';

interface LiquidFooterProps {
  onNavigate: (route: string) => void;
}

export const LiquidFooter: React.FC<LiquidFooterProps> = ({ onNavigate }) => {
  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'quote', label: 'Request Quote' },
    { id: 'process', label: 'Our Process' },
  ];

  const seoLinks = [
    'Best Web Design Company in Bangalore',
    'Affordable Web Design Company in Bangalore',
    'Top Web Design Company in Bangalore',
    'Website Designers in Bangalore',
    'Los Angeles SEO Company',
    'Digital Marketing company in Los Angeles',
    'SEO Services Bangalore',
    'SEO services in India',
    'CMS Development in bangalore',
    'Web Design Agency in Bangalore',
  ];

  return (
    <footer className="bg-[#0c0d10] border-t border-white/10 pt-8 pb-8 relative z-10 text-[#f2f2f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          
          {/* Brand & About Text (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {/* Theme-aware SVG logo (white text in dark theme, dark text in light theme) */}
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="cursor-pointer transition-transform hover:scale-105"
                aria-label="Taarruni Design Solutions Home"
              >
                <BrandLogo height={40} />
              </button>
              <span className="text-xs font-mono text-[#9a9ca8] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                TDS · EST. 2005
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#9a9ca8] leading-relaxed">
              Taarruni Design Solutions (TDS) is a leading Multimedia, web solutions provider and sem company in india. Web Design Company Bangalore - Taarruni is a one-stop Web solution for web development orientations, Internet Application Development.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/taarruni"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#16181d] border border-white/10 hover:border-[#3ef0ff] text-white flex items-center justify-center transition-all hover:scale-105"
                title="Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/taarruni"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#16181d] border border-white/10 hover:border-[#3ef0ff] text-white flex items-center justify-center transition-all hover:scale-105"
                title="Twitter"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/taarruni-design-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#16181d] border border-white/10 hover:border-[#3ef0ff] text-white flex items-center justify-center transition-all hover:scale-105"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919880477344&text=Yes%20I%20am%20Interested"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366] text-[#25D366] hover:text-black flex items-center justify-center transition-all hover:scale-105"
                title="WhatsApp Direct"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#3ef0ff]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#9a9ca8]">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="http://taarruni.blogspot.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Blog (taarruni.blogspot.com)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Block (4 cols) */}
          <div className="md:col-span-4 space-y-4 text-xs text-[#9a9ca8]">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#ff2e88]">
              Corporate Offices
            </h4>

            <div>
              <div className="font-bold text-white mb-0.5">Head Office (Bangalore):</div>
              <p className="leading-relaxed">
                Taarruni Design Solutions, No. 67/1-1, "PRAVARA", H.B. Samaja Road, Basavanagudi, Bangalore – 560004
              </p>
            </div>

            <div>
              <div className="font-bold text-white mb-0.5">USA Office:</div>
              <p className="leading-relaxed">
                Taarruni, C/o. Izen Ai Inc, 4556 Fernandez Street, Union City, CA 94587, USA
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1">
              <div>Phone: +91 80 26561646, +91 98804 77344</div>
              <div>Email: info@taarruni.com</div>
            </div>
          </div>

        </div>

        {/* Badges Links & Legal */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9a9ca8] border-b border-white/5">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold text-white/80">Credentials & Badges:</span>
            <a
              href="http://discovery.ariba.com/profile/AN01045665902"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3ef0ff] hover:underline"
            >
              Ariba Discovery profile
            </a>
            <span>·</span>
            <a
              href="https://www.nsrcel.org/start-up/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff2e88] hover:underline"
            >
              NSRCEL (IIM Bangalore)
            </a>
          </div>

          <div>
            Copyright © 2025 Taarruni Design Solutions. All rights reserved.
          </div>
        </div>

        {/* SEO Footer Links Row */}
        <div className="pt-6">
          <div className="text-[11px] text-[#9a9ca8]/60 flex flex-wrap gap-x-3 gap-y-1 justify-center text-center">
            {seoLinks.map((term, i) => (
              <span key={i} className="hover:text-white transition-colors cursor-default">
                {term} {i < seoLinks.length - 1 && <span className="opacity-30">·</span>}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};