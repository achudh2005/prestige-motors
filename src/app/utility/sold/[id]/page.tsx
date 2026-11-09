import React from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/lib/mock-data/vehicles';
import { VehicleCard } from '@/components/inventory/vehicle-card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Search, ArrowRight, ShieldAlert } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleSoldPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = MOCK_VEHICLES.find((v) => v.id === id) || MOCK_VEHICLES[0];
  const similarVehicles = MOCK_VEHICLES.filter((v) => v.id !== vehicle.id).slice(0, 3);

  return (
    <div className="py-16 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Sold Notification Box */}
        <div className="max-w-2xl mx-auto p-8 rounded-xl bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Acquisition Concluded
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif">
              {vehicle.year} {vehicle.make} {vehicle.model} Has Been Sold
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
            This vehicle was recently acquired by a private collector. However, our acquisition directors can source an identical build or similar allocation on your behalf.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <Link href="/contact">
              <Button variant="gold" size="md">
                Request Custom Sourcing
              </Button>
            </Link>
            <Link href="/inventory">
              <Button variant="outline" size="md">
                View Available Inventory
              </Button>
            </Link>
          </div>
        </div>

        {/* Similar Suggestions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Alternative Allocations
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 uppercase font-serif">
                Similar High-Performance Vehicles
              </h3>
            </div>
            <Link
              href="/inventory"
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
