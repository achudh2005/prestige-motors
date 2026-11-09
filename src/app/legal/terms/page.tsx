import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif">
          Terms of Service & Dealership Conditions
        </h1>
        <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-4 leading-relaxed">
          <p>
            By accessing Prestige Luxury Motorcars web services, you agree to comply with our digital use conditions, inventory reservation policies, and vehicle inquiry protocols.
          </p>
          <p>
            All listed vehicle prices exclude state sales taxes, license registration fees, dealer documentary charges, and bespoke enclosed transport fees unless explicitly stated in a signed formal purchase agreement.
          </p>
        </div>
      </div>
    </div>
  );
}
