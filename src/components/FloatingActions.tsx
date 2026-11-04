import React from 'react';
import { MessageCircle, FileText, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onNavigate: (route: string) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onNavigate }) => {
  const whatsappUrl =
    'https://api.whatsapp.com/send?phone=919880477344&text=Yes%20I%20am%20Interested';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-600 hover:text-slate-900 shadow-md flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Sticky Request Quote CTA Button */}
      <button
        onClick={() => {
          onNavigate('request-quote');
          scrollToTop();
        }}
        className="px-4 py-2.5 rounded-full bg-slate-900 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>Request Quote</span>
      </button>

      {/* Official WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group cursor-pointer"
        aria-label="Chat on WhatsApp"
        title="Chat with Taarruni Design Solutions on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
