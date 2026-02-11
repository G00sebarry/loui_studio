// Legacy types (kept for backward compat)
export type Complexity = 'easy' | 'medium' | 'hard';
export type ItemType = 'apron' | 'hoodie' | 'shirt' | 'cut';

export interface PriceTier {
  min: number;
  max: number | null;
  price: number;
}

export interface PricingModel {
  [key: string]: PriceTier[];
}

export interface NavItem {
  label: string;
  href: string;
}

// ── New calculator types ────────────────────────────────

/** Шаг 1 — Тип изделия */
export type GarmentType =
  | 'hoodie'
  | 'shirt'
  | 'tshirt'
  | 'sweatshirt'
  | 'pants'
  | 'shorts'
  | 'cap'
  | 'apron'
  | 'fabric';

/** Ракурс изделия */
export type GarmentAngle = 'front' | 'back' | 'sleeve';

/** Шаг 2 — Расположение вышивки */
export type Placement =
  | 'chest_left'
  | 'chest_center'
  | 'chest_right'
  | 'back'
  | 'sleeve'
  | 'other';

/** Шаг 3 — Сложность дизайна */
export type DesignComplexity = 'simple' | 'medium' | 'complex';
