import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  MessageCircle,
  Check,
  Info,
  Gift,
  Palette,
} from 'lucide-react';
import { GarmentType, GarmentOrder, DesignComplexity } from '../types';
import {
  GARMENTS,
  DESIGN_COMPLEXITY,
  lookupPrice,
  garmentImagePath,
  CUSTOM_PLACEMENT_SURCHARGE,
} from '../constants';

/* ─── small helpers ─── */
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3 },
};

const StepBadge: React.FC<{ n: number; done: boolean }> = ({ n, done }) => (
  <span
    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
      done ? 'bg-loui-blue text-white' : 'bg-loui-black text-white'
    }`}
  >
    {done ? <Check size={12} /> : n}
  </span>
);

const NeedleAnimation: React.FC = () => (
  <div className="relative w-16 h-16 mx-auto mb-3">
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
    </motion.svg>
  </div>
);

/* Quantity stepper marks */
const QTY_MARKS = [1, 5, 10, 20, 30, 50];

/* ━━━ MAIN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Calculator: React.FC = () => {
  /* ── state ── */
  const [orders, setOrders] = useState<GarmentOrder[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [complexity, setComplexity] = useState<DesignComplexity | null>(null);
  const [customQty, setCustomQty] = useState(false);
  const [customQtyValue, setCustomQtyValue] = useState('');

  /* ── derived ── */
  const activeOrder = orders[activeIdx] ?? null;
  const hasOrders = orders.length > 0;
  const allPlaced = hasOrders && orders.every((o) => o.placement !== null);
  const allReady = allPlaced && complexity !== null;

  const activeGarment = activeOrder
    ? GARMENTS.find((g) => g.id === activeOrder.garment)!
    : null;

  /* current step */
  const step = !hasOrders ? 1 : !allPlaced ? 2 : complexity === null ? 3 : 4;

  /* ── garment toggle ── */
  const toggleGarment = (id: GarmentType) => {
    setOrders((prev) => {
      const exists = prev.findIndex((o) => o.garment === id);
      if (exists !== -1) {
        const next = prev.filter((_, i) => i !== exists);
        if (activeIdx >= next.length) setActiveIdx(Math.max(0, next.length - 1));
        return next;
      }
      const next = [...prev, { garment: id, placement: null, quantity: 1 }];
      setActiveIdx(next.length - 1);
      return next;
    });
  };

  /* ── update order ── */
  const updateOrder = (idx: number, patch: Partial<GarmentOrder>) => {
    setOrders((prev) => prev.map((o, i) => (i === idx ? { ...o, ...patch } : o)));
  };

  /* ── pricing ── */
  const pricing = useMemo(() => {
    if (!allReady) return { lines: [] as any[], total: 0 };

    const lines = orders.map((o) => {
      const g = GARMENTS.find((g) => g.id === o.garment)!;
      const pl = g.placements.find((p) => p.id === o.placement);
      const base = lookupPrice(complexity, Math.min(o.quantity, 50));
      const surcharge = pl?.isCustom ? Math.round(base * CUSTOM_PLACEMENT_SURCHARGE) : 0;
      const perItem = base + surcharge;
      return {
        garment: g.label,
        placement: pl?.label ?? '',
        qty: o.quantity,
        perItem,
        subtotal: perItem * o.quantity,
        hasSurcharge: !!pl?.isCustom,
      };
    });

    return { lines, total: lines.reduce((s, l) => s + l.subtotal, 0) };
  }, [orders, complexity, allReady]);

  /* ── preview image ── */
  const previewSrc = activeGarment
    ? garmentImagePath(activeOrder!.garment, activeOrder!.placement)
    : null;

  return (
    <section id="calculator" className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-loui-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-3">
            КАЛЬКУЛЯТОР <span className="text-loui-blue">ЦЕНЫ</span>
          </h2>
          <p className="text-lg text-gray-500">
            Узнай цену быстрее, чем заварится эспрессо.
          </p>
        </motion.div>

        {/* ─── 3-column grid (desktop) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_280px] gap-6 items-start">

          {/* ══ COL 1: Garment tiles ══ */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-3 flex items-center gap-2">
              <StepBadge n={1} done={hasOrders} />
              Изделие
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {GARMENTS.map((g) => {
                const isSelected = orders.some((o) => o.garment === g.id);
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGarment(g.id)}
                    className="relative aspect-square overflow-hidden rounded-lg group"
                  >
                    <img
                      src={garmentImagePath(g.id)}
                      alt={g.label}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 transition-all duration-300 ${
                        isSelected ? 'bg-loui-blue/25' : 'bg-black/5 group-hover:bg-black/35'
                      }`}
                    />
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1 w-4 h-4 bg-loui-blue rounded-full flex items-center justify-center"
                      >
                        <Check size={10} className="text-white" />
                      </motion.div>
                    )}
                    <div
                      className={`absolute inset-x-0 bottom-0 px-1 py-1 text-center transition-opacity duration-300 ${
                        isSelected ? 'opacity-100 bg-loui-blue/80' : 'opacity-0 group-hover:opacity-100 bg-black/60'
                      }`}
                    >
                      <span className="text-white text-[10px] font-bold uppercase leading-none">
                        {g.label}
                      </span>
                    </div>
                    <div
                      className={`absolute inset-0 rounded-lg border-2 pointer-events-none transition-colors ${
                        isSelected ? 'border-loui-blue' : 'border-transparent'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {hasOrders && (
              <p className="text-[11px] text-gray-400 mt-2 text-center">
                Выбрано: {orders.length}
              </p>
            )}
          </div>

          {/* ══ COL 2: Steps (placement → complexity → qty) ══ */}
          <div className="space-y-8 min-w-0">
            {/* ── Per-garment tabs + placement ── */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div {...fadeUp}>
                  <h3 className="text-sm font-bold uppercase mb-3 flex items-center gap-2">
                    <StepBadge n={2} done={allPlaced} />
                    Расположение вышивки
                  </h3>

                  {/* Garment tabs */}
                  {orders.length > 1 && (
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                      {orders.map((o, i) => {
                        const g = GARMENTS.find((g) => g.id === o.garment)!;
                        return (
                          <button
                            key={o.garment}
                            onClick={() => setActiveIdx(i)}
                            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              i === activeIdx
                                ? 'bg-loui-blue text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            {g.label}
                            {o.placement && <Check size={10} className="inline ml-1 -mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Placement options for active garment */}
                  {activeGarment && (
                    <div className="flex flex-wrap gap-2">
                      {activeGarment.placements.map((pl) => (
                        <button
                          key={pl.id}
                          onClick={() => updateOrder(activeIdx, { placement: pl.id })}
                          className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200
                            ${
                              activeOrder?.placement === pl.id
                                ? 'border-loui-blue bg-white text-loui-blue shadow-sm'
                                : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white/60'
                            }
                            ${pl.isCustom ? 'italic' : ''}`}
                        >
                          {pl.label}
                          {pl.isCustom && (
                            <span className="text-[10px] ml-1 text-gray-400">(+10%)</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Per-garment quantity */}
                  {activeOrder?.placement && (
                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-600">Количество:</span>
                        <span className="text-sm font-bold text-loui-blue">
                          {activeOrder.quantity} шт.
                        </span>
                      </div>

                      {/* Slider */}
                      <div
                        className={
                          activeOrder.quantity > 50
                            ? 'opacity-30 pointer-events-none'
                            : ''
                        }
                      >
                        <input
                          type="range"
                          min={1}
                          max={50}
                          value={Math.min(activeOrder.quantity, 50)}
                          onChange={(e) =>
                            updateOrder(activeIdx, {
                              quantity: parseInt(e.target.value),
                            })
                          }
                          className="w-full h-2 cursor-pointer accent-[#0047FF]"
                        />
                        <div className="relative h-4 mt-0.5">
                          {QTY_MARKS.map((m) => (
                            <span
                              key={m}
                              className="absolute text-[10px] text-gray-400 -translate-x-1/2"
                              style={{
                                left: `${((m - 1) / 49) * 100}%`,
                              }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* >50 checkbox */}
                      <label className="inline-flex items-center gap-2 mt-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={activeOrder.quantity > 50}
                          onChange={() =>
                            updateOrder(activeIdx, {
                              quantity:
                                activeOrder.quantity > 50 ? 50 : 51,
                            })
                          }
                          className="w-4 h-4 rounded border-gray-300 accent-[#0047FF]"
                        />
                        <span className="text-sm text-gray-600">
                          &gt;50 шт
                        </span>
                      </label>

                      {/* Custom quantity input when >50 */}
                      {activeOrder.quantity > 50 && (
                        <input
                          type="number"
                          min={51}
                          placeholder="Укажите количество"
                          value={activeOrder.quantity}
                          onChange={(e) => {
                            const v = Math.max(
                              51,
                              parseInt(e.target.value) || 51,
                            );
                            updateOrder(activeIdx, { quantity: v });
                          }}
                          className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-[#0047FF] focus:outline-none"
                        />
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Complexity ── */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div {...fadeUp}>
                  <h3 className="text-sm font-bold uppercase mb-3 flex items-center gap-2">
                    <StepBadge n={3} done={complexity !== null} />
                    Сложность дизайна
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {DESIGN_COMPLEXITY.map((cx) => (
                      <button
                        key={cx.id}
                        onClick={() => setComplexity(cx.id)}
                        className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 text-left flex flex-col
                          ${
                            complexity === cx.id
                              ? 'border-loui-blue bg-white shadow-lg scale-[1.02]'
                              : 'border-gray-200 hover:border-gray-400 bg-white/60'
                          }`}
                      >
                        <div className="h-24 bg-gray-100 overflow-hidden">
                          <img
                            src={`/items/complexity-${cx.id}.png`}
                            alt={cx.label}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="p-3 flex flex-col gap-1">
                          <span className="font-bold text-sm">{cx.label}</span>
                          <span className="text-xs text-gray-500 leading-snug">{cx.desc}</span>
                          <span
                            className={`text-xs font-bold mt-0.5 ${
                              complexity === cx.id ? 'text-loui-blue' : 'text-gray-400'
                            }`}
                          >
                            от {cx.minPrice} ₽/шт
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Чем больше тираж — тем ниже цена за штуку
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Upload + bonuses ── */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div {...fadeUp} className="space-y-4">
                  {/* Upload */}
                  <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white/60 p-5 text-center">
                    <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                    <p className="font-medium text-sm text-gray-700">Загрузите свой дизайн</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Мы оценим точную стоимость за&nbsp;10&nbsp;минут
                    </p>
                    <button className="mt-3 inline-flex items-center gap-2 rounded-lg border-2 border-loui-blue px-4 py-2 text-xs font-bold text-loui-blue hover:bg-loui-blue hover:text-white transition-colors">
                      <Upload size={14} />
                      Выбрать файл
                    </button>
                  </div>

                  {/* Bonuses row */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <Gift size={16} className="text-loui-blue" />
                      <span className="text-xs font-medium text-gray-700">
                        Дизайн программы в подарок
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <Palette size={16} className="text-loui-blue" />
                      <span className="text-xs font-medium text-gray-700">
                        Подберём цвет нити под ваш макет
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ══ COL 3: Preview + Result ══ */}
          <div className="space-y-4">
            {/* Garment preview */}
            <AnimatePresence>
              {previewSrc && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md"
                >
                  <div className="relative aspect-square bg-gray-50">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={previewSrc}
                        src={previewSrc}
                        alt={activeGarment?.label}
                        className="h-full w-full object-contain p-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </AnimatePresence>
                  </div>
                  {orders.length > 1 && (
                    <div className="flex gap-1.5 px-2 py-2 border-t border-gray-100 overflow-x-auto">
                      {orders.map((o, i) => {
                        const g = GARMENTS.find((g) => g.id === o.garment)!;
                        return (
                          <button
                            key={o.garment}
                            onClick={() => setActiveIdx(i)}
                            className={`shrink-0 w-9 h-9 rounded-lg overflow-hidden border-2 transition-colors ${
                              i === activeIdx ? 'border-loui-blue' : 'border-transparent opacity-50'
                            }`}
                          >
                            <img
                              src={garmentImagePath(o.garment)}
                              alt={g.label}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result card */}
            <div className="bg-loui-black text-white p-6 rounded-2xl shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-28 h-28 bg-loui-blue blur-[50px] opacity-40 rounded-full pointer-events-none" />

              <div className="relative z-10">
                <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-4">
                  Расчёт стоимости
                </h4>

                <AnimatePresence mode="wait">
                  {allReady ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Line items */}
                      <div className="space-y-2 text-xs mb-4 border-b border-gray-700 pb-4">
                        {pricing.lines.map((l, i) => (
                          <div key={i} className="flex justify-between gap-2">
                            <span className="text-gray-400 truncate">
                              {l.garment} · {l.placement}
                              {l.hasSurcharge && ' *'}
                            </span>
                            <span className="shrink-0">
                              {l.qty} × {l.perItem.toLocaleString()} ₽
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between text-gray-400">
                          <span>Сложность</span>
                          <span>{DESIGN_COMPLEXITY.find((c) => c.id === complexity)?.label}</span>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-end mb-6">
                        <span className="text-gray-300 text-sm">Итого:</span>
                        <motion.span
                          key={pricing.total}
                          initial={{ scale: 1.1, color: '#0047FF' }}
                          animate={{ scale: 1, color: '#FFFFFF' }}
                          className="text-3xl font-bold font-display"
                        >
                          {pricing.total.toLocaleString()} ₽
                        </motion.span>
                      </div>

                      <button className="w-full bg-loui-blue text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-loui-orange transition-colors duration-300 mb-3">
                        Забронировать цену
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 border border-gray-600 text-gray-300 py-2.5 rounded-xl text-xs font-medium hover:border-white hover:text-white transition-colors">
                        <MessageCircle size={14} />
                        Помочь с выбором
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-4"
                    >
                      <NeedleAnimation />
                      <p className="text-gray-300 text-sm font-medium mb-1">
                        Ваша цена формируется
                      </p>
                      <p className="text-gray-500 text-[11px] mb-4">
                        Выберите параметры слева
                      </p>
                      <div className="flex items-center justify-center gap-1.5">
                        {[1, 2, 3, 4].map((s) => (
                          <motion.span
                            key={s}
                            className="h-1.5 rounded-full"
                            animate={{
                              width: s < step ? 20 : s === step ? 20 : 6,
                              backgroundColor:
                                s < step ? '#0047FF' : s === step ? '#6b7280' : '#374151',
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 text-[10px] mt-2 uppercase tracking-wider">
                        шаг {step} из 4
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-gray-900 rounded-lg p-2.5 flex gap-2 items-start mt-3">
                  <Info className="text-loui-orange min-w-[16px]" size={16} />
                  <p className="text-[10px] text-gray-400 leading-tight">
                    Для сложных дизайнов, больших тиражей или нестандартного расположения
                    финальную цену утвердит технолог.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
