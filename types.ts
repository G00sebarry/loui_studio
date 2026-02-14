export interface NavItem {
  label: string;
  href: string;
}

// ── Calculator types ────────────────────────────────────

/** Тип изделия */
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

/** Расположение вышивки (динамическое, зависит от изделия) */
export type Placement = string;

/** Сложность дизайна */
export type DesignComplexity = 'simple' | 'medium' | 'complex';

/** Настройки одного изделия в заказе */
export interface GarmentOrder {
  garment: GarmentType;
  placements: string[];
  quantity: number;
}
