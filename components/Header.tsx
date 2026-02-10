import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white w-full px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <a href="#" className="text-3xl font-display font-bold tracking-tighter flex items-center group">
        LOUI
        <motion.span 
          className="text-loui-blue ml-1 inline-block"
          whileHover={{ scale: 1.5, rotate: 180 }}
        >
          .
        </motion.span>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 items-center">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-sm uppercase tracking-widest hover:text-loui-blue transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-loui-blue hover:after:w-full after:transition-all"
          >
            {item.label}
          </a>
        ))}
        <button className="border border-white px-5 py-2 text-sm uppercase hover:bg-loui-blue hover:border-loui-blue transition-all">
          Связаться
        </button>
      </nav>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden z-50 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display uppercase hover:text-loui-blue"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;