import { PricingModel, NavItem, DesignType, Placement, DesignComplexity } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Преимущества', href: '#features' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Контакты', href: '#footer' },
];

// ── Legacy pricing (kept for reference) ─────────────────
export const PRICING: PricingModel = {
  easy: [
    { min: 1, max: 1, price: 1000 },
    { min: 2, max: 2, price: 850 },
    { min: 3, max: 4, price: 790 },
    { min: 5, max: 9, price: 600 },
    { min: 10, max: 20, price: 400 },
    { min: 21, max: 29, price: 370 },
    { min: 30, max: 39, price: 330 },
    { min: 40, max: null, price: 300 },
  ],
  medium: [
    { min: 1, max: 1, price: 1500 },
    { min: 2, max: 4, price: 1200 },
    { min: 5, max: 9, price: 900 },
    { min: 10, max: 20, price: 600 },
    { min: 21, max: 39, price: 500 },
    { min: 40, max: null, price: 450 },
  ],
  hard: [
    { min: 1, max: 1, price: 2500 },
    { min: 2, max: 4, price: 2000 },
    { min: 5, max: 9, price: 1500 },
    { min: 10, max: 20, price: 1000 },
    { min: 21, max: 39, price: 850 },
    { min: 40, max: null, price: 750 },
  ],
};

export const complexityLabels = {
  easy: {
    title: 'Изи',
    desc: 'Текст, линии, лого без заливки (5-15 см)',
  },
  medium: {
    title: 'Норм',
    desc: 'Лого с заливкой, надписи >15 см',
  },
  hard: {
    title: 'Хард',
    desc: 'Большая вышивка на спину, детализация, шевроны',
  },
};

// ── New calculator data ─────────────────────────────────

/** Шаг 1 — Что хотите вышить? */
export const DESIGN_TYPES: {
  id: DesignType;
  label: string;
  desc: string;
  sizeFactor: number;
}[] = [
  {
    id: 'logo',
    label: 'Логотип / Надпись',
    desc: 'Лого, надпись, эмблема — до 10 см',
    sizeFactor: 1.0,
  },
  {
    id: 'large',
    label: 'Крупный дизайн',
    desc: 'Спина, большой рисунок — до 27 см',
    sizeFactor: 2.0,
  },
  {
    id: 'small',
    label: 'Мелкие детали',
    desc: 'Имя, небольшая иконка, инициалы',
    sizeFactor: 0.5,
  },
];

/** Шаг 2 — Где будет вышивка? */
export const PLACEMENTS: {
  id: Placement;
  label: string;
  factor: number;
}[] = [
  { id: 'chest_left', label: 'Грудь слева', factor: 1.0 },
  { id: 'chest_center', label: 'Грудь по центру', factor: 1.0 },
  { id: 'chest_right', label: 'Грудь справа', factor: 1.0 },
  { id: 'back', label: 'Спина', factor: 1.0 },
  { id: 'sleeve', label: 'Рукав', factor: 1.05 },
  { id: 'collar', label: 'Воротник', factor: 1.1 },
  { id: 'hood', label: 'Капюшон', factor: 1.1 },
  { id: 'pants', label: 'Штаны / Шорты', factor: 1.05 },
  { id: 'cut', label: 'Крой (отдельная ткань)', factor: 0.85 },
];

/** Шаг 3 — Сложность дизайна */
export const DESIGN_COMPLEXITY: {
  id: DesignComplexity;
  label: string;
  desc: string;
  basePrice: number;
}[] = [
  {
    id: 'simple',
    label: 'Простой',
    desc: 'Текст, логотип из 1–2 цветов',
    basePrice: 500,
  },
  {
    id: 'medium',
    label: 'Средний',
    desc: 'Детализированный логотип, 3–5 цветов',
    basePrice: 1200,
  },
  {
    id: 'complex',
    label: 'Сложный',
    desc: 'Фотореалистичный рисунок, градиенты',
    basePrice: 2500,
  },
];

/** Шаг 4 — Скидки за объём */
export const QUANTITY_DISCOUNTS: {
  min: number;
  max: number | null;
  discount: number;
  label: string;
}[] = [
  { min: 1, max: 4, discount: 0, label: '' },
  { min: 5, max: 10, discount: 0.1, label: '-10%' },
  { min: 11, max: null, discount: 0.2, label: '-20%' },
];
