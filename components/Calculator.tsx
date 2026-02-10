import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PRICING, complexityLabels } from '../constants';
import { Complexity, ItemType } from '../types';
import { Shirt, Scissors, AlertCircle } from 'lucide-react';

const Calculator: React.FC = () => {
  const [itemType, setItemType] = useState<ItemType>('apron');
  const [complexity, setComplexity] = useState<Complexity>('easy');
  const [quantity, setQuantity] = useState<number>(10);
  const [pricePerItem, setPricePerItem] = useState<number>(0);

  const calculatePrice = () => {
    const tiers = PRICING[complexity];
    const tier = tiers.find(t => 
      quantity >= t.min && (t.max === null || quantity <= t.max)
    );
    return tier ? tier.price : 0;
  };

  useEffect(() => {
    setPricePerItem(calculatePrice());
  }, [quantity, complexity, itemType]);

  const totalPrice = pricePerItem * quantity;

  return (
    <section id="calculator" className="py-24 px-6 md:px-12 lg:px-20 bg-loui-bg relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="mb-12"
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
          {/* Controls */}
          <div className="w-full lg:w-2/3 space-y-10">
            
            {/* Step 1: Item Type */}
            <div>
              <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                <span className="bg-loui-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Что вышиваем?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'apron', label: 'Фартук' },
                  { id: 'hoodie', label: 'Худи' },
                  { id: 'shirt', label: 'Рубашка' },
                  { id: 'cut', label: 'Крой' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setItemType(item.id as ItemType)}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 flex flex-col items-center gap-2
                      ${itemType === item.id 
                        ? 'border-loui-blue bg-white text-loui-blue shadow-lg scale-105' 
                        : 'border-gray-300 text-gray-500 hover:border-gray-400'}`}
                  >
                    {item.id === 'cut' ? <Scissors size={24} /> : <Shirt size={24} />}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Complexity */}
            <div>
               <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                <span className="bg-loui-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Сложность
              </h3>
              <div className="space-y-3">
                {(Object.keys(complexityLabels) as Complexity[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setComplexity(key)}
                    className={`w-full text-left p-4 border-2 rounded-xl transition-all duration-200 flex items-center justify-between
                      ${complexity === key 
                        ? 'border-loui-blue bg-white shadow-md' 
                        : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    <div>
                      <span className={`font-bold font-display text-lg uppercase ${complexity === key ? 'text-loui-blue' : 'text-black'}`}>
                        {complexityLabels[key].title}
                      </span>
                      <p className="text-sm text-gray-500">{complexityLabels[key].desc}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${complexity === key ? 'border-loui-blue' : 'border-gray-300'}`}>
                      {complexity === key && <div className="w-3 h-3 bg-loui-blue rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Quantity Slider */}
            <div>
               <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                <span className="bg-loui-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                Количество: {quantity} шт.
              </h3>
              <div className="relative pt-6 pb-2">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-loui-blue"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                  <span>1 шт</span>
                  <span>10 шт</span>
                  <span>25 шт</span>
                  <span>50+ шт</span>
                </div>
              </div>
            </div>

          </div>

          {/* Result Card */}
          <div className="w-full lg:w-1/3">
            <motion.div 
              className="sticky top-24 bg-loui-black text-white p-8 rounded-3xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-loui-blue blur-[60px] opacity-40 rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-6">Расчет стоимости</h4>
                
                <div className="flex justify-between items-end mb-4 border-b border-gray-700 pb-4">
                  <span className="text-gray-300">Цена за шт:</span>
                  <span className="text-2xl font-mono">{pricePerItem} ₽</span>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-gray-300">Итого:</span>
                  <motion.span 
                    key={totalPrice}
                    initial={{ scale: 1.2, color: "#0047FF" }}
                    animate={{ scale: 1, color: "#FFFFFF" }}
                    className="text-4xl md:text-5xl font-bold font-display"
                  >
                    {totalPrice.toLocaleString()} ₽
                  </motion.span>
                </div>

                <button className="w-full bg-loui-blue text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-loui-orange transition-colors duration-300 mb-6">
                  Забронировать цену
                </button>

                <div className="bg-gray-900 rounded-lg p-3 flex gap-3 items-start">
                  <AlertCircle className="text-loui-orange min-w-[20px]" size={20} />
                  <p className="text-xs text-gray-400 leading-tight">
                    Цены ориентировочные. Для 'Сложной вышивки' требуется утверждение технолога (Лёши).
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