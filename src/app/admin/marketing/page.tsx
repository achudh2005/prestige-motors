'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Megaphone, Mail, Sparkles, Send, Edit, Globe } from 'lucide-react';

export default function AdminMarketingPage() {
  const [newsletterSubject, setNewsletterSubject] = useState('Exclusive Allocation: 2024 Porsche 911 GT3 (Shark Blue)');
  const [newsletterContent, setNewsletterContent] = useState('We are pleased to introduce our newest Certified Pre-Owned track acquisition...');
  const [emailSent, setEmailSent] = useState(false);

  // Promotional Banner Text
  const [bannerText, setBannerText] = useState('Complimentary Nationwide Enclosed Delivery on All CPO Allocations Through End of Month');
  const [bannerActive, setBannerActive] = useState(true);

  const handleSendNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 uppercase font-serif">
          Marketing & Client Communications
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Broadcast private allocation updates, configure promotional banners, and refine metadata.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Newsletter to Subscribers */}
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <Mail className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-serif">
              Private Client Allocation Broadcast
            </h3>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Dispatches encrypted allocation alerts to 1,480 qualified private newsletter subscribers.
          </p>

          <form onSubmit={handleSendNewsletter} className="space-y-3">
            <Input
              label="Email Subject Line"
              required
              value={newsletterSubject}
              onChange={(e) => setNewsletterSubject(e.target.value)}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Broadcast Content Body
              </label>
              <textarea
                rows={5}
                required
                value={newsletterContent}
                onChange={(e) => setNewsletterContent(e.target.value)}
                className="w-full p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <Button type="submit" variant="gold" fullWidth size="md">
              <Send className="w-4 h-4 mr-2" />
              <span>{emailSent ? 'Campaign Dispatched to 1,480 VIPs!' : 'Send Allocation Broadcast'}</span>
            </Button>
          </form>
        </div>

        {/* Global Promotional Banners & SEO */}
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <Globe className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-serif">
              Promotional Banner & SEO Defaults
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Dealership Top Ribbon Banner
              </label>
              <input
                type="text"
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                className="w-full px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold">Banner Status:</label>
              <button
                type="button"
                onClick={() => setBannerActive(!bannerActive)}
                className={`px-3 py-1 rounded text-xs font-bold uppercase transition-colors ${
                  bannerActive
                    ? 'bg-emerald-500 text-white'
                    : 'bg-zinc-300 dark:bg-zinc-800 text-zinc-600'
                }`}
              >
                {bannerActive ? 'Active' : 'Disabled'}
              </button>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2 text-xs">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                Structured Schema.org Rich Snippets
              </span>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                Automated JSON-LD Car schema is auto-generated per listing including VIN, mileage, priceCurrency, and seller credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
