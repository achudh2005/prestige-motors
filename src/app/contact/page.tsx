'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Shield, Clock, Sparkles } from 'lucide-react';
import { MOCK_LOCATIONS } from '@/lib/mock-data/locations';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Vehicle Acquisition');
  const [preferredLocation, setPreferredLocation] = useState(MOCK_LOCATIONS[0].name);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // VIP Concierge Chat simulation state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'bot' | 'user'; text: string }[]>([
    { sender: 'bot', text: 'Welcome to Prestige Private Concierge. How may our acquisition team assist you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const existingLeads = JSON.parse(localStorage.getItem('prestige_leads') || '[]');
      existingLeads.unshift({
        id: 'contact-' + Date.now(),
        name,
        email,
        phone,
        source: 'contact',
        status: 'new',
        notes: `Interest: ${interest} at ${preferredLocation}. Message: ${message}`,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('prestige_leads', JSON.stringify(existingLeads));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Thank you for your message regarding "${userText}". An authorized Senior Client Director is reviewing this thread and will follow up directly.`
        }
      ]);
    }, 800);
  };

  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Client Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Connect With Our Gallery
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Whether seeking a rare limited allocation, bespoke financing consultation, or private showroom viewing, our executive directors remain at your service.
          </p>
        </div>

        {/* 2-Column Layout: Contact Form + Direct Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Enquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide font-serif border-b border-zinc-100 dark:border-zinc-800 pb-3">
              Direct Showroom Inquiry
            </h3>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-serif">
                  Inquiry Dispatched
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-zinc-800 dark:text-zinc-200">{name}</span>. Your correspondence has been routed to the Director of Client Care at our {preferredLocation}.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Submit Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Legal Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lord Sterling"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                  />
                  <Input
                    label="Direct Phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Primary Nature of Interest
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      <option value="Vehicle Acquisition">Vehicle Acquisition / Specific Model</option>
                      <option value="Private Consignment">Private Consignment / Sourcing</option>
                      <option value="Trade-In Appraisal">Exotic Trade-In Appraisal</option>
                      <option value="Bespoke Financing">Bespoke Financing / Trust Leasing</option>
                      <option value="Private Showroom Viewing">Private Showroom Tour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Preferred Gallery Location
                    </label>
                    <select
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      {MOCK_LOCATIONS.map((l) => (
                        <option key={l.id} value={l.name}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Confidential Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please specify any particular marques, exterior color palettes, or delivery timelines..."
                    className="w-full px-3.5 py-2.5 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <Button type="submit" variant="gold" fullWidth size="lg" disabled={loading}>
                  <Send className="w-4 h-4 mr-2" />
                  <span>{loading ? 'Routing to Concierge...' : 'Dispatch Confidential Inquiry'}</span>
                </Button>

                <div className="text-center text-[10px] text-zinc-400 flex items-center justify-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  <span>Strict Non-Disclosure Protocol Observed</span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Showroom Contacts & Chat Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            {/* VIP Live Concierge Chat Widget */}
            <div className="bg-white dark:bg-[#11131c] rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    VIP Concierge Chat (Live Desk)
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Response: &lt; 2 min</span>
              </div>

              {/* Chat Log Window */}
              <div className="h-48 overflow-y-auto space-y-3 p-3 rounded bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-2.5 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-amber-600 text-white rounded-br-none'
                          : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChatMessage} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about allocations, pricing, or shipping..."
                  className="flex-grow px-3 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
                />
                <Button type="submit" variant="gold" size="sm">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            </div>

            {/* Direct Telephone Hotline */}
            <div className="p-6 rounded-lg bg-zinc-900 text-white border border-zinc-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    Private Client Hotline
                  </div>
                  <a
                    href="tel:+13105558900"
                    className="text-xl font-bold font-mono text-white hover:text-amber-400 transition-colors"
                  >
                    +1 (310) 555-8900
                  </a>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct access to our senior automotive desk for immediate off-market acquisition queries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
