import React from 'react';

export default function AccessibilityPage() {
  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif">
          Digital Accessibility Statement (WCAG 2.1 AA)
        </h1>
        <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-4 leading-relaxed">
          <p>
            Prestige Luxury Motorcars is dedicated to ensuring digital accessibility for all clients, including individuals with disabilities. We continually optimize the user experience conforming to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
          </p>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Accessibility Features</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full keyboard navigation support across all vehicle cards, filters, and forms</li>
            <li>High-contrast light and dark mode color tokens meeting minimum 4.5:1 ratio</li>
            <li>Explicit ARIA landmark labels, modal focus traps, and screen-reader announcements</li>
            <li>Scalable typography and responsive touch targets exceeding 44x44 pixels</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
