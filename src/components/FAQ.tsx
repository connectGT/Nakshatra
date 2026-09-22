// @ts-nocheck
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    { q: "Who can participate?", a: "NAKSHATRA is open to all college/university students including engineering, management, arts, commerce, sciences, law, and medical." },
    { q: "Can students from different colleges form a team?", a: "Yes. Inter-college, inter-specialisation, and inter-branch teams are fully permitted." },
    { q: "Where is the final round?", a: "The 12-hour offline Final Round will be held at the MITS Campus, Gwalior on 24-25 October 2026." }
  ];

  return (
    <section id="faq" className="py-32 px-10 bg-[#242323] text-white">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-6xl font-syncopate font-bold text-center mb-20 uppercase">Inquiries</h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                <button 
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-8 flex justify-between items-center cursor-pointer font-space font-bold tracking-widest uppercase text-xs hover:bg-white/5 transition-colors"
                >
                  {faq.q}
                  <motion.span 
                    animate={{ rotate: isOpen ? 45 : 0 }} 
                    className="iconify text-xl text-[#b91f1f]" 
                    data-icon="lucide:plus"
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 text-[#bdb9b2]/80 text-sm font-space">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
