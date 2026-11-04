import React from 'react';
import { motion } from 'framer-motion';
import { TDS_CLIENTS } from '../data/taarruniData';

interface ClientMarqueeProps {
  className?: string;
  onViewAll?: () => void;
}

export const ClientMarquee: React.FC<ClientMarqueeProps> = ({
  className = '',
  onViewAll,
}) => {
  return (
    <section className={`py-10 bg-white border-y border-slate-200/80 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Logo Grid showing strictly the 8 authentic brands from taarruni.com */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5 items-center justify-center">
          {TDS_CLIENTS.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.15 } }}
              className="group relative flex items-center justify-center p-3 h-18 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-slate-300 transition-all duration-200 hover:shadow-xs cursor-pointer"
              title={`${client.name} — ${client.category}`}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-9 max-w-[110px] w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200 opacity-85 group-hover:opacity-100"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-label')) {
                    const label = document.createElement('span');
                    label.className = 'fallback-label text-xs font-bold text-slate-700 tracking-tight text-center';
                    label.innerText = client.name;
                    parent.appendChild(label);
                  }
                }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
