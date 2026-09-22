// @ts-nocheck
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(bgRef.current, { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 0.6, duration: 2.5, ease: "power4.out" })
      .fromTo(titleRef.current, { y: '100%' }, { y: '0%', duration: 1.8, ease: "power4.out" }, "-=2")
      .fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=1.4")
      .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=1.2")
      .fromTo(statsRef.current?.children || [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }, "-=1");

    gsap.to(bgRef.current, {
      yPercent: 40,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(titleRef.current, {
      yPercent: 100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: heroRef });

  return (
    <header ref={heroRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#242323]">
      {/* Deep Background Parallax Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#242323] via-[#242323]/50 to-transparent z-0"></div>
      
      <div className="relative z-10 w-full mt-20">
        <div>
           {/* Masked Text Reveal */}
           <div className="reveal-mask inline-block mb-6">
             <h1 ref={titleRef} className="text-[clamp(4rem,12vw,14rem)] font-syncopate font-bold text-white uppercase drop-shadow-2xl leading-[0.9] tracking-tighter mix-blend-screen">
               NAKSHATRA
             </h1>
           </div>
           
           <p ref={textRef} className="text-lg md:text-2xl font-space font-light tracking-[0.2em] text-[#bdb9b2] max-w-3xl mx-auto mb-12 uppercase">
             The Celestial Constellations <br/><span className="text-[#b91f1f] font-bold">That Guide Our Journey.</span>
           </p>
           
           <div className="reveal-mask inline-block">
             <a ref={btnRef} href="#register" className="inline-flex items-center justify-center px-12 py-5 bg-transparent border border-white/20 text-white text-base font-orbitron font-bold tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-700 backdrop-blur-md">
               COMMENCE IGNITION
             </a>
           </div>
        </div>
      </div>

      <div ref={statsRef} className="absolute bottom-16 w-full flex justify-center gap-16 z-10 hidden lg:flex">
        <div className="text-center backdrop-blur-md bg-[#151414]/20 px-8 py-4 rounded-3xl border border-white/5">
          <p className="text-[10px] font-space uppercase tracking-[0.3em] text-[#bdb9b2]/60 mb-2">Team Size</p>
          <p className="text-2xl font-orbitron font-bold text-white">2-4 Members</p>
        </div>
        <div className="text-center backdrop-blur-md bg-[#151414]/20 px-8 py-4 rounded-3xl border border-white/5">
          <p className="text-[10px] font-space uppercase tracking-[0.3em] text-[#bdb9b2]/60 mb-2">Tracks</p>
          <p className="text-2xl font-orbitron font-bold text-white">Soft + Hard</p>
        </div>
        <div className="text-center backdrop-blur-md bg-[#151414]/20 px-8 py-4 rounded-3xl border border-white/5">
          <p className="text-[10px] font-space uppercase tracking-[0.3em] text-[#bdb9b2]/60 mb-2">Location</p>
          <p className="text-2xl font-orbitron font-bold text-white">MITS Gwalior</p>
        </div>
      </div>
    </header>
  );
}
