import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  Upload,
  MessageCircle,
  Check,
  Info,
} from 'lucide-react';
import {
  GarmentType,
  GarmentAngle,
  Placement,
  DesignComplexity,
} from '../types';
import {
  GARMENTS,
  PLACEMENTS,
  DESIGN_COMPLEXITY,
  lookupPrice,
  garmentImagePath,
  PLACEMENT_TO_ANGLE,
} from '../constants';

/* ─── helpers ─── */
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35 },
};

/* ─── step badge ─── */
const StepBadge: React.FC<{ n: number; done: boolean }> = ({ n, done }) => (
  <span
    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
      done ? 'bg-loui-blue text-white' : 'bg-loui-black text-white'
    }`}
  >
    {done ? <Check size={14} /> : n}
  </span>
);

/* ─── animated needle for empty state ─── */
const NeedleAnimation: React.FC = () => (
  <div className="relative w-20 h-20 mx-auto mb-4">
    <motion.svg viewBox="0 0 80 80" className="w-full h-full">
      <motion.path
        d="M 10 60 Q 25 20, 40 40 Q 55 60, 70 25"
        fill="none"
        stroke="#0047FF"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: 1, opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        r="3"
        fill="#0047FF"
        animate={{ cx: [10, 40, 70, 40, 10], cy: [60, 40, 25, 40, 60] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {[
        { cx: 20, cy: 38, delay: 0.5 },
        { cx: 35, cy: 42, delay: 1.0 },
        { cx: 50, cy: 35, delay: 1.5 },
        { cx: 62, cy: 30, delay: 2.0 },
      ].map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r="1.5"
          fill="#0047FF"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.svg>
  </div>
);

/* ━━━ MAIN COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Calculator: React.FC = () => {
  const [selectedGarments, setSelectedGarments] = useState<GarmentType[]>([]);
  const [placement, setPlacement] = useState<Placement | null>(null);
  const [complexity, setComplexity] = useState<DesignComplexity | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  /* toggle garment selection */
  const toggleGarment = (id: GarmentType) => {
    setSelectedGarments((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  /* derived state */
  const hasGarments = selectedGarments.length > 0;
  const step = !hasGarments
    ? 1
    : placement === null
      ? 2
      : complexity === null
        ? 3
        : 4;

  const allSelected = hasGarments && placement !== null && complexity !== null;

  /* Which garment to preview (last selected) */
  const previewGarment = hasGarments
    ? GARMENTS.find(
        (g) => g.id === selectedGarments[selectedGarments.length - 1],
      )
    : null;

  /* What angle to show based on placement */
  const previewAngle: GarmentAngle = useMemo(() => {
    if (!placement || !previewGarment) return 'front';
    const desired = PLACEMENT_TO_ANGLE[placement];
    return previewGarment.angles.includes(desired) ? desired : 'front';
  }, [placement, previewGarment]);

  /* Pricing */
  const { pricePerItem, totalPrice } = useMemo(() => {
    if (!allSelected) return { pricePerItem: 0, totalPrice: 0 };
    const perItem = lookupPrice(complexity, quantity);
    return { pricePerItem: perItem, totalPrice: perItem * quantity };
  }, [complexity, quantity, allSelected]);

  /* Labels */
  const placementLabel = PLACEMENTS.find((p) => p.id === placement)?.label;
  const complexityData = DESIGN_COMPLEXITY.find((c) => c.id === complexity);
  const garmentLabels = selectedGarments
    .map((id) => GARMENTS.find((g) => g.id === id)?.label)
    .filter(Boolean);

  return (
    <section
      id="calculator"
      className="py-24 px-6 md:px-12 lg:px-20 bg-loui-bg relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            КАЛЬКУЛЯТОР <span className="text-loui-blue">ЦЕНЫ</span>
          </h2>
          <p className="text-xl text-gray-500">
            Узнай цену быстрее, чем заварится эспрессо.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* ─── Left: Steps ─── */}
          <div className="w-full lg:w-2/3 space-y-10">
            {/* STEP 1 — Тип изделия (3×3 grid) */}
            <div>
              <h3 className="text-lg font-bold uppercase mb-5 flex items-center gap-2">
                <StepBadge n={1} done={hasGarments} />
                Тип изделия
                {hasGarments && (
                  <span className="text-sm font-normal normal-case text-gray-400 ml-2">
                    (можно несколько)
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-3 gap-3 max-w-md">
                {GARMENTS.map((g) => {
                  const isSelected = selectedGarments.includes(g.id);
                  return (
                    <button
                      key={g.id}
                      onClick={() => toggleGarment(g.id)}
                      className="relative aspect-square overflow-hidden rounded-xl group"
                    >
                      {/* Garment image background */}
                      <img
                        src={garmentImagePath(g.id, 'front')}
                        alt={g.label}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Default subtle overlay */}
                      <div
                        className={`absolute inset-0 transition-all duration-300 ${
                          isSelected
                            ? 'bg-loui-blue/30'
                            : 'bg-black/10 group-hover:bg-black/40'
                        }`}
                      />
                      {/* Selected border */}
                      <div
                        className={`absolute inset-0 rounded-xl border-3 transition-colors duration-200 ${
                          isSelected
                            ? 'border-loui-blue'
                            : 'border-transparent'
                        }`}
                      />
                      {/* Checkmark */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1.5 right-1.5 w-5 h-5 bg-loui-blue rounded-full flex items-center justify-center"
                        >
                          <Check size={12} className="text-white" />
                        </motion.div>
                      )}
                      {/* Label on hover / always when selected */}
                      <div
                        className={`absolute inset-x-0 bottom-0 px-2 py-1.5 text-center transition-all duration-300 ${
                          isSelected
                            ? 'opacity-100 bg-loui-blue/80'
                            : 'opacity-0 group-hover:opacity-100 bg-black/60'
                        }`}
                      >
                        <span className="text-white text-xs font-bold uppercase tracking-wide">
                          {g.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2 — Расположение вышивки */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div {...fadeUp}>
                  <h3 className="text-lg font-bold uppercase mb-5 flex items-center gap-2">
                    <StepBadge n={2} done={placement !== null} />
                    Расположение вышивки
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {PLACEMENTS.map((pl) => (
                      <button
                        key={pl.id}
                        onClick={() => setPlacement(pl.id)}
                        className={`px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200
                          ${
                            placement === pl.id
                              ? 'border-loui-blue bg-white text-loui-blue shadow-md'
                              : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white/60'
                          }`}
                      >
                        {pl.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 3 — Сложность */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div {...fadeUp}>
                  <h3 className="text-lg font-bold uppercase mb-5 flex items-center gap-2">
                    <StepBadge n={3} done={complexity !== null} />
                    Сложность дизайна
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {DESIGN_COMPLEXITY.map((cx) => (
                      <button
                        key={cx.id}
                        onClick={() => setComplexity(cx.id)}
                        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-200 text-left flex flex-col
                          ${
                            complexity === cx.id
                              ? 'border-loui-blue bg-white shadow-lg scale-[1.02]'
                              : 'border-gray-200 hover:border-gray-400 bg-white/60'
                          }`}
                      >
                        {/* Example image placeholder */}
                        <div className="h-28 bg-gray-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={`/items/complexity-${cx.id}.png`}
                            alt={cx.label}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                'none';
                            }}
                          />
                        </div>
                        <div className="p-4 flex flex-col gap-1.5">
                          <span className="font-bold text-base">
                            {cx.label}
                          </span>
                          <span className="text-sm text-gray-500 leading-snug">
                            {cx.desc}
                          </span>
                          <span
                            className={`text-sm font-bold mt-1 ${
                              complexity === cx.id
                                ? 'text-loui-blue'
                                : 'text-gray-400'
                            }`}
                          >
                            от {cx.minPrice} ₽/шт
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-3">
                    Чем больше тираж — тем ниже цена за штуку
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 4 — Количество */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div {...fadeUp}>
                  <h3 className="text-lg font-bold uppercase mb-5 flex items-center gap-2">
                    <StepBadge n={4} done={allSelected} />
                    Количество:{' '}
                    <span className="text-loui-blue">{quantity} шт.</span>
                  </h3>
                  <div className="relative pt-2 pb-2">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-loui-blue"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-3 font-mono">
                      <span>1</span>
                      <span>10</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* Upload CTA */}
                  <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-300 bg-white/60 p-6 text-center">
                    <Upload className="mx-auto mb-3 text-gray-400" size={28} />
                    <p className="font-medium text-gray-700">
                      Загрузите свой дизайн
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Мы оценим точную стоимость за&nbsp;10&nbsp;минут
                    </p>
                    <button className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-loui-blue px-5 py-2.5 text-sm font-bold text-loui-blue hover:bg-loui-blue hover:text-white transition-colors">
                      <Upload size={16} />
                      Выбрать файл
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── Right: Preview + Result Card ─── */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 space-y-4">
              {/* Garment preview */}
              <AnimatePresence>
                {previewGarment && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="relative aspect-square bg-gray-50">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`${previewGarment.id}-${previewAngle}`}
                          src={garmentImagePath(
                            previewGarment.id,
                            previewAngle,
                          )}
                          alt={previewGarment.label}
                          className="h-full w-full object-contain p-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      </AnimatePresence>
                    </div>
                    {/* Selected garments row */}
                    {selectedGarments.length > 1 && (
                      <div className="flex gap-2 px-3 py-2 border-t border-gray-100 overflow-x-auto">
                        {selectedGarments.map((id) => {
                          const g = GARMENTS.find((g) => g.id === id)!;
                          const isActive =
                            id ===
                            selectedGarments[selectedGarments.length - 1];
                          return (
                            <div
                              key={id}
                              className={`shrink-0 w-10 h-10 rounded-lg overflow-hidden border-2 transition-colors ${
                                isActive
                                  ? 'border-loui-blue'
                                  : 'border-transparent opacity-50'
                              }`}
                            >
                              <img
                                src={garmentImagePath(id, 'front')}
                                alt={g.label}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result card */}
              <motion.div
                className="bg-loui-black text-white p-8 rounded-3xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-loui-blue blur-[60px] opacity-40 rounded-full pointer-events-none" />

                <div className="relative z-10">
                  <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-6">
                    Расчёт стоимости
                  </h4>

                  <AnimatePresence mode="wait">
                    {allSelected ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Breakdown */}
                        <div className="space-y-3 text-sm mb-6 border-b border-gray-700 pb-6">
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-400 shrink-0">
                              Изделие
                            </span>
                            <span className="text-right">
                              {garmentLabels.join(', ')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Расположение
                            </span>
                            <span>{placementLabel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Сложность</span>
                            <span>{complexityData?.label}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Количество</span>
                            <span>{quantity} шт.</span>
                          </div>
                        </div>

                        {/* Prices */}
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-gray-300">Цена за шт:</span>
                          <span className="text-xl font-mono">
                            {pricePerItem.toLocaleString()} ₽
                          </span>
                        </div>

                        <div className="flex justify-between items-end mb-8">
                          <span className="text-gray-300">Итого:</span>
                          <motion.span
                            key={totalPrice}
                            initial={{ scale: 1.15, color: '#0047FF' }}
                            animate={{ scale: 1, color: '#FFFFFF' }}
                            className="text-4xl md:text-5xl font-bold font-display"
                          >
                            {totalPrice.toLocaleString()} ₽
                          </motion.span>
                        </div>

                        <button className="w-full bg-loui-blue text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-loui-orange transition-colors duration-300 mb-4">
                          Забронировать цену
                        </button>

                        <button className="w-full flex items-center justify-center gap-2 border border-gray-600 text-gray-300 py-3 rounded-xl text-sm font-medium hover:border-white hover:text-white transition-colors">
                          <MessageCircle size={16} />
                          Помочь с выбором
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-6"
                      >
                        <NeedleAnimation />
                        <p className="text-gray-300 text-sm font-medium mb-1">
                          Ваша вышивка формируется
                        </p>
                        <p className="text-gray-500 text-xs mb-6">
                          Выберите параметры слева
                        </p>
                        <div className="flex items-center justify-center gap-1.5">
                          {[1, 2, 3, 4].map((s) => (
                            <motion.span
                              key={s}
                              className="h-2 rounded-full"
                              animate={{
                                width: s < step ? 24 : s === step ? 24 : 8,
                                backgroundColor:
                                  s < step
                                    ? '#0047FF'
                                    : s === step
                                      ? '#6b7280'
                                      : '#374151',
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 text-[10px] mt-3 uppercase tracking-wider">
                          шаг {step} из 4
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="bg-gray-900 rounded-lg p-3 flex gap-3 items-start mt-4">
                    <Info className="text-loui-orange min-w-[20px]" size={20} />
                    <p className="text-xs text-gray-400 leading-tight">
                      Цены ориентировочные. Для сложных дизайнов или больших
                      тиражей финальную цену утвердит технолог.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
