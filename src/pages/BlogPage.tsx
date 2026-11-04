import React from 'react';
import { ExternalLink, Calendar, User, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (route: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const blogPosts = [
    {
      id: 'ai-enterprise-transformation',
      title: 'How AI Microservices Are Reshaping Enterprise Workflows in 2025',
      excerpt: 'Discover why traditional monoliths are migrating to autonomous task pipelines, vector embeddings, and zero-trust data retrieval.',
      date: 'January 18, 2025',
      author: 'TDS Engineering Team',
      category: 'Enterprise Tech',
      externalUrl: 'https://taarruni.blogspot.com',
    },
    {
      id: 'seo-sem-strategies-bangalore',
      title: 'Dominating B2B Search Engine Optimization in High-Competition Verticals',
      excerpt: 'A technical breakdown of entity SEO, Core Web Vitals, and intent-driven architecture that propelled our enterprise clients to top-tier Google rankings.',
      date: 'December 12, 2024',
      author: 'Digital Marketing Strategist',
      category: 'SEO & SEM',
      externalUrl: 'https://taarruni.blogspot.com',
    },
    {
      id: 'pan-india-signage-execution',
      title: 'Engineering Architectural Grade LED & SS Signages for National Retails',
      excerpt: 'The logistics, material science, and on-site engineering requirements for executing high-durability signboards across all Indian metros.',
      date: 'November 28, 2024',
      author: 'Signage Operations Lead',
      category: 'All India Branding',
      externalUrl: 'https://taarruni.blogspot.com',
    },
    {
      id: 'modern-cms-headless-vs-wordpress',
      title: 'Headless CMS vs Traditional CMS: Which Scalability Path Fits Your MSME?',
      excerpt: 'Evaluating API-first content systems versus custom WordPress solutions for corporate communications and publishing efficiency.',
      date: 'October 15, 2024',
      author: 'Lead Web Architect',
      category: 'CMS Architecture',
      externalUrl: 'https://taarruni.blogspot.com',
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
          <span className="text-red-600 font-bold">Blog & Technical Insights</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>TDS Knowledge Orbit</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Industry Perspectives, <span className="text-red-600">Architecture</span> & Case Studies
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Read technical whitepapers, marketing benchmarks, and engineering articles published by Taarruni Design Solutions. 
            Also explore our official publication portal on Blogspot.
          </p>

          <a
            href="https://taarruni.blogspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Visit Official Blogspot Archive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white/95 rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-red-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  <span className="text-red-600">{post.category}</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.author}</span>
                </div>
                <a
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
