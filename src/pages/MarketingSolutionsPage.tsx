import React from 'react';
import { TrendingUp, Globe, Search, Mail, Share2, Layers, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface MarketingSolutionsPageProps {
  onNavigate: (route: string) => void;
}

export const MarketingSolutionsPage: React.FC<MarketingSolutionsPageProps> = ({ onNavigate }) => {
  const marketingSegments = [
    {
      title: 'Digital & Online Marketing (SEO / SEM)',
      desc: 'These days, entrepreneurs are adopting various ways to enhance their business. Online marketing is one such way to attract target audiences, convert inbound traffic into paying enterprise customers, and build lifelong brand authority.',
      features: [
        'Top-tier Google organic search engine optimization (SEO)',
        'Pay-Per-Click (Google Ads PPC) campaign management with high ROI',
        'Commercial intent keyword targeting and competitive analysis',
        'Technical speed tuning, Core Web Vitals, and Schema JSON-LD markup',
      ],
      route: 'services/digital-marketing',
    },
    {
      title: 'Traditional & Offline Marketing',
      desc: 'Tangible brand impressions that leave a lasting physical impact on your corporate partners and enterprise clientele during exhibitions, conventions, and boardroom pitches.',
      features: [
        'Corporate brochures, company profiles, and executive presentations',
        'Print media advertising, magazine layouts, and trade collaterals',
        'Direct mail campaigns and event invitations',
        'Comprehensive brand guidelines and corporate stationery systems',
      ],
      route: 'services/offline-marketing',
    },
    {
      title: 'Social Media & Brand Performance',
      desc: 'Engaging, professional B2B social marketing across LinkedIn, X/Twitter, and Meta to position your leadership and generate enterprise pipeline.',
      features: [
        'Targeted LinkedIn executive thought leadership campaigns',
        'Social creative assets, infographics, and motion graphics',
        'Brand sentiment monitoring and community engagement',
        'Performance conversion tracking and attribution modeling',
      ],
      route: 'services/digital-marketing',
    },
    {
      title: 'All India Physical Signage & Branding',
      desc: 'Nationwide internal and external signage networks, 3D laser-cut SS and acrylic boards, LED glow signs, and retail POS store displays.',
      features: [
        '3D Acrylic and Stainless Steel (SS) letter-cut signboards',
        'LED backlit and frontlit energy-efficient glow signboards',
        'Highway hoardings, unipoles, and architectural building signs',
        'Nationwide survey, fabrication, and physical site installation',
      ],
      route: 'services/signage-branding',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]/90 backdrop-blur-sm relative z-10 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-red-600 transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-red-600 font-bold">Marketing Solutions</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>TDS Marketing Vertical</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Marketing Solutions <span className="text-red-600">is what we are known for.</span>
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            These days, entrepreneurs are adopting various ways to enhance their business. Online marketing is one such way to attract. 
            At Taarruni Design Solutions, we bridge high-impact digital search optimization with nationwide physical signage networks.
          </p>
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {marketingSegments.map((seg, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-red-300 transition-all flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{seg.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{seg.desc}</p>
                <div className="space-y-2 mb-6">
                  {seg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Request Marketing Audit
                </button>
                <button
                  onClick={() => onNavigate(seg.route)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore 3D Scene</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
