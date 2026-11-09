'use client';

import React, { useState } from 'react';
import { formatCurrency, formatMileage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, Lock, Shield, Eye, CheckCircle2, FileText } from 'lucide-react';

export default function AdminTradeInsAndFinancePage() {
  const [tab, setTab] = useState<'finance' | 'trade_ins'>('finance');

  const [financeApps, setFinanceApps] = useState([
    {
      id: 'fin-801',
      clientName: 'Alexander Vance',
      email: 'vance@private.com',
      vehicleName: '2024 Porsche 911 GT3 (992)',
      amount: 214800,
      term: '60 Months',
      rate: '4.49%',
      creditScore: '780 (Tier 1)',
      encryptedSSN: 'AES-256: [ENCRYPTED-RESTRICTED-AUDITED]',
      status: 'approved'
    },
    {
      id: 'fin-802',
      clientName: 'Julian Montgomery',
      email: 'j.mont@venture.com',
      vehicleName: '2024 Bentley Continental GT Speed',
      amount: 268000,
      term: '48 Months',
      rate: '4.99%',
      creditScore: '765 (Tier 1)',
      encryptedSSN: 'AES-256: [ENCRYPTED-RESTRICTED-AUDITED]',
      status: 'under_review'
    }
  ]);

  const [tradeIns, setTradeIns] = useState([
    {
      id: 'ti-401',
      clientName: 'Dr. Aaron Chen',
      phone: '+1 (305) 555-8819',
      make: 'Ferrari',
      model: 'F8 Tributo',
      year: 2021,
      mileage: 4200,
      condition: 'Excellent',
      estimateLow: 260000,
      estimateHigh: 285000,
      status: 'appraised'
    },
    {
      id: 'ti-402',
      clientName: 'Victoria Belmont',
      phone: '+1 (212) 555-4421',
      make: 'Porsche',
      model: '911 Turbo S Cabriolet',
      year: 2022,
      mileage: 6800,
      condition: 'Very Good',
      estimateLow: 195000,
      estimateHigh: 215000,
      status: 'pending_review'
    }
  ]);

  const handleRevealSensitive = (id: string) => {
    alert(`Audit Access Logged: SSN / Tax ID token decrypted and revealed under Administrator compliance session.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 uppercase font-serif">
            Trade-In Appraisals & Finance Underwriting
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Encrypted client financial applications and trade-in appraisals under strict security compliance.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 p-1 bg-white dark:bg-[#11131c] rounded-md border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setTab('finance')}
            className={`px-4 py-1.5 rounded text-xs font-semibold transition-all ${
              tab === 'finance'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Finance Underwriting ({financeApps.length})
          </button>
          <button
            onClick={() => setTab('trade_ins')}
            className={`px-4 py-1.5 rounded text-xs font-semibold transition-all ${
              tab === 'trade_ins'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            Trade-In Appraisals ({tradeIns.length})
          </button>
        </div>
      </div>

      {tab === 'finance' ? (
        /* Finance Underwriting Table */
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                <tr>
                  <th className="p-4">Applicant</th>
                  <th className="p-4">Vehicle Allocation</th>
                  <th className="p-4">Financed Sum</th>
                  <th className="p-4">Term & APR</th>
                  <th className="p-4">Credit Tier</th>
                  <th className="p-4">Encrypted Identity</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {financeApps.map((app) => (
                  <tr key={app.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                    <td className="p-4">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">{app.clientName}</div>
                      <div className="text-[11px] text-zinc-400 font-mono">{app.email}</div>
                    </td>
                    <td className="p-4 font-semibold">{app.vehicleName}</td>
                    <td className="p-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(app.amount)}</td>
                    <td className="p-4 font-mono">{app.term} @ {app.rate}</td>
                    <td className="p-4">{app.creditScore}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleRevealSensitive(app.id)}
                        className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-amber-500"
                        title="Click to audit decrypt"
                      >
                        <Lock className="w-3 h-3 text-amber-500" />
                        <span>Decrypt SSN</span>
                      </button>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Trade-In Appraisals Table */
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                <tr>
                  <th className="p-4">Client</th>
                  <th className="p-4">Trade-In Vehicle</th>
                  <th className="p-4">Odometer</th>
                  <th className="p-4">Condition</th>
                  <th className="p-4">Estimated Range</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {tradeIns.map((ti) => (
                  <tr key={ti.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                    <td className="p-4">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">{ti.clientName}</div>
                      <div className="text-[11px] text-zinc-400 font-mono">{ti.phone}</div>
                    </td>
                    <td className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">
                      {ti.year} {ti.make} {ti.model}
                    </td>
                    <td className="p-4 font-mono">{formatMileage(ti.mileage)}</td>
                    <td className="p-4">{ti.condition}</td>
                    <td className="p-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                      {formatCurrency(ti.estimateLow)} &mdash; {formatCurrency(ti.estimateHigh)}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/30">
                        {ti.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
