import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-24 md:pt-28 overflow-hidden border-b border-black/10 bg-white">
      <img
        src="/hero/ded-loui-bg.png"
        alt="Дед Луи в студии"
        className="absolute inset-0 h-full w-full object-cover object-right md:object-center"
      />

      <div className="absolute inset-0 bg-white/75 md:bg-gradient-to-r md:from-white/90 md:via-white/72 md:to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 md:grid-cols-2 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <h1 className="text-[17vw] leading-[0.84] font-display font-bold text-loui-black md:text-[7.5vw] lg:text-[6rem]">
            LOUI <br />
            <span className="text-loui-blue">STUDIO</span>
          </h1>

          <p className="mt-5 text-xl font-light text-loui-black/80 md:text-3xl">
            Студия машинной вышивки для HoReCa и брендов, которым не всё равно.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              href="#calculator"
              className="inline-flex items-center gap-3 bg-loui-blue text-white px-7 py-4 text-base md:text-lg font-bold uppercase tracking-wide group hover:bg-loui-orange transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Рассчитать за 20 сек</span>
              <ArrowDownRight className="group-hover:rotate-45 transition-transform duration-300" />
            </motion.a>
            <span className="text-sm uppercase tracking-[0.18em] text-loui-black/60">Дед Луи одобряет</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto w-full max-w-[320px] md:mr-0 md:ml-auto"
        >
          <div className="relative rounded-[2.4rem] border-[10px] border-black bg-black p-2 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <div className="absolute left-1/2 top-1 h-5 w-28 -translate-x-1/2 rounded-full bg-black" />

            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.9rem] bg-[#0f0f12]">
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

              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/55 via-transparent to-transparent p-5 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-white/90">
                  Добавьте файл <strong>/public/reels/hero-reel.mp4</strong>
                </p>
              </div>

              <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-loui-black">
                <Play size={14} className="fill-loui-black" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap py-2 bg-loui-black text-white text-xs md:text-sm uppercase tracking-[0.2em] opacity-85">
        <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}>
          High Quality Embroidery — Made in Moscow — Durable Materials — Precision Stitching — High Quality Embroidery — Made in Moscow — Durable Materials — Precision Stitching
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
