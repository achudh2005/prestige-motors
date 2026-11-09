'use client';

import React, { useState } from 'react';
import { estimateTradeInValue } from '@/lib/calculations';
import { formatCurrency, formatMileage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Camera, CheckCircle2, Shield, Calendar, ArrowRight, Upload } from 'lucide-react';
import Link from 'next/link';

export default function TradeInPage() {
  // Step 1: Vehicle Details
  const [make, setMake] = useState('Porsche');
  const [model, setModel] = useState('911 GT3 (991.2)');
  const [year, setYear] = useState(2018);
  const [mileage, setMileage] = useState(8500);
  const [condition, setCondition] = useState<'excellent' | 'very_good' | 'good' | 'fair'>('excellent');
  const [vin, setVin] = useState('');

  // Step 2: Photo upload simulation
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80'
  ]);

  // Step 3: Owner Details
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');

  // Valuation results
  const [valuation, setValuation] = useState<{ low: number; high: number } | null>(null);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = estimateTradeInValue(make, model, year, mileage, condition);

    setTimeout(() => {
      setValuation(result);
      setLoading(false);
    }, 500);
  };

  const handleBookAppraisal = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const existingTradeIns = JSON.parse(localStorage.getItem('prestige_trade_ins') || '[]');
      const newTradeIn = {
        id: 'trade-' + Date.now(),
        customerName: ownerName,
        customerEmail: ownerEmail,
        customerPhone: ownerPhone,
        make,
        model,
        year,
        mileage,
        condition,
        estimateLow: valuation?.low || 0,
        estimateHigh: valuation?.high || 0,
        photos: uploadedPhotos,
        status: 'pending_review',
        createdAt: new Date().toISOString()
      };
      existingTradeIns.unshift(newTradeIn);
      localStorage.setItem('prestige_trade_ins', JSON.stringify(existingTradeIns));

      // Also create a lead
      const existingLeads = JSON.parse(localStorage.getItem('prestige_leads') || '[]');
      existingLeads.unshift({
        id: 'lead-trade-' + Date.now(),
        name: ownerName,
        email: ownerEmail,
        phone: ownerPhone,
        source: 'trade_in',
        status: 'new',
        notes: `Appraisal requested for ${year} ${make} ${model} (${formatMileage(mileage)}). Est: ${formatCurrency(valuation?.low || 0)} - ${formatCurrency(valuation?.high || 0)}`,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('prestige_leads', JSON.stringify(existingLeads));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setLoading(false);
      setBooked(true);
    }, 600);
  };

  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Exotic & Luxury Trade-In Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Vehicle Valuation Appraisal
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Receive a competitive, data-driven valuation range for your current luxury or supercar. Apply trade-in equity directly toward any showroom acquisition.
          </p>
        </div>

        {/* Step 1 & 2: Vehicle Specs & Photo Upload */}
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide font-serif border-b border-zinc-100 dark:border-zinc-800 pb-3">
            1. Current Vehicle Specifications
          </h3>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Make / Marque"
                required
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="e.g. Porsche, Ferrari, McLaren"
              />
              <Input
                label="Model & Trim"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. 911 GT3 or Roma"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Year"
                type="number"
                min="1990"
                max="2026"
                required
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
              <Input
                label="Mileage (Miles)"
                type="number"
                min="100"
                required
                value={mileage}
                onChange={(e) => setMileage(Number(e.target.value))}
              />
              <Input
                label="VIN (Optional)"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                placeholder="17-character VIN"
              />
            </div>

            {/* Condition Rating */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Overall Condition
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'excellent', title: 'Excellent', desc: 'Flawless paint, fresh service, concours state' },
                  { id: 'very_good', title: 'Very Good', desc: 'Minor stone chips, clean mechanicals' },
                  { id: 'good', title: 'Good', desc: 'Normal wear, complete service history' },
                  { id: 'fair', title: 'Fair', desc: 'Requires cosmetic touch-up or tire replacement' }
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCondition(c.id as any)}
                    className={`p-3 rounded text-left border transition-all ${
                      condition === c.id
                        ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300 font-semibold shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase">{c.title}</div>
                    <div className="text-[10px] text-zinc-400 mt-1 leading-snug">{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Photos Upload Mock */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Upload Vehicle Photos (Exterior, Interior, Odometer)
              </label>
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg p-6 text-center hover:border-amber-500/50 transition-colors bg-zinc-50/50 dark:bg-zinc-900/50">
                <Camera className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                  Drag and drop high-res images here, or browse files
                </p>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Supports JPG, PNG, HEIC up to 25MB each
                </p>
                <div className="mt-3 flex justify-center gap-2">
                  {uploadedPhotos.map((photo, i) => (
                    <div key={i} className="relative w-16 h-12 rounded overflow-hidden border border-zinc-300 dark:border-zinc-700">
                      <img src={photo} alt="Uploaded sample" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button type="submit" variant="gold" fullWidth size="lg" disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Analyzing Market Telemetry...' : 'Calculate Estimated Valuation'}</span>
            </Button>
          </form>
        </div>

        {/* Valuation Result Box & Appraisal Booking */}
        {valuation && (
          <div className="bg-gradient-to-br from-zinc-900 to-black text-white p-6 sm:p-8 rounded-lg border border-amber-500/30 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Live Algorithmic Valuation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif">
                Estimated Trade-In Range
              </h3>
              <div className="text-3xl sm:text-5xl font-black font-mono text-amber-400 py-2">
                {formatCurrency(valuation.low)} &mdash; {formatCurrency(valuation.high)}
              </div>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Based on current national collector auction results, wholesale dealer exchanges, and verified {year} {make} {model} transactions.
              </p>
            </div>

            {/* Appraisal Booking Section */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-200">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Book In-Person or Concierge Appraisal</span>
              </div>

              {booked ? (
                <div className="p-4 rounded bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                  <div className="font-bold text-sm text-zinc-100">
                    Appraisal Appointment Confirmed
                  </div>
                  <p className="text-xs text-zinc-400">
                    Our acquisition specialist will contact you to finalize the formal physical inspection and cash offer or trade-in credit.
                  </p>
                  <Link href="/inventory">
                    <Button variant="gold" size="sm" className="mt-2">
                      Explore Matching Showroom Vehicles
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleBookAppraisal} className="space-y-3">
                  <Input
                    label="Client Name"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Full Name"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      placeholder="client@domain.com"
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      required
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <Button type="submit" variant="gold" fullWidth size="md" disabled={loading}>
                    <span>Lock In Estimated Range & Book Appraisal</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
