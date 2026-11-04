import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Quote, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Award
} from 'lucide-react';
import { ClientBrands } from '../components/ClientBrands';

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onNavigate }) => {
  const reviews = [
    {
      company: 'BOARD WISE',
      subtext: 'The Global Governance Community',
      quote: 'Taarruni Design Solutions developed our member community portal with utmost security, role-based authorization, and flawless mobile experience. Their team is exceptionally responsive and deeply technical.',
      author: 'Senior Executive Lead',
      rating: 5,
      year: '2023 - Present'
    },
    {
      company: 'Ferns Estates & Developers',
      subtext: 'Luxury Residential & Commercial Real Estate',
      quote: 'We have trusted Taarruni with multiple project launches. Their high-speed image rendering, virtual floorplan modules, and SEO optimization have consistently driven qualified property buyers to our sales team.',
      author: 'Head of Digital Marketing',
      rating: 5,
      year: 'Multi-year Engagement'
    },
    {
      company: 'LAPP India',
      subtext: 'Industrial Cables & Automation Technology',
      quote: 'Taarruni seamlessly integrated our complex product catalogs with an intuitive corporate web interface. Their attention to detail and adherence to corporate brand guidelines are world-class.',
      author: 'Corporate Communications Manager',
      rating: 5,
      year: 'Long-term Client'
    },
    {
      company: 'DOOSAN Industrial',
      subtext: 'Power Equipment & Heavy Engineering',
      quote: 'From custom web solutions to specialized trade display collateral, Taarruni provides unmatched accountability and engineering depth under demanding deadlines.',
      author: 'Regional VP Operations',
      rating: 5,
      year: 'Enterprise Partner'
    },
    {
      company: 'HiKOKI Power Tools',
      subtext: 'Unleash the Next - Industrial Machinery',
      quote: 'The dealer locator and product specification engine built by Taarruni reduced inbound customer inquiry overhead by over 60%. We highly recommend them for enterprise portal builds.',
      author: 'Channel Marketing Director',
      rating: 5,
      year: '2022 - Present'
    },
    {
      company: 'GRACO Fluid Systems',
      subtext: 'Global Industrial Equipment Manufacturer',
      quote: 'Reliable, professional, and knowledgeable. Taarruni is our go-to digital solutions partner in India for technical website management and search optimization.',
      author: 'South Asia Operations Lead',
      rating: 5,
      year: 'Continuous SLA'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button onClick={() => onNavigate('home')} className="hover:text-red-600 transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-red-600 font-bold">Testimonials</span>
          </div>
          <button 
            onClick={() => onNavigate('contact')}
            className="text-xs font-bold text-slate-800 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Work With Taarruni</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white py-14 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>98.7% Satisfaction Rate</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Enterprise <span className="text-red-600">Client Reviews</span> & Feedback
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Read how Taarruni Design Solutions helps organizations, industrial leaders, and MSMEs achieve 
              unmatched digital stability, top Google rankings, and nationwide physical brand recognition.
            </p>
          </div>
        </div>
      </section>

      {/* Client Brands Roster */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClientBrands />
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((r, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">{r.year}</span>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    "{r.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="font-bold text-slate-900 text-sm">{r.company}</div>
                  <div className="text-xs text-red-600 font-semibold">{r.subtext}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{r.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Deliver Real Value to Your Business</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm mb-8">
            Experience the same engineering caliber that has satisfied hundreds of market leaders for 20+ years.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Request Enterprise Proposal
          </button>
        </div>
      </section>
    </div>
  );
};
