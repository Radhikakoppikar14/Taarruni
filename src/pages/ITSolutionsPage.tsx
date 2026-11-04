import React from 'react';
import { Code, Server, Database, Layers, ShoppingBag, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ITSolutionsPageProps {
  onNavigate: (route: string) => void;
}

export const ITSolutionsPage: React.FC<ITSolutionsPageProps> = ({ onNavigate }) => {
  const itSegments = [
    {
      title: 'Custom Web & Application Development',
      desc: 'We are team of specialized, experienced, software architect and developers working together to develop world class IT solutions. Custom web portals and distributed cloud applications engineered for high-concurrency corporate environments.',
      features: [
        'Enterprise business process automation & custom ERP bridges',
        'Role-Based Access Control (RBAC) & granular audit logging',
        'Scalable RESTful & GraphQL microservice APIs',
        'High-speed relational & distributed databases (PostgreSQL, Redis)',
      ],
      route: 'services',
    },
    {
      title: 'CMS (Content Management Systems)',
      desc: 'Modular, secure, and intuitive publishing systems that allow non-technical teams to manage multi-lingual corporate web portals with zero developer friction.',
      features: [
        'Custom WordPress theme & plugin engineering from scratch',
        'Headless CMS implementations with Strapi, Sanity & Next.js',
        'Hardened zero-trust security & automated backup workflows',
        'Multi-author editorial approval flows & version history',
      ],
      route: 'services/cms-development',
    },
    {
      title: 'E-Commerce Website Development',
      desc: 'Wholesale B2B ordering portals and direct-to-consumer digital storefronts featuring automated inventory syncing, tiered dealer pricing, and secure payment integrations.',
      features: [
        'Multi-currency and multi-gateway checkout (Razorpay, Stripe, CCAvenue)',
        'Wholesale B2B credit terms & customer price group engine',
        'Automated GST invoicing & courier logistics tracking (Bluedart, Delhivery)',
        'PCI-DSS compliant transactional infrastructure',
      ],
      route: 'services/ecommerce-development',
    },
    {
      title: 'Architectural & Civil 2D/3D Walkthroughs',
      desc: 'Photorealistic architectural 3D renderings, virtual walkthroughs, and civil engineering visualizers for luxury real estate developers and industrial machinery manufacturers.',
      features: [
        'Ultra-HD 4K architectural fly-through animations',
        'Interactive WebGL & Three.js 3D building visualizers',
        'Industrial machinery exploded views & engineering simulations',
        'Corporate investor presentations & promotional motion films',
      ],
      route: 'services/architectural-civil',
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
          <span className="text-red-600 font-bold">IT Solutions</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>TDS IT Solutions Division</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            World-Class IT Solutions <span className="text-blue-600">is what we are known for.</span>
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            We are team of specialized, experienced, software architect and developers working together to develop world class IT solutions. 
            From robust web applications and headless CMS platforms to photorealistic 3D architectural visualizers.
          </p>
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {itSegments.map((seg, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between"
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
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Request Technical Blueprint
                </button>
                <button
                  onClick={() => onNavigate(seg.route)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Inspect 3D Architecture</span>
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
