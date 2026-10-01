export type BillboardType = 'Digital LED' | 'Mega Rooftop' | 'Monolith Totem' | 'Highway Gantry' | 'Curved Spectacular';

export interface Billboard {
  id: string;
  name: string;
  type: BillboardType;
  city: string;
  district: string;
  address: string;
  size: string;
  dimensions: { width: number; height: number }; // In meters for 3D scale
  resolution: string;
  dailyTraffic: number;
  dailyImpressions: string;
  visibilityScore: string;
  illumination: string;
  dwellTime: string;
  availability: 'Available Now' | 'Reserved' | 'Next Slot: Nov 1';
  rateWeekly: string;
  description: string;
  aspectRatio: number; // width / height
  position: [number, number, number];
  rotation: [number, number, number];
  lookAtOffset?: [number, number, number];
  cameraFocusPos: [number, number, number];
  cameraLookAt: [number, number, number];
  currentAdUrl: string;
  defaultCampaignId: string;
}

export interface CampaignCreative {
  id: string;
  brand: string;
  tagline: string;
  category: 'Fashion' | 'Automotive' | 'Technology' | 'Luxury & Fragrance' | 'Custom';
  imageUrl: string;
  accentColor: string;
  description: string;
}

export interface QuoteRequest {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  campaignType: string;
  selectedBillboardId: string;
  durationWeeks: number;
  startDate: string;
  budgetRange: string;
  notes?: string;
}
