import React from 'react';
import { Wrench, Phone } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="py-24 bg-zinc-950 text-white min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center mx-auto">
          <Wrench className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-black font-serif uppercase tracking-tight">
          System Maintenance
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          The Prestige Private Client Portal is currently undergoing scheduled infrastructure upgrades. Our showroom concierge remains reachable directly by phone.
        </p>

        <div className="pt-2">
          <a
            href="tel:+13105558900"
            className="inline-flex items-center gap-2 px-5 py-3 rounded bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Concierge: (310) 555-8900</span>
          </a>
        </div>
      </div>
    </div>
  );
}
