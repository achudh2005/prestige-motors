import React from 'react';
import Link from 'next/link';

export default function FinancingTermsPage() {
  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif">
            Financing Terms & Disclosures
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Last Updated: March 2024</p>
        </div>

        <div className="prose dark:prose-invert text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-4 leading-relaxed">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">1. Private Client Financing Overview</h3>
          <p>
            Financing quotes, estimates, and payment calculators provided on this website are for demonstration and modeling purposes only. Final loan agreements, annual percentage rates (APR), and monthly installment calculations are subject to tier-one credit approval through our network of licensed institutional and private automotive lenders.
          </p>

          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">2. APR and Tier Classifications</h3>
          <p>
            Annual Percentage Rates start at 3.99% for qualifying prime tier applicants on select certified pre-owned or new allocations. Rates fluctuate based on term length (24–72 months), loan-to-value (LTV) ratio, vehicle year, down payment threshold, and applicant bureau score.
          </p>

          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">3. Reservation Deposits</h3>
          <p>
            Online reservation deposits (typically $2,500 to $5,000) constitute a temporary 48-hour hold agreement pending in-person or formal remote documentation. Online reservation deposits are fully refundable until formal purchase agreements are executed. No vehicle ownership or title passes until full funding is verified.
          </p>
        </div>
      </div>
    </div>
  );
}
