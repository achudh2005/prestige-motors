import React from 'react';
import { MOCK_LOCATIONS } from '@/lib/mock-data/locations';
import { MapPin, Phone, Mail, Clock, Navigation, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LocationsPage() {
  return (
    <div className="py-12 bg-zinc-50 dark:bg-[#090a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Showrooms & Private Salons</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 uppercase font-serif tracking-tight">
            Our Gallery Locations
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Visit our architectural showrooms designed for discrete consultations, custom specification ateliers, and vehicle deliveries.
          </p>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MOCK_LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="bg-white dark:bg-[#11131c] rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              {/* Interactive Stylized Map Placeholder */}
              <div className="relative aspect-[16/9] bg-zinc-900 overflow-hidden group">
                <div
                  className="w-full h-full bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    Flagship Gallery
                  </span>
                  <div className="text-base font-bold font-serif">{loc.name}</div>
                </div>
              </div>

              {/* Showroom Details */}
              <div className="p-6 space-y-5 flex-grow">
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{loc.address}</p>
                      <p className="text-zinc-500">{loc.city}, {loc.state} {loc.postalCode}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 pt-1">
                    <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                    <a href={`tel:${loc.phone}`} className="hover:text-amber-500 font-mono font-medium">
                      {loc.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                    <a href={`mailto:${loc.email}`} className="hover:text-amber-500">
                      {loc.email}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="p-3.5 rounded-md bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800 text-xs space-y-1.5">
                  <div className="font-bold uppercase tracking-wider text-[10px] text-zinc-400 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>Operational Hours</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                    <span>Monday &ndash; Friday</span>
                    <span className="font-mono">{loc.hours.mon_fri}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                    <span>Saturday</span>
                    <span className="font-mono">{loc.hours.sat}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                    <span>Sunday</span>
                    <span className="font-mono">{loc.hours.sun}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <Link href={`/test-drive?location=${loc.id}`} className="block w-full">
                  <Button variant="gold" fullWidth size="sm">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    <span>Schedule Appointment Here</span>
                  </Button>
                </Link>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${loc.address}, ${loc.city}, ${loc.state}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button variant="outline" fullWidth size="sm" className="text-xs">
                    <Navigation className="w-3.5 h-3.5 mr-1.5" />
                    <span>Get GPS Directions</span>
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
