'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_VEHICLES } from '@/lib/mock-data/vehicles';
import { formatCurrency } from '@/lib/utils';
import {
  Users,
  Calendar,
  Car,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [leadsCount, setLeadsCount] = useState(18);
  const [testDrivesCount, setTestDrivesCount] = useState(7);

  useEffect(() => {
    try {
      const storedLeads = JSON.parse(localStorage.getItem('prestige_leads') || '[]');
      if (storedLeads.length > 0) setLeadsCount(18 + storedLeads.length);

      const storedTD = JSON.parse(localStorage.getItem('prestige_test_drives') || '[]');
      if (storedTD.length > 0) setTestDrivesCount(7 + storedTD.length);
    } catch {
      // ignore
    }
  }, []);

  const totalInventoryValue = MOCK_VEHICLES.reduce((sum, v) => sum + v.price, 0);

  const stats = [
    {
      title: 'Leads (This Week)',
      value: leadsCount.toString(),
      change: '+24% vs last week',
      icon: Users,
      color: 'text-amber-500'
    },
    {
      title: 'Scheduled Test Drives',
      value: testDrivesCount.toString(),
      change: '4 upcoming today',
      icon: Calendar,
      color: 'text-emerald-500'
    },
    {
      title: 'Active Showroom Units',
      value: MOCK_VEHICLES.length.toString(),
      change: '2 reserved',
      icon: Car,
      color: 'text-blue-500'
    },
    {
      title: 'Total Stock Valuation',
      value: `$${(totalInventoryValue / 1000000).toFixed(2)}M`,
      change: '6 allocations available',
      icon: DollarSign,
      color: 'text-purple-500'
    }
  ];

  const leadSources = [
    { source: 'Website Dynamic Enquiry', count: 12, percentage: '45%' },
    { source: 'VIP Test Drive Booking', count: 7, percentage: '26%' },
    { source: 'Financial Pre-Approval', count: 5, percentage: '19%' },
    { source: 'Trade-In Valuation Form', count: 3, percentage: '10%' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 uppercase font-serif">
            Executive Command Dashboard
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Real-time showroom metrics, VIP client conversions, and allocation performance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/inventory/new"
            className="px-4 py-2 rounded-sm bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            + Add New Motorcar Listing
          </Link>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-lg bg-white dark:bg-[#11131c] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  {stat.title}
                </span>
                <span className={`p-2 rounded bg-zinc-100 dark:bg-zinc-800 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl font-black font-mono text-zinc-900 dark:text-zinc-100">
                {stat.value}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column: Lead Source Analytics + Top Viewed Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lead Source Breakdown */}
        <div className="lg:col-span-5 bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-amber-500" />
              <span>Lead Source Distribution</span>
            </h3>
            <span className="text-xs text-zinc-400 font-mono">Total: {leadsCount}</span>
          </div>

          <div className="space-y-4">
            {leadSources.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-700 dark:text-zinc-300">{item.source}</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold">{item.percentage} ({item.count})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: item.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Demand Vehicles Leaderboard */}
        <div className="lg:col-span-7 bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-500" />
              <span>Highest Demand Allocations (Views & Leads)</span>
            </h3>
            <Link href="/admin/inventory" className="text-xs text-amber-500 hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Vehicle</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Views</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {MOCK_VEHICLES.map((v) => (
                  <tr key={v.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                    <td className="p-3">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">
                        {v.year} {v.make} {v.model}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono">VIN: {v.vin}</div>
                    </td>
                    <td className="p-3 font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(v.price)}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                        {v.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {v.viewsCount}
                      </span>
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/inventory/${v.id}`}
                        className="text-amber-500 hover:underline text-xs flex items-center gap-0.5"
                      >
                        <span>View</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
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
