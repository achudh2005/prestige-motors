'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_VEHICLES } from '@/lib/mock-data/vehicles';
import { FilterSidebar, FilterState } from '@/components/inventory/filter-sidebar';
import { VehicleGrid } from '@/components/inventory/vehicle-grid';
import { Button } from '@/components/ui/button';
import { Filter, X, Sparkles } from 'lucide-react';

function InventoryContent() {
  const searchParams = useSearchParams();

  // Initial filter state from URL query params
  const [filters, setFilters] = useState<FilterState>({
    make: searchParams.get('make') || '',
    bodyType: searchParams.get('bodyType') || '',
    condition: searchParams.get('condition') || '',
    minPrice: 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 500000,
    maxMileage: 20000,
    fuelType: '',
    transmission: '',
    color: '',
    isCertified: false,
    feature: ''
  });

  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL params if user arrives via external links
  useEffect(() => {
    const makeParam = searchParams.get('make');
    const bodyParam = searchParams.get('bodyType');
    const condParam = searchParams.get('condition');
    const maxP = searchParams.get('maxPrice');

    if (makeParam || bodyParam || condParam || maxP) {
      setFilters((prev) => ({
        ...prev,
        make: makeParam || prev.make,
        bodyType: bodyParam || prev.bodyType,
        condition: condParam || prev.condition,
        maxPrice: maxP ? Number(maxP) : prev.maxPrice
      }));
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      make: '',
      bodyType: '',
      condition: '',
      minPrice: 0,
      maxPrice: 500000,
      maxMileage: 20000,
      fuelType: '',
      transmission: '',
      color: '',
      isCertified: false,
      feature: ''
    });
  };

  const handleRemoveFilter = (key: string) => {
    setFilters((prev) => {
      if (key === 'make') return { ...prev, make: '' };
      if (key === 'bodyType') return { ...prev, bodyType: '' };
      if (key === 'condition') return { ...prev, condition: '' };
      if (key === 'fuelType') return { ...prev, fuelType: '' };
      if (key === 'transmission') return { ...prev, transmission: '' };
      if (key === 'color') return { ...prev, color: '' };
      if (key === 'feature') return { ...prev, feature: '' };
      if (key === 'maxPrice') return { ...prev, maxPrice: 500000 };
      if (key === 'maxMileage') return { ...prev, maxMileage: 20000 };
      return prev;
    });
  };

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    return MOCK_VEHICLES.filter((vehicle) => {
      if (filters.make && vehicle.make.toLowerCase() !== filters.make.toLowerCase()) return false;
      if (filters.bodyType && vehicle.bodyType !== filters.bodyType) return false;
      if (filters.condition && vehicle.condition !== filters.condition) return false;
      if (vehicle.price > filters.maxPrice) return false;
      if (vehicle.mileage > filters.maxMileage) return false;
      if (filters.fuelType && vehicle.fuelType !== filters.fuelType) return false;
      if (filters.transmission && vehicle.transmission !== filters.transmission) return false;
      if (filters.color && vehicle.color !== filters.color) return false;
      if (filters.isCertified && !vehicle.isCertified) return false;
      if (filters.feature && !vehicle.features.some((f) => f.name.includes(filters.feature))) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'year_desc') return b.year - a.year;
      if (sortBy === 'mileage_asc') return a.mileage - b.mileage;
      // Default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filters, sortBy]);

  // Compute active filter labels for display tags
  const activeFilterTags = useMemo(() => {
    const tags: { key: string; label: string }[] = [];
    if (filters.make) tags.push({ key: 'make', label: `Marque: ${filters.make}` });
    if (filters.bodyType) tags.push({ key: 'bodyType', label: `Body: ${filters.bodyType}` });
    if (filters.condition) tags.push({ key: 'condition', label: `Condition: ${filters.condition.toUpperCase()}` });
    if (filters.maxPrice < 500000) tags.push({ key: 'maxPrice', label: `Max Price: $${(filters.maxPrice / 1000).toFixed(0)}K` });
    if (filters.fuelType) tags.push({ key: 'fuelType', label: `Fuel: ${filters.fuelType}` });
    if (filters.transmission) tags.push({ key: 'transmission', label: `Gearbox: ${filters.transmission}` });
    if (filters.color) tags.push({ key: 'color', label: `Color: ${filters.color}` });
    if (filters.feature) tags.push({ key: 'feature', label: `Feature: ${filters.feature}` });
    return tags;
  }, [filters]);

  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Showroom Collection</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
              Prestige Inventory
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Explore available new allocations and certified pre-owned supercars, complete with comprehensive 150-point inspection documentation.
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFilterOpen(true)}
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4 text-amber-500" />
              <span>Filter Options ({activeFilterTags.length})</span>
            </Button>
          </div>
        </div>

        {/* 2-Column Layout: Filter Sidebar (Desktop) + Vehicle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredVehicles.length}
            />
          </div>

          {/* Vehicle Grid (3 cols on desktop) */}
          <div className="lg:col-span-3">
            <VehicleGrid
              vehicles={filteredVehicles}
              sortBy={sortBy}
              onSortChange={setSortBy}
              activeFilters={activeFilterTags}
              onRemoveFilter={handleRemoveFilter}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-sm h-full bg-white dark:bg-[#11131c] p-6 overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 uppercase font-serif">
                Filter Vehicles
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredVehicles.length}
            />

            <Button
              variant="gold"
              fullWidth
              size="md"
              onClick={() => setMobileFilterOpen(false)}
              className="mt-4"
            >
              Apply Filters ({filteredVehicles.length})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono">Loading Luxury Inventory...</div>}>
      <InventoryContent />
    </Suspense>
  );
}
