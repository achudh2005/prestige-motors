import { Review } from '@/types';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    customerName: 'Alexander Vance',
    vehicleModel: '2024 Porsche 911 GT3',
    rating: 5,
    comment: 'The acquisition experience at Prestige was flawless. From white-glove enclosed transport directly to my private hangar in Monterey to their impeccable attention during custom delivery. Simply peerless.',
    status: 'approved',
    createdAt: '2024-02-18T14:20:00Z'
  },
  {
    id: 'rev-02',
    customerName: 'Elena Rostova',
    vehicleModel: '2023 Rolls-Royce Ghost Extended',
    rating: 5,
    comment: 'Prestige Motors redefined luxury client care for our family office. Their bespoke financing concierge arranged private structuring within 24 hours. The Starlight headliner is a masterpiece.',
    status: 'approved',
    createdAt: '2024-02-26T18:45:00Z'
  },
  {
    id: 'rev-03',
    customerName: 'Marcus Sterling',
    vehicleModel: '2024 Bentley Continental GT Speed',
    rating: 5,
    comment: 'Having owned numerous high-line grand tourers, the condition of their Certified Pre-Owned inventory rivals brand-new factory order delivery. Their 150-point report was transparent and exhaustive.',
    status: 'approved',
    createdAt: '2024-03-04T11:10:00Z'
  }
];
