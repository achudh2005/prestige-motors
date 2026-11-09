'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MOCK_VEHICLES } from '@/lib/mock-data/vehicles';
import { Vehicle } from '@/types';
import { formatCurrency, formatMileage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, Plus, X, Check, Sparkles, ArrowRight, Zap, Gauge, Timer, Fuel } from 'lucide-react';

function CompareContent() {
  const searchParams = useSearchParams();
  const initialAdd = searchParams.get('add');

  // Selected vehicle slots (up to 3)
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (initialAdd && MOCK_VEHICLES.some((v) => v.id === initialAdd)) {
      const others = MOCK_VEHICLES.filter((v) => v.id !== initialAdd).slice(0, 2).map((v) => v.id);
      return [initialAdd, ...others];
    }
    return [MOCK_VEHICLES[0].id, MOCK_VEHICLES[1].id, MOCK_VEHICLES[2]?.id || ''];
  });

  const [highlightDiffs, setHighlightDiffs] = useState(true);

  const selectedVehicles = selectedIds
    .map((id) => MOCK_VEHICLES.find((v) => v.id === id))
    .filter(Boolean) as Vehicle[];

  const handleSelectSlot = (index: number, newId: string) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
  };

  const handleRemoveSlot = (index: number) => {
    const updated = [...selectedIds];
    updated.splice(index, 1);
    setSelectedIds(updated);
  };

  const handleAddSlot = () => {
    if (selectedIds.length < 3) {
      const unused = MOCK_VEHICLES.find((v) => !selectedIds.includes(v.id));
      if (unused) {
        setSelectedIds([...selectedIds, unused.id]);
      }
    }
  };

  // Helper to check if a row differs across selected cars
  const doesRowDiffer = (getter: (v: Vehicle) => any) => {
    if (selectedVehicles.length <= 1) return false;
    const firstVal = getter(selectedVehicles[0]);
    return selectedVehicles.some((v) => getter(v) !== firstVal);
  };

  const specRows = [
    { label: 'Price', getter: (v: Vehicle) => formatCurrency(v.price), raw: (v: Vehicle) => v.price },
    { label: 'Condition', getter: (v: Vehicle) => v.condition.toUpperCase(), raw: (v: Vehicle) => v.condition },
    { label: 'Model Year', getter: (v: Vehicle) => v.year.toString(), raw: (v: Vehicle) => v.year },
    { label: 'Horsepower', getter: (v: Vehicle) => `${v.powerHp} HP`, raw: (v: Vehicle) => v.powerHp },
    { label: '0-100 km/h', getter: (v: Vehicle) => `${v.acceleration0To100}s`, raw: (v: Vehicle) => v.acceleration0To100 },
    { label: 'Top Speed', getter: (v: Vehicle) => `${v.topSpeedKmh} km/h`, raw: (v: Vehicle) => v.topSpeedKmh },
    { label: 'Engine', getter: (v: Vehicle) => v.engine, raw: (v: Vehicle) => v.engine },
    { label: 'Transmission', getter: (v: Vehicle) => v.transmission, raw: (v: Vehicle) => v.transmission },
    { label: 'Drivetrain', getter: (v: Vehicle) => v.drivetrain, raw: (v: Vehicle) => v.drivetrain },
    { label: 'Mileage', getter: (v: Vehicle) => formatMileage(v.mileage), raw: (v: Vehicle) => v.mileage },
    { label: 'Body Style', getter: (v: Vehicle) => v.bodyType, raw: (v: Vehicle) => v.bodyType },
    { label: 'Exterior Finish', getter: (v: Vehicle) => v.color, raw: (v: Vehicle) => v.color },
    { label: 'Interior Upholstery', getter: (v: Vehicle) => v.interiorColor, raw: (v: Vehicle) => v.interiorColor }
  ];

  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Multi-Vehicle Telemetry</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
              Vehicle Comparison
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Benchmark technical specifications, powertrains, acceleration, and bespoke equipment side by side.
            </p>
          </div>

          {/* Controls: Highlight Differences toggle and Add Vehicle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHighlightDiffs(!highlightDiffs)}
              className={`px-3.5 py-2 rounded-sm text-xs font-semibold border transition-all flex items-center gap-2 ${
                highlightDiffs
                  ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Highlight Differences</span>
            </button>

            {selectedVehicles.length < 3 && (
              <Button variant="outline" size="sm" onClick={handleAddSlot}>
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Add Vehicle Slot</span>
              </Button>
            )}
          </div>
        </div>

        {/* Comparison Columns Matrix */}
        <div className="overflow-x-auto">
          <div className="min-w-[760px] bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            {/* Top Cards Header Row */}
            <div className="grid grid-cols-4 p-6 gap-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col justify-end">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Comparing {selectedVehicles.length} of 3
                </span>
                <p className="text-xs text-zinc-500">
                  Select vehicles from the dropdowns to swap allocations.
                </p>
              </div>

              {selectedVehicles.map((vehicle, idx) => (
                <div key={vehicle.id} className="relative space-y-3">
                  <button
                    onClick={() => handleRemoveSlot(idx)}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-red-500 hover:text-white transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="aspect-[16/10] rounded-md overflow-hidden bg-zinc-900">
                    <img
                      src={vehicle.images[0]?.url}
                      alt={vehicle.model}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <select
                      value={vehicle.id}
                      onChange={(e) => handleSelectSlot(idx, e.target.value)}
                      className="w-full text-xs font-semibold p-1.5 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                    >
                      {MOCK_VEHICLES.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.year} {v.make} {v.model}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-lg font-black text-zinc-900 dark:text-zinc-100 font-mono">
                    {formatCurrency(vehicle.price)}
                  </div>

                  <Link href={`/test-drive?vehicleId=${vehicle.id}`}>
                    <Button variant="gold" size="sm" fullWidth className="text-xs">
                      <span>Book Test Drive</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Spec Comparison Rows */}
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80 text-xs">
              {specRows.map((row, rIdx) => {
                const isDifferent = highlightDiffs && doesRowDiffer(row.raw);
                return (
                  <div
                    key={rIdx}
                    className={`grid grid-cols-4 p-4 transition-colors ${
                      isDifferent
                        ? 'bg-amber-500/10 dark:bg-amber-500/5 font-medium'
                        : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30'
                    }`}
                  >
                    <div className="font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                      <span>{row.label}</span>
                      {isDifferent && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                    </div>

                    {selectedVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className={`text-zinc-900 dark:text-zinc-100 ${
                          isDifferent ? 'text-amber-700 dark:text-amber-300 font-semibold' : ''
                        }`}
                      >
                        {row.getter(vehicle)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono">Loading Comparison Telemetry...</div>}>
      <CompareContent />
    </Suspense>
  );
}
