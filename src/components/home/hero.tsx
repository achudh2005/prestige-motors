'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Shield, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-45 scale-105 transition-transform duration-10000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2400&q=90')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#090a0f]/50 to-[#090a0f]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-20">
        {/* Subtle Luxury Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Curated Supercars &bull; Certified Pre-Owned</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase font-serif mb-6 leading-tight sm:leading-none">
          Automotive Perfection, <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
            Without Compromise.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-lg text-zinc-300 font-light leading-relaxed mb-8">
          Welcome to Prestige Motorcars. Representing the pinnacle of automotive engineering, bespoke craftsmanship, and white-glove concierge acquisition for the discerning connoisseur.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/inventory" className="w-full sm:w-auto">
            <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-2xl shadow-amber-600/30 group">
              <span>View Available Inventory</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/test-drive" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-zinc-700 text-zinc-100 hover:bg-zinc-800/80 backdrop-blur-md">
              <Calendar className="w-4 h-4 mr-2 text-amber-400" />
              <span>Schedule VIP Test Drive</span>
            </Button>
          </Link>
        </div>

        {/* Quick Highlights Telemetry */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto border-t border-zinc-800/80 mt-12 text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">150+</div>
            <div className="text-[11px] uppercase tracking-wider text-zinc-400">Point Inspection</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
            <div className="text-[11px] uppercase tracking-wider text-zinc-400">Enclosed Delivery</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">$40M+</div>
            <div className="text-[11px] uppercase tracking-wider text-zinc-400">Inventory Handled</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">24/7</div>
            <div className="text-[11px] uppercase tracking-wider text-zinc-400">VIP Concierge</div>
          </div>
        </div>
      </div>
    </div>
  );
};
