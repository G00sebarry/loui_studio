export type Complexity = 'easy' | 'medium' | 'hard';

// Legacy – kept for backward compat if needed
export type ItemType = 'apron' | 'hoodie' | 'shirt' | 'cut';

// ── New calculator types ────────────────────────────────

/** Шаг 1 — Что хотите вышить? */
export type DesignType = 'logo' | 'large' | 'small';

/** Шаг 2 — Где будет вышивка? */
export type Placement =
  | 'chest_left'
  | 'chest_center'
  | 'chest_right'
  | 'back'
  | 'sleeve'
  | 'collar'
  | 'hood'
  | 'pants'
  | 'cut';

/** Шаг 3 — Сложность дизайна */
export type DesignComplexity = 'simple' | 'medium' | 'complex';

// ── Pricing helpers ─────────────────────────────────────

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
