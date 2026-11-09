# Prestige Luxury Motorcars

A high-end, responsive web application for new and certified pre-owned luxury and exotic motorcars (Porsche, Ferrari, Bentley, Aston Martin, Rolls-Royce, Mercedes-AMG).

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth, Storage)**.

---

## Key Features

### 1. Public Site Core
- **Home**: Cinematic luxury hero with CTAs, instant filter bar, featured vehicles carousel, marque emblem tiles, "Why Buy From Us" (150-Point CPO Certification, Nationwide Enclosed Delivery), VIP testimonials, curated lease/finance offers, and comprehensive footer.
- **Inventory (`/inventory`)**: 3-column desktop grid with responsive mobile drawer. Faceted filters (Make, Model, Body, Year, Price Slider, Mileage, Fuel, Transmission, Color, Certified status). Real-time multi-criteria sorting (Price, Year, Mileage, Newest).
- **Vehicle Detail (`/inventory/[id]`)**: Fullscreen gallery lightbox, walkaround video tour, instant monthly payment estimator, telemetry key specs bar (Power HP, 0-100 km/h, top speed, mileage), 150-point condition checklist, history report link, and prefilled lead modals.

### 2. Tools & Comparison
- **Compare (`/compare`)**: Side-by-side comparison for up to 3 vehicles with dynamic **"Highlight Differences"** toggle.
- **Financing Calculator (`/financing`)**: Loan and lease modeling with interactive price, down payment, trade-in, term, and APR sliders. Generates monthly payment, total interest, and full amortization schedule with pre-approval application form.
- **Trade-In Valuation (`/trade-in`)**: Algorithmic appraisal estimator providing dynamic valuation range (`$estimate_low` to `$estimate_high`), condition assessment, photo upload zone, and in-person appraisal booking.

### 3. Booking & Lead Generation
- **VIP Test Drive (`/test-drive`)**: Real-time slot picker with anti-double-booking constraint, location selector, and instant `.ics` calendar download (RFC 5545 compatible with Apple Calendar, Google Calendar, and Outlook).
- **Centralized Lead Pipeline**: Every inquiry, test drive, valuation, and finance form logs a lead record.
- **Editorial & Static**: The Prestige Journal (`/blog` and `/blog/[slug]`), Showrooms (`/locations`), About (`/about`), Contact concierge (`/contact`), Legal terms (`/legal/*`), and custom 404 (`/not-found`).

### 4. Role-Based Admin Console (`/admin`)
- **Multi-Role Access**: Switch between **Admin**, **Sales**, **Service**, and **Marketing** roles with simulated 2FA verification.
- **Executive Dashboard (`/admin`)**: Real-time KPIs (Leads This Week, Test Drives, Stock Valuation), lead source distribution chart, and vehicle demand leaderboard.
- **Inventory Desk (`/admin/inventory`)**: Full CRUD table, status toggles (`available`, `reserved`, `sold`), stock age, duplicate listing, CSV batch import, and new vehicle listing editor (`/admin/inventory/new`).
- **Leads CRM (`/admin/crm`)**: Visual Kanban board across stages (*New*, *Contacted*, *Qualified*, *Closed*), lead detail profiles, and activity timeline logger.
- **Test Drive Scheduler (`/admin/test-drives`)**: Calendar appointment dispatcher, rep assignment, confirmation, and completion tracking.
- **Trade-Ins & Underwriting (`/admin/trade-ins`)**: Encrypted financial application desk and trade-in appraisals.
- **Sales Desk (`/admin/sales`)**: Deal registry and delivery tracking.
- **Marketing (`/admin/marketing`)**: Banner announcements, private allocation broadcast emails to subscribers.
- **Settings (`/admin/settings`)**: Dealership entities, operating hours, currency, and email/SMS templates.

---

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm or pnpm

### Installation
```bash
# Clone and enter directory
cd prestige-motors

# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the luxury website.
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to explore the Executive Admin Console.

---

## Supabase PostgreSQL Setup

1. Create a new project in [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Run the complete schema script:
   - Copy contents of `supabase/schema.sql` and execute.
4. Run the seed data script:
   - Copy contents of `supabase/seed.sql` and execute to populate 6 exotic motorcars, locations, and reviews.
5. In your `.env.local`, set:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
*(Note: If Supabase keys are omitted, the application automatically runs in high-fidelity mock mode using `/src/lib/mock-data/` with local storage persistence for leads and test drives).*

---

## Build & Production Deployment

```bash
# Verify static build and route optimization
npm run build

# Start production server
npm run start
```
