import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Play } from 'lucide-react';

const marqueeText =
  'High Quality Embroidery — Made in Moscow — Durable Materials — Precision Stitching — ';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-24 md:pt-28 overflow-hidden border-b border-black/10 bg-white">
      {/* Фон с дедом — object-right чтобы дед был справа */}
      <img
        src="/hero/ded-loui-bg.png"
        alt="Дед Луи в студии"
        className="absolute inset-0 h-full w-full object-cover object-[75%_center] md:object-[70%_center]"
      />

      {/* Градиентный оверлей — ослаблен, чтобы дед был виднее */}
      <div className="absolute inset-0 bg-white/50 md:bg-gradient-to-r md:from-white/85 md:via-white/45 md:to-white/10" />

      {/* Контент: текст + телефон прижаты к левой части, правая часть — дед */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-4 pb-28 md:px-8 lg:px-12">
        <div className="flex w-full flex-col gap-8 md:w-[58%] md:flex-row md:items-center md:gap-10">
          {/* Оффер — текст и CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-md shrink-0"
          >
            <h1 className="text-[17vw] leading-[0.84] font-display font-bold text-loui-black md:text-[6vw] lg:text-[5rem]">
              LOUI <br />
              <span className="text-loui-blue">STUDIO</span>
            </h1>

            <p className="mt-5 text-lg font-light text-loui-black/80 md:text-2xl">
              Студия машинной вышивки для&nbsp;HoReCa и&nbsp;брендов, которым не&nbsp;всё&nbsp;равно.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a
                href="#calculator"
                className="inline-flex items-center gap-3 bg-loui-blue text-white px-6 py-3.5 text-base font-bold uppercase tracking-wide group hover:bg-loui-orange transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Рассчитать за 20 сек</span>
                <ArrowDownRight className="group-hover:rotate-45 transition-transform duration-300" />
              </motion.a>
              <span className="text-sm uppercase tracking-[0.18em] text-loui-black/60">
                Дед Луи одобряет
              </span>
            </div>
          </motion.div>

          {/* iPhone mockup — уменьшен */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto w-full max-w-[220px] shrink-0 md:mx-0"
          >
            <div className="relative rounded-[2rem] border-[8px] border-black bg-black p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.3)]">
              <div className="absolute left-1/2 top-0.5 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />

              <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.5rem] bg-[#0f0f12]">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/hero/ded-loui-bg.png"
                >
                  <source src="/reels/hero-reel.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/55 via-transparent to-transparent p-4 text-center">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/90">
                    Добавьте файл <strong>/public/reels/hero-reel.mp4</strong>
                  </p>
                </div>

                <div className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-loui-black">
                  <Play size={12} className="fill-loui-black" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Бегущая строка — поднята выше (bottom-6) чтобы была видна на первом экране */}
      <div className="absolute bottom-4 md:bottom-6 left-0 w-full overflow-hidden whitespace-nowrap py-2.5 bg-loui-black text-white text-xs md:text-sm uppercase tracking-[0.2em]">
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          <span className="shrink-0">{marqueeText.repeat(6)}</span>
          <span className="shrink-0">{marqueeText.repeat(6)}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
