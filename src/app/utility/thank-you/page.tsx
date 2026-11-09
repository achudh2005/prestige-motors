import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="py-20 bg-zinc-50 dark:bg-[#090a0f] min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-8 sm:p-10 rounded-xl bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800 text-center space-y-5 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif">
          Thank You
        </h1>

        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Your submission has been securely recorded in our private client ledger. A Senior Client Director will reach out to you within two hours.
        </p>

        <div className="pt-3">
          <Link href="/inventory">
            <Button variant="gold" fullWidth size="md">
              <span>Return to Inventory</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
