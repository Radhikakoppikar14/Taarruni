import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Send 
} from 'lucide-react';
import { TDS_SERVICES } from '../data/taarruniData';

interface ProjectEstimatorProps {
  onRequestQuoteWithScope: (scopeSummary: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  onRequestQuoteWithScope,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'web-design-cms',
    'digital-marketing-seo',
  ]);
  const [projectScale, setProjectScale] = useState<'startup' | 'growing' | 'enterprise'>('growing');
  const [timeline, setTimeline] = useState<'urgent' | 'standard' | 'phased'>('standard');
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const scaleMultiplier = {
    startup: 1,
    growing: 1.8,
    enterprise: 3.2,
  };

  const timelineLabel = {
    urgent: 'Accelerated (2–4 Weeks)',
    standard: 'Standard (1–2 Months)',
    phased: 'Enterprise Phased (3–6 Months)',
  };

  const estimatedWeeks = {
    urgent: '2–4 Weeks',
    standard: '4–8 Weeks',
    phased: '12–24 Weeks',
  }[timeline];

  const handleApplyEstimate = () => {
    const serviceTitles = selectedServices
      .map((id) => TDS_SERVICES.find((s) => s.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const summary = `Estimated Scope: Services: [${serviceTitles}], Scale: ${projectScale.toUpperCase()}, Timeline: ${timelineLabel[timeline]}`;
    onRequestQuoteWithScope(summary);
  };

  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
            Interactive Project Builder & Scope Estimator
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance mb-3">
            Plan Your Project Requirements in 60 Seconds
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Select your desired capabilities and corporate deployment scale to view recommended deliverables, team composition, and estimated turnaround schedule.
          </p>
        </div>

        {/* Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (8 cols) */}
          <div className="lg:col-span-8 space-y-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            
            {/* Step 1: Select Capabilities */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                1. Select Services Required ({selectedServices.length} Selected)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {TDS_SERVICES.map((service) => {
                  const isChecked = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                        isChecked
                          ? 'border-red-600 bg-red-50/50 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <img
                          src={service.icon}
                          alt=""
                          className="w-6 h-6 object-contain"
                        />
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                            isChecked
                              ? 'bg-red-600 border-red-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        {service.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Deployment Scale */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                2. Enterprise Scale / Scope Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'startup', title: 'MSME & Growth Venture', desc: 'Single location, rapid launch, core marketing' },
                  { id: 'growing', title: 'Established Corporate', desc: 'Multi-branch, dynamic portal, omnichannel' },
                  { id: 'enterprise', title: 'Pan-India Enterprise', desc: 'High-availability, nationwide signage rollout' },
                ].map((scale) => {
                  const isSelected = projectScale === scale.id;
                  return (
                    <button
                      key={scale.id}
                      type="button"
                      onClick={() => setProjectScale(scale.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-900'
                      }`}
                    >
                      <div className="text-xs font-bold mb-1">{scale.title}</div>
                      <div className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {scale.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timeline Expectations */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                3. Desired Turnaround Schedule
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'urgent', label: '2–4 Weeks', sub: 'Dedicated priority squad' },
                  { id: 'standard', label: '4–8 Weeks', sub: 'Standard sprint cadence' },
                  { id: 'phased', label: '12+ Weeks', sub: 'Multi-phase milestones' },
                ].map((time) => {
                  const isSelected = timeline === time.id;
                  return (
                    <button
                      key={time.id}
                      type="button"
                      onClick={() => setTimeline(time.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'border-red-600 bg-red-50 text-red-900'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold">{time.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{time.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Scope Summary Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4 text-red-600" />
              <span>Project Blueprint</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Scope Synthesis & Squad
            </h3>

            <div className="space-y-4 py-4 border-y border-slate-100 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Selected Disciplines</span>
                <span className="font-bold text-slate-900">{selectedServices.length} Core Areas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Target Delivery Window</span>
                <span className="font-bold text-slate-900">{estimatedWeeks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Dedicated TDS Team</span>
                <span className="font-bold text-slate-900">
                  {selectedServices.length >= 3 ? '4–6 Specialists' : '2–3 Specialists'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Technical SLA / AMC</span>
                <span className="font-bold text-slate-900">Included (1 Year)</span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="text-[11px] text-slate-500 leading-normal">
                Includes dedicated Project Lead, daily progress tracking, staging previews, and official TDS quality sign-off.
              </div>

              <button
                type="button"
                onClick={handleApplyEstimate}
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Quotation for This Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
