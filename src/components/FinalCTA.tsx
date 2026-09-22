// @ts-nocheck
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bgRef.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-48 bg-[#bdb9b2] text-white text-center relative overflow-hidden">
      <div ref={bgRef} className="absolute inset-[-50%] opacity-20 pointer-events-none">
         <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,white_2px,transparent_2px)] bg-[length:60px_60px]"></div>
      </div>
      <div className="relative z-10 px-10">
        <h3 className="text-[clamp(4rem,8vw,8rem)] font-syncopate font-bold leading-[0.9] mb-12 uppercase drop-shadow-2xl">The Sky is <br />not the limit.</h3>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="#" className="px-16 py-6 bg-white text-black font-orbitron font-bold uppercase tracking-[0.3em] rounded-full hover:bg-[#151414] hover:text-[#b91f1f] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.4)]">Register Now</a>
          <a href="#" className="px-16 py-6 border-2 border-white/40 text-white font-orbitron font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-[#bdb9b2] transition-all duration-300">Download Folio</a>
        </div>
      </div>
    </section>
  );
}
