import { BlogPost } from '@/types';

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Art of Naturally Aspirated Flat-Six: Driving the 992 GT3',
    slug: 'art-of-naturally-aspirated-flat-six-gt3',
    author: 'Julian Thorne, Chief Automotive Curator',
    category: 'Track & Performance',
    coverImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'In an era dominated by hybrid assistance and forced induction, Porsche’s 9,000 RPM motorsport powerplant stands as an uncompromising monument to mechanical purity.',
    body: 'There are few sensory experiences in the automotive universe quite like pulling the right paddle of a PDK gearbox as the rev counter touches nine thousand rotations per minute in a 992-generation GT3...',
    readTime: '6 min read',
    publishedAt: '2024-03-01'
  },
  {
    id: 'post-2',
    title: 'The Modern Grand Tourer: Aston Martin DB12 vs Ferrari Roma',
    slug: 'modern-grand-tourer-db12-vs-roma',
    author: 'Camilla Dupont, Senior Automotive Editor',
    category: 'Comparisons',
    coverImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'We take two of Europe’s most seductive trans-continental GTs across coastal passes to examine their craftsmanship, chassis dynamics, and bespoke grand touring philosophy.',
    body: 'Grand touring was forged in the mid-twentieth century for high-speed travel between capital cities in absolute opulence. Today, Aston Martin’s Super Tourer moniker confronts Ferrari’s Nuova Dolce Vita...',
    readTime: '8 min read',
    publishedAt: '2024-02-24'
  },
  {
    id: 'post-3',
    title: 'Certified Pre-Owned: What Our 150-Point Inspection Truly Means',
    slug: 'certified-pre-owned-150-point-inspection-explained',
    author: 'Henrik Lindqvist, Master Certification Technician',
    category: 'Ownership & Care',
    coverImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Why our certified pre-owned certification standards surpass factory minimums, including paint thickness ultrasonic verification, ceramic brake disc rotor resonance testing, and comprehensive ECU telemetry audit.',
    body: 'Acquiring an exotic or hyper-luxury motorcar demands peace of mind. Every vehicle designated with the Prestige CPO marque undergoes a seven-day diagnostic protocol before showroom presentation...',
    readTime: '5 min read',
    publishedAt: '2024-02-12'
  }
];
