import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row pt-20 overflow-hidden">
      {/* Left Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-20 z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] font-display font-bold text-loui-black mb-6">
            LOUI <br /> 
            <span className="text-loui-blue">STUDIO</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-light mb-8 max-w-md">
            Студия машинной вышивки для HoReCa и брендов, которым не всё равно.
          </h2>

          <motion.a 
            href="#calculator"
            className="inline-flex items-center gap-4 bg-loui-blue text-white px-8 py-6 text-lg md:text-xl font-bold uppercase tracking-wider group hover:bg-loui-orange transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Рассчитать за 20 сек</span>
            <ArrowDownRight className="group-hover:rotate-45 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>

      {/* Right Content - Abstract Visual */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative flex items-center justify-center">
        {/* Abstract "Apron/Thread" Simulation */}
        <motion.div 
          className="relative w-64 h-64 md:w-96 md:h-96"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
           {/* Background shape */}
           <motion.div 
            className="absolute inset-0 bg-loui-black rounded-3xl"
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
           />
           
           {/* "Thread" lines */}
           <svg className="absolute -inset-20 w-[150%] h-[150%] pointer-events-none z-20">
             <motion.path 
               d="M50,150 C100,50 300,50 350,250 S100,350 50,150"
               fill="none"
               stroke="#0047FF"
               strokeWidth="4"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 2, ease: "easeInOut" }}
             />
             <motion.path 
               d="M100,300 C200,400 350,100 400,200"
               fill="none"
               stroke="#FF5C00"
               strokeWidth="4"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
             />
           </svg>

           {/* Floating elements */}
           <motion.div 
             className="absolute -top-10 -right-10 bg-loui-blue w-20 h-20 rounded-full blur-xl opacity-50"
             animate={{ scale: [1, 1.2, 1] }}
             transition={{ duration: 3, repeat: Infinity }}
           />
        </motion.div>
      </div>

      {/* Decorative text marquee element at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap py-2 bg-loui-black text-white text-xs md:text-sm uppercase tracking-[0.2em] opacity-80">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          High Quality Embroidery — Made in Moscow — Durable Materials — Precision Stitching — High Quality Embroidery — Made in Moscow — Durable Materials — Precision Stitching
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;