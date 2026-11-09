import React from 'react';
import { Vehicle } from '@/types';
import { formatCurrency, formatMileage } from '@/lib/utils';

interface SpecsTableProps {
  vehicle: Vehicle;
}

export const SpecsTable: React.FC<SpecsTableProps> = ({ vehicle }) => {
  const specsCategories = [
    {
      category: 'Overview & Identification',
      items: [
        { label: 'VIN (Vehicle Identification No.)', value: vehicle.vin },
        { label: 'Model Year', value: vehicle.year.toString() },
        { label: 'Make & Model', value: `${vehicle.make} ${vehicle.model}` },
        { label: 'Trim & Package', value: vehicle.trim || 'Standard Luxury Specification' },
        { label: 'Body Style', value: vehicle.bodyType },
        { label: 'Condition Marque', value: vehicle.isCertified ? 'Certified Pre-Owned (CPO)' : vehicle.condition.toUpperCase() },
        { label: 'Stock Location', value: vehicle.locationName || 'Flagship Gallery' }
      ]
    },
    {
      category: 'Engine & Performance Dynamics',
      items: [
        { label: 'Engine Architecture', value: vehicle.engine },
        { label: 'Maximum Power Output', value: `${vehicle.powerHp} horsepower` },
        { label: 'Maximum Torque', value: `${vehicle.torqueNm} Nm` },
        { label: 'Acceleration 0-100 km/h', value: `${vehicle.acceleration0To100} seconds` },
        { label: 'Top Track Speed', value: `${vehicle.topSpeedKmh} km/h` },
        { label: 'Transmission', value: vehicle.transmission },
        { label: 'Drivetrain Layout', value: vehicle.drivetrain }
      ]
    },
    {
      category: 'Exterior & Interior Finishes',
      items: [
        { label: 'Exterior Paint Finish', value: vehicle.color },
        { label: 'Interior Upholstery', value: vehicle.interiorColor },
        { label: 'Verified Mileage', value: formatMileage(vehicle.mileage) },
        { label: 'Fuel System', value: vehicle.fuelType },
        { label: 'Reservation Deposit', value: formatCurrency(vehicle.reservationDeposit) }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide font-serif">
        Full Technical Specification
      </h3>

      <div className="space-y-6">
        {specsCategories.map((cat, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-1.5">
              {cat.category}
            </h4>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              {cat.items.map((item, i) => (
                <div key={i} className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-900">
                  <dt className="text-zinc-500 dark:text-zinc-400">{item.label}</dt>
                  <dd className="font-semibold text-zinc-900 dark:text-zinc-100 font-mono text-right truncate max-w-[200px]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
};
