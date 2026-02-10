import React from 'react';
import { motion } from 'framer-motion';

const Portfolio: React.FC = () => {
  // Using picsum with different seeds to simulate portfolio items
  const items = [
    { id: 1, size: 'col-span-1 md:col-span-2 row-span-2', img: '/portfolio/loomcore.png', title: 'Худи Oversize' },
    { id: 2, size: 'col-span-1 row-span-1', img: '/portfolio/horetex.png', title: 'Воротник' },
    { id: 3, size: 'col-span-1 row-span-1', img: 'https://picsum.photos/seed/loui3/400/400', title: 'Шеврон' },
    { id: 4, size: 'col-span-1 md:col-span-2 row-span-1', img: 'https://picsum.photos/seed/loui4/800/400', title: 'Фартуки для Burger Heroes' },
    { id: 5, size: 'col-span-1 row-span-1', img: 'https://picsum.photos/seed/loui5/400/400', title: 'Бейсболка' },
  ];

  return (
    <section id="portfolio" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase">
            Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-loui-blue to-loui-orange">Работы</span>
          </h2>
          <p className="text-xl italic font-serif mt-4 md:mt-0">«Не просто униформа, а стиль»</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative group overflow-hidden ${item.size} bg-gray-100 rounded-sm`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-2xl font-bold font-display uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center px-4">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;