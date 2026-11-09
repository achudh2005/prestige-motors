'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_BLOG_POSTS } from '@/lib/mock-data/blog';
import { Sparkles, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Track & Performance', 'Comparisons', 'Ownership & Care'];

  const filteredPosts =
    selectedCategory === 'All'
      ? MOCK_BLOG_POSTS
      : MOCK_BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Prestige Journal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Automotive Insights & Essays
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Curated analysis on hypercar engineering, classic marque valuations, track testing telemetry, and certified collector ownership.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-[#11131c] rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      {post.publishedAt}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors font-serif leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400 font-medium">{post.author.split(',')[0]}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500"
                  >
                    <span>Read Essay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
