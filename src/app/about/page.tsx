import React from 'react';
import { Award, ShieldCheck, Truck, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const milestones = [
    { year: '2012', title: 'Founding in Beverly Hills', desc: 'Established as an exclusive private vehicle acquisition service catering to prominent collector families.' },
    { year: '2016', title: '150-Point CPO Standard Introduced', desc: 'Formalized our proprietary certification protocol exceeding factory warranty standards.' },
    { year: '2019', title: 'Manhattan & Miami Expansion', desc: 'Opened flagship galleries on Park Avenue and Miami Waterfront to support East Coast clients.' },
    { year: '2024', title: 'National Enclosed Logistics Fleet', desc: 'Equipped our custom-built climate-controlled transport division with nationwide 48-hour delivery.' }
  ];

  const leadership = [
    { name: 'Harrison Sterling', role: 'Founder & Chief Curator', bio: 'Former factory endurance racing driver and respected classic Ferrari historian.' },
    { name: 'Dr. Vivienne Leclair', role: 'Managing Director, Private Clients', bio: 'Over 18 years curating off-market hypercar collections for international family offices.' },
    { name: 'Marcus Lindholm', role: 'Director of Master Technical Certification', bio: 'Master Porsche Motorsport & AMG Certified Diagnostic Specialist.' }
  ];

  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Prestige Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Curating Automotive Mastery
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Prestige Luxury Motorcars was founded upon a singular imperative: to provide the world’s most refined exotic and hyper-luxury motorcars with uncompromising transparency, artisanal certification, and discretion.
          </p>
        </div>

        {/* Narrative & Showroom Photo Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-serif uppercase tracking-tight">
              A Legacy of Discretion & Passion
            </h3>
            <p>
              We view motorcars not as commoditized machinery, but as kinetic sculpture and pinnacle mechanical achievements. Every Porsche GT, Ferrari V8, Bentley W12, or Rolls-Royce Ghost presented in our salons is hand-selected.
            </p>
            <p>
              Our acquisitions team travels internationally to authenticate provenance, verify ECU electronic over-rev telemetry, and ensure full historical documentation before any vehicle is inducted into our private inventory.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <div className="p-4 rounded-lg bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800">
                <div className="text-2xl font-black text-amber-500 font-mono">1,800+</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider">Acquisitions Completed</div>
              </div>
              <div className="p-4 rounded-lg bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800">
                <div className="text-2xl font-black text-amber-500 font-mono">99.4%</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider">Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85"
              alt="Prestige Motorcars Atelier"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Timeline Milestones */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 uppercase font-serif">
              Our Journey
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <div key={i} className="p-6 rounded-lg bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-2xl font-mono font-black text-amber-500">{m.year}</span>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{m.title}</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 uppercase font-serif">
              Executive Directors
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((leader, i) => (
              <div key={i} className="p-6 rounded-lg bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="font-bold text-base text-zinc-900 dark:text-zinc-100">{leader.name}</div>
                <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider">{leader.role}</div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-2">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-xl bg-zinc-900 text-white text-center space-y-4 border border-zinc-800">
          <h3 className="text-2xl sm:text-3xl font-black font-serif uppercase">
            Experience the Collection in Person
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Arrange a private viewing at any of our three galleries, or request enclosed transport of any vehicle directly to your location.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link href="/inventory">
              <Button variant="gold" size="md">
                Browse Available Inventory
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="md" className="border-zinc-700 text-zinc-200">
                Contact Concierge
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
