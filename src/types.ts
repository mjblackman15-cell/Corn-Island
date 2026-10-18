export type Category = 'All' | 'Beaches' | 'Food & Drink' | 'Activities' | 'Practical Tips';

export type Island = 'All' | 'Big Corn' | 'Little Corn';

export type PriceTier = '$' | '$$' | '$$$';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Spot {
  id: string;
  name: string;
  category: 'Beaches' | 'Food & Drink' | 'Activities' | 'Practical Tips';
  island: 'Big Corn' | 'Little Corn';
  priceTier: PriceTier;
  insiderTip: string;
  description: string;
  locationDetails: string;
  operatingHours: string;
  coordinates: [number, number]; // [lat, lng]
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  isUserSubmitted?: boolean;
}

export interface AppTip {
  id: string;
  title: string;
  category: 'App Guide' | 'Offline & GPS' | 'Island Logistics' | 'Local Customs';
  content: string;
  author: string;
  date: string;
  votes: number;
}
