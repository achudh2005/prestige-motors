import React from 'react';
import { Vehicle } from '@/types';
import { ShieldCheck, FileCheck, Check, ExternalLink, Award, MapPin, Phone, Mail } from 'lucide-react';

interface ConditionChecklistProps {
  vehicle: Vehicle;
}

export const ConditionChecklist: React.FC<ConditionChecklistProps> = ({ vehicle }) => {
  const checklistItems = [
    { name: 'Structural Integrity & Frame Gauge Audit', passed: true },
    { name: 'Ceramic Composite / Steel Brake Rotor Spec Tolerance', passed: true },
    { name: 'Engine ECU Telemetry & Overrev Timestamp Check', passed: true },
    { name: 'Dual-Clutch / Transmission Pressure Calibration', passed: true },
    { name: 'Paint Depth Ultrasonic Micro-Gauge Verification', passed: true },
    { name: 'Interior Leather Condition & Hydration Treatment', passed: true },
    { name: 'Active Aerodynamics & Wing Deployment Test', passed: true },
    { name: 'Complete Factory Recall & Service Campaign Audit', passed: true }
  ];

  return (
    <div className="space-y-6">
      {/* 150-Point Inspection Box */}
      <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide font-serif">
              Prestige 150-Point Certified Inspection
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            Passed All Standards
          </span>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          This motorcar underwent our rigorous seven-day certification protocol. All critical operating systems, suspension geometry, and cosmetic surfaces meet or exceed factory concours requirements.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5" />
              </span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* History Report Link */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <FileCheck className="w-4 h-4 text-amber-500" />
            <span>Independent Vehicle History Report Verified (Clean Title, No Accidents)</span>
          </div>
          <a
            href={vehicle.historyReportUrl || 'https://carfax.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
          >
            <span>View CARFAX® History Report</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Authorized Dealership Info Box */}
      <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Presenting Dealership
        </h4>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              {vehicle.locationName || 'Prestige Beverly Hills Flagship'}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>9640 Wilshire Blvd, Beverly Hills, CA 90212</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+13105558900"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>(310) 555-8900</span>
            </a>
            <a
              href="mailto:concierge@prestigeluxurymotors.com"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>Email Showroom</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
