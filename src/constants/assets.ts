/**
 * Centralized asset constants for Taruni Technologies
 * Sourced directly from official reference: https://www.taarruni.com/
 */

export interface ServiceAsset {
  id: string;
  title: string;
  category: string;
  colorScheme: 'sky' | 'mint' | 'lavender';
  iconUrl: string;
  secondaryIconUrl: string;
  sourceUrl: string;
  description: string;
  architectureDetails: string[];
  deliverables: string[];
  techStack: string[];
  kpis: { label: string; value: string }[];
}

export interface ClientAsset {
  name: string;
  logoUrl: string;
  sourceUrl: string;
  tier: 'Enterprise' | 'Corporate Partner' | 'Global Institution';
}

export interface PortfolioAsset {
  id: number;
  title: string;
  category: string;
  type: 'portal' | 'software' | 'cloud' | 'transformation';
  imageUrl: string;
  sourceUrl: string;
  description: string;
  tags: string[];
  aspectRatio: string;
}

export interface EcosystemAsset {
  techTreeInfographic: {
    url: string;
    sourceUrl: string;
    title: string;
    alt: string;
  };
  nsrcelPartner: {
    url: string;
    sourceUrl: string;
    title: string;
    alt: string;
  };
  clients: ClientAsset[];
}

/**
 * Service card image assets sourced from taarruni.com
 */
export const SERVICE_ASSETS: ServiceAsset[] = [
  {
    id: 'ai-enterprise',
    title: 'AI-Powered Enterprise Solutions',
    category: 'Intelligent Automation',
    colorScheme: 'sky',
    iconUrl: '/images/portal-development-icon.png',
    secondaryIconUrl: '/images/secure-it-development-icon.png',
    sourceUrl: 'https://www.taarruni.com/images/portal-development-icon.png',
    description: 'Integrating advanced machine learning, automated coding workflows, and intelligent data pipelines to optimize business efficiency, eliminate manual operational debt, and drive actionable decision intelligence across departments.',
    architectureDetails: [
      'Enterprise RAG & Domain Knowledge Graph Integration',
      'Autonomous Multi-Agent Task Orchestration & Guardrails',
      'Automated CI/CD Coding Workflows & Test Generation',
      'Streaming ETL Data Pipelines with Real-time Anomaly Detection',
    ],
    deliverables: [
      'Proprietary AI Pipeline Microservice',
      'Departmental Knowledge Retrieval Engine',
      'Continuous Automated Workflow Triggers',
      'Enterprise Model Governance & SOC2 Security Scrim',
    ],
    techStack: ['Python', 'LangChain', 'FastAPI', 'PyTorch', 'Vector DBs (Qdrant/Pinecone)', 'Docker', 'Kubernetes'],
    kpis: [
      { label: 'Manual Task Reduction', value: '74%' },
      { label: 'Data Processing Latency', value: '<250ms' },
      { label: 'Pipeline Reliability SLA', value: '99.95%' },
    ],
  },
  {
    id: 'custom-software',
    title: 'Custom Software & App Development',
    category: 'Engineering & Scaling',
    colorScheme: 'mint',
    iconUrl: '/images/custom-it-development-icon.png',
    secondaryIconUrl: '/images/ecommerce-development-icon.png',
    sourceUrl: 'https://www.taarruni.com/images/custom-it-development-icon.png',
    description: 'Scalable web and mobile applications engineered for high-performance enterprise needs. Built with clean architecture, fault-tolerant state orchestration, and robust multi-tenant systems designed for continuous scale.',
    architectureDetails: [
      'Microservices & Event-Driven Architecture (Kafka / RabbitMQ)',
      'Cross-Platform High-Performance Mobile Apps (React Native / Native iOS & Android)',
      'High-Throughput Distributed Cloud Backends',
      'Zero-Trust Identity, RBAC & Comprehensive Audit Logging',
    ],
    deliverables: [
      'Production Cloud-Native Web Applications',
      'Enterprise iOS & Android Mobile Ecosystems',
      'Decoupled REST & GraphQL Gateway APIs',
      'Comprehensive Automated Test Suite (>85% Coverage)',
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'AWS/GCP Cloud', 'Tailwind CSS'],
    kpis: [
      { label: 'Concurrent Users', value: '50,000+' },
      { label: 'API P99 Latency', value: '42ms' },
      { label: 'Availability Guarantee', value: '99.99%' },
    ],
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation & Consulting',
    category: 'Enterprise Strategy',
    colorScheme: 'lavender',
    iconUrl: '/images/comprehensive-marketing-icon.png',
    secondaryIconUrl: '/images/sahakari-development-icon.png',
    sourceUrl: 'https://www.taarruni.com/images/comprehensive-marketing-icon.png',
    description: 'Strategic technology roadmapping specifically designed for minimum MSME levels up to mid-sized corporate frameworks. We help established organizations audit legacy systems, deprecate manual bottlenecks, and migrate into modern digital architectures.',
    architectureDetails: [
      'Legacy Monolith to Cloud-Native Modernization Roadmaps',
      'Enterprise Data Lakehouse & Centralized Business Intelligence',
      'Operational Workflow Automation & ERP/CRM Synchronizers',
      'DevOps Maturity, Infrastructure as Code (Terraform) & Cloud Cost Optimization',
    ],
    deliverables: [
      'Comprehensive 3-Year Enterprise Technology Roadmap',
      'Legacy Migration Execution & Zero-Downtime Cutover Plan',
      'Unified Data Pipeline & Executive Dashboard Suite',
      'Full Engineering Team Upskilling & Handover Documentation',
    ],
    techStack: ['Terraform', 'Kubernetes', 'Snowflake', 'dbt', 'Datadog', 'GitHub Actions', 'PostgreSQL'],
    kpis: [
      { label: 'Operational Cost Reduction', value: '38%' },
      { label: 'Deployment Frequency', value: '14x faster' },
      { label: 'System Recovery Time', value: '<5 mins' },
    ],
  },
];

/**
 * Ecosystem assets including tech tree architecture infographic & client partner logos
 */
export const ECOSYSTEM_ASSETS: EcosystemAsset = {
  techTreeInfographic: {
    url: '/images/taarruni-infographic1.jpg',
    sourceUrl: 'https://www.taarruni.com/images/taarruni-infographic1.jpg',
    title: 'Taarruni Digital Transformation Blueprint',
    alt: 'Official Taarruni Digital Ecosystem Architecture Infographic showing Web Development, Hosting, Marketing, and Enterprise Portals',
  },
  nsrcelPartner: {
    url: '/images/nsrcel1.jpg',
    sourceUrl: 'https://www.taarruni.com/images/nsrcel1.jpg',
    title: 'IIM Bangalore NSRCEL Incubation Ecosystem',
    alt: 'NSRCEL IIM Bangalore Startup & Enterprise Incubation Partner',
  },
  clients: [
    {
      name: 'Dell Technologies',
      logoUrl: '/images/clients/dell.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/dell.jpg',
      tier: 'Enterprise',
    },
    {
      name: 'KPMG',
      logoUrl: '/images/clients/kpmg.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/kpmg.jpg',
      tier: 'Global Institution',
    },
    {
      name: 'Havells',
      logoUrl: '/images/clients/havells.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/havells.jpg',
      tier: 'Enterprise',
    },
    {
      name: 'Henkel',
      logoUrl: '/images/clients/henkel.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/henkel.jpg',
      tier: 'Global Institution',
    },
    {
      name: 'MetLife',
      logoUrl: '/images/clients/metlife.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/metlife.jpg',
      tier: 'Enterprise',
    },
    {
      name: 'Doosan',
      logoUrl: '/images/clients/doosan.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/doosan.jpg',
      tier: 'Corporate Partner',
    },
    {
      name: 'Indian Bank',
      logoUrl: '/images/clients/indian-bank.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/indian-bank.jpg',
      tier: 'Global Institution',
    },
    {
      name: 'Graco',
      logoUrl: '/images/clients/graco.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/graco.jpg',
      tier: 'Enterprise',
    },
    {
      name: 'HiKOKI',
      logoUrl: '/images/clients/hikoki.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/hikoki.jpg',
      tier: 'Corporate Partner',
    },
    {
      name: 'Lapp Group',
      logoUrl: '/images/clients/lapp.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/lapp.jpg',
      tier: 'Corporate Partner',
    },
    {
      name: 'Kern-Liebers',
      logoUrl: '/images/clients/kern-liebers.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/kern-liebers.jpg',
      tier: 'Corporate Partner',
    },
    {
      name: 'GVK',
      logoUrl: '/images/clients/gvk.jpg',
      sourceUrl: 'https://www.taarruni.com/images/clients/gvk.jpg',
      tier: 'Enterprise',
    },
  ],
};

/**
 * Portfolio project screenshot assets sourced from taarruni.com
 */
export const PORTFOLIO_ASSETS: PortfolioAsset[] = [
  {
    id: 1,
    title: 'Maangalya Enterprise Property Portal',
    category: 'Enterprise Real Estate Platform',
    type: 'portal',
    imageUrl: '/images/portfolio/portfolio1.jpg',
    sourceUrl: 'https://www.taarruni.com/images/portfolio/portfolio1.jpg',
    description: 'Comprehensive high-concurrency property showcase and multi-tier CRM backend designed for structured real estate operations with virtual floorplan views.',
    tags: ['Multi-User CRM', 'Property Engine', 'Cloud Hosted'],
    aspectRatio: '4/3',
  },
  {
    id: 2,
    title: 'Corporate Manufacturing & Supply Suite',
    category: 'Industrial B2B Portal',
    type: 'software',
    imageUrl: '/images/portfolio/portfolio2.jpg',
    sourceUrl: 'https://www.taarruni.com/images/portfolio/portfolio2.jpg',
    description: 'Industrial supply chain tracking portal integrating automated inventory pipelines, partner ordering workflows, and ERP synchronization.',
    tags: ['ERP Sync', 'Supply Chain', 'B2B Workflow'],
    aspectRatio: '4/3',
  },
  {
    id: 3,
    title: 'FinTech & Banking Infrastructure Hub',
    category: 'Secure Enterprise Web Platform',
    type: 'cloud',
    imageUrl: '/images/portfolio/portfolio3.jpg',
    sourceUrl: 'https://www.taarruni.com/images/portfolio/portfolio3.jpg',
    description: 'Multi-tenant financial services web architecture with strict security validation, role-based authorization, and real-time transaction processing.',
    tags: ['FinTech', 'Zero-Trust', 'High Concurrency'],
    aspectRatio: '4/3',
  },
  {
    id: 4,
    title: 'Healthcare & Pharma Enterprise Portal',
    category: 'Life Sciences Cloud System',
    type: 'portal',
    imageUrl: '/images/portfolio/portfolio4.jpg',
    sourceUrl: 'https://www.taarruni.com/images/portfolio/portfolio4.jpg',
    description: 'Centralized document retrieval and compliance management system built for pharmaceutical distribution and regulatory compliance.',
    tags: ['Compliance', 'Knowledge Base', 'HIPAA Aligned'],
    aspectRatio: '4/3',
  },
  {
    id: 5,
    title: 'B2B E-Commerce & Dealer Network',
    category: 'Scalable Commerce Engine',
    type: 'software',
    imageUrl: '/images/portfolio/portfolio5.jpg',
    sourceUrl: 'https://www.taarruni.com/images/portfolio/portfolio5.jpg',
    description: 'Wholesale dealer portal with multi-tiered pricing, bulk purchase order reconciliation, and automated invoicing pipelines.',
    tags: ['B2B E-Commerce', 'Automated Invoicing', 'REST APIs'],
    aspectRatio: '4/3',
  },
  {
    id: 6,
    title: 'Corporate Global Mobility Platform',
    category: 'Digital Transformation',
    type: 'cloud',
    imageUrl: '/images/portfolio/portfolio6.jpg',
    sourceUrl: 'https://www.taarruni.com/images/portfolio/portfolio6.jpg',
    description: 'End-to-end digital transformation for international logistics and mobility operations featuring automated scheduling algorithms.',
    tags: ['Automated Dispatch', 'Analytics Dashboard', 'AWS Cloud'],
    aspectRatio: '4/3',
  },
  {
    id: 7,
    title: 'Operations ERP & Logistics Orchestration',
    category: 'Enterprise Resource Planning',
    type: 'software',
    imageUrl: '/images/portfolio/portfolio7.jpg',
    sourceUrl: 'https://www.taarruni.com/images/portfolio/portfolio7.jpg',
    description: 'Unified multi-warehouse management and fleet dispatch ecosystem engineered with real-time barcode tracking, live inventory reconciliation, and automated invoicing.',
    tags: ['Multi-Warehouse', 'Fleet Logistics', 'Automated Invoicing'],
    aspectRatio: '4/3',
  },
  {
    id: 8,
    title: 'Industrial Telemetry & Smart Energy Hub',
    category: 'IoT & Telemetry Infrastructure',
    type: 'cloud',
    imageUrl: '/images/portfolio/portfolio8.jpg',
    sourceUrl: 'https://www.taarruni.com/images/portfolio/portfolio8.jpg',
    description: 'High-frequency telemetry ingestion architecture streaming live sensor data from industrial machinery with sub-second latency and predictive maintenance alerts.',
    tags: ['IoT Streaming', 'Predictive Alerts', 'Time-Series DB'],
    aspectRatio: '4/3',
  },
  {
    id: 9,
    title: 'Enterprise EdTech & Corporate Academy',
    category: 'Learning Management System',
    type: 'portal',
    imageUrl: '/images/portfolio/portfolio9.jpg',
    sourceUrl: 'https://www.taarruni.com/images/portfolio/portfolio9.jpg',
    description: 'Enterprise training platform with interactive module assessments, role-based cohort management, SCORM compliance, and automated certification pipelines.',
    tags: ['Interactive LMS', 'Cohort Management', 'Certification Engine'],
    aspectRatio: '4/3',
  },
];
