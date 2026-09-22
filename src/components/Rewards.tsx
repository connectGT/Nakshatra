// @ts-nocheck
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Rewards() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 70%" } }
    );
    
    gsap.to(glowRef.current, {
      scale: 1.2,
      opacity: 0.8,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="rewards" className="py-32 px-10 md:px-20 relative bg-[#151414] flex justify-center overflow-hidden">
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#bdb9b2]/30 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-5xl rounded-[4rem] border border-white/10 bg-[#242323]/80 backdrop-blur-2xl p-16 md:p-24 text-center shadow-[0_0_50px_rgba(0,98,255,0.2)]">
        <iconify-icon icon="lucide:award" className="iconify text-7xl text-[#b91f1f] mb-8" ></iconify-icon>
        <h3 className="text-[10px] font-space uppercase tracking-[0.5em] text-[#b91f1f] font-bold mb-4">The Payload</h3>
        <h4 className="text-6xl md:text-8xl font-syncopate font-bold mb-2 text-white">₹10,000</h4>
        <p className="text-xl md:text-2xl font-orbitron tracking-widest text-[#bdb9b2]/70 mb-16">GRAND PRIZE POOL</p>
        
        <div className="grid md:grid-cols-3 gap-8 border-t border-white/10 pt-16">
          <div>
            <p className="font-orbitron font-bold text-2xl mb-2 text-white">Grand Prize</p>
            <p className="text-[#bdb9b2]/60 font-space text-sm">Cash Prize + Winner Certificate</p>
          </div>
          <div>
            <p className="font-orbitron font-bold text-2xl mb-2 text-white">Finalists</p>
            <p className="text-[#bdb9b2]/60 font-space text-sm">Excellence Certificates + Goodies</p>
          </div>
          <div>
            <p className="font-orbitron font-bold text-2xl mb-2 text-white">Participants</p>
            <p className="text-[#bdb9b2]/60 font-space text-sm">Participation Certificates</p>
          </div>
        </div>
      </div>
    </section>
  );
}
