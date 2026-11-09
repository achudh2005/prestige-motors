import React from 'react';
import { Hero } from '@/components/home/hero';
import { SearchBar } from '@/components/home/search-bar';
import { FeaturedCarousel } from '@/components/home/featured-carousel';
import { BrandTiles } from '@/components/home/brand-tiles';
import { WhyBuyFromUs } from '@/components/home/why-buy-from-us';
import { Testimonials } from '@/components/home/testimonials';
import { CurrentOffers } from '@/components/home/current-offers';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <SearchBar />
      <FeaturedCarousel />
      <BrandTiles />
      <WhyBuyFromUs />
      <Testimonials />
      <CurrentOffers />
    </div>
  );
}
