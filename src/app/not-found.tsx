import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/lib/mock-data/vehicles';
import { VehicleCard } from '@/components/inventory/vehicle-card';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const popularVehicles = MOCK_VEHICLES.slice(0, 3);

  return (
    <div className="py-16 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Error Hero */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-zinc-900 dark:text-zinc-50 font-serif tracking-tight">
            404
          </h1>
          <h2 className="text-xl font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            Listing or Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            The vehicle allocation or private gallery link you requested is currently unavailable or has been re-allocated.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <Link href="/inventory">
              <Button variant="gold" size="md">
                <Search className="w-4 h-4 mr-1.5" />
                <span>Search Active Inventory</span>
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="md">
                Return Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Recommended Popular Vehicles */}
        <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Curated Recommendations
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 uppercase font-serif">
                Featured Showroom Motorcars
              </h3>
            </div>
            <Link
              href="/inventory"
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
