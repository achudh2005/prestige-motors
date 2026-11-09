'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';
import { LUXURY_BRANDS } from '@/lib/mock-data/vehicles';
import { Button } from '@/components/ui/button';

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const [make, setMake] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (bodyType) params.set('bodyType', bodyType);
    if (maxPrice) params.set('maxPrice', maxPrice);

    router.push(`/inventory?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-12 sm:-mt-14 relative z-20 px-4">
      <form
        onSubmit={handleSearch}
        className="glass-panel p-3.5 sm:p-5 rounded-xl shadow-2xl shadow-black/30 dark:shadow-black/70 border border-zinc-200/80 dark:border-zinc-700/60"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 items-end">
          {/* Make Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Select Marque
            </label>
            <div className="relative">
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-md bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-500 pr-8"
              >
                <option value="">All Luxury Marques</option>
                {LUXURY_BRANDS.map((b) => (
                  <option key={b.slug} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-3 top-3" />
            </div>
          </div>

          {/* Body Style */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Body Style
            </label>
            <div className="relative">
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-md bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-500 pr-8"
              >
                <option value="">All Body Styles</option>
                <option value="Coupe">Coupe & Supercar</option>
                <option value="Sedan">Sedan & Saloon</option>
                <option value="SUV">Luxury SUV</option>
                <option value="Convertible">Convertible & Spyder</option>
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-3 top-3" />
            </div>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Price Range
            </label>
            <div className="relative">
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-md bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-500 pr-8"
              >
                <option value="">Any Price</option>
                <option value="200000">Up to $200,000</option>
                <option value="300000">Up to $300,000</option>
                <option value="400000">Up to $400,000</option>
                <option value="500000">Up to $500,000+</option>
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-3 top-3" />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" variant="gold" fullWidth size="md" className="h-[42px]">
              <Search className="w-4 h-4 mr-2" />
              <span>Explore Collection</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
