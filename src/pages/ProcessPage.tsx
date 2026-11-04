import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Search, 
  Compass, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  RefreshCw,
  Users
} from 'lucide-react';

interface ProcessPageProps {
  onNavigate: (page: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  // 5-Step Process authentic to Taarruni Design Solutions
  const steps = [
    {
      step: '01',
      title: 'Discovery & Strategic Requirement Analysis',
      icon: Search,
      color: 'red',
      description: 'We initiate every engagement with a rigorous examination of your business workflows, audience demographics, competitive landscape, and digital bottlenecks.',
      deliverables: [
        'Stakeholder interviews & user persona definitions',
        'Technical feasibility and legacy system audit',
        'Information architecture (IA) and scope specification document',
        'Project milestones, timeline, and SLA framework agreement'
      ]
    },
    {
      step: '02',
      title: 'Architecture Blueprint & UI/UX Prototyping',
      icon: Compass,
      color: 'blue',
      description: 'Translating business goals into high-fidelity interactive wireframes, database schemas, and microservice architectural blueprints before writing a single line of production code.',
      deliverables: [
        'Interactive Figma wireframes and mobile-first mockups',
        'Database Entity-Relationship (ER) models & API schemas',
        'Cloud infrastructure sizing and cost projection',
        'Corporate design system & typography sign-off'
      ]
    },
    {
      step: '03',
      title: 'Agile Engineering & Development Sprints',
      icon: Code2,
      color: 'purple',
      description: 'Our senior full-stack developers build clean, modular, and maintainable software in iterative two-week sprints with transparent staging environments.',
      deliverables: [
        'Sprint-by-sprint functional demos on staging servers',
        'Strict TypeScript type safety and automated unit testing',
        'Integration of payment gateways, ERP connectors, and third-party APIs',
        'Continuous Integration & Continuous Deployment (CI/CD) pipelines'
      ]
    },
    {
      step: '04',
      title: 'Rigorous QA, Security & Performance Hardening',
      icon: ShieldCheck,
      color: 'emerald',
      description: 'Every deliverable undergoes end-to-end multi-device testing, stress load benchmarking, and penetration tests to guarantee zero critical vulnerabilities.',
      deliverables: [
        'Cross-browser & cross-device compatibility testing (iOS/Android/Desktop)',
        'Core Web Vitals sub-1s performance optimization',
        'OWASP Top-10 security audit and SQL injection protection',
        'User Acceptance Testing (UAT) sign-off with client leadership'
      ]
    },
    {
      step: '05',
      title: 'Deployment, Search Engine Indexing & SLA Support',
      icon: Rocket,
      color: 'amber',
      description: 'We execute zero-downtime cutover migrations, configure Google Search Console indexing, and provide ongoing multi-year maintenance SLAs.',
      deliverables: [
        'Zero-downtime DNS and database migration',
        'XML sitemap submission, robots.txt, and Google Analytics 4 setup',
        'Admin training sessions and recorded video tutorials',
        'Dedicated account engineer and 24/7 SLA uptime monitoring'
      ]
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
            <span className="text-red-600 font-bold">Our Process</span>
          </div>
          <button 
            onClick={() => onNavigate('contact')}
            className="text-xs font-bold text-slate-800 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Start Step 1: Discovery</span>
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
              <span>Proven 20-Year Delivery Framework</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Our Structured <span className="text-red-600">Engineering Process</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Discover how Taarruni Design Solutions systematically transforms complex organizational briefs 
              into high-performance, fault-tolerant digital ecosystems without timeline slippage.
            </p>
          </div>
        </div>
      </section>

      {/* Step by Step Timeline */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={s.step}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs hover:border-red-300 transition-all flex flex-col md:flex-row gap-6 sm:gap-10 items-start"
              >
                {/* Step indicator circle */}
                <div className="shrink-0 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200/80 flex items-center justify-center text-red-600 font-mono font-black text-2xl">
                    {s.step}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-red-600" />
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {s.title}
                    </h2>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {s.description}
                  </p>

                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Deliverables & Milestones
                    </div>
                    {s.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Put Our Process to Work for Your Firm?</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm mb-8">
            Schedule an introductory technical discovery meeting with our principal architect today.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Initiate Project Discovery
          </button>
        </div>
      </section>
    </div>
  );
};
