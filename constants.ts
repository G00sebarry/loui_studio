import {
  NavItem,
  GarmentType,
  GarmentAngle,
  Placement,
  DesignComplexity,
} from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Преимущества', href: '#features' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Контакты', href: '#footer' },
];

// ── Pricing tiers (реальный прайс +10%, округлено до 10₽) ──

export interface CalcTier {
  min: number;
  max: number;
  price: number;
}

export const CALC_PRICING: Record<DesignComplexity, CalcTier[]> = {
  simple: [
    { min: 1, max: 1, price: 1100 },
    { min: 2, max: 2, price: 940 },
    { min: 3, max: 3, price: 870 },
    { min: 4, max: 4, price: 770 },
    { min: 5, max: 5, price: 720 },
    { min: 6, max: 6, price: 640 },
    { min: 7, max: 7, price: 610 },
    { min: 8, max: 8, price: 550 },
    { min: 9, max: 9, price: 500 },
    { min: 10, max: 20, price: 440 },
    { min: 21, max: 29, price: 410 },
    { min: 30, max: 39, price: 360 },
    { min: 40, max: 50, price: 330 },
  ],
  medium: [
    { min: 1, max: 1, price: 1650 },
    { min: 2, max: 2, price: 1320 },
    { min: 3, max: 3, price: 1100 },
    { min: 4, max: 4, price: 880 },
    { min: 5, max: 5, price: 830 },
    { min: 6, max: 6, price: 770 },
    { min: 7, max: 7, price: 720 },
    { min: 8, max: 8, price: 660 },
    { min: 9, max: 9, price: 610 },
    { min: 10, max: 20, price: 530 },
    { min: 21, max: 29, price: 510 },
    { min: 30, max: 39, price: 480 },
    { min: 40, max: 50, price: 440 },
  ],
  complex: [
    { min: 1, max: 1, price: 2200 },
    { min: 2, max: 2, price: 1760 },
    { min: 3, max: 3, price: 1430 },
    { min: 4, max: 4, price: 1100 },
    { min: 5, max: 5, price: 990 },
    { min: 6, max: 6, price: 940 },
    { min: 7, max: 7, price: 880 },
    { min: 8, max: 8, price: 830 },
    { min: 9, max: 9, price: 770 },
    { min: 10, max: 20, price: 720 },
    // экстраполяция для тиражей >10
    { min: 21, max: 29, price: 690 },
    { min: 30, max: 39, price: 660 },
    { min: 40, max: 50, price: 630 },
  ],
};

/** Lookup price from tier table */
export function lookupPrice(
  complexity: DesignComplexity,
  qty: number,
): number {
  const tiers = CALC_PRICING[complexity];
  const tier = tiers.find((t) => qty >= t.min && qty <= t.max);
  return tier?.price ?? 0;
}

// ── Garments (Шаг 1) ───────────────────────────────────

export interface GarmentInfo {
  id: GarmentType;
  label: string;
  /** Доступные ракурсы (front есть всегда) */
  angles: GarmentAngle[];
}

export const GARMENTS: GarmentInfo[] = [
  { id: 'hoodie', label: 'Худи', angles: ['front', 'back', 'sleeve'] },
  { id: 'shirt', label: 'Рубашка', angles: ['front', 'back', 'sleeve'] },
  { id: 'tshirt', label: 'Футболка', angles: ['front', 'back', 'sleeve'] },
  {
    id: 'sweatshirt',
    label: 'Свитшот',
    angles: ['front', 'back', 'sleeve'],
  },
  { id: 'pants', label: 'Штаны', angles: ['front', 'back'] },
  { id: 'shorts', label: 'Шорты', angles: ['front', 'back'] },
  { id: 'cap', label: 'Бейсболка', angles: ['front', 'back'] },
  { id: 'apron', label: 'Фартук', angles: ['front'] },
  { id: 'fabric', label: 'Крой', angles: ['front'] },
];

/** Путь к изображению изделия */
export function garmentImagePath(
  id: GarmentType,
  angle: GarmentAngle,
): string {
  return `/items/${id}-${angle}.png`;
}

/** Какой ракурс показывать при выборе расположения */
export const PLACEMENT_TO_ANGLE: Record<Placement, GarmentAngle> = {
  chest_left: 'front',
  chest_center: 'front',
  chest_right: 'front',
  back: 'back',
  sleeve: 'sleeve',
  other: 'front',
};

// ── Placements (Шаг 2) ─────────────────────────────────

export const PLACEMENTS: { id: Placement; label: string }[] = [
  { id: 'chest_left', label: 'Грудь слева' },
  { id: 'chest_center', label: 'Грудь по центру' },
  { id: 'chest_right', label: 'Грудь справа' },
  { id: 'back', label: 'Спина' },
  { id: 'sleeve', label: 'Рукав' },
  { id: 'other', label: 'Другое' },
];

// ── Complexity (Шаг 3) ─────────────────────────────────

export const DESIGN_COMPLEXITY: {
  id: DesignComplexity;
  label: string;
  desc: string;
  minPrice: number;
}[] = [
  {
    id: 'simple',
    label: 'Простая',
    desc: 'Лого, надпись, имя. Без заливки. 1–2 цвета. До 10 см',
    minPrice: 330,
  },
  {
    id: 'medium',
    label: 'Средняя',
    desc: 'Лого или надпись с заливкой. 3–5 цветов. До 15 см',
    minPrice: 440,
  },
  {
    id: 'complex',
    label: 'Сложная',
    desc: 'Большой рисунок, детализация, много цветов. До 30 см',
    minPrice: 630,
  },
];
