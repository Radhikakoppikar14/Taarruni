import React, { useState } from 'react';
import { Layers, Cpu, Server, Database, Shield, CheckCircle2, ArrowRight, Box, Compass, Sparkles } from 'lucide-react';
import { ArchitectureR3FCanvas } from './ArchitectureR3FCanvas';

interface ArchitectureViewerProps {
  onNavigate: (sectionId: string) => void;
}

export const ArchitectureViewer: React.FC<ArchitectureViewerProps> = ({ onNavigate }) => {
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'3d-isometric' | 'technical-specs'>('3d-isometric');

  const layers = [
    {
      id: 0,
      title: '01. Client Experience & Edge Layer',
      badge: 'Edge & Frontend',
      icon: Layers,
      color: 'sky',
      layerElevation: 120,
      glowColor: 'rgba(14, 165, 233, 0.4)',
      accentBorder: 'border-sky-300',
      activeGradient: 'from-sky-500/15 via-white to-sky-100/30',
      technologies: ['React 19', 'TypeScript', 'Next.js / Vite', 'React Native', 'Cloudflare Workers', 'WebGL / Three.js'],
      description: 'Ultra-low latency client interfaces delivered globally via Anycast CDN with sub-second First Contentful Paint. Incorporates edge caching, secure WebSocket listeners, and responsive design systems tailored for corporate workstations and mobile operations.',
      metrics: [
        { label: 'Edge Latency', value: '<15ms' },
        { label: 'Lighthouse Score', value: '98/100' },
        { label: 'Client Asset Cache Hit', value: '99.4%' },
      ],
      protocols: ['HTTP/3 with QUIC', 'TLS 1.3 Strict', 'CSP Level 3', 'WAF DDOS Mitigation'],
    },
    {
      id: 1,
      title: '02. Enterprise AI & Agentic Orchestration',
      badge: 'Cognitive Computing',
      icon: Cpu,
      color: 'blue',
      layerElevation: 80,
      glowColor: 'rgba(37, 99, 235, 0.4)',
      accentBorder: 'border-blue-400',
      activeGradient: 'from-blue-500/15 via-white to-blue-100/30',
      technologies: ['PyTorch', 'LangChain / LangGraph', 'Vector DBs (Pinecone/Qdrant)', 'Custom RAG Pipelines', 'Automated Code Gen Engines'],
      description: 'Intelligent AI layer executing autonomous coding pipelines, private corporate LLM inference, dynamic knowledge retrieval, and automated decision flows with enterprise privacy isolation (zero training on client confidential data).',
      metrics: [
        { label: 'RAG Retrieval Latency', value: '110ms' },
        { label: 'Automated QA Coverage', value: '94%' },
        { label: 'Data Leakage Protection', value: '100% Guaranteed' },
      ],
      protocols: ['Private VPC Enclave', 'Role-Based Model Access', 'Automated Semantic Guardrails', 'Audit Event Streaming'],
    },
    {
      id: 2,
      title: '03. Microservices & Event Stream Core',
      badge: 'Distributed Backend',
      icon: Server,
      color: 'indigo',
      layerElevation: 40,
      glowColor: 'rgba(99, 102, 241, 0.4)',
      accentBorder: 'border-indigo-400',
      activeGradient: 'from-indigo-500/15 via-white to-indigo-100/30',
      technologies: ['Go', 'Node.js', 'Apache Kafka', 'gRPC', 'Docker / Kubernetes', 'Redis Distributed Cache'],
      description: 'Fault-tolerant, decoupled event-driven backend services capable of handling tens of thousands of simultaneous enterprise operations. Features automated horizontal pod autoscaling, rate-limiting, and resilient retry queues.',
      metrics: [
        { label: 'P99 Microservice Latency', value: '28ms' },
        { label: 'Throughput Peak', value: '85,000 req/s' },
        { label: 'Fault-Tolerant Failover', value: '<2.5s' },
      ],
      protocols: ['gRPC Inter-service Mesh', 'mTLS Internal Encryption', 'Distributed Tracing (OpenTelemetry)', 'Circuit Breakers'],
    },
    {
      id: 3,
      title: '04. Multi-Tenant Persistence & Security Vault',
      badge: 'Data & Compliance',
      icon: Database,
      color: 'emerald',
      layerElevation: 0,
      glowColor: 'rgba(16, 185, 129, 0.4)',
      accentBorder: 'border-emerald-400',
      activeGradient: 'from-emerald-500/15 via-white to-emerald-100/30',
      technologies: ['PostgreSQL', 'TimescaleDB', 'Redis Sentinel', 'HashiCorp Vault', 'Automated Daily Snapshots'],
      description: 'Enterprise persistence tier engineered with tenant-isolated database schemas, transparent data encryption at rest (AES-256), continuous WAL backups, and immutable transaction audit logs for corporate regulatory compliance.',
      metrics: [
        { label: 'Query Read P95', value: '6ms' },
        { label: 'RPO (Recovery Point)', value: '<1 min' },
        { label: 'RTO (Recovery Time)', value: '<5 mins' },
      ],
      protocols: ['AES-256 Encryption at Rest', 'Strict Multi-Tenant Schema Separation', 'SOC2 Type II Aligned', 'Continuous Backup Replication'],
    },
  ];

  return (
    <section id="expertise" className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-200">
      {/* Rich Ambient Color Lighting - NO GRIDS OR DOTS */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[600px] h-[600px] bg-gradient-to-tr from-sky-100/40 via-red-50/20 to-transparent rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold tracking-widest text-red-600 uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04. Technical Expertise & Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
              Enterprise Architecture, AI Integration & Full-Stack Scalability
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              We engineer mission-critical systems that empower MSMEs and enterprises to pitch, operate, and scale at the highest corporate tiers with bulletproof reliability.
            </p>
          </div>

          {/* 3D Mode Toggle */}
          <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm self-start md:self-auto">
            <button
              onClick={() => setViewMode('3d-isometric')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === '3d-isometric'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Isometric Stack</span>
            </button>
            <button
              onClick={() => setViewMode('technical-specs')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'technical-specs'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Technical Specs</span>
            </button>
          </div>
        </div>

        {/* 3D Isometric Exploded View Mode using React Three Fiber Canvas */}
        {viewMode === '3d-isometric' && (
          <div className="mb-12">
            <ArchitectureR3FCanvas
              activeLayer={activeLayer}
              onSelectLayer={(id) => setActiveLayer(id)}
            />
          </div>
        )}

        {/* Interactive Architecture Stack Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stack Layers Navigator */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
              Select Architecture Layer
            </div>

            {layers.map((layer) => {
              const Icon = layer.icon;
              const isSelected = activeLayer === layer.id;

              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-white border-red-500 shadow-md ring-2 ring-red-500/10'
                      : 'bg-white/80 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors shadow-xs ${
                      isSelected 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-500">{layer.badge}</div>
                      <div className="text-sm font-bold text-slate-900">{layer.title}</div>
                    </div>
                  </div>

                  <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-red-600 ring-4 ring-red-100' : 'bg-transparent'}`} />
                </button>
              );
            })}

            {/* Architecture Consultation Prompt */}
            <div className="p-6 mt-6 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1.5">
                Custom Blueprint Delivery
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Need an end-to-end architectural assessment for your corporate migration or MSME workflow overhaul?
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>Request Architecture Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Active Layer Deep Dive & Metrics */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 shadow-xl ring-1 ring-slate-900/5 transition-all duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-red-700 bg-red-50 px-3 py-1 rounded-md border border-red-100">
                  {layers[activeLayer].badge} Layer
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2.5">
                  {layers[activeLayer].title}
                </h3>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-700 leading-relaxed font-normal">
              {layers[activeLayer].description}
            </p>

            {/* Benchmarks / Metrics Grid */}
            <div className="mt-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Architectural Metrics & SLAs
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {layers[activeLayer].metrics.map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                    <div className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocols & Hardening */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Security & Hardening Standards
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {layers[activeLayer].protocols.map((protocol, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{protocol}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stacks */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Production-Grade Technologies Deployed
              </h4>
              <div className="flex flex-wrap gap-2">
                {layers[activeLayer].technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-mono font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
