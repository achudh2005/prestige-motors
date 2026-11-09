'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import { Phone, Calendar, Menu, X, ChevronDown, Shield, Sparkles } from 'lucide-react';
import { LUXURY_BRANDS } from '@/lib/mock-data/vehicles';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setBrandsDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Inventory', href: '/inventory' },
    { label: 'Compare', href: '/compare' },
    { label: 'Financing', href: '/financing' },
    { label: 'Trade-In', href: '/trade-in' },
    { label: 'About', href: '/about' },
    { label: 'Locations', href: '/locations' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'glass-panel shadow-md py-3'
          : 'bg-white/95 dark:bg-[#090a0f]/95 border-b border-zinc-200/80 dark:border-zinc-800/80 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-zinc-950 font-bold shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-zinc-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-widest text-zinc-900 dark:text-zinc-50 uppercase font-serif">
                PRESTIGE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-amber-600 dark:text-amber-400 font-semibold -mt-1 uppercase">
                Motorcars &bull; Private Client
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/inventory"
              className={`text-sm font-medium tracking-wide transition-colors hover:text-amber-500 ${
                pathname === '/inventory' ? 'text-amber-500 font-semibold' : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              Inventory
            </Link>

            {/* Brands Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBrandsDropdownOpen(true)}
              onMouseLeave={() => setBrandsDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium tracking-wide text-zinc-700 dark:text-zinc-300 hover:text-amber-500 py-1 transition-colors focus:outline-none"
                onClick={() => setBrandsDropdownOpen(!brandsDropdownOpen)}
              >
                <span>Brands</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {brandsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 p-2 py-3 backdrop-blur-xl">
                    <div className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 px-3 pb-2 uppercase tracking-wider">
                      Featured Marques
                    </div>
                    {LUXURY_BRANDS.map((brand) => (
                      <Link
                        key={brand.slug}
                        href={`/inventory?make=${encodeURIComponent(brand.name)}`}
                        className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm text-zinc-800 dark:text-zinc-200"
                      >
                        <span className="font-medium">{brand.name}</span>
                        <span className="text-xs text-zinc-400 font-mono">{brand.vehicleCount} vehicles</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-amber-500 ${
                  pathname === link.href ? 'text-amber-500 font-semibold' : 'text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+13105558900"
              className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors py-1.5 px-2.5 rounded border border-transparent hover:border-zinc-300 dark:hover:border-zinc-800"
              title="Call VIP Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>(310) 555-8900</span>
            </a>

            <ThemeToggle />

            <Link href="/test-drive">
              <Button variant="gold" size="sm" className="shadow-amber-500/10">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <span>Book Test Drive</span>
              </Button>
            </Link>

            <Link href="/admin">
              <button
                className="p-1.5 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
                title="Admin CRM Portal"
              >
                <Shield className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-4 pb-6 space-y-3 shadow-2xl">
          <div className="space-y-1">
            <Link
              href="/inventory"
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Inventory
            </Link>
            <div className="px-3 py-1 text-xs font-semibold uppercase text-zinc-400 tracking-wider">
              Marques
            </div>
            <div className="grid grid-cols-2 gap-1 pl-3 pb-2">
              {LUXURY_BRANDS.map((b) => (
                <Link
                  key={b.slug}
                  href={`/inventory?make=${encodeURIComponent(b.name)}`}
                  className="text-sm py-1 text-zinc-600 dark:text-zinc-400 hover:text-amber-500"
                >
                  {b.name}
                </Link>
              ))}
            </div>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <a
              href="tel:+13105558900"
              className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 rounded-md"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Call Concierge: (310) 555-8900</span>
            </a>
            <Link href="/test-drive" className="block w-full">
              <Button variant="gold" fullWidth size="md">
                <Calendar className="w-4 h-4 mr-2" />
                Book VIP Test Drive
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
