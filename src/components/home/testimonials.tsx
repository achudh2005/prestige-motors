import React from 'react';
import { MOCK_REVIEWS } from '@/lib/mock-data/reviews';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            Client Testimonials
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Trusted by Connoisseurs
          </h2>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Read perspectives from collectors and clients across the country who acquired their vehicles through Prestige.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-lg bg-zinc-50 dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-amber-500/40 mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  {review.customerName}
                </div>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {review.vehicleModel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
