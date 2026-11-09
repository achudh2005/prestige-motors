import { MOCK_VEHICLES } from '@/lib/mock-data/vehicles';
import { Vehicle } from '@/types';

// Supabase client helper with high-fidelity local fallback
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project-id')
  );
};

export async function fetchVehicles(): Promise<Vehicle[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_VEHICLES;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/vehicles?select=*`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
      },
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error('Failed to fetch from Supabase');
    return await res.json();
  } catch (err) {
    console.warn('Falling back to Prestige luxury mock data:', err);
    return MOCK_VEHICLES;
  }
}
