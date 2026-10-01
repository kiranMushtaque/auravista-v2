import { CampaignCreative } from '../types/billboard';

// Public campaign asset paths
const adFashion = '/images/campaigns/ad_fashion_campaign_1790763165729.jpg';
const adAutomotive = '/images/campaigns/ad_automotive_campaign_1790763183646.jpg';
const adTech = '/images/campaigns/ad_tech_campaign_1790763197344.jpg';
const adPerfume = '/images/campaigns/ad_perfume_campaign_1790763209311.jpg';

export const SAMPLE_CAMPAIGNS: CampaignCreative[] = [
  {
    id: 'camp-fashion',
    brand: 'AURA HAUTE COUTURE',
    tagline: 'Autumn / Winter Noir Collection',
    category: 'Fashion',
    imageUrl: adFashion,
    accentColor: '#D97706',
    description: 'Minimalist editorial luxury fashion campaign with sculptural silhouettes and monochrome architectural composition.'
  },
  {
    id: 'camp-automotive',
    brand: 'VOLTIX PERFORMANCE',
    tagline: 'Pure Electric Velocity · 0-100 in 2.1s',
    category: 'Automotive',
    imageUrl: adAutomotive,
    accentColor: '#06B6D4',
    description: 'Next-generation electric hypercar campaign featuring aerodynamic titanium styling and cinematic metropolitan light streaks.'
  },
  {
    id: 'camp-tech',
    brand: 'NEXUS ACOUSTICS',
    tagline: 'Spatial Sound Beyond Architectural Limits',
    category: 'Technology',
    imageUrl: adTech,
    accentColor: '#8B5CF6',
    description: 'Precision spatial audio hardware campaign with sculptural acoustic design and ambient luminescent glow.'
  },
  {
    id: 'camp-perfume',
    brand: 'ÉLAN PARFUM',
    tagline: 'Essence of Midnight · Limited Atelier Release',
    category: 'Luxury & Fragrance',
    imageUrl: adPerfume,
    accentColor: '#F59E0B',
    description: 'Dark crystal flacon on obsidian marble plinth with dramatic amber backlighting and golden mist reflections.'
  }
];

export const DEFAULT_CAMPAIGN = SAMPLE_CAMPAIGNS[0];
