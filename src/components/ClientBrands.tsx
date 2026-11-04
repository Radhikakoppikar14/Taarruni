import React from 'react';

interface ClientBrandsProps {
  className?: string;
}

export const ClientBrands: React.FC<ClientBrandsProps> = ({ className = '' }) => {
  return (
    <div className={`relative rounded-3xl bg-white border border-slate-200/90 shadow-sm p-4 sm:p-6 overflow-hidden ${className}`}>
      {/* Slider Track with Red Indicator Dot matching reference image */}
      <div className="w-full flex items-center justify-center mb-4 sm:mb-5 relative">
        <div className="w-full max-w-md h-[2.5px] bg-slate-200/80 rounded-full relative flex items-center justify-center">
          <div className="absolute w-3 h-3 bg-red-600 rounded-full shadow-xs ring-4 ring-red-100 transition-transform duration-300 hover:scale-125" />
        </div>
      </div>

      {/* Brands Flex Row */}
      <div className="flex items-center justify-between gap-6 sm:gap-8 overflow-x-auto py-2 px-1 scrollbar-none select-none">
        
        {/* Brand 1: BOARD WISE */}
        <div className="shrink-0 flex flex-col items-center justify-center text-center px-2 py-1 hover:scale-105 transition-transform duration-200 group cursor-default">
          <div className="font-serif font-black tracking-widest text-[#154734] text-sm sm:text-base leading-none">
            BOARD
          </div>
          <div className="font-serif font-black tracking-[0.25em] text-[#a85d38] text-xs sm:text-sm leading-none mt-0.5">
            WISE
          </div>
          <div className="text-[6.5px] sm:text-[7px] font-sans font-bold tracking-widest text-[#154734] mt-1 uppercase whitespace-nowrap opacity-90 group-hover:opacity-100">
            The Global Governance Community
          </div>
        </div>

        {/* Brand 2: Ferns */}
        <div className="shrink-0 flex flex-col items-start justify-center px-2 py-1 hover:scale-105 transition-transform duration-200 group cursor-default">
          <div className="font-serif font-bold text-[#14478f] text-lg sm:text-xl leading-none flex items-start">
            <span>Ferns</span>
            <span className="text-[9px] align-super font-sans font-bold ml-0.5">®</span>
          </div>
          <div className="text-[7px] sm:text-[8px] font-sans font-bold tracking-wider text-[#14478f] mt-0.5 uppercase whitespace-nowrap">
            Estates & Developers
          </div>
        </div>

        {/* Brand 3: LAPP */}
        <div className="shrink-0 flex items-center gap-1.5 px-2 py-1 hover:scale-105 transition-transform duration-200 group cursor-default">
          <svg viewBox="0 0 36 36" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="currentColor">
            <circle cx="18" cy="18" r="17" fill="#1e293b" />
            <circle cx="18" cy="7.5" r="2.8" fill="#ff6a00" />
            <circle cx="27" cy="12.5" r="2.8" fill="#ff6a00" />
            <circle cx="27" cy="23.5" r="2.8" fill="#ff6a00" />
            <circle cx="18" cy="28.5" r="2.8" fill="#ff6a00" />
            <circle cx="9" cy="23.5" r="2.8" fill="#ff6a00" />
            <circle cx="9" cy="12.5" r="2.8" fill="#ff6a00" />
            <circle cx="18" cy="18" r="4" fill="#ffffff" />
          </svg>
          <span className="font-black tracking-tight text-[#ff6a00] text-lg sm:text-xl font-sans">
            LAPP
          </span>
        </div>

        {/* Brand 4: artbandhu */}
        <div className="shrink-0 flex items-center gap-1.5 px-2 py-1 hover:scale-105 transition-transform duration-200 group cursor-default">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#f49342] flex items-center justify-center text-white text-[9px] sm:text-[10px] font-black shrink-0 shadow-2xs">
            ab
          </div>
          <span className="font-semibold text-[#f49342] text-sm sm:text-base tracking-tight font-sans">
            artbandhu
          </span>
        </div>

        {/* Brand 5: DOOSAN */}
        <div className="shrink-0 relative inline-flex items-center px-2 py-1 hover:scale-105 transition-transform duration-200 group cursor-default">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-5 sm:w-6 h-6 sm:h-7 bg-[#004785] transform -skew-x-12 -mr-1 rounded-xs" />
            <div className="w-6 sm:w-7 h-6 sm:h-7 bg-[#009fd9] transform -skew-x-12 -mr-1 rounded-xs" />
            <div className="w-5 sm:w-6 h-6 sm:h-7 bg-[#00aa89] transform -skew-x-12 rounded-xs" />
          </div>
          <span className="relative z-10 font-black italic text-white text-xs sm:text-sm tracking-wider px-1 font-sans">
            DOOSAN
          </span>
        </div>

        {/* Brand 6: GRACO */}
        <div className="shrink-0 flex items-center gap-1.5 px-2 py-1 hover:scale-105 transition-transform duration-200 group cursor-default">
          <svg viewBox="0 0 36 36" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none">
            <polygon points="18,2 32,10 32,26 18,34 4,26 4,10" fill="#0f172a" />
            <polygon points="18,7 27,12 27,24 18,29 9,24 9,12" fill="#ffffff" />
            <path d="M18 10 L24 14 L24 22 L18 26 L12 22 L12 14 Z" fill="#005696" />
            <polygon points="18,14 21,16 21,20 18,22 15,20 15,16" fill="#ffffff" />
          </svg>
          <div className="font-black tracking-wider text-slate-900 text-xs sm:text-sm font-sans flex items-start">
            <span>GRACO</span>
            <span className="text-[7px] ml-0.5">®</span>
          </div>
        </div>

        {/* Brand 7: KPMG */}
        <div className="shrink-0 flex items-center gap-1.5 px-2 py-1 hover:scale-105 transition-transform duration-200 group cursor-default">
          <div className="flex gap-[1.5px]">
            <div className="w-2 sm:w-2.5 h-3.5 sm:h-4 border border-[#00338d] bg-sky-50/50" />
            <div className="w-2 sm:w-2.5 h-3.5 sm:h-4 border border-[#00338d] bg-sky-50/50" />
            <div className="w-2 sm:w-2.5 h-3.5 sm:h-4 border border-[#00338d] bg-sky-50/50" />
            <div className="w-2 sm:w-2.5 h-3.5 sm:h-4 border border-[#00338d] bg-sky-50/50" />
          </div>
          <span className="font-serif font-black italic text-[#00338d] text-base sm:text-lg tracking-tight">
            KPMG
          </span>
        </div>

        {/* Brand 8: HiKOKI */}
        <div className="shrink-0 flex flex-col items-start justify-center px-2 py-1 hover:scale-105 transition-transform duration-200 group cursor-default">
          <div className="font-black italic text-[#007b3b] text-sm sm:text-base leading-none tracking-tight font-sans">
            HiKOKI
          </div>
          <div className="text-[6px] sm:text-[7px] font-sans font-black italic tracking-widest text-[#007b3b] uppercase mt-0.5 whitespace-nowrap">
            UNLEASH THE NEXT
          </div>
        </div>

        {/* Reference Divider Line as seen in screenshot */}
        <div className="h-9 w-[1.5px] bg-slate-300 mx-1 hidden md:block shrink-0" />
      </div>
    </div>
  );
};
