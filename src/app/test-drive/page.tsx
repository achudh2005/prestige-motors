'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_VEHICLES } from '@/lib/mock-data/vehicles';
import { MOCK_LOCATIONS } from '@/lib/mock-data/locations';
import { generateIcsCalendarFile, downloadIcsFile } from '@/lib/ics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MapPin, CheckCircle2, Download, AlertCircle, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function TestDriveContent() {
  const searchParams = useSearchParams();
  const preselectedVehicleId = searchParams.get('vehicleId');

  const [vehicleId, setVehicleId] = useState(preselectedVehicleId || MOCK_VEHICLES[0].id);
  const [locationId, setLocationId] = useState(MOCK_LOCATIONS[0].id);
  const [date, setDate] = useState(() => {
    // Tomorrow by default
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    bookingId: string;
    vehicleName: string;
    locationName: string;
    locationAddress: string;
    dateTimeString: string;
    startDate: Date;
  } | null>(null);

  const selectedVehicle = MOCK_VEHICLES.find((v) => v.id === vehicleId) || MOCK_VEHICLES[0];
  const selectedLocation = MOCK_LOCATIONS.find((l) => l.id === locationId) || MOCK_LOCATIONS[0];

  const availableTimeSlots = [
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const vehicleTitle = `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`;
    const bookingSlotKey = `${vehicleId}_${date}_${timeSlot}`;

    // Prevent double booking check
    try {
      const existingBookings = JSON.parse(localStorage.getItem('prestige_test_drives') || '[]');
      const isAlreadyBooked = existingBookings.some(
        (b: any) => b.vehicleId === vehicleId && b.date === date && b.timeSlot === timeSlot && b.status !== 'cancelled'
      );

      if (isAlreadyBooked) {
        setLoading(false);
        setErrorMsg(`The ${timeSlot} slot on ${date} for the ${vehicleTitle} is already reserved by another client. Please select an alternate time slot.`);
        return;
      }

      const bookingId = 'td-' + Date.now();
      const newBooking = {
        id: bookingId,
        vehicleId,
        vehicleName: vehicleTitle,
        locationId,
        locationName: selectedLocation.name,
        date,
        timeSlot,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        notes,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };

      existingBookings.unshift(newBooking);
      localStorage.setItem('prestige_test_drives', JSON.stringify(existingBookings));

      // Also create a lead record for CRM
      const existingLeads = JSON.parse(localStorage.getItem('prestige_leads') || '[]');
      existingLeads.unshift({
        id: 'lead-td-' + Date.now(),
        name,
        email,
        phone,
        source: 'test_drive',
        vehicleId,
        vehicleName: vehicleTitle,
        status: 'new',
        notes: `VIP Test Drive booked at ${selectedLocation.name} for ${date} at ${timeSlot}. Special requests: ${notes || 'None'}`,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('prestige_leads', JSON.stringify(existingLeads));

      // Calculate start Date object for ICS
      const [hoursStr, minutesPart] = timeSlot.split(':');
      const minutes = parseInt(minutesPart.split(' ')[0], 10);
      let hours = parseInt(hoursStr, 10);
      if (timeSlot.includes('PM') && hours !== 12) hours += 12;
      if (timeSlot.includes('AM') && hours === 12) hours = 0;

      const [yearStr, monthStr, dayStr] = date.split('-');
      const startDateTime = new Date(parseInt(yearStr), parseInt(monthStr) - 1, parseInt(dayStr), hours, minutes);

      setTimeout(() => {
        setLoading(false);
        setConfirmedBooking({
          bookingId,
          vehicleName: vehicleTitle,
          locationName: selectedLocation.name,
          locationAddress: `${selectedLocation.address}, ${selectedLocation.city}, ${selectedLocation.state}`,
          dateTimeString: `${date} at ${timeSlot}`,
          startDate: startDateTime
        });
      }, 600);
    } catch {
      setLoading(false);
    }
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const ics = generateIcsCalendarFile({
      title: `Prestige Test Drive: ${confirmedBooking.vehicleName}`,
      description: `Your exclusive private test drive appointment for the ${confirmedBooking.vehicleName} at ${confirmedBooking.locationName}. Please present your valid driver's license upon arrival. Concierge direct: (310) 555-8900.`,
      location: `${confirmedBooking.locationName}, ${confirmedBooking.locationAddress}`,
      startDate: confirmedBooking.startDate,
      durationMinutes: 60
    });

    downloadIcsFile(`prestige-test-drive-${confirmedBooking.bookingId}.ics`, ics);
  };

  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Private Viewing & Dynamic Demonstration</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Schedule VIP Test Drive
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Experience unparalleled performance on private scenic or track circuits accompanied by our Marque Specialist.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Screen */
          <div className="bg-white dark:bg-[#11131c] rounded-xl border border-amber-500/30 p-8 sm:p-10 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Reservation Confirmed &bull; #{confirmedBooking.bookingId}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 font-serif">
                We Look Forward to Welcoming You
              </h2>
            </div>

            <div className="p-5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left space-y-3 max-w-md mx-auto text-xs">
              <div className="flex justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500">Vehicle:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{confirmedBooking.vehicleName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500">Scheduled Date & Time:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400 font-mono">{confirmedBooking.dateTimeString}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Gallery Location:</span>
                <span className="font-medium text-right text-zinc-800 dark:text-zinc-200 max-w-[200px]">
                  {confirmedBooking.locationName}<br />
                  <span className="text-zinc-400 text-[10px]">{confirmedBooking.locationAddress}</span>
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="md" onClick={handleDownloadCalendar} className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                <span>Add to Apple / Google Calendar (.ics)</span>
              </Button>

              <Link href="/inventory" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full sm:w-auto">
                  <span>Return to Showroom Collection</span>
                </Button>
              </Link>
            </div>

            <p className="text-[11px] text-zinc-400 max-w-md mx-auto pt-2">
              A reminder notification will be dispatched 24 hours prior to your scheduled drive. Complimentary valet and espresso service await you upon arrival.
            </p>
          </div>
        ) : (
          /* Booking Form */
          <div className="bg-white dark:bg-[#11131c] rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 shadow-sm space-y-6">
            {errorMsg && (
              <div className="p-4 rounded-md bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Slot Unavailable: </span>
                  {errorMsg}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Vehicle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                  1. Desired Vehicle
                </label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  {MOCK_VEHICLES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.year} {v.make} {v.model} &bull; {v.color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Showroom Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                  2. Select Showroom Gallery
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MOCK_LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setLocationId(loc.id)}
                      className={`p-3 rounded-sm border text-left transition-all ${
                        locationId === loc.id
                          ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300'
                          : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <div className="text-xs font-bold">{loc.name}</div>
                      <div className="text-[10px] text-zinc-400 mt-1">{loc.city}, {loc.state}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    3. Appointment Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    4. Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client Info */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  5. Client Credentials
                </label>

                <Input
                  label="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Legal Full Name"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@familyoffice.com"
                  />
                  <Input
                    label="Telephone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Concierge Notes & Driver Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g. Bringing co-driver; interested in track telemetry comparison."
                    className="w-full px-3.5 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <Button type="submit" variant="gold" fullWidth size="lg" disabled={loading}>
                <Calendar className="w-4 h-4 mr-2" />
                <span>{loading ? 'Confirming Availability...' : 'Confirm VIP Demonstration Appointment'}</span>
              </Button>

              <div className="text-center text-[11px] text-zinc-400 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>Double-Booking Protected &bull; Instant Calendar (.ics) Generation</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TestDrivePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono">Loading Test Drive Scheduler...</div>}>
      <TestDriveContent />
    </Suspense>
  );
}
