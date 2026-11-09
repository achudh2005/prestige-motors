'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { TestDrive, TestDriveStatus } from '@/types';

export default function AdminTestDrivesPage() {
  const [appointments, setAppointments] = useState<any[]>([
    {
      id: 'td-101',
      vehicleName: '2024 Porsche 911 GT3 (992)',
      customerName: 'Alexander Vance',
      customerEmail: 'vance@apex.com',
      customerPhone: '+1 (310) 555-8901',
      locationName: 'Beverly Hills Flagship',
      date: '2024-03-15',
      timeSlot: '11:00 AM',
      status: 'confirmed',
      assignedTo: 'Harrison Sterling',
      notes: 'Client requests private canyon route demonstration.'
    },
    {
      id: 'td-102',
      vehicleName: '2024 Aston Martin DB12 Coupe',
      customerName: 'Marcus Sterling',
      customerEmail: 'm.sterling@global.com',
      customerPhone: '+1 (305) 555-3419',
      locationName: 'Miami Waterfront',
      date: '2024-03-16',
      timeSlot: '2:30 PM',
      status: 'scheduled',
      assignedTo: 'Vivienne Leclair',
      notes: 'Interested in bespoke interior swatches.'
    },
    {
      id: 'td-103',
      vehicleName: '2023 Rolls-Royce Ghost Extended',
      customerName: 'Elena Rostova',
      customerEmail: 'elena@rostova.org',
      customerPhone: '+1 (212) 555-7788',
      locationName: 'Manhattan Gallery',
      date: '2024-03-17',
      timeSlot: '4:00 PM',
      status: 'completed',
      assignedTo: 'Harrison Sterling',
      notes: 'Completed. Deposit accepted for reservation.'
    }
  ]);

  // Sync from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('prestige_test_drives') || '[]');
      if (stored.length > 0) {
        setAppointments((prev) => {
          const ids = new Set(prev.map((a) => a.id));
          const uniqueNew = stored.filter((s: any) => !ids.has(s.id));
          return [...uniqueNew, ...prev];
        });
      }
    } catch {
      // ignore
    }
  }, []);

  const handleStatusChange = (id: string, newStatus: TestDriveStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handleAssignStaff = (id: string, staffName: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, assignedTo: staffName } : a))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 uppercase font-serif">
          VIP Test Drive Schedule & Dispatch
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Calendar schedule, rep assignment, confirmation controls, and completion verification.
        </p>
      </div>

      {/* Appointments Table */}
      <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-400 uppercase text-[10px]">
              <tr>
                <th className="p-4">Client & Contact</th>
                <th className="p-4">Vehicle Allocation</th>
                <th className="p-4">Gallery Location</th>
                <th className="p-4">Date & Time Slot</th>
                <th className="p-4">Assigned Specialist</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                  <td className="p-4">
                    <div className="font-bold text-zinc-900 dark:text-zinc-100">
                      {apt.customerName}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      {apt.customerPhone} &bull; {apt.customerEmail}
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">
                    {apt.vehicleName}
                  </td>

                  <td className="p-4 text-zinc-600 dark:text-zinc-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>{apt.locationName}</span>
                    </div>
                  </td>

                  <td className="p-4 font-mono font-semibold text-amber-600 dark:text-amber-400">
                    {apt.date} @ {apt.timeSlot}
                  </td>

                  <td className="p-4">
                    <select
                      value={apt.assignedTo || 'Unassigned'}
                      onChange={(e) => handleAssignStaff(apt.id, e.target.value)}
                      className="px-2 py-1 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs"
                    >
                      <option value="Harrison Sterling">Harrison Sterling</option>
                      <option value="Vivienne Leclair">Vivienne Leclair</option>
                      <option value="Marcus Lindholm">Marcus Lindholm</option>
                      <option value="Unassigned">Unassigned</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                          : apt.status === 'completed'
                          ? 'bg-blue-500/10 text-blue-500 border border-blue-500/30'
                          : apt.status === 'cancelled'
                          ? 'bg-red-500/10 text-red-500 border border-red-500/30'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {apt.status !== 'confirmed' && apt.status !== 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(apt.id, 'confirmed')}
                          className="text-[10px] h-7 px-2"
                        >
                          Confirm
                        </Button>
                      )}
                      {apt.status !== 'completed' && (
                        <Button
                          variant="gold"
                          size="sm"
                          onClick={() => handleStatusChange(apt.id, 'completed')}
                          className="text-[10px] h-7 px-2"
                        >
                          Complete
                        </Button>
                      )}
                      {apt.status !== 'cancelled' && (
                        <button
                          onClick={() => handleStatusChange(apt.id, 'cancelled')}
                          className="p-1 hover:text-red-500 text-zinc-400"
                          title="Cancel appointment"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
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
