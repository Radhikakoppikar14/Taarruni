import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Landmark, Network, Check, ArrowRight, ShieldCheck, Users2, LineChart, Sparkles, LucideIcon } from 'lucide-react';

interface TargetClienteleProps {
  onNavigate: (sectionId: string) => void;
}

interface TiltCardPillarProps {
  title: string;
  description: string;
  feature: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  delay?: number;
}

const TiltPillarCard: React.FC<TiltCardPillarProps> = ({
  title,
  description,
  feature,
  icon: Icon,
  iconBg,
  iconColor,
  borderColor,
  delay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.2,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="h-full flex flex-col"
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`,
          transition: 'transform 0.15s ease-out',
        }}
        className={`relative h-full p-8 rounded-3xl bg-white/95 border ${borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ring-1 ring-slate-900/5 select-none`}
      >
        {/* Specular glare */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200 z-10"
          style={{
            background: `radial-gradient(circle 240px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7), transparent)`,
            opacity: glare.opacity,
          }}
        />

        <div className="relative z-0" style={{ transform: 'translateZ(14px)' }}>
          {/* 3D Floating Icon Box */}
          <div className={`w-14 h-14 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center mb-6 border shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
            <Icon className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2.5">
            {title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
            {description}
          </p>
        </div>

        <div 
          style={{ transform: 'translateZ(10px)' }}
          className="pt-4 border-t border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2 relative z-0"
        >
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feature}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const TargetClientele: React.FC<TargetClienteleProps> = ({ onNavigate }) => {
  const [selectedTier, setSelectedTier] = useState<'msme' | 'mid' | 'enterprise'>('msme');

  const tiers = {
    msme: {
      title: 'Growing MSME (20 - 99 Seats)',
      subtitle: 'Transitioning from off-the-shelf tools to proprietary infrastructure',
      painPoints: [
        'SaaS bloat and disparate software tools that do not talk to each other',
        'Manual spreadsheet reconciliations slowing down finance and fulfillment',
        'Lack of in-house enterprise architects to govern scalable tech',
      ],
      solutions: [
        'Centralized operational database and custom internal ERP portal',
        'Automated AI agent pipelines for customer support & invoice ingestion',
        'Modernized cloud infrastructure reducing redundant software seat fees by 40%',
      ],
      deliverable: 'Custom Web/Mobile Hub & Unified Automation Engine',
      timeline: '6 to 10 Weeks Deployment',
    },
    mid: {
      title: 'Mid-Market Enterprise (100 - 499 Seats)',
      subtitle: 'Modernizing legacy monoliths and unifying multi-department data',
      painPoints: [
        'Slow database queries and bottlenecked legacy monoliths',
        'High engineering turnover causing fragmented codebases',
        'Need for strict SOC2, ISO, and multi-tenant security compliance',
      ],
      solutions: [
        'Decoupled microservices architecture with event-driven message bus',
        'Autonomous internal developer platforms & automated testing CI/CD',
        'Enterprise RAG & internal knowledge intelligence across departments',
      ],
      deliverable: 'Scalable Microservices Core & Enterprise AI Gateway',
      timeline: '8 to 14 Weeks Deployment',
    },
    enterprise: {
      title: 'Large Corporate & Global (500+ Seats)',
      subtitle: 'High-concurrency digital transformation & multi-region deployment',
      painPoints: [
        'Massive technical debt in legacy mainframes or enterprise suites',
        'Complex multi-subsidiary governance and strict data residency requirements',
        'Difficulty integrating rapid generative AI without data leakage risks',
      ],
      solutions: [
        'Private sovereign AI deployments with zero data training leakage',
        'Zero-trust distributed cloud systems with automated disaster recovery',
        'Dedicated embedded enterprise engineering and 24/7 SLA escalation tier',
      ],
      deliverable: 'Mission-Critical Cloud Modernization & Private AI Infrastructure',
      timeline: 'Multi-Phase Agile Roadmap',
    },
  };

  return (
    <section id="target-clientele" className="relative py-24 lg:py-32 bg-white border-b border-slate-200 overflow-hidden">
      {/* Ambient Lighting Orbs - NO GRIDS OR DOTS */}
      <div className="absolute top-1/3 left-[-8%] w-[550px] h-[550px] bg-gradient-to-tr from-sky-100/40 via-blue-50/20 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-[500px] h-[500px] bg-gradient-to-bl from-red-100/35 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Framer Motion scroll entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold tracking-widest text-red-600 uppercase mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03. Target Clientele & Partnership Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Strictly Tailored for Multi-User Businesses & Structured Organizations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Our systems are engineered from the ground up to solve complex, team-based, and organizational-level challenges. We partner with leaders who need sustainable, long-term technical excellence.
          </p>
        </motion.div>

        {/* 3 Qualification Pillars with Framer Motion staggered entrance & 3D Tilt Physics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
          <TiltPillarCard
            title="Minimum MSME Level & Above"
            description="Established businesses with structured daily operations that have outgrown consumer software and need dependable, scalable digital infrastructure."
            feature="Multi-user operational foundation"
            icon={Building2}
            iconBg="bg-red-50"
            iconColor="text-red-600"
            borderColor="border-red-200/80 hover:border-red-400"
            delay={0}
          />

          <TiltPillarCard
            title="Enterprise & Corporate Partners"
            description="Corporations seeking robust tech consultancy, custom development, and dedicated long-term technology partnerships to drive digital supremacy."
            feature="Dedicated enterprise SLA & governance"
            icon={Landmark}
            iconBg="bg-sky-50"
            iconColor="text-sky-600"
            borderColor="border-sky-200/80 hover:border-sky-400"
            delay={0.15}
          />

          <TiltPillarCard
            title="B2B-Focused Architecture"
            description="Every line of code addresses team coordination, data compliance, cross-departmental security, and corporate workflow automation."
            feature="Zero single-user consumer distractions"
            icon={Network}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-700"
            borderColor="border-emerald-200/80 hover:border-emerald-400"
            delay={0.3}
          />
        </div>

        {/* Interactive 3D "Enterprise Fit Assessment" Module with Framer Motion scroll entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50/90 via-white to-white shadow-xl overflow-hidden p-7 sm:p-10 ring-1 ring-slate-900/5 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Interactive Organizational Alignment</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                Select Your Organization Profile
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
                Review how Taruni structures engineering deliverables according to your company size and operational complexity.
              </p>
            </div>

            {/* Segmented Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl">
              <button
                onClick={() => setSelectedTier('msme')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedTier === 'msme'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                MSME (20-99 Seats)
              </button>
              <button
                onClick={() => setSelectedTier('mid')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedTier === 'mid'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mid-Market (100-499)
              </button>
              <button
                onClick={() => setSelectedTier('enterprise')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedTier === 'enterprise'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Enterprise (500+)
              </button>
            </div>
          </div>

          {/* Dynamic Tier Specification Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-7 space-y-6"
            >
              <div>
                <span className="text-xs font-mono font-semibold text-red-700 bg-red-50 px-3 py-1 rounded-lg border border-red-100">
                  Target Profile
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-3">
                  {tiers[selectedTier].title}
                </h4>
                <p className="text-sm text-slate-600 mt-1 font-normal">
                  {tiers[selectedTier].subtitle}
                </p>
              </div>

              {/* Pain points addressed */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Typical Operational Obstacles We Solve:
                </h5>
                <ul className="space-y-2.5">
                  {tiers[selectedTier].painPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Taruni Solutions */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Taruni Engineering Interventions:
                </h5>
                <ul className="space-y-2.5">
                  {tiers[selectedTier].solutions.map((sol, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-semibold">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Summary Card with 3D styling */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-5 bg-gradient-to-br from-white to-slate-50/90 p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-5"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Engagement Snapshot
              </div>

              <div>
                <div className="text-xs text-slate-500 font-medium">Core Deliverable</div>
                <div className="text-base font-extrabold text-slate-900 mt-1">
                  {tiers[selectedTier].deliverable}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 font-medium">Typical Timeline to Production</div>
                <div className="text-lg font-mono font-bold text-red-600 mt-1">
                  {tiers[selectedTier].timeline}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Structured B2B Contract</span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                  Fixed Scope / Dedicated Team
                </span>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-red-600 rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Initiate Partnership Discussion</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
