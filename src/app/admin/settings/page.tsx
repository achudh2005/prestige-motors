'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Save, CheckCircle2, Shield, Bell } from 'lucide-react';

export default function AdminSettingsPage() {
  const [dealershipName, setDealershipName] = useState('Prestige Luxury Motorcars LLC');
  const [phone, setPhone] = useState('+1 (310) 555-8900');
  const [currencySymbol, setCurrencySymbol] = useState('USD ($)');
  const [taxRate, setTaxRate] = useState('9.5%');
  const [emailTemplate, setEmailTemplate] = useState('Dear {CLIENT_NAME}, your private VIP test drive appointment for the {VEHICLE_NAME} has been confirmed for {APPOINTMENT_TIME}.');
  const [smsTemplate, setSmsTemplate] = useState('Prestige Concierge: Your test drive appointment for {VEHICLE_NAME} is scheduled for tomorrow at {TIME}. Text HELP for assistance.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 uppercase font-serif">
          Dealership Operational Settings
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Configure corporate credentials, operational tax policies, and automated client notification templates.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Dealership Info */}
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-serif border-b border-zinc-100 dark:border-zinc-800 pb-2">
            Showroom Entity Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Legal Entity Name"
              required
              value={dealershipName}
              onChange={(e) => setDealershipName(e.target.value)}
            />
            <Input
              label="Central Telephone Hotline"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Display Currency Symbol"
              required
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
            />
            <Input
              label="Default State Sales Tax Estimate"
              required
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
          </div>
        </div>

        {/* Automated Notification Templates */}
        <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <Bell className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-serif">
              Email & SMS Notification Automation
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Email Confirmation Template (Resend / SendGrid API)
            </label>
            <textarea
              rows={3}
              value={emailTemplate}
              onChange={(e) => setEmailTemplate(e.target.value)}
              className="w-full p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              SMS Reminder Template (24h Before - Twilio API)
            </label>
            <textarea
              rows={2}
              value={smsTemplate}
              onChange={(e) => setSmsTemplate(e.target.value)}
              className="w-full p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Settings Saved Successfully!
            </span>
          ) : (
            <span className="text-xs text-zinc-400">All modifications logged under audited administrator credentials.</span>
          )}

          <Button type="submit" variant="gold" size="md">
            <Save className="w-4 h-4 mr-1.5" />
            <span>Save Operational Parameters</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
