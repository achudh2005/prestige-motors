'use client';

import React from 'react';
import { LUXURY_BRANDS } from '@/lib/mock-data/vehicles';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatMileage } from '@/lib/utils';
import { Filter, RotateCcw } from 'lucide-react';

export interface FilterState {
  make: string;
  bodyType: string;
  condition: string;
  minPrice: number;
  maxPrice: number;
  maxMileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  isCertified: boolean;
  feature: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalResults
}) => {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const bodyTypes = ['Coupe', 'Sedan', 'SUV', 'Convertible'];
  const fuelTypes = ['Petrol', 'Hybrid', 'Electric'];
  const transmissions = ['Dual-Clutch PDK', '8-Speed Sport Auto', 'Manual'];
  const colors = ['Shark Blue', 'Grigio Silverstone', 'Beluga Metallic', 'Aston Martin Racing Green', 'Diamond Black with Silver Satin Bonnet', 'Manufaktur Night Black Mango'];
  const popularFeatures = [
    'Porsche Ceramic Composite Brakes (PCCB)',
    'Full Carbon Bucket Racing Seats',
    'Ferrari Side Slip Control 6.0 (SSC 6.0)',
    'Bentley Rotating Display',
    'Shooting Star Fiber-Optic Starlight Headliner',
    'AMG Performance Exhaust with Dual Side Pipes'
  ];

  return (
    <aside className="w-full bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            Filters
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
            {totalResults}
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-zinc-400 hover:text-amber-500 flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Marque / Make */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
          Marque
        </label>
        <select
          value={filters.make}
          onChange={(e) => updateFilter('make', e.target.value)}
          className="w-full px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
        >
          <option value="">All Marques</option>
          {LUXURY_BRANDS.map((b) => (
            <option key={b.slug} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Condition / Certified */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
          Condition
        </label>
        <div className="grid grid-cols-3 gap-1">
          {['', 'new', 'cpo'].map((cond) => (
            <button
              key={cond}
              type="button"
              onClick={() => updateFilter('condition', cond)}
              className={`py-1.5 px-2 rounded-sm text-xs font-medium capitalize transition-colors border ${
                filters.condition === cond
                  ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
              }`}
            >
              {cond === '' ? 'All' : cond.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Body Style */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
          Body Style
        </label>
        <select
          value={filters.bodyType}
          onChange={(e) => updateFilter('bodyType', e.target.value)}
          className="w-full px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
        >
          <option value="">All Body Styles</option>
          {bodyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Max Price
          </span>
          <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">
            {formatCurrency(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="100000"
          max="500000"
          step="10000"
          value={filters.maxPrice}
          onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
          <span>$100K</span>
          <span>$500K+</span>
        </div>
      </div>

      {/* Max Mileage Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Max Mileage
          </span>
          <span className="font-mono text-zinc-600 dark:text-zinc-400 font-semibold">
            {formatMileage(filters.maxMileage)}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="20000"
          step="500"
          value={filters.maxMileage}
          onChange={(e) => updateFilter('maxMileage', Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
      </div>

      {/* Transmission */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
          Transmission
        </label>
        <select
          value={filters.transmission}
          onChange={(e) => updateFilter('transmission', e.target.value)}
          className="w-full px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
        >
          <option value="">All Transmissions</option>
          {transmissions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
          Fuel Type
        </label>
        <select
          value={filters.fuelType}
          onChange={(e) => updateFilter('fuelType', e.target.value)}
          className="w-full px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
        >
          <option value="">All Fuel Types</option>
          {fuelTypes.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Exterior Color */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
          Color
        </label>
        <select
          value={filters.color}
          onChange={(e) => updateFilter('color', e.target.value)}
          className="w-full px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
        >
          <option value="">All Colors</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Standout Feature */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
          Key Feature
        </label>
        <select
          value={filters.feature}
          onChange={(e) => updateFilter('feature', e.target.value)}
          className="w-full px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
        >
          <option value="">Any Special Equipment</option>
          {popularFeatures.map((feat) => (
            <option key={feat} value={feat}>
              {feat}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-2">
        <Button variant="outline" size="sm" fullWidth onClick={onReset}>
          Reset All Filters
        </Button>
      </div>
    </aside>
  );
};
