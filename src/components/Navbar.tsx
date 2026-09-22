// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] z-50 bg-[#151414]/20 backdrop-blur-md rounded-full border border-white/5 py-4 px-8 flex items-center justify-between"
    >
      <a href="#" className="font-syncopate font-bold text-xl tracking-widest text-white">NAKSHATRA</a>
      <div className="hidden md:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-[0.3em] text-white/70 font-space">
        <a href="#hero" className="text-white border-b border-white pb-1">Home</a>
        <a href="#about" className="hover:text-[#b91f1f] transition-colors">About</a>
        <a href="#tracks" className="hover:text-[#b91f1f] transition-colors">Challenges</a>
        <a href="#timeline" className="hover:text-[#b91f1f] transition-colors">Timeline</a>
        <a href="#faq" className="hover:text-[#b91f1f] transition-colors">FAQ</a>
        <a href="#contact" className="hover:text-[#b91f1f] transition-colors">Contact</a>
      </div>
      <button className="md:hidden text-2xl text-white">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </button>
    </motion.nav>
  );
}
