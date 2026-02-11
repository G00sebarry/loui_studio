import { NavItem, DesignType, Placement, DesignComplexity } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Преимущества', href: '#features' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Контакты', href: '#footer' },
];

// ── Actual pricing tiers (+10% от текущих цен, округлено до 10) ──

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
    { min: 10, max: 10, price: 720 },
  ],
};

// ── Calculator UI data ──────────────────────────────────

/** Шаг 1 — Что хотите вышить? */
export const DESIGN_TYPES: {
  id: DesignType;
  label: string;
  desc: string;
}[] = [
  {
    id: 'logo',
    label: 'Логотип / Надпись',
    desc: 'Лого, надпись, эмблема — до 10 см',
  },
  {
    id: 'large',
    label: 'Крупный дизайн',
    desc: 'Спина, большой рисунок — до 27 см',
  },
  {
    id: 'small',
    label: 'Мелкие детали',
    desc: 'Имя, небольшая иконка, инициалы',
  },
];

/** Шаг 2 — Где будет вышивка? */
export const PLACEMENTS: {
  id: Placement;
  label: string;
}[] = [
  { id: 'chest_left', label: 'Грудь слева' },
  { id: 'chest_center', label: 'Грудь по центру' },
  { id: 'chest_right', label: 'Грудь справа' },
  { id: 'back', label: 'Спина' },
  { id: 'sleeve', label: 'Рукав' },
  { id: 'collar', label: 'Воротник' },
  { id: 'hood', label: 'Капюшон' },
  { id: 'pants', label: 'Штаны / Шорты' },
  { id: 'cut', label: 'Крой (отдельная ткань)' },
];

/** Шаг 3 — Сложность дизайна */
export const DESIGN_COMPLEXITY: {
  id: DesignComplexity;
  label: string;
  desc: string;
  minPrice: number;   // мин. цена за шт (при макс. кол-ве) — для отображения
  maxQty: number;     // макс. количество в слайдере
}[] = [
  {
    id: 'simple',
    label: 'Простой',
    desc: 'Текст, логотип из 1–2 цветов, без заливки (5–15 см)',
    minPrice: 330,
    maxQty: 50,
  },
  {
    id: 'medium',
    label: 'Средний',
    desc: 'Лого с заливкой, надписи >15 см, 3–5 цветов',
    minPrice: 440,
    maxQty: 50,
  },
  {
    id: 'complex',
    label: 'Сложный',
    desc: 'Детализированная вышивка, градиенты, много цветов',
    minPrice: 720,
    maxQty: 10,
  },
];

/** Lookup price from tier table */
export function lookupPrice(complexity: DesignComplexity, qty: number): number {
  const tiers = CALC_PRICING[complexity];
  const tier = tiers.find((t) => qty >= t.min && qty <= t.max);
  return tier?.price ?? 0;
}
