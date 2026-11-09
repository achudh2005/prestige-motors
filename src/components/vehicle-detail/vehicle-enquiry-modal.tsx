'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Vehicle } from '@/types';
import { CheckCircle2, Shield, Calendar, Send } from 'lucide-react';

interface VehicleEnquiryModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
  type?: 'enquiry' | 'reserve' | 'info';
}

export const VehicleEnquiryModal: React.FC<VehicleEnquiryModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  type = 'enquiry'
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const vehicleTitle = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save lead to local CRM store
    try {
      const existingLeads = JSON.parse(localStorage.getItem('prestige_leads') || '[]');
      const newLead = {
        id: 'lead-' + Date.now(),
        name,
        email,
        phone,
        source: type === 'reserve' ? 'reserve_deposit' : 'enquiry',
        vehicleId: vehicle.id,
        vehicleName: vehicleTitle,
        status: 'new',
        notes: notes || (type === 'reserve' ? 'Client requested allocation hold reservation.' : 'General vehicle specification inquiry.'),
        createdAt: new Date().toISOString()
      };
      existingLeads.unshift(newLead);
      localStorage.setItem('prestige_leads', JSON.stringify(existingLeads));
    } catch {
      // ignore storage error
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={type === 'reserve' ? `Reserve ${vehicleTitle}` : `Inquire: ${vehicleTitle}`}
      maxWidth="md"
    >
      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-serif">
            Concierge Request Received
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-zinc-800 dark:text-zinc-200">{name}</span>. A Senior Client Executive from our {vehicle.locationName || 'Beverly Hills Showroom'} has been assigned to your inquiry for the {vehicleTitle} and will contact you shortly.
          </p>
          <div className="pt-2">
            <Button variant="gold" size="sm" onClick={handleReset}>
              Close & Return to Listing
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'reserve' && (
            <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
              <span className="font-bold">Reservation Policy:</span> Online reservation places a temporary 48-hour hold on this vehicle pending concierge verification. No immediate payment processed online.
            </div>
          )}

          <div className="p-3 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">{vehicleTitle}</div>
            <div>VIN: <span className="font-mono">{vehicle.vin}</span> &bull; Stock: #{vehicle.id}</div>
          </div>

          <Input
            label="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Lord Sterling or Dr. Vance"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@familyoffice.com"
            />
            <Input
              label="Direct Telephone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 019-2831"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Special Requests or Trade-In Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="I would like to discuss lease structuring, trade-in allowance for my 991.2 Turbo S, and arrange enclosed delivery."
              className="w-full px-3.5 py-2.5 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2">
            <Button variant="gold" fullWidth size="md" disabled={loading}>
              <Send className="w-4 h-4 mr-2" />
              <span>{loading ? 'Submitting...' : type === 'reserve' ? 'Confirm Reservation Hold' : 'Submit Private Inquiry'}</span>
            </Button>
          </div>

          <div className="text-center text-[10px] text-zinc-400 flex items-center justify-center gap-1.5 pt-1">
            <Shield className="w-3 h-3 text-amber-500" />
            <span>Discretion Guaranteed &bull; Strictly Confidential Communication</span>
          </div>
        </form>
      )}
    </Modal>
  );
};
