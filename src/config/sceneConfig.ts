/**
 * Configuration for Taarruni Design Solutions (TDS) 3D WebGL Universe
 * Defines spatial coordinates, camera vectors, color tokens, and particle systems
 */

export interface SceneCoordinate {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  label: string;
}

export const SCENE_CONFIG = {
  colors: {
    base: '#F8FAFC',
    white: '#FFFFFF',
    sky: '#E0F2FE',
    lavender: '#EDE9FE',
    mint: '#ECFDF5',
    cream: '#FEF3C7',
    peach: '#FFE4D6',
    text: '#0F172A',
    textMuted: '#64748B',
    brandRed: '#DC2626',
    brandRedGlow: 'rgba(220, 38, 38, 0.4)',
    accentGradient: 'from-indigo-600 to-cyan-500',
    cardGlass: 'rgba(255, 255, 255, 0.82)',
    cardBorder: 'rgba(226, 232, 240, 0.9)',
    billboardNeon: '#38BDF8',
  },

  camera: {
    defaultFov: 45,
    lerpSpeed: 0.045,
    mouseParallaxFactor: { x: 0.6, y: 0.35 },
  },

  particles: {
    count: 380,
    size: 0.035,
    spreadRadius: 85,
    colors: ['#38BDF8', '#818CF8', '#F43F5E', '#10B981', '#F59E0B', '#C084FC'],
  },

  // 3D Spatial coordinates for each page scene
  scenes: {
    home: {
      position: [0, 1.4, 7.8],
      target: [0, 0, 0],
      fov: 44,
      label: 'Studio Plaza',
    },
    about: {
      position: [26, 2.2, 8.5],
      target: [26, 0.2, 0],
      fov: 45,
      label: 'Time Machine (2005 - Present)',
    },
    services: {
      position: [52, 2.0, 9.2],
      target: [52, 0, 0],
      fov: 46,
      label: 'Solutions Architecture Hub',
    },
    'services/digital-marketing': {
      position: [52, -12, 8.5],
      target: [52, -12, 0],
      fov: 44,
      label: 'Digital & Online Marketing (SEO/SEM)',
    },
    'services/offline-marketing': {
      position: [52, 14, 8.5],
      target: [52, 14, 0],
      fov: 44,
      label: 'Traditional & Offline Marketing',
    },
    'services/signage-branding': {
      position: [74, 2.2, 9.5],
      target: [74, 0.2, 0],
      fov: 45,
      label: 'All India Branding & Signages',
    },
    'services/cms-development': {
      position: [52, 28, 8.5],
      target: [52, 28, 0],
      fov: 44,
      label: 'CMS Development (Modular Blocks)',
    },
    'services/ecommerce-development': {
      position: [74, 28, 8.8],
      target: [74, 28, 0],
      fov: 45,
      label: 'E-Commerce Infrastructure',
    },
    'services/architectural-civil': {
      position: [74, -12, 8.5],
      target: [74, -12, 0],
      fov: 44,
      label: 'Architectural & Civil 2D/3D Renders',
    },
    marketingsolutions: {
      position: [38, -6, 8.2],
      target: [38, -6, 0],
      fov: 45,
      label: 'Marketing Solutions Overview',
    },
    itsolutions: {
      position: [38, 6, 8.2],
      target: [38, 6, 0],
      fov: 45,
      label: 'IT Solutions Overview',
    },
    portfolio: {
      position: [-26, 2.0, 8.5],
      target: [-26, 0, 0],
      fov: 45,
      label: 'Gallery Pavilion (9 Portfolios)',
    },
    clients: {
      position: [0, 26, 9.8],
      target: [0, 26, 0],
      fov: 48,
      label: 'Curved Client Colosseum',
    },
    testimonials: {
      position: [26, 26, 8.8],
      target: [26, 26, 0],
      fov: 45,
      label: 'Words of Appreciation Chamber',
    },
    process: {
      position: [-26, 26, 8.8],
      target: [-26, 26, 0],
      fov: 45,
      label: '5-Stage Engineering Pathway',
    },
    careers: {
      position: [0, -26, 8.5],
      target: [0, -26, 0],
      fov: 45,
      label: 'TDS Bangalore HQ Careers Lab',
    },
    contact: {
      position: [26, -26, 9.2],
      target: [26, -26, 0],
      fov: 45,
      label: 'Global Teleport Hub (Bangalore & USA)',
    },
    'request-quote': {
      position: [26, -26, 9.2],
      target: [26, -26, 0],
      fov: 45,
      label: 'Request Quote / Project Calculator',
    },
    blog: {
      position: [-26, -26, 8.5],
      target: [-26, -26, 0],
      fov: 45,
      label: 'Knowledge Orbit & Articles',
    },
    privacy: {
      position: [-52, 0, 8.2],
      target: [-52, 0, 0],
      fov: 44,
      label: 'Enterprise Privacy & Governance',
    },
    // SEO Landing Pages
    'web-design-company-bangalore': {
      position: [0, 1.4, 7.8],
      target: [0, 0, 0],
      fov: 44,
      label: 'Web Design Company Bangalore',
    },
    'seo-services-bangalore': {
      position: [52, -12, 8.5],
      target: [52, -12, 0],
      fov: 44,
      label: 'SEO Services Bangalore',
    },
    'cms-development-bangalore': {
      position: [52, 28, 8.5],
      target: [52, 28, 0],
      fov: 44,
      label: 'CMS Development Bangalore',
    },
    'los-angeles-seo-company': {
      position: [26, -26, 9.2],
      target: [26, -26, 0],
      fov: 45,
      label: 'Los Angeles SEO Company',
    },
    'los-angeles-digital-marketing-company': {
      position: [26, -26, 9.2],
      target: [26, -26, 0],
      fov: 45,
      label: 'Los Angeles Digital Marketing Company',
    },
  } as Record<string, SceneCoordinate>,
};
