import { Vehicle, BrandInfo } from '@/types';

export const LUXURY_BRANDS: BrandInfo[] = [
  { name: 'Porsche', slug: 'porsche', logo: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80', country: 'Germany', vehicleCount: 14 },
  { name: 'Ferrari', slug: 'ferrari', logo: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=400&q=80', country: 'Italy', vehicleCount: 9 },
  { name: 'Bentley', slug: 'bentley', logo: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=400&q=80', country: 'United Kingdom', vehicleCount: 7 },
  { name: 'Aston Martin', slug: 'aston-martin', logo: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=400&q=80', country: 'United Kingdom', vehicleCount: 6 },
  { name: 'Rolls-Royce', slug: 'rolls-royce', logo: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=400&q=80', country: 'United Kingdom', vehicleCount: 5 },
  { name: 'Mercedes-AMG', slug: 'mercedes-amg', logo: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80', country: 'Germany', vehicleCount: 12 },
];

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'veh-001',
    vin: 'WP0AF2A97NS298101',
    make: 'Porsche',
    model: '911 GT3 (992)',
    trim: 'Clubsport Carbon Package',
    year: 2024,
    color: 'Shark Blue',
    interiorColor: 'Black Race-Tex & Shark Blue Stitching',
    mileage: 1850,
    fuelType: 'Petrol',
    transmission: 'Dual-Clutch PDK',
    engine: '4.0L Naturally Aspirated Boxer-6',
    powerHp: 502,
    torqueNm: 470,
    acceleration0To100: 3.4,
    topSpeedKmh: 318,
    bodyType: 'Coupe',
    drivetrain: 'RWD',
    price: 268500,
    reservationDeposit: 2500,
    status: 'available',
    condition: 'cpo',
    isCertified: true,
    historyReportUrl: 'https://carfax.com/sample',
    locationId: 'loc-001',
    locationName: 'Prestige Beverly Hills',
    viewsCount: 1420,
    createdAt: '2024-03-01T10:00:00Z',
    images: [
      {
        id: 'img-101',
        vehicleId: 'veh-001',
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 1,
        type: 'exterior',
        altText: 'Porsche 911 GT3 front three-quarters in Shark Blue'
      },
      {
        id: 'img-102',
        vehicleId: 'veh-001',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 2,
        type: 'exterior',
        altText: 'Porsche 911 GT3 rear wing and aerodiffuser'
      },
      {
        id: 'img-103',
        vehicleId: 'veh-001',
        url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 3,
        type: 'interior',
        altText: 'Porsche Carbon bucket seats and steering wheel'
      },
      {
        id: 'img-104',
        vehicleId: 'veh-001',
        url: 'https://images.unsplash.com/photo-1611245453000-20ba219a1805?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 4,
        type: 'detail',
        altText: 'Porsche Ceramic Composite Brakes (PCCB) Yellow Caliper'
      }
    ],
    features: [
      { id: 'f-1', vehicleId: 'veh-001', category: 'Performance', name: 'Porsche Ceramic Composite Brakes (PCCB)' },
      { id: 'f-2', vehicleId: 'veh-001', category: 'Performance', name: 'Front Axle Lift System' },
      { id: 'f-3', vehicleId: 'veh-001', category: 'Performance', name: 'Carbon Fiber Reinforced Plastic (CFRP) Bonnet' },
      { id: 'f-4', vehicleId: 'veh-001', category: 'Interior & Comfort', name: 'Full Carbon Bucket Racing Seats' },
      { id: 'f-5', vehicleId: 'veh-001', category: 'Audio & Technology', name: 'BOSE® Surround Sound System' },
      { id: 'f-6', vehicleId: 'veh-001', category: 'Audio & Technology', name: 'Chrono Package with Lap Trigger' },
      { id: 'f-7', vehicleId: 'veh-001', category: 'Safety & Driver Assistance', name: 'ParkAssist (Rear) with Reversing Camera' },
      { id: 'f-8', vehicleId: 'veh-001', category: 'Safety & Driver Assistance', name: 'LED Matrix Headlights in Black with PDLS Plus' }
    ]
  },
  {
    id: 'veh-002',
    vin: 'ZFF89VPA8P0284719',
    make: 'Ferrari',
    model: 'Roma',
    trim: 'V8 2+ Coupe',
    year: 2023,
    color: 'Grigio Silverstone',
    interiorColor: 'Rosso Ferrari Poltrona Frau Leather',
    mileage: 3200,
    fuelType: 'Petrol',
    transmission: '8-Speed Sport Auto',
    engine: '3.9L Twin-Turbocharged V8',
    powerHp: 612,
    torqueNm: 760,
    acceleration0To100: 3.4,
    topSpeedKmh: 320,
    bodyType: 'Coupe',
    drivetrain: 'RWD',
    price: 289500,
    reservationDeposit: 3000,
    status: 'available',
    condition: 'cpo',
    isCertified: true,
    historyReportUrl: 'https://carfax.com/sample',
    locationId: 'loc-002',
    locationName: 'Prestige Manhattan',
    viewsCount: 2180,
    createdAt: '2024-03-05T12:30:00Z',
    images: [
      {
        id: 'img-201',
        vehicleId: 'veh-002',
        url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 1,
        type: 'exterior',
        altText: 'Ferrari Roma front view in Grigio Silverstone'
      },
      {
        id: 'img-202',
        vehicleId: 'veh-002',
        url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 2,
        type: 'interior',
        altText: 'Ferrari Roma dual cockpit interior with passenger display'
      },
      {
        id: 'img-203',
        vehicleId: 'veh-002',
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 3,
        type: 'detail',
        altText: 'Ferrari Scuderia wing shields'
      }
    ],
    features: [
      { id: 'f-21', vehicleId: 'veh-002', category: 'Performance', name: 'Ferrari Side Slip Control 6.0 (SSC 6.0)' },
      { id: 'f-22', vehicleId: 'veh-002', category: 'Performance', name: 'Active Aerodynamic Rear Spoiler with 3 Deploy Positions' },
      { id: 'f-23', vehicleId: 'veh-002', category: 'Interior & Comfort', name: 'Passenger Interactive Display 8.8-inch' },
      { id: 'f-24', vehicleId: 'veh-002', category: 'Interior & Comfort', name: 'Ventilated and Massaging Electric Comfort Seats' },
      { id: 'f-25', vehicleId: 'veh-002', category: 'Audio & Technology', name: 'JBL Premium High-Power Audio System' },
      { id: 'f-26', vehicleId: 'veh-002', category: 'Safety & Driver Assistance', name: 'ADAS Full Package (Adaptive Cruise, Lane Keep, 360 Camera)' }
    ]
  },
  {
    id: 'veh-003',
    vin: 'SCBBR7ZG9PC091244',
    make: 'Bentley',
    model: 'Continental GT Speed',
    trim: 'Mulliner Blackline Edition',
    year: 2024,
    color: 'Beluga Metallic',
    interiorColor: 'Linen & Beluga Split with Contrast Stitching',
    mileage: 450,
    fuelType: 'Petrol',
    transmission: '8-Speed Sport Auto',
    engine: '6.0L Twin-Turbocharged W12 TSI',
    powerHp: 650,
    torqueNm: 900,
    acceleration0To100: 3.6,
    topSpeedKmh: 335,
    bodyType: 'Coupe',
    drivetrain: 'AWD',
    price: 335000,
    reservationDeposit: 3500,
    status: 'available',
    condition: 'new',
    isCertified: true,
    historyReportUrl: 'https://carfax.com/sample',
    locationId: 'loc-001',
    locationName: 'Prestige Beverly Hills',
    viewsCount: 3100,
    createdAt: '2024-03-08T09:15:00Z',
    images: [
      {
        id: 'img-301',
        vehicleId: 'veh-003',
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 1,
        type: 'exterior',
        altText: 'Bentley Continental GT Speed in Beluga Black'
      },
      {
        id: 'img-302',
        vehicleId: 'veh-003',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 2,
        type: 'interior',
        altText: 'Bentley Rotating Display and Diamond Knurled Controls'
      }
    ],
    features: [
      { id: 'f-31', vehicleId: 'veh-003', category: 'Performance', name: 'Electronic All-Wheel Steering & Electronic LSD' },
      { id: 'f-32', vehicleId: 'veh-003', category: 'Performance', name: 'Bentley Dynamic Ride 48V Active Anti-Roll System' },
      { id: 'f-33', vehicleId: 'veh-003', category: 'Interior & Comfort', name: 'Bentley Rotating Display (Wood / 12.3-inch / Gauges)' },
      { id: 'f-34', vehicleId: 'veh-003', category: 'Interior & Comfort', name: 'Diamond-in-Diamond Hand Quilted Hide' },
      { id: 'f-35', vehicleId: 'veh-003', category: 'Audio & Technology', name: 'Naim for Bentley 2,200W 18-Speaker Audio' }
    ]
  },
  {
    id: 'veh-004',
    vin: 'SCFRMAAW6RGR00921',
    make: 'Aston Martin',
    model: 'DB12 Coupe',
    trim: 'Super Tourer Launch Edition',
    year: 2024,
    color: 'Aston Martin Racing Green',
    interiorColor: 'Tan Semi-Aniline Leather & Satin Carbon',
    mileage: 890,
    fuelType: 'Petrol',
    transmission: '8-Speed Sport Auto',
    engine: '4.0L Twin-Turbocharged V8',
    powerHp: 671,
    torqueNm: 800,
    acceleration0To100: 3.5,
    topSpeedKmh: 325,
    bodyType: 'Coupe',
    drivetrain: 'RWD',
    price: 295000,
    reservationDeposit: 3000,
    status: 'available',
    condition: 'new',
    isCertified: true,
    historyReportUrl: 'https://carfax.com/sample',
    locationId: 'loc-003',
    locationName: 'Prestige Miami Beach',
    viewsCount: 1840,
    createdAt: '2024-03-10T14:40:00Z',
    images: [
      {
        id: 'img-401',
        vehicleId: 'veh-004',
        url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 1,
        type: 'exterior',
        altText: 'Aston Martin DB12 in British Racing Green'
      },
      {
        id: 'img-402',
        vehicleId: 'veh-004',
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 2,
        type: 'interior',
        altText: 'Aston Martin DB12 center console and bespoke switchgear'
      }
    ],
    features: [
      { id: 'f-41', vehicleId: 'veh-004', category: 'Performance', name: 'Electronic Rear Differential (E-Diff)' },
      { id: 'f-42', vehicleId: 'veh-004', category: 'Performance', name: 'Intelligent Adaptive Bilstein DTX Dampers' },
      { id: 'f-43', vehicleId: 'veh-004', category: 'Audio & Technology', name: 'Bowers & Wilkins 390W Bespoke Audio' },
      { id: 'f-44', vehicleId: 'veh-004', category: 'Interior & Comfort', name: 'Bridge of Weir Hand-Stitched Leather Interior' }
    ]
  },
  {
    id: 'veh-005',
    vin: 'SCA664D50PUX18920',
    make: 'Rolls-Royce',
    model: 'Ghost Extended',
    trim: 'Bespoke Atelier Collection',
    year: 2023,
    color: 'Diamond Black with Silver Satin Bonnet',
    interiorColor: 'Mandarin & Navy Blue Bespoke Leather',
    mileage: 4800,
    fuelType: 'Petrol',
    transmission: '8-Speed Sport Auto',
    engine: '6.75L Twin-Turbocharged V12',
    powerHp: 563,
    torqueNm: 850,
    acceleration0To100: 4.8,
    topSpeedKmh: 250,
    bodyType: 'Sedan',
    drivetrain: 'AWD',
    price: 425000,
    reservationDeposit: 5000,
    status: 'available',
    condition: 'cpo',
    isCertified: true,
    historyReportUrl: 'https://carfax.com/sample',
    locationId: 'loc-002',
    locationName: 'Prestige Manhattan',
    viewsCount: 4210,
    createdAt: '2024-02-15T16:00:00Z',
    images: [
      {
        id: 'img-501',
        vehicleId: 'veh-005',
        url: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 1,
        type: 'exterior',
        altText: 'Rolls-Royce Ghost Extended Pantheon Grille'
      },
      {
        id: 'img-502',
        vehicleId: 'veh-005',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 2,
        type: 'interior',
        altText: 'Rolls-Royce Starlight Headliner and Serenity Rear Seats'
      }
    ],
    features: [
      { id: 'f-51', vehicleId: 'veh-005', category: 'Interior & Comfort', name: 'Shooting Star Fiber-Optic Starlight Headliner' },
      { id: 'f-52', vehicleId: 'veh-005', category: 'Interior & Comfort', name: 'Rear Immersive Seating with Champagne Cooler & Crystal Flutes' },
      { id: 'f-53', vehicleId: 'veh-005', category: 'Performance', name: 'Planar Suspension System with Upper Wishbone Damper' },
      { id: 'f-54', vehicleId: 'veh-005', category: 'Performance', name: 'Satellite-Aided Transmission with GPS Terrain Preview' }
    ]
  },
  {
    id: 'veh-006',
    vin: 'W1NYG7HJ9RX190342',
    make: 'Mercedes-AMG',
    model: 'G 63',
    trim: 'Grand Edition 1 of 1000',
    year: 2024,
    color: 'Manufaktur Night Black Mango',
    interiorColor: 'G Manufaktur Nappa Leather in Black & Gold',
    mileage: 1200,
    fuelType: 'Petrol',
    transmission: '8-Speed Sport Auto',
    engine: '4.0L Handcrafted AMG Bi-Turbo V8',
    powerHp: 577,
    torqueNm: 850,
    acceleration0To100: 4.5,
    topSpeedKmh: 240,
    bodyType: 'SUV',
    drivetrain: 'AWD',
    price: 248900,
    reservationDeposit: 2500,
    status: 'available',
    condition: 'cpo',
    isCertified: true,
    historyReportUrl: 'https://carfax.com/sample',
    locationId: 'loc-003',
    locationName: 'Prestige Miami Beach',
    viewsCount: 2650,
    createdAt: '2024-03-02T11:20:00Z',
    images: [
      {
        id: 'img-601',
        vehicleId: 'veh-006',
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 1,
        type: 'exterior',
        altText: 'Mercedes-AMG G 63 in Night Black Magno'
      },
      {
        id: 'img-602',
        vehicleId: 'veh-006',
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
        sortOrder: 2,
        type: 'interior',
        altText: 'Mercedes-AMG G 63 Dual 12.3-inch Widescreen Cockpit'
      }
    ],
    features: [
      { id: 'f-61', vehicleId: 'veh-006', category: 'Performance', name: 'AMG Performance Exhaust with Dual Side Pipes' },
      { id: 'f-62', vehicleId: 'veh-006', category: 'Performance', name: 'Triple 100% Differential Locks (Front, Center, Rear)' },
      { id: 'f-63', vehicleId: 'veh-006', category: 'Interior & Comfort', name: 'Burmester® Surround Sound System 590W' },
      { id: 'f-64', vehicleId: 'veh-006', category: 'Safety & Driver Assistance', name: 'Driving Assistance Package with Active Distance Assist' }
    ]
  }
];
