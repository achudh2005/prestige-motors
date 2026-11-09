import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Prestige Luxury Motors | New & Certified Pre-Owned Supercars & Luxury Vehicles',
  description: 'Curating the world’s most coveted high-performance, exotic, and ultra-luxury motorcars including Porsche, Ferrari, Bentley, Rolls-Royce, and Aston Martin.',
  keywords: ['luxury cars', 'exotic cars', 'supercars', 'Porsche 911', 'Ferrari Roma', 'Bentley Continental GT', 'Rolls Royce Ghost', 'prestige motors'],
  openGraph: {
    title: 'Prestige Luxury Motors | Curated Exotic & Supercar Inventory',
    description: 'Bespoke vehicle acquisitions, certified pre-owned excellence, and nationwide enclosed delivery.',
    url: 'https://prestigeluxurymotors.com',
    siteName: 'Prestige Luxury Motors',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Prestige Luxury Motors Showroom'
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#fcfcfd] dark:bg-[#090a0f] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-amber-500 selection:text-black">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
