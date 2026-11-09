'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  Car,
  Users,
  Calendar,
  RefreshCw,
  DollarSign,
  Megaphone,
  Settings,
  Lock,
  LogOut,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Role simulation: 'admin' | 'sales' | 'service' | 'marketing'
  const [currentRole, setCurrentRole] = useState<'admin' | 'sales' | 'service' | 'marketing'>('admin');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [twoFactorVerified, setTwoFactorVerified] = useState(true);

  const navItems = [
    { label: 'Executive KPIs', href: '/admin', icon: LayoutDashboard, roles: ['admin', 'sales', 'service', 'marketing'] },
    { label: 'Inventory Desk', href: '/admin/inventory', icon: Car, roles: ['admin', 'sales', 'marketing'] },
    { label: 'Leads CRM', href: '/admin/crm', icon: Users, roles: ['admin', 'sales'] },
    { label: 'Test Drives', href: '/admin/test-drives', icon: Calendar, roles: ['admin', 'sales', 'service'] },
    { label: 'Trade-Ins & Finance', href: '/admin/trade-ins', icon: RefreshCw, roles: ['admin', 'sales'] },
    { label: 'Sales Deals Desk', href: '/admin/sales', icon: DollarSign, roles: ['admin', 'sales'] },
    { label: 'Marketing Hub', href: '/admin/marketing', icon: Megaphone, roles: ['admin', 'marketing'] },
    { label: 'Dealership Settings', href: '/admin/settings', icon: Settings, roles: ['admin'] },
  ];

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      setTwoFactorVerified(true);
      setShow2FAModal(false);
      setOtpError('');
    } else {
      setOtpError('Invalid 6-digit verification code. Please check your authenticator application.');
    }
  };

  const handleRoleChange = (role: 'admin' | 'sales' | 'service' | 'marketing') => {
    setCurrentRole(role);
    // If switching to admin role, prompt for 2FA
    if (role === 'admin' && !twoFactorVerified) {
      setShow2FAModal(true);
    }
  };

  const visibleNav = navItems.filter((item) => item.roles.includes(currentRole));

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-[#07080b] flex flex-col">
      {/* Top Admin Bar */}
      <div className="bg-zinc-950 text-white px-4 sm:px-8 py-3 border-b border-zinc-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-500" />
            <span className="font-bold tracking-wider uppercase font-mono">
              Prestige Admin Console
            </span>
          </div>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>Role:</span>
            <select
              value={currentRole}
              onChange={(e) => handleRoleChange(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-700 rounded px-2 py-0.5 text-amber-400 font-bold uppercase text-[11px] focus:outline-none"
            >
              <option value="admin">Administrator (Superuser)</option>
              <option value="sales">Sales Director</option>
              <option value="service">Service & Prep</option>
              <option value="marketing">Marketing Director</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShow2FAModal(true)}
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400"
          >
            <KeyRound className="w-3 h-3 text-amber-500" />
            <span>2FA {twoFactorVerified ? 'Active' : 'Required'}</span>
          </button>
          <Link
            href="/"
            className="text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Exit to Public Site &rarr;
          </Link>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white dark:bg-[#0e1017] border-r border-zinc-200 dark:border-zinc-800 p-4 shrink-0 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-3 py-2">
            Operations &bull; {currentRole.toUpperCase()}
          </div>
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border-l-2 border-amber-500'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-500' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </aside>

        {/* Content View */}
        <main className="flex-grow p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* 2FA Verification Modal */}
      {show2FAModal && (
        <Modal
          isOpen={show2FAModal}
          onClose={() => setShow2FAModal(false)}
          title="Two-Factor Security Authentication (2FA)"
          maxWidth="sm"
        >
          <form onSubmit={handleVerify2FA} className="space-y-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              To modify dealership parameters, export sensitive CRM datasets, or configure pricing, enter the 6-digit token from your authenticator device (e.g. Google Authenticator / 1Password).
            </p>

            <Input
              label="6-Digit Verification Code"
              type="text"
              required
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 849201"
              error={otpError}
              className="text-center font-mono text-lg tracking-widest"
            />

            <Button type="submit" variant="gold" fullWidth size="md">
              <Lock className="w-4 h-4 mr-1.5" />
              <span>Verify & Authenticate Session</span>
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
