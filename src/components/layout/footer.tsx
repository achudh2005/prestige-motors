'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_LOCATIONS } from '@/lib/mock-data/locations';
import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-zinc-800/80">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-zinc-950 font-bold shadow-md shadow-amber-600/20">
                <Sparkles className="w-4 h-4 text-zinc-950" />
              </div>
              <span className="text-lg font-black tracking-widest text-white uppercase font-serif">
                PRESTIGE
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Curating the world&apos;s most coveted high-performance, exotic, and ultra-luxury motorcars. Offering bespoke private client acquisitions, certified pre-owned excellence, and nationwide enclosed delivery.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Luxury Dealership &bull; 150-Point Standard</span>
            </div>
          </div>

          {/* Showroom Locations & Hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100">
              Galleries & Showrooms
            </h4>
            <div className="space-y-4">
              {MOCK_LOCATIONS.map((loc) => (
                <div key={loc.id} className="text-xs space-y-1">
                  <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{loc.name}</span>
                  </div>
                  <p className="text-zinc-400 pl-5">{loc.address}, {loc.city}</p>
                  <p className="text-zinc-400 pl-5 font-mono">{loc.phone}</p>
                  <p className="text-zinc-500 pl-5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{loc.hours.mon_fri}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links & Tools */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100">
              Inventory & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/inventory" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Browse Current Inventory</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Vehicle Comparison Matrix</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </Link>
              </li>
              <li>
                <Link href="/financing" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Bespoke Financial Calculator</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </Link>
              </li>
              <li>
                <Link href="/trade-in" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Trade-In Valuation Appraisal</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </Link>
              </li>
              <li>
                <Link href="/test-drive" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Book VIP Test Drive</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>The Prestige Journal</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100">
              Private Allocation Alert
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Receive confidential notifications when rare allocations, off-market exotics, and limited editions arrive in our collection.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to private allocations.'); }} className="space-y-2">
              <input
                type="email"
                placeholder="Enter private email"
                required
                className="w-full px-3.5 py-2.5 rounded-sm bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-sm bg-amber-600 hover:bg-amber-500 text-zinc-950 font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                Request Allocation Access
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Prestige Luxury Motorcars LLC. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/legal/financing-terms" className="hover:text-zinc-300 transition-colors">
              Financing Terms
            </Link>
            <Link href="/legal/warranty" className="hover:text-zinc-300 transition-colors">
              Warranty & CPO
            </Link>
            <Link href="/legal/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal/accessibility" className="hover:text-zinc-300 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
