import { Location } from '@/types';

export const MOCK_LOCATIONS: Location[] = [
  {
    id: 'loc-001',
    name: 'Prestige Beverly Hills Flagship',
    address: '9640 Wilshire Blvd',
    city: 'Beverly Hills',
    state: 'CA',
    postalCode: '90212',
    phone: '+1 (310) 555-8900',
    email: 'beverlyhills@prestigeluxurymotors.com',
    hours: {
      mon_fri: '9:00 AM – 7:00 PM',
      sat: '10:00 AM – 6:00 PM',
      sun: 'Private Appointments Only'
    },
    coordinates: {
      lat: 34.0673,
      lng: -118.4025
    }
  },
  {
    id: 'loc-002',
    name: 'Prestige Manhattan Gallery',
    address: '432 Park Avenue Suite 100',
    city: 'New York',
    state: 'NY',
    postalCode: '10022',
    phone: '+1 (212) 555-0144',
    email: 'manhattan@prestigeluxurymotors.com',
    hours: {
      mon_fri: '9:30 AM – 7:30 PM',
      sat: '10:00 AM – 6:00 PM',
      sun: 'Closed'
    },
    coordinates: {
      lat: 40.7615,
      lng: -73.9715
    }
  },
  {
    id: 'loc-003',
    name: 'Prestige Miami Waterfront',
    address: '1100 Biscayne Blvd',
    city: 'Miami',
    state: 'FL',
    postalCode: '33132',
    phone: '+1 (305) 555-7722',
    email: 'miami@prestigeluxurymotors.com',
    hours: {
      mon_fri: '9:00 AM – 7:00 PM',
      sat: '10:00 AM – 6:00 PM',
      sun: '11:00 AM – 4:00 PM'
    },
    coordinates: {
      lat: 25.7852,
      lng: -80.1903
    }
  }
];
