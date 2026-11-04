import React from 'react';
import { PortfolioShowcase } from '../components/PortfolioShowcase';

interface PortfolioPageProps {
  onNavigate: (page: string) => void;
  onRequestQuote: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
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
              Case Studies & Portfolio
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Featured Client Projects & Execution Archive
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore real work across corporate web engineering, 3D multimedia animations, e-commerce architectures, and pan-India retail signages.
            </p>
          </div>
        </div>
      </section>

      {/* Full Portfolio Gallery */}
      <PortfolioShowcase showAll={true} onRequestQuote={onRequestQuote} />
    </div>
  );
};
