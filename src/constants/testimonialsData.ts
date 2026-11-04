/**
 * Authentic Testimonials from taarruni.com "Words of Appreciation"
 * Verbatim quotes, titles, and company affiliations
 */

export interface TDSTestimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  rating: number;
  featured: boolean;
  colorScheme: 'sky' | 'lavender' | 'mint' | 'peach' | 'cream';
}

export const TDS_TESTIMONIALS: TDSTestimonial[] = [
  {
    id: 'donna-hamlin',
    name: 'Donna Hamlin',
    title: 'Founder & CEO',
    company: 'Hamlin Harkins, USA',
    quote: 'I am a perpetual client of Taarruni Design Solutions. TDS designed and managed two websites for my companies. The work was creative, practical, and well-supported with helpful suggestions whenever we required modifications.',
    rating: 5,
    featured: true,
    colorScheme: 'sky',
  },
  {
    id: 'tracy-ann-curtis',
    name: 'Tracy Ann Curtis',
    title: 'Executive Coach & Leadership Advisor',
    company: 'TAC Global Leadership',
    quote: 'Taarruni and Vasant balance strong technical qualifications with high emotional intelligence. They successfully translate complex technical concepts for both technical and non-technical stakeholders, ensuring project clarity and seamless delivery.',
    rating: 5,
    featured: true,
    colorScheme: 'lavender',
  },
  {
    id: 'wren-solares',
    name: 'Wren Solares',
    title: 'Creative Director',
    company: 'Solares Brand Design',
    quote: 'An excellent website design company with a reliable, problem-solving team that communicates clear, concise actions to deliver project requirements on time and within budget.',
    rating: 5,
    featured: true,
    colorScheme: 'mint',
  },
  {
    id: 'vasudevan-murthy',
    name: 'Vasudevan Murthy',
    title: 'Principal Consultant',
    company: 'Strategic Governance Group',
    quote: 'Vasanth Yaji and the Taarruni team work with a constant smile, maintaining a calm, thoughtful posture and delivering complete, well-designed solutions for complex organizational needs.',
    rating: 5,
    featured: true,
    colorScheme: 'peach',
  },
  {
    id: 'wilson-john',
    name: 'Wilson John',
    title: 'Head Marketing',
    company: 'Industrial Manufacturing Conglomerate',
    quote: 'A highly professional, creative, cooperative, and time-bound organization. Their digital design and web applications exceeded our expectations.',
    rating: 5,
    featured: false,
    colorScheme: 'cream',
  },
  {
    id: 'abhijeet-prahlad',
    name: 'Abhijeet Prahlad',
    title: 'Chief Executive Officer',
    company: 'Enterprise Technology Labs',
    quote: 'We have had a long-term, great, and friendly experience working with Taarruni’s design and development teams. Reliable support and top-class output.',
    rating: 5,
    featured: false,
    colorScheme: 'sky',
  },
  {
    id: 'sunil-kumar',
    name: 'Sunil Kumar',
    title: 'Head Business Strategies',
    company: 'Commercial Growth Ventures',
    quote: 'Exceptional digital marketing and SEO services that delivered measurable ranking growth and consistent inbound customer inquiries across South India.',
    rating: 5,
    featured: false,
    colorScheme: 'lavender',
  },
  {
    id: 'prashanth-jana',
    name: 'Dr. Prashanth Jana',
    title: 'Chief Executive Officer',
    company: 'Healthcare Diagnostics & Hospital Group',
    quote: 'Top-notch service and unparalleled customer satisfaction from a truly professional IT and multimedia organization.',
    rating: 5,
    featured: false,
    colorScheme: 'mint',
  },
];
