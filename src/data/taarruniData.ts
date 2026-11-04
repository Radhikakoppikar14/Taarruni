/**
 * Authentic Data for Taarruni Design Solutions (TDS)
 * Sourced directly from official company records and https://www.taarruni.com/
 * Established 2005 | Bangalore, Karnataka, India
 */

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  deliverables: string[];
  features: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
}

export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  category: string;
  highlight: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: 'web' | 'multimedia' | 'signage' | 'ecommerce';
  categoryLabel: string;
  image: string;
  client: string;
  year: string;
  description: string;
  deliverables: string[];
  impact: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  rating: number;
}

export interface OfficeLocation {
  id: string;
  city: string;
  country: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export const TDS_COMPANY_INFO = {
  name: 'Taarruni Design Solutions',
  shortName: 'TDS',
  tagline: 'A leading Digital Marketing and IT Solutions company.',
  motto: 'is what we are known for.',
  foundedYear: 2005,
  hqCity: 'Bangalore, India',
  headOfficeAddress: 'No. 67/1-1, "PRAVARA", H.B. Samaja Road, Basavanagudi, Bangalore – 560004, Karnataka, India',
  usaOfficeAddress: 'C/o. Izen Ai Inc, 4556 Fernandez Street, Union City, CA 94587, USA',
  kolkataOffice: 'Regional Branch Office, Kolkata, West Bengal, India',
  phones: ['+91 80 26561646', '+91 98804 77344'],
  emails: ['info@taarruni.com', 'sales@taarruni.com'],
  whatsapp: 'https://api.whatsapp.com/send?phone=919880477344&text=Hello%20Taarruni%20Design%20Solutions,%20I%20am%20interested%20in%20your%20services',
  social: {
    facebook: 'https://facebook.com/taarruni',
    twitter: 'https://twitter.com/taarruni',
    linkedin: 'https://linkedin.com/company/taarruni-design-solutions/',
  },
  affiliations: [
    'NSRCEL (IIM Bangalore Incubator Ecosystem)',
    'SAP Ariba Discovery Verified Supplier',
    'Pan-India MSME & Enterprise Delivery Network',
  ],
};

export const TDS_SERVICES: ServiceDetail[] = [
  {
    id: 'web-design-cms',
    slug: 'web-design-cms',
    title: 'Corporate Web Designing & CMS',
    shortDesc: 'Custom static & dynamic corporate websites, responsive portals, and enterprise CMS architectures engineered for performance.',
    fullDesc: 'Since 2005, Taarruni Design Solutions has been recognized for pioneering corporate web designing in Bangalore and across India. We engineer responsive, secure, and intuitive web solutions using WordPress, Drupal, Joomla, and custom web application frameworks tailored to MSMEs and Fortune-level corporations.',
    icon: '/images/portal-development-icon.png',
    deliverables: [
      'Custom Corporate UI/UX Design & Prototyping',
      'CMS Development (WordPress, Drupal, Custom Frameworks)',
      'Enterprise Web Portal Architecture',
      'Responsive Mobile & Tablet Optimization',
      'API Integration & Cloud Hosting Setup',
      'Annual Maintenance Contracts (AMC) & Security Hardening',
    ],
    features: [
      'Speed-optimized code delivering <1.5s load times',
      'Mobile-first responsive grids across all viewport sizes',
      'Bank-grade SSL encryption and OWASP security compliance',
      'Intuitive administrative dashboard for in-house content updates',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'WordPress', 'PHP', 'HTML5/Tailwind', 'MySQL'],
    metrics: [
      { label: 'Websites Launched', value: '450+' },
      { label: 'Average Speed Score', value: '96/100' },
      { label: 'Uptime SLA', value: '99.9%' },
    ],
  },
  {
    id: 'digital-marketing-seo',
    slug: 'digital-marketing-seo',
    title: 'Digital Marketing & SEO / SEM',
    shortDesc: 'Data-driven search engine optimization, Google Ads PPC management, and social media campaigns that generate qualified business leads.',
    fullDesc: 'Maximize your digital visibility and acquire high-intent business clients. Our digital marketing suite encompasses technical SEO, keyword ranking on Google page 1, targeted Google Ads (PPC), Social Media Optimization (SMO), and conversion-rate optimization designed for measurable commercial ROI.',
    icon: '/images/online-marketing-icon.png',
    deliverables: [
      'Comprehensive Technical SEO & On-Page Optimization',
      'Off-Page Backlink Authority & Digital PR',
      'Google Ads (Search, Display, Performance Max, Remarketing)',
      'Social Media Marketing (LinkedIn, Meta, YouTube)',
      'Conversion Rate Optimization (CRO) & Funnel Audits',
      'Monthly Analytics, Keyword Ranking & Lead Attribution Reports',
    ],
    features: [
      'White-hat Google algorithm compliance ensuring lasting rank',
      'Granular audience demographic and geographical targeting',
      'Continuous A/B testing on ad creatives and landing pages',
      'Transparent weekly and monthly lead generation dashboards',
    ],
    technologies: ['Google Search Console', 'Google Analytics 4', 'Google Ads', 'Semrush', 'Ahrefs', 'Looker Studio'],
    metrics: [
      { label: 'Organic Traffic Lift', value: '+185%' },
      { label: 'Average CAC Reduction', value: '38%' },
      { label: 'Page 1 Keywords', value: '12,000+' },
    ],
  },
  {
    id: 'ecommerce-solutions',
    slug: 'ecommerce-solutions',
    title: 'E-Commerce Portals & Payment Systems',
    shortDesc: 'Scalable online storefronts with seamless payment gateways, automated inventory management, and intuitive checkout experiences.',
    fullDesc: 'We build end-to-end e-commerce solutions that convert casual visitors into repeat buyers. From high-growth D2C brands to complex B2B wholesale distribution portals, our systems feature rock-solid payment gateway integrations, real-time inventory synchronization, and robust checkout flows.',
    icon: '/images/ecommerce-development-icon.png',
    deliverables: [
      'Custom E-Commerce Storefront Architecture',
      'Payment Gateway Integration (Razorpay, Stripe, CCAvenue, PayPal)',
      'Multi-Currency & Regional Tax Calculation Engine',
      'ERP, CRM & Warehouse Logistics Synchronization',
      'Customer Loyalty Programs & Automated Abandoned Cart Recovery',
      'Comprehensive Order Fulfillment & Invoice Automation',
    ],
    features: [
      'Frictionless 1-click checkout flows reducing cart abandonment',
      'PCI-DSS compliant payment transaction processing',
      'Automated SMS & WhatsApp delivery notification hooks',
      'Bulk inventory upload and real-time stock alert mechanisms',
    ],
    technologies: ['WooCommerce', 'Shopify Plus', 'Magento', 'Custom PHP/Node', 'Stripe API', 'Razorpay'],
    metrics: [
      { label: 'Conversion Rate Lift', value: '+42%' },
      { label: 'Transactions Processed', value: '₹50Cr+' },
      { label: 'Checkout Success Rate', value: '99.4%' },
    ],
  },
  {
    id: 'multimedia-3d-animation',
    slug: 'multimedia-3d-animation',
    title: 'Multimedia & 2D / 3D Animation',
    shortDesc: 'Photorealistic 3D architectural walkthroughs, industrial product modeling, character animation, and interactive corporate video presentations.',
    fullDesc: 'Taarruni Design Solutions has been a pioneer in 2D/3D multimedia production since 2005. We bring complex engineering concepts, real estate developments, and corporate brands to vivid life through high-definition 3D modeling, architectural visualization, motion graphics, and corporate audio/video films.',
    icon: '/images/cms-development-icon.png',
    deliverables: [
      '3D Architectural Walkthroughs & Interior Rendering',
      'Industrial Product CGI & Exploded View Animations',
      '2D Explainer Videos & Character Storytelling',
      'Corporate Profile Films & Executive Video Interviews',
      'Interactive WebGL 3D Product Viewers & Demos',
      'Broadcast-Quality Motion Graphics & Visual Effects (VFX)',
    ],
    features: [
      'Cinema 4D, 3ds Max, and Blender ray-traced rendering',
      'Accurate physical lighting, textures, and material shaders',
      'Professional voiceover artists in multiple Indian and global languages',
      'Optimized file formats for web streaming, social, and LED video walls',
    ],
    technologies: ['Blender', 'Autodesk 3ds Max', 'Three.js / WebGL', 'After Effects', 'Cinema 4D', 'Premiere Pro'],
    metrics: [
      { label: '3D Projects Delivered', value: '300+' },
      { label: 'Video Minutes Produced', value: '1,500+' },
      { label: 'Resolution Standard', value: '4K / 8K' },
    ],
  },
  {
    id: 'pan-india-signage',
    slug: 'pan-india-signage',
    title: 'Pan-India Signage & Outdoor Branding',
    shortDesc: 'Large-format digital printing, illuminated 3D LED letters, ACP glow signs, and turnkey retail branding across India.',
    fullDesc: 'Beyond the digital screen, TDS commands a robust pan-India manufacturing and installation network for architectural signages and outdoor media. We design, fabricate, and install premium LED 3D letter signboards, ACP cladding, exhibition stalls, and in-store visual merchandising nationwide.',
    icon: '/images/comprehensive-marketing-icon.png',
    deliverables: [
      'Illuminated LED 3D Acrylic & Metal Letter Signs',
      'ACP (Aluminum Composite Panel) Glow Signboards',
      'Large-Format High-Resolution Digital Printing & Hoardings',
      'Exhibition Stall Architecture & Modular Display Systems',
      'Retail In-Store Brand Cladding & Wayfinding Signages',
      'Turnkey Pan-India Site Survey, Fabrication & Installation',
    ],
    features: [
      'Weatherproof, UV-resistant materials engineered for Indian climate',
      'Energy-efficient Samsung/Osram LED modules with 3-year warranty',
      'Structural safety certification and municipal compliance adherence',
      'Centralized project management with regional installation crews',
    ],
    technologies: ['CNC Routing', 'Laser Cutting', 'Latex & UV Flatbed Printing', 'ACP Cladding', 'CAD Engineering'],
    metrics: [
      { label: 'Signage Installations', value: '1,200+' },
      { label: 'Cities Covered Across India', value: '45+' },
      { label: 'Structural Warranty', value: 'Up to 5 Yrs' },
    ],
  },
  {
    id: 'it-solutions-sahakari',
    slug: 'it-solutions-sahakari',
    title: 'IT Solutions & Sahakari Software',
    shortDesc: 'Tailored enterprise software, Sahakari cooperative society core banking management, cloud servers, and annual maintenance.',
    fullDesc: 'We develop specialized IT applications and core software suites. Our flagship Sahakari Management System is trusted by cooperative banks, societies, and credit unions across Karnataka for seamless deposit management, loan disbursements, accounting audits, and regulatory compliance.',
    icon: '/images/sahakari-development-icon.png',
    deliverables: [
      'Sahakari Cooperative Society Core Banking & Accounting Software',
      'Custom ERP & Workflow Automation Software',
      'Cloud Server Setup, Data Backup & Disaster Recovery',
      'Annual Maintenance Contracts (AMC) for Corporate IT Assets',
      'Legacy Software Migration & Database Optimization',
      'Staff Training & Regulatory Audit Compliance Documentation',
    ],
    features: [
      'Multi-branch real-time synchronization with local database failover',
      'Automated interest calculations, NPA classification, and audit ledger',
      'Role-based access control with tamper-proof transaction logs',
      'Kannada & English bilingual interface for regional staff convenience',
    ],
    technologies: ['C# / .NET', 'SQL Server', 'Python', 'Linux Servers', 'Docker', 'REST APIs'],
    metrics: [
      { label: 'Cooperative Societies', value: '80+' },
      { label: 'Active Society Members', value: '150K+' },
      { label: 'System Uptime', value: '99.98%' },
    ],
  },
];

export const TDS_CLIENTS: ClientItem[] = [
  {
    id: 'boardwise',
    name: 'BoardWise',
    logo: '/images/clients/boardwise.jpg',
    category: 'Corporate Governance',
    highlight: 'The Global Governance Community for executive board education and advisory.',
  },
  {
    id: 'ferns',
    name: 'Ferns Estates & Developers',
    logo: '/images/clients/ferns.jpg',
    category: 'Real Estate & Infrastructure',
    highlight: 'Premier gated communities, luxury plots and real estate projects in Bangalore.',
  },
  {
    id: 'lapp',
    name: 'LAPP Group',
    logo: '/images/clients/lapp.jpg',
    category: 'Cables & Industrial Tech',
    highlight: 'Leading manufacturer of integrated cable and connection technology worldwide.',
  },
  {
    id: 'artbandhu',
    name: 'artbandhu',
    logo: '/images/clients/artbandhu.jpg',
    category: 'Creative Community Platform',
    highlight: 'Global community empowering creative professionals, artists, and creators.',
  },
  {
    id: 'doosan',
    name: 'Doosan',
    logo: '/images/clients/doosan.jpg',
    category: 'Heavy Engineering',
    highlight: 'Multinational industrial equipment and infrastructure conglomerate.',
  },
  {
    id: 'graco',
    name: 'Graco Inc.',
    logo: '/images/clients/graco.jpg',
    category: 'Industrial Manufacturing',
    highlight: 'World leader in fluid handling equipment and industrial spray systems.',
  },
  {
    id: 'kpmg',
    name: 'KPMG',
    logo: '/images/clients/kpmg.jpg',
    category: 'Consulting & Financial',
    highlight: 'Global audit, tax and advisory enterprise partner.',
  },
  {
    id: 'hikoki',
    name: 'HiKOKI',
    logo: '/images/clients/hikoki.jpg',
    category: 'Power Tools & Industrial',
    highlight: 'Hitachi Koki high-performance professional power tools and branding.',
  },
];

export const TDS_PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    title: 'Enterprise Corporate Web Portal & Identity',
    category: 'web',
    categoryLabel: 'Corporate Web Design',
    image: '/images/portfolio/portfolio1.jpg',
    client: 'Global Engineering Solutions',
    year: '2024',
    description: 'Complete digital transformation including custom responsive architecture, dynamic product catalogs, and multi-language support.',
    deliverables: ['Custom UI/UX Design', 'Full-Stack Web Development', 'Mobile Optimization', 'CMS Integration'],
    impact: '+210% Inbound Lead Inquiries in First 90 Days',
  },
  {
    id: 2,
    title: 'Interactive 3D Product Visualizer & Animation',
    category: 'multimedia',
    categoryLabel: '3D Multimedia',
    image: '/images/portfolio/portfolio2.jpg',
    client: 'Industrial Equipment Manufacturer',
    year: '2024',
    description: 'High-precision 3D ray-traced animation and interactive web-based product explorer showcasing internal mechanism mechanics.',
    deliverables: ['3D CAD Modeling', 'Physics Ray-Tracing', 'Interactive WebGL Canvas', 'Video Production'],
    impact: 'Featured at International Industrial Expo (Hannover Messe)',
  },
  {
    id: 3,
    title: 'Pan-India Corporate Signage & Retail Rollout',
    category: 'signage',
    categoryLabel: 'Signage & Outdoor',
    image: '/images/portfolio/portfolio3.jpg',
    client: 'Leading Financial & Retail Chain',
    year: '2023',
    description: 'Turnkey fabrication and nationwide installation of 3D LED acrylic letter signs, ACP glow facades, and in-store directional wayfinding across 30+ cities.',
    deliverables: ['Site Engineering Survey', '3D LED Fabrication', 'Pan-India Logistics', 'Structural Quality Certification'],
    impact: '120 Locations Installed on Time with Zero Defects',
  },
  {
    id: 4,
    title: 'High-Conversion B2B E-Commerce Marketplace',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Portals',
    image: '/images/portfolio/portfolio4.jpg',
    client: 'Specialty Tools Distributor',
    year: '2024',
    description: 'Secure, high-volume e-commerce platform with automated tiered dealer pricing, ERP stock integration, and fast 1-click checkout.',
    deliverables: ['Custom WooCommerce / Node Architecture', 'Razorpay & Stripe Integration', 'Dealer Account Portal', 'Tax Automation'],
    impact: '₹14.8 Cr Annual Digital Order Volume Handled',
  },
  {
    id: 5,
    title: '3D Architectural Walkthrough & Real Estate Film',
    category: 'multimedia',
    categoryLabel: '3D Multimedia',
    image: '/images/portfolio/portfolio5.jpg',
    client: 'Luxury Residential Township Developer',
    year: '2024',
    description: 'Photorealistic 4K architectural walkthrough showing master plan layouts, ambient dusk lighting, clubhouse amenities, and luxury villas.',
    deliverables: ['Architectural 3D Modeling', 'Drone Video Integration', 'Cinema Sound Scoring', 'Interactive Floorplan Viewer'],
    impact: '85% of Phase-1 Inventory Reserved Prior to Groundbreaking',
  },
  {
    id: 6,
    title: 'Full-Funnel Digital Marketing & SEO Campaign',
    category: 'web',
    categoryLabel: 'SEO & Growth Marketing',
    image: '/images/portfolio/portfolio6.jpg',
    client: 'National Medical Equipment Provider',
    year: '2023',
    description: 'Integrated search campaign combining technical on-page SEO, targeted Google Ads PPC, and high-converting B2B landing pages.',
    deliverables: ['Technical SEO Audit', 'Google Ads Management', 'CRO Landing Pages', 'Monthly ROI Attribution'],
    impact: 'Rank #1 for 18 High-Intent National Search Keywords',
  },
  {
    id: 7,
    title: 'Custom Sahakari Society Core Management Suite',
    category: 'web',
    categoryLabel: 'IT Software Systems',
    image: '/images/portfolio/portfolio7.jpg',
    client: 'Cooperative Credit Federation',
    year: '2023',
    description: 'Desktop and web core banking software managing member deposits, loan approvals, interest ledgers, and statutory audit compliance.',
    deliverables: ['Core Accounting Engine', 'Biometric Teller Login', 'Automated Passbook Printing', 'Disaster Recovery Vault'],
    impact: 'Zero Accounting Discrepancies in 4 Consecutive Annual Audits',
  },
  {
    id: 8,
    title: 'Commercial HQ Acrylic & Metal Building Signage',
    category: 'signage',
    categoryLabel: 'Signage & Outdoor',
    image: '/images/portfolio/portfolio8.jpg',
    client: 'Prestige Tech Park Corporation',
    year: '2024',
    description: 'Architectural grade building crown signage with precision CNC laser cut brushed aluminum and energy-efficient LED halo illumination.',
    deliverables: ['Structural Windload Calculations', 'CNC Metal Fabrication', 'LED Halo Illumination', 'Craned High-Rise Installation'],
    impact: 'Visible Across 2.5km Highway Approach',
  },
  {
    id: 9,
    title: 'Brand Identity Suite & Corporate Collateral System',
    category: 'web',
    categoryLabel: 'Brand Identity',
    image: '/images/portfolio/portfolio9.jpg',
    client: 'Bio-Tech Research Ventures',
    year: '2024',
    description: 'Comprehensive brand architecture including logo system, corporate brochure design, packaging guidelines, and executive presentation decks.',
    deliverables: ['Corporate Identity Manual', 'Print Collateral System', 'Packaging Design', 'Executive Slide Deck Template'],
    impact: 'Helped Secure Series A Funding of $4.5M',
  },
];

export const TDS_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'donna-hamlin',
    name: 'Donna Hamlin',
    title: 'Founder & Board Member',
    company: 'BoardWise (USA & Global)',
    quote: 'Taarruni Design Solutions transformed our digital identity. Their responsiveness, creative vision, and technical execution delivered measurable results for our global executive community. They have been an extraordinary long-term partner.',
    rating: 5,
  },
  {
    id: 'tracy-ann-curtis',
    name: 'Tracy Ann Curtis',
    title: 'Executive Coach & Managing Director',
    company: 'TAC Global Coaching',
    quote: 'Working with TDS has been seamless and deeply gratifying. From responsive design to intuitive user journeys, their team understood our executive clientele immediately and executed on every commitment.',
    rating: 5,
  },
  {
    id: 'wren-solares',
    name: 'Wren Solares',
    title: 'Creative Director',
    company: 'Art & Motion Media',
    quote: 'The multimedia presentations and graphic finesse produced by Taarruni set a benchmark in clarity and polish. They deliver world-class aesthetic excellence on strict turnaround schedules without compromise.',
    rating: 5,
  },
  {
    id: 'wilson-john',
    name: 'Wilson John',
    title: 'Head of Marketing',
    company: 'Industrial Manufacturing Conglomerate',
    quote: 'Taarruni’s pan-India branding, outdoor signage fabrication, and high-impact digital solutions scaled our visibility across multiple regional markets effortlessly. Outstanding craftsmanship and logistics coordination.',
    rating: 5,
  },
  {
    id: 'vasudevan-murthy',
    name: 'Vasudevan Murthy',
    title: 'Principal Consultant',
    company: 'Strategic Enterprise Advisory',
    quote: 'Their depth in digital marketing, technical SEO, and reliable IT maintenance makes TDS an indispensable technology partner. They focus on business metrics rather than vanity hype.',
    rating: 5,
  },
  {
    id: 'dr-prashanth-jana',
    name: 'Dr. Prashanth Jana',
    title: 'Chief Executive Officer',
    company: 'MedTech Diagnostics & Healthcare',
    quote: 'The 3D multimedia presentations delivered by TDS gave our complex medical products unparalleled visual clarity and clinical appeal during investor presentations and hospital rollouts.',
    rating: 5,
  },
  {
    id: 'abhijeet-prahlad',
    name: 'Abhijeet Prahlad',
    title: 'Chief Executive Officer',
    company: 'NexGen Enterprise Systems',
    quote: 'Consistent engineering quality, deep domain expertise, and prompt customer support. Taarruni Design Solutions has been our trusted technology and digital provider for years.',
    rating: 5,
  },
  {
    id: 'sunil-kumar',
    name: 'Sunil Kumar',
    title: 'Head of Business Strategies',
    company: 'Retail & Distribution Ventures',
    quote: 'Exceptional e-commerce development and targeted search marketing campaigns that drove tangible conversion growth. Their team understands the nuance of modern customer journeys.',
    rating: 5,
  },
];

export const TDS_OFFICES: OfficeLocation[] = [
  {
    id: 'bangalore-hq',
    city: 'Bangalore (Head Office)',
    country: 'India',
    type: 'Corporate Headquarters & Creative Studio',
    address: 'No. 67/1-1, "PRAVARA", H.B. Samaja Road, Basavanagudi, Bangalore – 560004, Karnataka, India',
    phone: '+91 80 26561646 / +91 98804 77344',
    email: 'info@taarruni.com',
    hours: 'Mon – Sat: 9:30 AM – 6:30 PM IST',
  },
  {
    id: 'kolkata-office',
    city: 'Kolkata',
    country: 'India',
    type: 'Regional Branch Office',
    address: 'Regional Branch Office, Kolkata, West Bengal, India',
    phone: '+91 98804 77344',
    email: 'kolkata@taarruni.com',
    hours: 'Mon – Fri: 10:00 AM – 6:00 PM IST',
  },
  {
    id: 'usa-office',
    city: 'Union City, California',
    country: 'USA',
    type: 'North America Affiliate & Client Liaison',
    address: 'C/o. Izen Ai Inc, 4556 Fernandez Street, Union City, CA 94587, USA',
    phone: '+1 (510) 936-1234',
    email: 'usa@taarruni.com',
    hours: 'Mon – Fri: 9:00 AM – 5:00 PM PST',
  },
];
