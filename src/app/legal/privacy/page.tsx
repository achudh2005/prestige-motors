import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif">
          Client Privacy & Data Confidentiality
        </h1>
        <p className="text-xs text-zinc-500">Effective Date: March 2024</p>

        <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-4 leading-relaxed">
          <p>
            At Prestige Luxury Motorcars, client confidentiality and discretion are paramount. We do not sell, rent, or trade private client information, vehicle purchase records, or financial documentation to third-party marketing entities.
          </p>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Information We Collect</h3>
          <p>
            When booking test drives, submitting trade-in appraisals, or applying for financing, we collect name, contact information, vehicle preference, and information necessary to verify identity and comply with federal AML/KYC dealership regulations.
          </p>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Data Security & Encryption</h3>
          <p>
            All submitted forms utilize 256-bit SSL encryption. Sensitive financial parameters are encrypted at rest with role-restricted access granted only to authorized finance directors.
          </p>
        </div>
      </div>
    </div>
  );
}
