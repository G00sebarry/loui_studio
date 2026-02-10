import React from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  { num: '01', title: 'Расчет', desc: 'Тыкаешь в калькулятор выше.' },
  { num: '02', title: 'Макет', desc: 'Присылаешь лого, мы делаем программу.' },
  { num: '03', title: 'Тест', desc: 'Вышиваем пробник, скидываем видео.' },
  { num: '04', title: 'Продакшн', desc: 'Жужжат машины. Работа кипит.' },
  { num: '05', title: 'Доставка', desc: 'Курьер у тебя.' },
];

const Workflow: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-loui-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-display font-bold uppercase mb-16 text-center">Как мы работаем</h2>
        
        <div className="flex flex-col md:flex-row justify-between gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gray-300 z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 bg-loui-bg pt-4 md:pt-0 flex flex-col items-center text-center md:text-left md:items-start group">
              <div className="w-24 h-24 bg-white border-2 border-loui-black rounded-full flex items-center justify-center text-2xl font-bold font-display mb-6 group-hover:bg-loui-blue group-hover:text-white group-hover:border-loui-blue transition-colors duration-300">
                {step.num}
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm max-w-[200px]">{step.desc}</p>
              
              {index < steps.length - 1 && (
                <div className="md:hidden my-4 text-gray-300">
                  <ArrowRight className="rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;