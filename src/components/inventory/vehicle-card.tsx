'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vehicle } from '@/types';
import { formatCurrency, formatMileage, calculateMonthlyPayment } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gauge, Zap, MapPin, Heart, ArrowRight, Eye } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onQuickView?: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onQuickView }) => {
  const [isSaved, setIsSaved] = useState(false);
  const monthlyEst = calculateMonthlyPayment(vehicle.price, 5.99, 60, vehicle.price * 0.2);
  const primaryImage = vehicle.images[0]?.url || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80';

  const getStatusBadge = () => {
    if (vehicle.status === 'sold') return <Badge variant="sold">Sold</Badge>;
    if (vehicle.status === 'reserved') return <Badge variant="reserved">Reserved</Badge>;
    if (vehicle.condition === 'new') return <Badge variant="new">New Vehicle</Badge>;
    if (vehicle.isCertified) return <Badge variant="cpo">Certified Pre-Owned</Badge>;
    return <Badge variant="default">Pre-Owned</Badge>;
  };

  return (
    <div className="group bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800/80 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-amber-500/5 overflow-hidden flex flex-col h-full">
      {/* Image Thumbnail & Overlay */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <img
          src={primaryImage}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {getStatusBadge()}
        </div>

        {/* Action icons (Wishlist) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(!isSaved);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-amber-400 hover:bg-black/60 transition-colors"
          aria-label="Save to favorites"
          title="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        {onQuickView && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-zinc-900 text-xs font-semibold shadow-lg">
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </span>
          </div>
        )}

        {/* Location Pill */}
        <div className="absolute bottom-2.5 left-3 text-[11px] text-zinc-200 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-sm flex items-center gap-1">
          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="truncate max-w-[180px]">{vehicle.locationName || 'Beverly Hills Showroom'}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Make and Model */}
        <div className="mb-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {vehicle.year} &bull; {vehicle.make}
          </div>
          <Link href={`/inventory/${vehicle.id}`}>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-amber-500 transition-colors truncate">
              {vehicle.model}
            </h3>
          </Link>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {vehicle.trim || vehicle.engine}
          </p>
        </div>

        {/* Telemetry Chips */}
        <div className="grid grid-cols-3 gap-2 py-3 my-2 border-y border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-zinc-400">Power</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              {vehicle.powerHp} HP
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-zinc-400">0-100 km/h</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
              {vehicle.acceleration0To100}s
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-zinc-400">Mileage</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-1">
              <Gauge className="w-3 h-3 text-zinc-400" />
              {formatMileage(vehicle.mileage)}
            </span>
          </div>
        </div>

        {/* Pricing and Monthly estimate */}
        <div className="mt-auto pt-2 flex items-baseline justify-between">
          <div>
            <div className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 font-mono">
              {formatCurrency(vehicle.price)}
            </div>
            <div className="text-[11px] text-zinc-400">
              Est. ${monthlyEst.toLocaleString()}/mo*
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-2 gap-2">
          <Link href={`/inventory/${vehicle.id}`} className="w-full">
            <Button variant="outline" size="sm" fullWidth className="text-xs">
              <span>View Specs</span>
            </Button>
          </Link>
          <Link href={`/test-drive?vehicleId=${vehicle.id}`} className="w-full">
            <Button variant="gold" size="sm" fullWidth className="text-xs">
              <span>Test Drive</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
