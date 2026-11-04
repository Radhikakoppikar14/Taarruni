import React from 'react';
import { ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { TDS_CLIENTS } from '../data/taarruniData';
import { ClientTestimonials } from '../components/ClientTestimonials';

interface ClientsPageProps {
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({
  onNavigate,
  onRequestQuote,
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
              Our Clientele & Partners
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Trusted by Leading Indian & Multinational Brands
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Over two decades, Taarruni Design Solutions has built enduring relationships with Fortune-level conglomerates, premier public-sector banks, and innovative emerging enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* Client Wall */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TDS_CLIENTS.map((client) => (
              <div
                key={client.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-16 flex items-center justify-start mb-4">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-12 max-w-[160px] object-contain"
                    />
                  </div>
                  <div className="text-xs font-semibold text-red-600 mb-1">
                    {client.category}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {client.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {client.highlight}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Verified Client Partner</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Looking to build your enterprise digital presence?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Join our roster of satisfied corporate partners.
              </p>
            </div>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Request Corporate Proposal
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <ClientTestimonials />
    </div>
  );
};
