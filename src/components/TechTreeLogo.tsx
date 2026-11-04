import React from 'react';

interface TaarruniLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'icon-only';
  height?: number | string;
}

export const TaarruniLogo: React.FC<TaarruniLogoProps> = ({ 
  className = '', 
  variant = 'light',
  height = 42
}) => {
  if (variant === 'icon-only') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        {/* Soft continuous pulse glow behind emblem */}
        <div className="absolute inset-0 rounded-full bg-red-400/30 blur-md animate-pulse pointer-events-none" />
        <div 
          className="relative rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm ring-2 ring-red-100"
          style={{ width: height, height: height }}
        >
          <img 
            src="/assets/aistudio/image_043816a7.png" 
            alt="Taarruni emblem"
            className="w-[280%] max-w-none object-cover -translate-x-[2%]"
            style={{ objectPosition: 'left center' }}
            loading="eager"
          />
        </div>
      </div>
    );
  }

  if (variant === 'dark') {
    return (
      <div className={`relative inline-flex items-center group shrink-0 ${className}`}>
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500/20 via-sky-400/20 to-purple-500/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
        <div className="relative inline-flex items-center px-3.5 py-1.5 rounded-xl bg-white shadow-sm ring-1 ring-white/20">
          <img 
            src="/assets/aistudio/image_043816a7.png" 
            alt="Taarruni Design Solutions & Technologies" 
            style={{ height: typeof height === 'number' ? `${height}px` : height }}
            className="w-auto object-contain block"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center group shrink-0 ${className}`}>
      {/* Continuous soft pulse glow effect */}
      <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-red-500/10 via-sky-400/10 to-purple-400/10 blur-md opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <img 
        src="/assets/aistudio/image_043816a7.png" 
        alt="Taarruni Design Solutions & Technologies" 
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        className="relative w-auto object-contain block select-none drop-shadow-xs"
        loading="eager"
      />
    </div>
  );
};

// Backwards compatibility alias
export const TechTreeLogo = TaarruniLogo;
