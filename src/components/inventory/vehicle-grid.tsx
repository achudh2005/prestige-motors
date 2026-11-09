'use client';

import React, { useState } from 'react';
import { Vehicle } from '@/types';
import { VehicleCard } from './vehicle-card';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatMileage } from '@/lib/utils';
import { LayoutGrid, ArrowUpDown, ChevronDown, Check, X, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface VehicleGridProps {
  vehicles: Vehicle[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  activeFilters: { key: string; label: string }[];
  onRemoveFilter: (key: string) => void;
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({
  vehicles,
  sortBy,
  onSortChange,
  activeFilters,
  onRemoveFilter
}) => {
  const [selectedQuickView, setSelectedQuickView] = useState<Vehicle | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const displayedVehicles = vehicles.slice(0, visibleCount);
  const hasMore = visibleCount < vehicles.length;

  return (
    <div className="space-y-6">
      {/* Top Bar: Results Count, Active Tags, and Sort Selector */}
      <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-mono">
            {vehicles.length} {vehicles.length === 1 ? 'Vehicle' : 'Vehicles'} Found
          </span>

          {/* Active Filter Tags */}
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => onRemoveFilter(filter.key)}
                className="hover:text-amber-800 dark:hover:text-amber-200 ml-1"
                aria-label={`Remove filter ${filter.label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            Sort By:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none px-3 py-1.5 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-amber-500 pr-7 cursor-pointer"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="year_desc">Year: Newest First</option>
              <option value="mileage_asc">Mileage: Lowest First</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pointer-events-none absolute right-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Grid: 3 col desktop, 1-2 mobile */}
      {displayedVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onQuickView={(v) => setSelectedQuickView(v)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white dark:bg-[#11131c] rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 p-8">
          <LayoutGrid className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            No Matching Vehicles Found
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-5">
            We couldn&apos;t find any motorcars matching your specific filter criteria. Try adjusting or resetting your filters.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <Button
            variant="outline"
            size="md"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="border-zinc-300 dark:border-zinc-700 hover:border-amber-500 font-semibold text-xs tracking-wider uppercase px-8"
          >
            <span>Load More Vehicles ({vehicles.length - visibleCount} remaining)</span>
          </Button>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedQuickView && (
        <Modal
          isOpen={!!selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
          title={`${selectedQuickView.year} ${selectedQuickView.make} ${selectedQuickView.model}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="aspect-[16/9] rounded-md overflow-hidden bg-zinc-900">
              <img
                src={selectedQuickView.images[0]?.url}
                alt={selectedQuickView.model}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-mono">
                  {formatCurrency(selectedQuickView.price)}
                </div>
                <div className="text-xs text-zinc-400">
                  {formatMileage(selectedQuickView.mileage)} &bull; {selectedQuickView.transmission}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-500 font-semibold uppercase">
                  {selectedQuickView.condition.toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Equipped with {selectedQuickView.engine}, producing {selectedQuickView.powerHp} horsepower and reaching 0-100 km/h in {selectedQuickView.acceleration0To100} seconds.
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-3">
              <Link href={`/inventory/${selectedQuickView.id}`} className="flex-1">
                <Button variant="primary" fullWidth size="sm">
                  <span>Full Specification & Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
              <Link href={`/test-drive?vehicleId=${selectedQuickView.id}`} className="flex-1">
                <Button variant="gold" fullWidth size="sm">
                  <span>Book VIP Test Drive</span>
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
