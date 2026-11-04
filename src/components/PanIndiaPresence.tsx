import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { TDS_OFFICES, TDS_COMPANY_INFO } from '../data/taarruniData';

export const PanIndiaPresence: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
            Pan-India & Global Infrastructure
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance mb-3">
            Headquartered in Bangalore with Strategic Regional Execution
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our central Bangalore development studio and regional crews coordinate complex digital campaigns, web platforms, and large-format outdoor signage deployments across 45+ cities nationwide.
          </p>
        </div>

        {/* 3 Offices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {TDS_OFFICES.map((office) => (
            <motion.div
              key={office.id}
              whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 30px -10px rgba(0,0,0,0.08)' }}
              className="p-6 sm:p-7 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-slate-300 flex flex-col justify-between transition-all cursor-pointer shadow-2xs"
            >
              <div>
                <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  {office.type}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {office.city}
                </h3>
                
                <div className="space-y-3 text-xs text-slate-600 mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-800">{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-800">{office.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <a
                  href={`mailto:${office.email}`}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                >
                  <span>Connect with this Office</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Official Affiliations & Direct WhatsApp Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Delivery Network</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight">
              Have an Urgent Project Requirement or RFP?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect directly with our senior solutions architect via WhatsApp or call our Basavanagudi office directly for immediate consultation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={TDS_COMPANY_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Connect</span>
            </a>
            <a
              href={`tel:${TDS_COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 80 26561646</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
