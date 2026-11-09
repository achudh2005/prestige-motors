'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_VEHICLES } from '@/lib/mock-data/vehicles';
import { formatCurrency, calculateMonthlyPayment } from '@/lib/utils';
import { GalleryLightbox } from '@/components/vehicle-detail/gallery-lightbox';
import { KeySpecsBar } from '@/components/vehicle-detail/key-specs-bar';
import { SpecsTable } from '@/components/vehicle-detail/specs-table';
import { FeaturesAccordion } from '@/components/vehicle-detail/features-accordion';
import { ConditionChecklist } from '@/components/vehicle-detail/condition-checklist';
import { VehicleEnquiryModal } from '@/components/vehicle-detail/vehicle-enquiry-modal';
import { VehicleCard } from '@/components/inventory/vehicle-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Share2,
  Heart,
  Shield,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  CreditCard,
  Scale
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function VehicleDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const vehicle = MOCK_VEHICLES.find((v) => v.id === resolvedParams.id);

  const [modalType, setModalType] = useState<'enquiry' | 'reserve' | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!vehicle) {
    notFound();
  }

  const monthlyEst = calculateMonthlyPayment(vehicle.price, 5.99, 60, vehicle.price * 0.2);
  const vehicleTitle = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  // Find 3 related vehicles from same make or body style
  const relatedVehicles = MOCK_VEHICLES.filter(
    (v) => v.id !== vehicle.id && (v.make === vehicle.make || v.bodyType === vehicle.bodyType)
  ).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-8 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-amber-500 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Inventory</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href={`/compare?add=${vehicle.id}`}>
              <Button variant="outline" size="sm" className="text-xs">
                <Scale className="w-3.5 h-3.5 mr-1 text-amber-500" />
                <span>Compare</span>
              </Button>
            </Link>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 relative"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -top-8 right-0 bg-black text-white text-[10px] px-2 py-0.5 rounded shadow">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Header Block: Title, Badges, and Price */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={vehicle.condition === 'new' ? 'new' : vehicle.isCertified ? 'cpo' : 'default'}>
                {vehicle.condition === 'new' ? 'Brand New' : vehicle.isCertified ? 'Certified Pre-Owned' : 'Pre-Owned'}
              </Badge>
              <span className="text-xs text-zinc-400 font-mono">VIN: {vehicle.vin}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
              {vehicleTitle}
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-1">
              {vehicle.trim || vehicle.engine} &bull; Finished in {vehicle.color}
            </p>
          </div>

          <div className="text-left lg:text-right shrink-0">
            <div className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 font-mono">
              {formatCurrency(vehicle.price)}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Est. <span className="font-semibold text-amber-600 dark:text-amber-400 font-mono">${monthlyEst.toLocaleString()}/mo</span> (60 mos, 20% down)*
            </div>
          </div>
        </div>

        {/* Gallery Stage with Fullscreen Lightbox & Walkaround Video */}
        <GalleryLightbox images={vehicle.images} vehicleName={vehicleTitle} />

        {/* Key Specs Telemetry Bar */}
        <KeySpecsBar vehicle={vehicle} />

        {/* Quick Action CTAs Bar */}
        <div className="p-4 sm:p-5 rounded-lg bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">Direct Showroom Allocation</span>
              <p className="text-zinc-500 dark:text-zinc-400">Available for immediate private viewing or nationwide enclosed transport.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link href={`/test-drive?vehicleId=${vehicle.id}`} className="flex-1 sm:flex-initial">
              <Button variant="gold" size="md">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book Test Drive</span>
              </Button>
            </Link>

            <Button
              variant="primary"
              size="md"
              onClick={() => setModalType('enquiry')}
              className="flex-1 sm:flex-initial"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>Request Info</span>
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => setModalType('reserve')}
              className="flex-1 sm:flex-initial border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              <span>Reserve ({formatCurrency(vehicle.reservationDeposit)})</span>
            </Button>
          </div>
        </div>

        {/* 2-Column Detail Breakdown: Specs + Features + Condition + Dealership */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <SpecsTable vehicle={vehicle} />
            <FeaturesAccordion features={vehicle.features} />
          </div>

          <div className="space-y-8">
            <ConditionChecklist vehicle={vehicle} />

            {/* Financing Teaser Card */}
            <div className="p-6 rounded-lg bg-gradient-to-br from-amber-500/10 via-zinc-50 to-white dark:from-amber-500/5 dark:via-zinc-900 dark:to-[#11131c] border border-amber-500/20 space-y-4">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Bespoke Financial Engineering</span>
              </div>
              <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-serif">
                Tailored Lease & Acquisition Terms Available
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Our in-house private client financing desk arranges closed-end leases, open-ended balloon financing, and tax-advantageous corporate titling.
              </p>
              <Link href={`/financing?price=${vehicle.price}`}>
                <Button variant="outline" size="sm" className="border-amber-500/40 text-xs">
                  Calculate Amortization Schedule
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Vehicles Section */}
        {relatedVehicles.length > 0 && (
          <div className="pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  Comparable Exotics
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 uppercase font-serif">
                  Similar Vehicles in Collection
                </h3>
              </div>
              <Link
                href="/inventory"
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                View Full Inventory &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles.map((rel) => (
                <VehicleCard key={rel.id} vehicle={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prefilled Lead Modal */}
      {modalType && (
        <VehicleEnquiryModal
          vehicle={vehicle}
          isOpen={!!modalType}
          onClose={() => setModalType(null)}
          type={modalType}
        />
      )}
    </div>
  );
}
