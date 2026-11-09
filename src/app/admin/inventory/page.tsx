'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/lib/mock-data/vehicles';
import { Vehicle, VehicleStatus } from '@/types';
import { formatCurrency, formatMileage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import {
  Car,
  Plus,
  Upload,
  Copy,
  CheckCircle,
  Eye,
  Trash2,
  Edit3,
  Search,
  Filter,
  ArrowUpRight
} from 'lucide-react';

export default function AdminInventoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [csvText, setCsvText] = useState('');

  const handleStatusChange = (id: string, newStatus: VehicleStatus) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  const handleDuplicate = (vehicle: Vehicle) => {
    const duplicated: Vehicle = {
      ...vehicle,
      id: 'veh-' + Date.now(),
      vin: 'DUP' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      model: `${vehicle.model} (Copy)`,
      viewsCount: 0,
      status: 'available',
      createdAt: new Date().toISOString()
    };
    setVehicles([duplicated, ...vehicles]);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you certain you wish to archive this luxury allocation?')) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleCsvImport = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Simulated CSV Batch Import parsed: 3 new luxury allocations added to catalog.');
    setCsvModalOpen(false);
  };

  const filtered = vehicles.filter((v) => {
    const matchesSearch =
      v.make.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.vin.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 uppercase font-serif">
            Showroom Inventory Desk
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Manage allocations, days in stock, dynamic pricing, and listing status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCsvModalOpen(true)}>
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            <span>CSV Batch Import</span>
          </Button>

          <Link href="/admin/inventory/new">
            <Button variant="gold" size="sm">
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Create New Listing</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search make, model, or VIN..."
            className="w-full pl-9 pr-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-zinc-400 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-100"
          >
            <option value="all">All Statuses ({vehicles.length})</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      {/* Main Inventory Data Table */}
      <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-400 uppercase text-[10px]">
              <tr>
                <th className="p-4">Vehicle Specs</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Age</th>
                <th className="p-4">Views</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {filtered.map((vehicle) => {
                // Calculate simulated days in stock
                const createdDate = new Date(vehicle.createdAt).getTime();
                const daysInStock = Math.floor((Date.now() - createdDate) / (1000 * 60 * 60 * 24)) || 4;

                return (
                  <tr key={vehicle.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded overflow-hidden bg-zinc-900 shrink-0">
                          <img
                            src={vehicle.images[0]?.url}
                            alt={vehicle.model}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </div>
                          <div className="text-[11px] text-zinc-400 font-mono">
                            VIN: {vehicle.vin} &bull; {formatMileage(vehicle.mileage)}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(vehicle.price)}
                    </td>

                    <td className="p-4 font-mono text-zinc-500">
                      {daysInStock} days
                    </td>

                    <td className="p-4 font-mono text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {vehicle.viewsCount}
                      </span>
                    </td>

                    <td className="p-4">
                      <select
                        value={vehicle.status}
                        onChange={(e) => handleStatusChange(vehicle.id, e.target.value as any)}
                        className={`text-[11px] font-bold uppercase rounded px-2 py-1 border ${
                          vehicle.status === 'available'
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                            : vehicle.status === 'reserved'
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30'
                        }`}
                      >
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDuplicate(vehicle)}
                          className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100"
                          title="Duplicate listing"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={`/inventory/${vehicle.id}`}
                          className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-amber-500"
                          title="Public page"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDelete(vehicle.id)}
                          className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500"
                          title="Archive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSV Import Modal */}
      {csvModalOpen && (
        <Modal
          isOpen={csvModalOpen}
          onClose={() => setCsvModalOpen(false)}
          title="Batch CSV Inventory Import"
          maxWidth="lg"
        >
          <form onSubmit={handleCsvImport} className="space-y-4">
            <p className="text-xs text-zinc-500 leading-relaxed">
              Upload or paste standard DMS / CSV vehicle data (VIN, Year, Make, Model, Trim, Price, Mileage, Engine, Color).
            </p>

            <textarea
              rows={6}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="vin,year,make,model,price,mileage,engine&#10;WP0AF2A97NS298101,2024,Porsche,911 GT3,268500,1850,4.0L Boxer-6"
              className="w-full p-3 font-mono text-xs rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
            />

            <Button type="submit" variant="gold" fullWidth size="md">
              <Upload className="w-4 h-4 mr-2" />
              <span>Import Allocations to Catalog</span>
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
