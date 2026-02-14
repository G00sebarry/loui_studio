import {
  NavItem,
  GarmentType,
  GarmentAngle,
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

// ── Garments ────────────────────────────────────────────

export interface PlacementOption {
  id: string;
  label: string;
  /** Ракурс превью при выборе этого расположения */
  angle: GarmentAngle;
  /** Является ли нестандартным (+10%) */
  isCustom?: boolean;
}

export interface GarmentInfo {
  id: GarmentType;
  label: string;
  placements: PlacementOption[];
}

export const GARMENTS: GarmentInfo[] = [
  {
    id: 'hoodie',
    label: 'Худи',
    placements: [
      { id: 'chest_left', label: 'Грудь слева', angle: 'front' },
      { id: 'chest_right', label: 'Грудь справа', angle: 'front' },
      { id: 'chest_center', label: 'Грудь по центру', angle: 'front' },
      { id: 'back', label: 'Спина', angle: 'back' },
      { id: 'other', label: 'Другое', angle: 'front', isCustom: true },
    ],
  },
  {
    id: 'shirt',
    label: 'Рубашка',
    placements: [
      { id: 'chest_left', label: 'Грудь слева', angle: 'front' },
      { id: 'chest_right', label: 'Грудь справа', angle: 'front' },
      { id: 'back', label: 'Спина', angle: 'back' },
      { id: 'sleeve', label: 'Рукав', angle: 'sleeve' },
      { id: 'other', label: 'Другое', angle: 'front', isCustom: true },
    ],
  },
  {
    id: 'tshirt',
    label: 'Футболка',
    placements: [
      { id: 'chest_left', label: 'Грудь слева', angle: 'front' },
      { id: 'chest_right', label: 'Грудь справа', angle: 'front' },
      { id: 'chest_center', label: 'Грудь по центру', angle: 'front' },
      { id: 'back', label: 'Спина', angle: 'back' },
      { id: 'other', label: 'Другое', angle: 'front', isCustom: true },
    ],
  },
  {
    id: 'sweatshirt',
    label: 'Свитшот',
    placements: [
      { id: 'chest_left', label: 'Грудь слева', angle: 'front' },
      { id: 'chest_right', label: 'Грудь справа', angle: 'front' },
      { id: 'chest_center', label: 'Грудь по центру', angle: 'front' },
      { id: 'back', label: 'Спина', angle: 'back' },
      { id: 'other', label: 'Другое', angle: 'front', isCustom: true },
    ],
  },
  {
    id: 'pants',
    label: 'Штаны',
    placements: [
      { id: 'pocket_left', label: 'Под карманом слева', angle: 'front' },
      { id: 'pocket_right', label: 'Под карманом справа', angle: 'front' },
      { id: 'other', label: 'Другое', angle: 'front', isCustom: true },
    ],
  },
  {
    id: 'shorts',
    label: 'Шорты',
    placements: [
      { id: 'pocket_left', label: 'Под карманом слева', angle: 'front' },
      { id: 'pocket_right', label: 'Под карманом справа', angle: 'front' },
      { id: 'other', label: 'Другое', angle: 'front', isCustom: true },
    ],
  },
  {
    id: 'cap',
    label: 'Бейсболка',
    placements: [
      { id: 'center', label: 'По центру', angle: 'front' },
      { id: 'back', label: 'Сзади', angle: 'back' },
      { id: 'other', label: 'Другое', angle: 'front', isCustom: true },
    ],
  },
  {
    id: 'apron',
    label: 'Фартук',
    placements: [
      { id: 'center', label: 'По центру', angle: 'front' },
      { id: 'other', label: 'Другое', angle: 'front', isCustom: true },
    ],
  },
  {
    id: 'fabric',
    label: 'Крой',
    placements: [
      { id: 'upload', label: 'Загрузить макет', angle: 'front' },
    ],
  },
];

/**
 * Путь к изображению изделия.
 * С расположением: /items/{garment}-{placementId}.png (пунктирная область)
 * Без расположения: /items/{garment}-front.png (обычный вид)
 */
export function garmentImagePath(
  id: GarmentType,
  placementId?: string | null,
): string {
  if (placementId && placementId !== 'other' && placementId !== 'upload') {
    return `/items/${id}-${placementId}.png`;
  }
  return `/items/${id}-front.png`;
}

// ── Complexity ──────────────────────────────────────────

export interface ComplexityAttr {
  emoji: string;
  label: string;
  value: string;
}

export const DESIGN_COMPLEXITY: {
  id: DesignComplexity;
  label: string;
  attrs: ComplexityAttr[];
  minPrice: number;
}[] = [
  {
    id: 'simple',
    label: 'Простая',
    attrs: [
      { emoji: '📐', label: 'размер', value: 'до 10 см' },
      { emoji: '🧵', label: 'цвет нити', value: 'до 2 шт' },
      { emoji: '🪡', label: 'заливка', value: 'нет' },
    ],
    minPrice: 330,
  },
  {
    id: 'medium',
    label: 'Средняя',
    attrs: [
      { emoji: '📐', label: 'размер', value: 'до 20 см' },
      { emoji: '🧵', label: 'цвет нити', value: 'до 5 шт' },
      { emoji: '🪡', label: 'заливка', value: 'есть' },
    ],
    minPrice: 440,
  },
  {
    id: 'complex',
    label: 'Сложная',
    attrs: [
      { emoji: '📐', label: 'размер', value: 'до 30 см' },
      { emoji: '🧵', label: 'цвет нити', value: 'без ограничений' },
      { emoji: '🪡', label: 'заливка', value: '3D вышивка' },
    ],
    minPrice: 630,
  },
];

/** Наценка за "Другое" расположение */
export const CUSTOM_PLACEMENT_SURCHARGE = 0.1; // +10%
