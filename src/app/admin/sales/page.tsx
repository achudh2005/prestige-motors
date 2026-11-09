'use client';

import React, { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, CheckCircle2, User, Calendar, Truck, ArrowUpRight } from 'lucide-react';

export default function AdminSalesPage() {
  const [deals] = useState([
    {
      id: 'deal-901',
      customerName: 'Edward K. Thorne',
      vehicleName: '2024 Bentley Continental GT Speed',
      salePrice: 335000,
      tradeInCredit: 45000,
      financeAmount: 220000,
      deliveryDate: '2024-03-22',
      status: 'scheduled_delivery',
      director: 'Vivienne Leclair'
    },
    {
      id: 'deal-902',
      customerName: 'Lord Sterling Vance',
      vehicleName: '2024 Porsche 911 GT3 (992)',
      salePrice: 268500,
      tradeInCredit: 0,
      financeAmount: 0, // Cash Wire
      deliveryDate: '2024-03-18',
      status: 'delivered',
      director: 'Harrison Sterling'
    }
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 uppercase font-serif">
          Executive Sales & Deal Desk
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Closed transactions, trade-in credits, private wire settlements, and white-glove delivery tracking.
        </p>
      </div>

      <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-400 uppercase text-[10px]">
              <tr>
                <th className="p-4">Deal ID & Customer</th>
                <th className="p-4">Acquired Vehicle</th>
                <th className="p-4">Contract Price</th>
                <th className="p-4">Trade-In Credit</th>
                <th className="p-4">Delivery Timeline</th>
                <th className="p-4">Managing Director</th>
                <th className="p-4">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                  <td className="p-4">
                    <div className="font-bold text-zinc-900 dark:text-zinc-100">{deal.customerName}</div>
                    <div className="text-[10px] text-zinc-400 font-mono">#{deal.id}</div>
                  </td>
                  <td className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">{deal.vehicleName}</td>
                  <td className="p-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(deal.salePrice)}</td>
                  <td className="p-4 font-mono text-emerald-600 dark:text-emerald-400">
                    {deal.tradeInCredit > 0 ? `-${formatCurrency(deal.tradeInCredit)}` : 'None'}
                  </td>
                  <td className="p-4 font-mono text-zinc-600 dark:text-zinc-400">{deal.deliveryDate}</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{deal.director}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        deal.status === 'delivered'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                      }`}
                    >
                      {deal.status === 'delivered' ? 'Delivered' : 'En Route / Transport'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
