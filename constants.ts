import { PricingModel, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Преимущества', href: '#features' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Контакты', href: '#footer' },
];

// Extrapolated pricing logic based on user prompt
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
    { min: 10, max: 20, price: 600 }, // Scaled up from easy
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