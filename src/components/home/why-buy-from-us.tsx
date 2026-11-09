import React from 'react';
import { ShieldCheck, Truck, Award, Headphones, FileText, CheckCircle2 } from 'lucide-react';

export const WhyBuyFromUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '150-Point CPO Certification',
      desc: 'Every pre-owned vehicle undergoes rigorous mechanical, structural, and cosmetic inspection by marque-certified master technicians.'
    },
    {
      icon: Truck,
      title: 'Nationwide Enclosed Delivery',
      desc: 'White-glove climate-controlled transport straight to your residence or private collection facility anywhere in North America.'
    },
    {
      icon: Award,
      title: 'Comprehensive Warranty',
      desc: 'Full powertrain, electrical, and bespoke mechanical protection warranties standard on all certified acquisitions.'
    },
    {
      icon: Headphones,
      title: 'Bespoke Concierge Care',
      desc: 'Dedicated private client managers offering personalized vehicle sourcing, title handling, and VIP registration services.'
    },
    {
      icon: FileText,
      title: 'Transparent Telemetry & History',
      desc: 'Clean titles, zero damage history verification, verified ECU mileage telemetry, and authentic service logbooks provided.'
    },
    {
      icon: CheckCircle2,
      title: 'Flexible Acquisition Structuring',
      desc: 'Discreet lease structuring, competitive balloon financing, cryptocurrency settlement options, and luxury trade-in appraisals.'
    }
  ];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-[#0c0e14] border-y border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            The Prestige Standard
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Why Discerning Clients Choose Us
          </h2>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Beyond selling motorcars, we cultivate lifelong client relationships grounded in integrity, discretion, and unmatched automotive expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-lg bg-white dark:bg-[#11131c] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-amber-500/40 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-5 border border-amber-500/20">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
