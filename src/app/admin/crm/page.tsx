'use client';

import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import {
  Users,
  Clock,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  CheckCircle,
  Plus,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function AdminCrmPage() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'lead-1',
      name: 'Julian Montgomery',
      email: 'j.montgomery@venture.com',
      phone: '+1 (310) 555-9012',
      source: 'test_drive',
      vehicleName: '2024 Porsche 911 GT3 (992)',
      status: 'new',
      assignedTo: 'Harrison Sterling',
      notes: 'Interested in track delivery and ceramic brake options.',
      createdAt: '2024-03-10T14:20:00Z'
    },
    {
      id: 'lead-2',
      name: 'Victoria Belmont',
      email: 'v.belmont@familyholdings.ch',
      phone: '+1 (212) 555-4421',
      source: 'finance',
      vehicleName: '2023 Rolls-Royce Ghost Extended',
      status: 'contacted',
      assignedTo: 'Vivienne Leclair',
      notes: 'Corporate trust lease pre-qualification dispatched.',
      createdAt: '2024-03-09T11:00:00Z'
    },
    {
      id: 'lead-3',
      name: 'Dr. Aaron Chen',
      email: 'aaron.chen@surgery.org',
      phone: '+1 (305) 555-8819',
      source: 'trade_in',
      vehicleName: '2024 Aston Martin DB12 Coupe',
      status: 'qualified',
      assignedTo: 'Harrison Sterling',
      notes: 'Trade-in appraisal completed on 2021 F8 Tributo.',
      createdAt: '2024-03-08T16:30:00Z'
    },
    {
      id: 'lead-4',
      name: 'Edward K. Thorne',
      email: 'edward@thornecapital.com',
      phone: '+1 (415) 555-1290',
      source: 'enquiry',
      vehicleName: '2024 Bentley Continental GT Speed',
      status: 'closed',
      assignedTo: 'Vivienne Leclair',
      notes: 'Deposit received. Enclosed transport booked to Aspen.',
      createdAt: '2024-03-05T09:15:00Z'
    }
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  // Sync any leads from local storage submitted via public site
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('prestige_leads') || '[]');
      if (stored.length > 0) {
        setLeads((prev) => {
          const ids = new Set(prev.map((l) => l.id));
          const uniqueNew = stored.filter((s: Lead) => !ids.has(s.id));
          return [...uniqueNew, ...prev];
        });
      }
    } catch {
      // ignore
    }
  }, []);

  const stages: { key: LeadStatus; label: string; color: string }[] = [
    { key: 'new', label: 'New Inquiries', color: 'border-blue-500' },
    { key: 'contacted', label: 'Contacted / Pitch', color: 'border-amber-500' },
    { key: 'qualified', label: 'Qualified VIPs', color: 'border-purple-500' },
    { key: 'closed', label: 'Closed / Deposit', color: 'border-emerald-500' }
  ];

  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedLead) return;

    const updatedNotes = selectedLead.notes
      ? `${selectedLead.notes}\n[${new Date().toLocaleDateString()}]: ${newNote}`
      : `[${new Date().toLocaleDateString()}]: ${newNote}`;

    const updatedLead = { ...selectedLead, notes: updatedNotes };
    setSelectedLead(updatedLead);
    setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? updatedLead : l)));
    setNewNote('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 uppercase font-serif">
            Leads Pipeline CRM
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Track private client inquiries from dynamic discovery to reservation closing.
          </p>
        </div>
      </div>

      {/* Kanban Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.status === stage.key);

          return (
            <div
              key={stage.key}
              className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col h-[750px]"
            >
              {/* Column Header */}
              <div className={`pb-3 border-b-2 ${stage.color} flex items-center justify-between mb-4`}>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  {stage.label}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 overflow-y-auto flex-grow pr-1">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="p-3.5 rounded-md bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 cursor-pointer transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
                        {lead.source}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
                      {lead.name}
                    </div>

                    {lead.vehicleName && (
                      <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium truncate">
                        {lead.vehicleName}
                      </div>
                    )}

                    <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                      <span>Rep:</span>
                      <span className="text-zinc-300 font-medium">{lead.assignedTo || 'Unassigned'}</span>
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="h-32 flex items-center justify-center text-[11px] text-zinc-400 italic">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <Modal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title={`Lead Profile: ${selectedLead.name}`}
          maxWidth="lg"
        >
          <div className="space-y-5">
            {/* Lead Status Bar */}
            <div className="flex items-center justify-between p-3 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 font-medium">Pipeline Stage:</span>
              <div className="flex gap-1.5">
                {(['new', 'contacted', 'qualified', 'closed'] as LeadStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedLead.id, st)}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase border transition-all ${
                      selectedLead.status === st
                        ? 'bg-amber-500 text-zinc-950 border-amber-500'
                        : 'bg-white dark:bg-zinc-800 text-zinc-400 border-zinc-300 dark:border-zinc-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Email</span>
                <a href={`mailto:${selectedLead.email}`} className="font-semibold text-amber-500 hover:underline">
                  {selectedLead.email}
                </a>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Phone</span>
                <a href={`tel:${selectedLead.phone}`} className="font-semibold font-mono text-zinc-800 dark:text-zinc-200">
                  {selectedLead.phone}
                </a>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Vehicle of Interest</span>
                <span className="font-semibold">{selectedLead.vehicleName || 'General Sourcing'}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase">Lead Source</span>
                <span className="font-semibold uppercase">{selectedLead.source}</span>
              </div>
            </div>

            {/* Activity History & Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                Activity Log & Direct Notes
              </label>
              <div className="p-3 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono whitespace-pre-line max-h-36 overflow-y-auto">
                {selectedLead.notes || 'No historical activity logged yet.'}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add interaction note (e.g. called client, sent wire instructions)..."
                  className="flex-grow px-3 py-2 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100"
                />
                <Button type="submit" variant="gold" size="sm">
                  Log Note
                </Button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
