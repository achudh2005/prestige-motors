'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { calculateDetailedFinance } from '@/lib/calculations';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck, CheckCircle2, Send, Sparkles } from 'lucide-react';

function FinancingContent() {
  const searchParams = useSearchParams();
  const initialPrice = Number(searchParams.get('price')) || 268500;

  // Sliders state
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.2));
  const [tradeInAllowance, setTradeInAllowance] = useState(0);
  const [termMonths, setTermMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(5.99);

  // Application form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [creditTier, setCreditTier] = useState('750+ (Tier 1 Prime)');
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const result = calculateDetailedFinance(
    vehiclePrice,
    downPayment,
    tradeInAllowance,
    termMonths,
    interestRate
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const existingLeads = JSON.parse(localStorage.getItem('prestige_leads') || '[]');
      const newLead = {
        id: 'finance-' + Date.now(),
        name: applicantName,
        email: applicantEmail,
        phone: applicantPhone,
        source: 'finance',
        status: 'new',
        notes: `Financing pre-approval request for ${formatCurrency(result.loanAmount)} at ${interestRate}% for ${termMonths} months (${creditTier}).`,
        createdAt: new Date().toISOString()
      };
      existingLeads.unshift(newLead);
      localStorage.setItem('prestige_leads', JSON.stringify(existingLeads));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setLoading(false);
      setApplied(true);
    }, 600);
  };

  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Private Client Financial Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Luxury Financing Calculator
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Structure your bespoke acquisition terms. Model amortized loan installments, down payment thresholds, and trade-in tax credits with transparency.
          </p>
        </div>

        {/* 2-Column Grid: Sliders + Result Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sliders Panel */}
          <div className="lg:col-span-7 bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide font-serif border-b border-zinc-100 dark:border-zinc-800 pb-3">
              Configure Loan Variables
            </h3>

            {/* Vehicle Price */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Vehicle Acquisition Price
                </span>
                <span className="font-mono text-base font-extrabold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(vehiclePrice)}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="600000"
                step="5000"
                value={vehiclePrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setVehiclePrice(val);
                  setDownPayment(Math.round(val * 0.2));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                <span>$50,000</span>
                <span>$600,000+</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Down Payment ({Math.round((downPayment / vehiclePrice) * 100)}%)
                </span>
                <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                  {formatCurrency(downPayment)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={vehiclePrice * 0.7}
                step="2500"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Trade-in Allowance */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Estimated Trade-In Allowance
                </span>
                <span className="font-mono text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  {formatCurrency(tradeInAllowance)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="250000"
                step="2500"
                value={tradeInAllowance}
                onChange={(e) => setTradeInAllowance(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Term Months Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Loan Duration (Months)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[24, 36, 48, 60, 72].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTermMonths(m)}
                    className={`py-2 rounded-sm text-xs font-bold font-mono transition-all border ${
                      termMonths === m
                        ? 'bg-amber-500 text-zinc-950 border-amber-500 shadow-md shadow-amber-500/20'
                        : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                    }`}
                  >
                    {m} Mo
                  </button>
                ))}
              </div>
            </div>

            {/* Annual Interest Rate */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Estimated APR
                </span>
                <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="2.99"
                max="12.99"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Result Telemetry Box & Application Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-zinc-900 to-black text-white p-6 sm:p-8 rounded-lg border border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
                Estimated Monthly Installment
              </div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-white mb-6">
                ${result.monthlyPayment.toLocaleString()}
                <span className="text-sm font-normal text-zinc-400"> /mo*</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Net Financed Amount</span>
                  <span className="font-mono font-semibold">{formatCurrency(result.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Calculated Interest</span>
                  <span className="font-mono font-semibold text-amber-400">{formatCurrency(result.totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Acquisition Cost</span>
                  <span className="font-mono font-bold text-white">{formatCurrency(result.totalCost)}</span>
                </div>
              </div>
            </div>

            {/* Apply for Finance Form */}
            <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide font-serif">
                Apply for Pre-Approved Financing
              </h3>

              {applied ? (
                <div className="p-4 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                  <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    Application Logged Successfully
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Our private financial director will review your parameters and issue an encrypted pre-qualification proposal.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-3">
                  <Input
                    label="Applicant Legal Name"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Full Legal Name"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="client@domain.com"
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Estimated Credit Tier
                    </label>
                    <select
                      value={creditTier}
                      onChange={(e) => setCreditTier(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100"
                    >
                      <option value="750+ (Tier 1 Prime)">750+ (Tier 1 Prime Connoisseur)</option>
                      <option value="700 - 749 (Tier 2 Preferred)">700 - 749 (Tier 2 Preferred)</option>
                      <option value="650 - 699 (Tier 3 Standard)">650 - 699 (Tier 3 Standard)</option>
                      <option value="Corporate / Trust Lease">Corporate / Family Office Trust</option>
                    </select>
                  </div>

                  <Button variant="gold" fullWidth size="md" disabled={loading} className="mt-2">
                    <Send className="w-3.5 h-3.5 mr-2" />
                    <span>{loading ? 'Processing...' : 'Submit Confidential Application'}</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Amortization Summary Table */}
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 uppercase font-serif">
                Amortization Schedule Summary
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Annual and key monthly progression of principal reduction and interest.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-500 font-semibold">
              {termMonths} Installments Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Installment</th>
                  <th className="p-3">Principal</th>
                  <th className="p-3">Interest</th>
                  <th className="p-3">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {result.amortizationSchedule.map((row) => (
                  <tr key={row.month} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                    <td className="p-3 font-bold text-zinc-700 dark:text-zinc-300">Month {row.month}</td>
                    <td className="p-3">{formatCurrency(row.payment)}</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400">{formatCurrency(row.principal)}</td>
                    <td className="p-3 text-amber-600 dark:text-amber-400">{formatCurrency(row.interest)}</td>
                    <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinancingPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono">Loading Financial Engine...</div>}>
      <FinancingContent />
    </Suspense>
  );
}
