import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { TDS_COMPANY_INFO } from '../data/taarruniData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onRequestQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'clients', label: 'Clients' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single element brand mark */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3.5 group cursor-pointer text-left focus-visible:outline-hidden"
              aria-label="Taarruni Design Solutions Home"
            >
              <img
                src="/images/logo.png"
                alt="Taarruni Design Solutions"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </button>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-red-600 font-semibold'
                      : 'text-slate-700 hover:text-red-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Direct Phone & Mobile Hamburger */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Direct Phone link for high-intent visitors */}
            <a
              href={`tel:${TDS_COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-red-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200"
              title="Call Taarruni Bangalore HQ"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>{TDS_COMPANY_INFO.phones[0]}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={`tel:${TDS_COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
              className="px-3 py-2 text-xs font-semibold text-slate-600 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>{TDS_COMPANY_INFO.phones[0]}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full text-center py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs"
            >
              Request a Project Proposal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
