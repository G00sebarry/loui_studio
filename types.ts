export type Complexity = 'easy' | 'medium' | 'hard';

export type ItemType = 'apron' | 'hoodie' | 'shirt' | 'cut';

export interface PriceTier {
  min: number;
  max: number | null; // null means infinite/max
  price: number;
}

export interface PricingModel {
  [key: string]: PriceTier[];
}

export interface NavItem {
  label: string;
  href: string;
}