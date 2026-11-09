export type VehicleStatus = 'available' | 'reserved' | 'sold';
export type VehicleCondition = 'new' | 'cpo' | 'pre_owned';
export type ImageType = 'exterior' | 'interior' | 'detail' | 'video';
export type FuelType = 'Petrol' | 'Hybrid' | 'Electric' | 'Diesel';
export type TransmissionType = 'Automatic' | 'Dual-Clutch PDK' | 'Manual' | '8-Speed Sport Auto';
export type BodyType = 'Coupe' | 'Sedan' | 'SUV' | 'Convertible' | 'Supercar';
export type DrivetrainType = 'AWD' | 'RWD' | 'FWD';

export interface VehicleImage {
  id: string;
  vehicleId: string;
  url: string;
  thumbnailUrl?: string;
  sortOrder: number;
  type: ImageType;
  altText: string;
}

export interface VehicleFeature {
  id: string;
  vehicleId: string;
  category: 'Performance' | 'Interior & Comfort' | 'Audio & Technology' | 'Safety & Driver Assistance';
  name: string;
}

export interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  color: string;
  interiorColor: string;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  engine: string;
  powerHp: number;
  torqueNm: number;
  acceleration0To100: number; // in seconds
  topSpeedKmh: number;
  bodyType: BodyType;
  drivetrain: DrivetrainType;
  price: number;
  reservationDeposit: number;
  status: VehicleStatus;
  condition: VehicleCondition;
  isCertified: boolean;
  historyReportUrl?: string;
  locationId: string;
  viewsCount: number;
  createdAt: string;
  images: VehicleImage[];
  features: VehicleFeature[];
  // computed or joined
  locationName?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: {
    mon_fri: string;
    sat: string;
    sun: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Review {
  id: string;
  customerName: string;
  vehicleModel: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending';
  createdAt: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed' | 'lost';
export type LeadSource = 'enquiry' | 'test_drive' | 'finance' | 'trade_in' | 'contact';

export interface Lead {
  id: string;
  customerId?: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  vehicleId?: string;
  vehicleName?: string;
  status: LeadStatus;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  staffName: string;
  type: 'note' | 'call' | 'email' | 'status_change' | 'test_drive_booked';
  note: string;
  createdAt: string;
}

export type TestDriveStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface TestDrive {
  id: string;
  vehicleId: string;
  vehicleName?: string;
  leadId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  locationId: string;
  locationName?: string;
  scheduledAt: string; // ISO string
  status: TestDriveStatus;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
}

export interface TradeIn {
  id: string;
  leadId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: 'excellent' | 'very_good' | 'good' | 'fair';
  vin?: string;
  estimateLow: number;
  estimateHigh: number;
  photos?: string[];
  status: 'pending_review' | 'appraised' | 'accepted' | 'declined';
  createdAt: string;
}

export interface FinanceApplication {
  id: string;
  leadId: string;
  vehicleId: string;
  vehicleName?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  downPayment: number;
  termMonths: number;
  interestRate: number;
  monthlyPayment: number;
  creditScoreRange: string;
  status: 'submitted' | 'under_review' | 'pre_approved' | 'approved' | 'declined';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  coverImage: string;
  excerpt: string;
  body: string;
  readTime: string;
  publishedAt: string;
}

export interface BrandInfo {
  name: string;
  slug: string;
  logo: string;
  country: string;
  vehicleCount: number;
}
