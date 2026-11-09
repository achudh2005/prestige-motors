import React from 'react';
import Link from 'next/link';
import { LUXURY_BRANDS } from '@/lib/mock-data/vehicles';
import { ArrowUpRight } from 'lucide-react';

export const BrandTiles: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            Legendary Marques
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Curated by Heritage
          </h2>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Explore our curated inventory categorized by world-renowned automotive manufacturers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {LUXURY_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/inventory?make=${encodeURIComponent(brand.name)}`}
              className="group p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 hover:border-amber-500/50 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-amber-500/5 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mb-3 bg-zinc-800/80 p-0.5 border border-zinc-700/60 group-hover:scale-110 transition-transform">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors">
                {brand.name}
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                {brand.vehicleCount} Available
              </p>
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-[10px] font-semibold text-amber-500 uppercase tracking-wider">
                <span>View</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
