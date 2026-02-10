import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ScanLine, Clock, ChefHat } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck size={40} />,
    title: 'Прочность',
    tagline: 'Нитки крепче, чем нервы шеф-повара',
    desc: 'Используем износостойкие материалы (Gunold, Madeira), выдержит 1000 стирок.'
  },
  {
    icon: <ScanLine size={40} />,
    title: 'Аккуратность',
    tagline: 'Не торчим. В смысле, нитки не торчат',
    desc: 'Идеальная изнанка, автоматическая обрезка, чистка от флизелина.'
  },
  {
    icon: <Clock size={40} />,
    title: 'Сроки',
    tagline: 'Быстрее, чем официант несет счет',
    desc: 'Сдаем заказы от 2-х дней. Срочная вышивка "день в день".'
  },
  {
    icon: <ChefHat size={40} />,
    title: 'HoReCa Экспертиза',
    tagline: 'Вышивка переживет соус песто',
    desc: 'Специализируемся на фартуках, кителях и униформе.'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="border-l-2 border-loui-black pl-6 group hover:border-loui-blue transition-colors duration-300"
          >
            <div className="mb-4 text-loui-black group-hover:text-loui-blue transition-colors duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold font-display uppercase mb-2">{feature.title}</h3>
            <p className="text-loui-blue font-semibold mb-2 text-sm italic">"{feature.tagline}"</p>
            <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;