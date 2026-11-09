'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/lib/mock-data/vehicles';
import { VehicleCard } from '@/components/inventory/vehicle-card';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = MOCK_VEHICLES.slice(0, 6);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? featured.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= featured.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-zinc-50 dark:bg-[#0c0e14] border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Private Collection</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
              Featured Luxury Vehicles
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Link
              href="/inventory"
              className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 flex items-center gap-1 group"
            >
              <span>Explore All {MOCK_VEHICLES.length} Motorcars</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-amber-500 hover:text-amber-500 text-zinc-700 dark:text-zinc-300 transition-colors"
                aria-label="Previous vehicles"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-amber-500 hover:text-amber-500 text-zinc-700 dark:text-zinc-300 transition-colors"
                aria-label="Next vehicles"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.slice(currentIndex, currentIndex + 3).map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};
