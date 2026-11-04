import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (route: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]/90 backdrop-blur-sm relative z-10 pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-red-600 transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-red-600 font-bold">Privacy Policy & Terms</span>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Enterprise Governance</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
              Privacy Policy & Client Data Protection
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Last Updated: January 2025 · Taarruni Design Solutions (TDS), Bangalore
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Commitment to Organizational Confidentiality</h2>
              <p>
                Taarruni Design Solutions (TDS) recognizes that client data, intellectual property, server credentials, and digital assets represent critical commercial value. We operate under strict mutual Non-Disclosure Agreements (NDAs) for all client engagements, ensuring complete isolation of project source code, database architectures, and commercial metadata.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. Scope of Collected Information</h2>
              <p>
                When inquiring through taarruni.com, we collect only corporate contact information required to assess technical scope: corporate email addresses, phone numbers, organization names, and project briefs. We do not sell, rent, or lease corporate customer lists to third-party marketing entities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Infrastructure Security & Cloud Governance</h2>
              <p>
                All web portals, CMS platforms, and custom software systems developed by TDS adhere to OWASP Top-10 security guidelines, zero-trust network policies, SSL 256-bit encryption in transit, and role-based authorization controls (RBAC) to prevent unauthorized privilege escalation or data leakage.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">4. Contacting the Compliance Officer</h2>
              <p>
                For questions regarding security audits, data retention, or compliance certifications, please contact our administrative office at:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1">
                <strong>Taarruni Design Solutions — Compliance Department</strong><br />
                "PRAVARA", No. 67/1-1, H.B. Samaja Road, Basavanagudi, Bangalore – 560004, Karnataka, India<br />
                Email: info@taarruni.com · Phone: +91 80 26561646
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
