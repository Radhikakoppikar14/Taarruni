import React from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { TDS_COMPANY_INFO, TDS_SERVICES } from '../data/taarruniData';

interface FooterProps {
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestQuote }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Corporate Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl inline-flex">
                <img
                  src="/images/logo.png"
                  alt="Taarruni Design Solutions"
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Taarruni Design Solutions (TDS) is a leading Digital Marketing and IT Solutions provider incorporated in 2005 at Bangalore, India. Known for delivering an array of services across web development, 2D/3D multimedia, SEO/SEM, and pan-India outdoor retail signages.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-200">Incorporated:</strong> 2005 · Bangalore, India</div>
              <div><strong className="text-slate-200">Incubator:</strong> NSRCEL (IIM Bangalore) Ecosystem</div>
            </div>

            <div className="pt-2">
              <a
                href={TDS_COMPANY_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with TDS Support</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Services' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'clients', label: 'Clients' },
                { id: 'contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Core Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              {TDS_SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left truncate max-w-full block text-slate-400"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & HQ (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Head Office (Bangalore)
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  No. 67/1-1, "PRAVARA", H.B. Samaja Road, Basavanagudi, Bangalore – 560004
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${TDS_COMPANY_INFO.phones[0].replace(/\s+/g, '')}`} className="hover:text-white">
                  {TDS_COMPANY_INFO.phones[0]}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${TDS_COMPANY_INFO.phones[1].replace(/\s+/g, '')}`} className="hover:text-white">
                  {TDS_COMPANY_INFO.phones[1]}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${TDS_COMPANY_INFO.emails[0]}`} className="hover:text-white">
                  {TDS_COMPANY_INFO.emails[0]}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onRequestQuote}
                className="w-full py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Request Corporate Quote
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2025 Taarruni Design Solutions (TDS). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Ariba Discovery Verified</span>
            <span aria-hidden="true">·</span>
            <span>NSRCEL / IIMB Incubated</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy & Legal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
