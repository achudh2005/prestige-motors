import React from 'react';
import { Vehicle } from '@/types';
import { formatMileage } from '@/lib/utils';
import { Zap, Timer, Gauge, Fuel, Cog, Activity } from 'lucide-react';

interface KeySpecsBarProps {
  vehicle: Vehicle;
}

export const KeySpecsBar: React.FC<KeySpecsBarProps> = ({ vehicle }) => {
  const specs = [
    {
      label: 'Power',
      value: `${vehicle.powerHp} HP`,
      detail: `${vehicle.torqueNm} Nm Torque`,
      icon: Zap
    },
    {
      label: 'Acceleration',
      value: `${vehicle.acceleration0To100}s`,
      detail: '0 - 100 km/h',
      icon: Timer
    },
    {
      label: 'Top Speed',
      value: `${vehicle.topSpeedKmh} km/h`,
      detail: 'Electronically Limited',
      icon: Activity
    },
    {
      label: 'Odometer',
      value: formatMileage(vehicle.mileage),
      detail: 'Verified Telemetry',
      icon: Gauge
    },
    {
      label: 'Powertrain',
      value: vehicle.fuelType,
      detail: vehicle.engine.split(' ')[0] + ' Config',
      icon: Fuel
    },
    {
      label: 'Transmission',
      value: vehicle.transmission,
      detail: vehicle.drivetrain + ' System',
      icon: Cog
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 sm:p-5 rounded-lg bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800 shadow-sm">
      {specs.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="flex flex-col p-2.5 rounded bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Icon className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </div>
            <div className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 font-mono truncate">
              {item.value}
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
              {item.detail}
            </div>
          </div>
        );
      })}
    </div>
  );
};
