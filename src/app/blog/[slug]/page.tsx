import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MOCK_BLOG_POSTS } from '@/lib/mock-data/blog';
import { Calendar, Clock, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-amber-500 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Essays</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{post.author}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                {post.publishedAt}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p className="text-base sm:text-lg font-light text-zinc-600 dark:text-zinc-300 italic border-l-2 border-amber-500 pl-4 py-1">
            {post.excerpt}
          </p>

          <p>{post.body}</p>

          <p>
            When pushing the boundaries of automotive dynamics, every engineering tolerance represents a deliberate philosophy. From the bespoke carbon tub architecture to the active ceramic damper valves responding in fractions of a millisecond, modern supercars bridge the chasm between raw mechanical adrenaline and telemetry-driven perfection.
          </p>

          <p>
            At Prestige Luxury Motors, our testing protocol ensures that every vehicle entering our private collection preserves this mechanical integrity in its absolute zenith.
          </p>
        </div>

        {/* Author Footer & Share */}
        <div className="p-6 rounded-lg bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">Written by</div>
            <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{post.author}</div>
          </div>

          <Link href="/inventory">
            <Button variant="gold" size="sm">
              Explore Featured Collection
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
