import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Tag, Percent, Calendar } from 'lucide-react';

export const CurrentOffers: React.FC = () => {
  const offers = [
    {
      title: 'Bespoke Lease Incentive',
      subtitle: '2024 Aston Martin DB12 & Bentley Continental GT',
      rate: '3.99% APR',
      terms: '36-Month Closed-End Lease with Tier 1 Credit Approval',
      validUntil: 'End of Month',
      actionLink: '/financing'
    },
    {
      title: 'Certified Pre-Owned Rate Advantage',
      subtitle: 'All 2022-2024 Porsche 911 & Ferrari Models',
      rate: '4.49% APR',
      terms: 'Up to 60 Months with Complimentary 2-Year Extended CPO Warranty',
      validUntil: 'Limited Allocation',
      actionLink: '/inventory?condition=cpo'
    },
    {
      title: 'Exotic Trade-In Bonus',
      subtitle: 'Luxury & Supercar Trade-Ins',
      rate: '$10,000 Over Black Book',
      terms: 'Applicable towards any current in-stock showroom vehicle acquisition',
      validUntil: 'Active Campaign',
      actionLink: '/trade-in'
    }
  ];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-[#0c0e14] border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            Limited Opportunities
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Curated Monthly Incentives
          </h2>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Take advantage of exclusive dealership programs and competitive structuring on premier motorcars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800/80 hover:border-amber-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2 rounded bg-amber-500/10 text-amber-500">
                    <Tag className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {offer.validUntil}
                  </span>
                </div>

                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mb-2">
                  {offer.rate}
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {offer.title}
                </h3>

                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                  {offer.subtitle}
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {offer.terms}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                <Link href={offer.actionLink} className="block w-full">
                  <Button variant="outline" size="sm" fullWidth className="group">
                    <span>Inquire About Program</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
