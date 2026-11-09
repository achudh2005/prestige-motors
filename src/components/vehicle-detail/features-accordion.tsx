'use client';

import React, { useState } from 'react';
import { VehicleFeature } from '@/types';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

interface FeaturesAccordionProps {
  features: VehicleFeature[];
}

export const FeaturesAccordion: React.FC<FeaturesAccordionProps> = ({ features }) => {
  // Group features by category
  const categories: Record<string, string[]> = {};
  features.forEach((f) => {
    if (!categories[f.category]) categories[f.category] = [];
    categories[f.category].push(f.name);
  });

  const categoryKeys = Object.keys(categories);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    categoryKeys.reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
  );

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide font-serif">
        Standard & Optional Equipment
      </h3>

      <div className="space-y-3">
        {categoryKeys.map((cat) => {
          const isOpen = openCategories[cat];
          const items = categories[cat];

          return (
            <div key={cat} className="border border-zinc-100 dark:border-zinc-800/80 rounded-md overflow-hidden">
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-left"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  {cat} ({items.length})
                </span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-white dark:bg-[#11131c]">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
