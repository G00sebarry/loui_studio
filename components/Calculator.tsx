import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Type,
  Image,
  Sparkles,
  AlertCircle,
  Upload,
  MessageCircle,
  Check,
  ChevronRight,
} from 'lucide-react';
import { DesignType, Placement, DesignComplexity } from '../types';
import {
  DESIGN_TYPES,
  PLACEMENTS,
  DESIGN_COMPLEXITY,
  QUANTITY_DISCOUNTS,
} from '../constants';

/* ─── icon map for design types ─── */
const designIcons: Record<DesignType, React.ReactNode> = {
  logo: <Type size={28} />,
  large: <Image size={28} />,
  small: <Sparkles size={28} />,
};

/* ─── helpers ─── */
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35 },
};

const getDiscount = (qty: number) => {
  const tier = QUANTITY_DISCOUNTS.find(
    (t) => qty >= t.min && (t.max === null || qty <= t.max),
  );
  return tier ?? QUANTITY_DISCOUNTS[0];
};

/* ─── step badge ─── */
const StepBadge: React.FC<{ n: number; done: boolean }> = ({ n, done }) => (
  <span
    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
      done
        ? 'bg-loui-blue text-white'
        : 'bg-loui-black text-white'
    }`}
  >
    {done ? <Check size={14} /> : n}
  </span>
);

/* ━━━ MAIN COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Calculator: React.FC = () => {
  const [designType, setDesignType] = useState<DesignType | null>(null);
  const [placement, setPlacement] = useState<Placement | null>(null);
  const [complexity, setComplexity] = useState<DesignComplexity | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  /* derived */
  const step =
    designType === null
      ? 1
      : placement === null
        ? 2
        : complexity === null
          ? 3
          : 4;

  const allSelected = designType !== null && placement !== null && complexity !== null;

  const { pricePerItem, totalPrice, discountTier } = useMemo(() => {
    if (!allSelected) return { pricePerItem: 0, totalPrice: 0, discountTier: getDiscount(1) };

    const dt = DESIGN_TYPES.find((d) => d.id === designType)!;
    const pl = PLACEMENTS.find((p) => p.id === placement)!;
    const cx = DESIGN_COMPLEXITY.find((c) => c.id === complexity)!;
    const tier = getDiscount(quantity);

    const raw = Math.round(cx.basePrice * dt.sizeFactor * pl.factor);
    const perItem = Math.round(raw * (1 - tier.discount));
    return { pricePerItem: perItem, totalPrice: perItem * quantity, discountTier: tier };
  }, [designType, placement, complexity, quantity, allSelected]);

  /* labels for summary */
  const designLabel = DESIGN_TYPES.find((d) => d.id === designType)?.label;
  const placementLabel = PLACEMENTS.find((p) => p.id === placement)?.label;
  const complexityLabel = DESIGN_COMPLEXITY.find((c) => c.id === complexity)?.label;

  return (
    <section id="calculator" className="py-24 px-6 md:px-12 lg:px-20 bg-loui-bg relative">
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
          <p className="text-xl text-gray-500">Узнай цену быстрее, чем заварится эспрессо.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* ─── Left: Steps ─── */}
          <div className="w-full lg:w-2/3 space-y-10">
            {/* STEP 1 — Что хотите вышить? */}
            <div>
              <h3 className="text-lg font-bold uppercase mb-5 flex items-center gap-2">
                <StepBadge n={1} done={designType !== null} />
                Что хотите вышить?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {DESIGN_TYPES.map((dt) => (
                  <button
                    key={dt.id}
                    onClick={() => setDesignType(dt.id)}
                    className={`relative p-5 border-2 rounded-2xl transition-all duration-200 text-left flex flex-col gap-3 group
                      ${designType === dt.id
                        ? 'border-loui-blue bg-white shadow-lg scale-[1.02]'
                        : 'border-gray-200 hover:border-gray-400 bg-white/60'
                      }`}
                  >
                    <span className={`transition-colors ${designType === dt.id ? 'text-loui-blue' : 'text-gray-400 group-hover:text-gray-600'}`}>
                      {designIcons[dt.id]}
                    </span>
                    <span className="font-bold text-base">{dt.label}</span>
                    <span className="text-sm text-gray-500 leading-snug">{dt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2 — Где будет вышивка? */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div {...fadeUp}>
                  <h3 className="text-lg font-bold uppercase mb-5 flex items-center gap-2">
                    <StepBadge n={2} done={placement !== null} />
                    Где будет вышивка?
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {PLACEMENTS.map((pl) => (
                      <button
                        key={pl.id}
                        onClick={() => setPlacement(pl.id)}
                        className={`px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200
                          ${placement === pl.id
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
                        className={`p-5 border-2 rounded-2xl transition-all duration-200 text-left flex flex-col gap-2
                          ${complexity === cx.id
                            ? 'border-loui-blue bg-white shadow-lg scale-[1.02]'
                            : 'border-gray-200 hover:border-gray-400 bg-white/60'
                          }`}
                      >
                        <span className={`text-2xl font-display font-bold ${complexity === cx.id ? 'text-loui-blue' : 'text-loui-black'}`}>
                          {cx.basePrice.toLocaleString()} ₽
                        </span>
                        <span className="font-bold text-base">{cx.label}</span>
                        <span className="text-sm text-gray-500 leading-snug">{cx.desc}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 4 — Количество */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div {...fadeUp}>
                  <h3 className="text-lg font-bold uppercase mb-5 flex items-center gap-2">
                    <StepBadge n={4} done={quantity > 0} />
                    Количество: <span className="text-loui-blue">{quantity} шт.</span>
                    {discountTier.label && (
                      <span className="ml-2 rounded-full bg-green-100 px-3 py-0.5 text-xs font-bold text-green-700">
                        {discountTier.label}
                      </span>
                    )}
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
                      <span>1 шт</span>
                      <span>5 шт</span>
                      <span>10 шт</span>
                      <span>25 шт</span>
                      <span>50 шт</span>
                    </div>
                  </div>

                  {/* Upload CTA */}
                  <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-300 bg-white/60 p-6 text-center">
                    <Upload className="mx-auto mb-3 text-gray-400" size={28} />
                    <p className="font-medium text-gray-700">Загрузите свой дизайн</p>
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

          {/* ─── Right: Result Card ─── */}
          <div className="w-full lg:w-1/3">
            <motion.div
              className="sticky top-24 bg-loui-black text-white p-8 rounded-3xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-loui-blue blur-[60px] opacity-40 rounded-full pointer-events-none" />

              <div className="relative z-10">
                <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-6">
                  Расчёт стоимости
                </h4>

                {allSelected ? (
                  <>
                    {/* Breakdown */}
                    <div className="space-y-3 text-sm mb-6 border-b border-gray-700 pb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Дизайн</span>
                        <span>{designLabel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Расположение</span>
                        <span>{placementLabel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Сложность</span>
                        <span>{complexityLabel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Количество</span>
                        <span>
                          {quantity} шт.
                          {discountTier.label && (
                            <span className="ml-1 text-green-400">{discountTier.label}</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Prices */}
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-gray-300">Цена за шт:</span>
                      <span className="text-xl font-mono">{pricePerItem.toLocaleString()} ₽</span>
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
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-500 mb-4 text-5xl font-display font-bold">
                      ···
                    </div>
                    <p className="text-gray-400 text-sm">
                      Выберите параметры,
                      <br />
                      чтобы увидеть цену
                    </p>
                    {step > 1 && (
                      <div className="mt-6 flex items-center justify-center gap-1 text-xs text-gray-500">
                        {[1, 2, 3, 4].map((s) => (
                          <React.Fragment key={s}>
                            <span
                              className={`h-2 rounded-full transition-all ${
                                s < step ? 'w-6 bg-loui-blue' : s === step ? 'w-6 bg-gray-500' : 'w-2 bg-gray-700'
                              }`}
                            />
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-gray-900 rounded-lg p-3 flex gap-3 items-start mt-4">
                  <AlertCircle className="text-loui-orange min-w-[20px]" size={20} />
                  <p className="text-xs text-gray-400 leading-tight">
                    Цены ориентировочные. Для сложных дизайнов финальную цену утвердит технолог (Лёша).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
