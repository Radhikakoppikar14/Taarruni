import React from 'react';
import { Globe, Search, Layers, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface SEOPageProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const SEOPages: React.FC<SEOPageProps> = ({ slug, onNavigate }) => {
  const seoData: Record<string, {
    title: string;
    headline: string;
    metaDesc: string;
    location: string;
    keywords: string[];
    body: string[];
    deliverables: string[];
  }> = {
    'web-design-company-bangalore': {
      title: 'Web Design Company In Bangalore | Taarruni Design Solutions',
      headline: 'Premier Web Design & Development Company in Bangalore',
      metaDesc: 'Looking for the best web design company in Bangalore? Taarruni Design Solutions has been delivering bespoke, high-performance web portals and corporate designs since 2005.',
      location: 'Basavanagudi, Bangalore, Karnataka, India',
      keywords: ['web design company bangalore', 'website developers bangalore', 'corporate web design basavanagudi', 'enterprise portal development'],
      body: [
        'Taarruni Design Solutions (TDS) is widely celebrated as a pioneering web design company in Bangalore, with over two decades of technical experience building custom, mobile-responsive, and search-optimized portals.',
        'Located in the historic commercial hub of Basavanagudi, our development architects collaborate with established MSMEs, industrial conglomerates, and multinational brands to deliver lightning-fast digital experiences with sub-second page loads.',
        'Whether you require static brand showcases, dynamic database-driven applications, or custom corporate intranets, TDS provides end-to-end UX wireframing, frontend engineering, and cloud deployment.',
      ],
      deliverables: [
        'Custom Responsive Corporate Layouts',
        'Sub-1s Core Web Vitals Optimization',
        'Cross-Browser & Cross-Platform QA',
        'Complete Source Code Ownership & SLA Maintenance',
      ],
    },
    'seo-services-bangalore': {
      title: 'SEO Services In Bangalore | Search Engine Optimization Company | Taarruni',
      headline: 'Top-Ranked SEO & Digital Marketing Services in Bangalore',
      metaDesc: 'Accelerate qualified organic inbound leads with premier SEO services in Bangalore by Taarruni. Technical audits, high-intent keywords, and white-hat link building.',
      location: 'Bangalore, South India',
      keywords: ['seo services bangalore', 'search engine marketing bangalore', 'sem company bangalore', 'b2b seo consultants'],
      body: [
        'Search engine optimization requires more than basic keyword stuffing; it demands entity-level semantic architecture, high-authority backlink development, and technical crawlability.',
        'Taarruni Design Solutions has propelled over 500 corporate entities to Page-1 positions on Google search results for commercial high-conversion queries.',
        'Our Bangalore search marketing team conducts exhaustive competitor gap analyses, on-page Schema JSON-LD structured data implementation, and continuous performance analytics.',
      ],
      deliverables: [
        'Exhaustive Technical SEO & Crawlability Audit',
        'High-Intent Commercial Keyword Roadmap',
        'Schema.org Structured Data & Speed Optimization',
        'Transparent Monthly SERP Tracking & KPI Dashboards',
      ],
    },
    'cms-development-bangalore': {
      title: 'CMS Development In Bangalore | WordPress & Headless CMS Experts | Taarruni',
      headline: 'Enterprise CMS & Content Management Systems in Bangalore',
      metaDesc: 'Scalable WordPress, Drupal, and Headless CMS development company in Bangalore. Custom theme engineering with zero bloat and enterprise security.',
      location: 'Bangalore, India',
      keywords: ['cms development bangalore', 'wordpress company bangalore', 'headless cms experts', 'drupal enterprise portal'],
      body: [
        'Content management should empower your marketing and editorial staff without introducing technical vulnerabilities or sluggish database latency.',
        'Taarruni develops custom non-bloated WordPress themes, headless Strapi/Sanity architectures, and Drupal enterprise portals tailored to corporate workflows.',
        'All TDS CMS implementations feature role-based permissions, automated daily backups, and robust protection against SQL injections.',
      ],
      deliverables: [
        'Custom Block-Based Modular Admin Interface',
        'Multi-lingual & Multi-region Publishing Controls',
        'Zero-Trust Security Hardening & Asset Backups',
        'User Training Guides & Post-Launch Support',
      ],
    },
    'los-angeles-seo-company': {
      title: 'Los Angeles SEO Company | Cross-Border Enterprise Digital Marketing | Taarruni',
      headline: 'Enterprise SEO & Search Dominance in Los Angeles & California',
      metaDesc: 'Taarruni USA Office provides top-tier search engine optimization for North American businesses, backed by high-capacity engineering teams in Silicon Valley and India.',
      location: 'Union City, CA / Los Angeles, California, USA',
      keywords: ['los angeles seo company', 'california search marketing', 'us offshore web development', 'enterprise digital agency'],
      body: [
        'Operating in partnership with our California office (c/o Izen AI Inc., Union City, CA), Taarruni delivers Silicon Valley-grade technical SEO and high-volume lead acquisition for US enterprises.',
        'We combine local American market positioning with high-capacity offshore engineering execution to provide unmatched return on digital marketing investment.',
      ],
      deliverables: [
        'North America Regional & National Keyword Strategy',
        'High-Speed Core Web Vitals Overhaul',
        'Google Business Profile & Local Map Pack Dominance',
        'Integrated Google Ads PPC Remarketing Campaigns',
      ],
    },
    'los-angeles-digital-marketing-company': {
      title: 'Digital Marketing Company Los Angeles | Taarruni USA',
      headline: 'Full-Funnel Digital Marketing & Brand Growth for California Enterprises',
      metaDesc: 'Full-spectrum digital marketing services in California: B2B LinkedIn campaigns, Google Ads, enterprise web portals, and omnichannel lead generation.',
      location: 'California, United States',
      keywords: ['digital marketing company los angeles', 'california digital agency', 'b2b lead generation usa', 'performance marketing agency'],
      body: [
        'From high-converting landing pages to multi-channel ad campaigns across Google and LinkedIn, Taarruni delivers scalable customer acquisition pipelines for US mid-market enterprises.',
        'Backed by our 20-year proven delivery track record, our cross-border teams coordinate seamlessly across Pacific and Indian Standard timezones.',
      ],
      deliverables: [
        'Omnichannel B2B Customer Acquisition Strategy',
        'High-Converting Landing Page UI/UX Systems',
        'Conversion Rate Optimization (CRO) Benchmarking',
        'Real-Time Attribution & Revenue Dashboards',
      ],
    },
  };

  const page = seoData[slug] || seoData['web-design-company-bangalore'];

  return (
    <div className="min-h-screen bg-[#F8FAFC]/90 backdrop-blur-sm relative z-10 pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-red-600 transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-red-600 font-bold">{page.headline}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>{page.location}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {page.headline}
            </h1>
            <p className="text-base text-slate-600 mt-4 leading-relaxed font-medium">
              {page.metaDesc}
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
            {page.body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Key Deliverables */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Enterprise Delivery Commitments</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {page.deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Keywords Tags */}
          <div className="pt-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Primary Index Keywords
            </div>
            <div className="flex flex-wrap gap-2">
              {page.keywords.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-mono">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-900">Ready to Partner with Taarruni Design Solutions?</div>
              <div className="text-xs text-slate-500">Corporate consultations available from Bangalore or California offices.</div>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors shrink-0 cursor-pointer"
            >
              Consult with Principal Architect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
