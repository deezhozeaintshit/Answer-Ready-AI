export type BusinessCategory =
  | 'Plumber'
  | 'HVAC'
  | 'Roofer'
  | 'Electrician'
  | 'Contractor'
  | 'Dentist'
  | 'Doctor'
  | 'Lawyer'
  | 'Realtor'
  | 'Auto Shop'
  | 'Hair Salon'
  | 'Barber'
  | 'Accountant'
  | 'Financial Advisor'
  | 'Cleaning Service'
  | 'Landscaper'
  | 'Hotel'
  | 'Restaurant'
  | 'Bakery / Cafe'
  | 'Retail Store'
  | 'E-commerce'
  | 'Consultant'
  | 'Freelancer'
  | 'Creator'
  | 'Nonprofit'
  | 'Local Organization'
  | 'Personal Brand'
  | 'Other';

export interface AddressInfo {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OperatingHours {
  day: string;
  hours: string;
  isOpen247?: boolean;
  isEmergencyOnly?: boolean;
}

export interface SocialProfile {
  platform: 'Google' | 'Facebook' | 'Instagram' | 'Yelp' | 'LinkedIn' | 'X' | 'YouTube' | 'TikTok' | 'Other';
  url: string;
}

export interface Identity {
  businessName: string;
  legalName: string;
  brandName: string;
  industry: string;
  category: BusinessCategory;
  description: string;
  shortAiDescription: string;
  tagline: string;
  foundedYear: string;
  locations: string[];
  serviceAreas: string[];
}

export interface ContactInfo {
  phone: string;
  emergencyPhone?: string;
  email: string;
  website: string;
  address: AddressInfo;
  hours: OperatingHours[];
  appointmentUrl: string;
  socialProfiles: SocialProfile[];
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  pricing: string;
  serviceAreas: string[];
  targetCustomer: string;
  problemsSolved: string[];
  isVerified: boolean;
}

export interface BusinessPolicy {
  name: string;
  details: string;
}

export interface BusinessFacts {
  specialties: string[];
  differentiators: string[];
  yearsInBusiness: string | number;
  certifications: string[];
  licenses: string[];
  awards: string[];
  associations: string[];
  brandsCarried: string[];
  paymentMethods: string[];
  policies: BusinessPolicy[];
}

export interface CustomerReview {
  author: string;
  rating: number;
  text: string;
  source: string;
  date?: string;
}

export interface TrustSignals {
  rating: number;
  reviewCount: number;
  topReviews: CustomerReview[];
  awards: string[];
  accreditations: string[];
  stats: { label: string; value: string }[];
  mediaMentions: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  status: 'approved' | 'pending' | 'rejected';
  source: 'website' | 'ai-suggested' | 'manual';
  category?: string;
}

export interface RecommendationIssue {
  id: string;
  title: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
  whatIsWrong: string;
  whyItMatters: string;
  howToFix: string;
  suggestedFix: string;
  applied: boolean;
}

export interface ConsistencyIssue {
  id: string;
  field: string;
  sourceA: { name: string; value: string };
  sourceB: { name: string; value: string };
  discrepancy: string;
  whyItMatters: string;
  suggestedValue: string;
  resolved: boolean;
}

export interface ChangeLogEntry {
  id: string;
  date: string;
  type: 'hours' | 'services' | 'contact' | 'pricing' | 'address';
  title: string;
  description: string;
  detectedFrom: string;
  status: 'detected' | 'reviewed' | 'applied';
}

export interface AIReadinessScore {
  overallScore: number;
  breakdown: {
    identity: number;
    contact: number;
    services: number;
    location: number;
    faqs: number;
    trust: number;
    websiteContent: number;
    consistency: number;
    structuredData: number;
    discoverability: number;
  };
  summary: string;
  wouldAiRecommend: {
    rating: 'Strongly Recommended' | 'Moderately Recommended' | 'Needs Clarification' | 'Hard for AI to Recommend';
    score: number;
    strengths: string[];
    gaps: string[];
    verdict: string;
  };
}

export interface BusinessProfile {
  id: string;
  slug: string;
  updatedAt: string;
  completenessScore: number;
  identity: Identity;
  contact: ContactInfo;
  services: ServiceItem[];
  facts: BusinessFacts;
  trust: TrustSignals;
  faqs: FAQItem[];
  aiReadiness: AIReadinessScore;
  consistencyIssues: ConsistencyIssue[];
  recommendations: RecommendationIssue[];
  changeLogs: ChangeLogEntry[];
}

export interface CompetitorComparisonItem {
  name: string;
  website: string;
  readinessScore: number;
  serviceClarity: 'High' | 'Medium' | 'Low';
  hoursClarity: 'High' | 'Medium' | 'Low';
  faqCompleteness: 'High' | 'Medium' | 'Low';
  structuredDataPresent: boolean;
  strengths: string[];
  weaknesses: string[];
}

export interface AgencyClient {
  id: string;
  clientName: string;
  industry: string;
  website: string;
  readinessScore: number;
  status: 'Active' | 'Needs Attention' | 'Optimized';
  lastScanned: string;
  profile: BusinessProfile;
}

export interface AgencySettings {
  agencyName: string;
  logoUrl?: string;
  primaryColor: string;
  contactEmail: string;
  customDomain: string;
  footerText: string;
}

export type AppView =
  | 'landing'
  | 'prospect-scanner'
  | 'onboarding'
  | 'dashboard-overview'
  | 'dashboard-profile'
  | 'dashboard-readiness'
  | 'dashboard-consistency'
  | 'dashboard-ask-ai'
  | 'dashboard-recommendations'
  | 'dashboard-content-gen'
  | 'dashboard-knowledge-graph'
  | 'dashboard-widget'
  | 'dashboard-monitoring'
  | 'dashboard-competitors'
  | 'dashboard-export'
  | 'public-profile'
  | 'agency-dashboard'
  | 'sales-report'
  | 'monthly-report'
  | 'pricing';

// Type Aliases for compatibility
export type BusinessService = ServiceItem;
export type BusinessFaq = FAQItem;
export type ProfileChangeLog = ChangeLogEntry;
export type RecommendationItem = RecommendationIssue;

