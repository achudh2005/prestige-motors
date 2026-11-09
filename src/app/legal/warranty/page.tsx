import React from 'react';

export default function WarrantyPage() {
  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif">
            Certified Pre-Owned Warranty Coverage
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Prestige Certified Standard</p>
        </div>

        <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-4 leading-relaxed">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">1. 150-Point Inspection Warranty</h3>
          <p>
            Every Certified Pre-Owned (CPO) vehicle includes our comprehensive 24-Month / 24,000-Mile Limited Powertrain and Mechanical Warranty. Coverage begins upon the expiration of any remaining factory new vehicle limited warranty or from date of delivery.
          </p>

          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">2. Covered Components</h3>
          <p>
            Engine internal components, turbochargers/superchargers, dual-clutch transmission assemblies, electronic differentials, transfer cases, and factory active suspension systems.
          </p>

          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">3. 24/7 Roadside Assistance & Concierge Towing</h3>
          <p>
            Includes unlimited flatbed enclosed towing to the nearest authorized marque dealership anywhere in North America.
          </p>
        </div>
      </div>
    </div>
  );
}
