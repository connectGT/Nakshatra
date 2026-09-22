// @ts-nocheck
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal text on scroll
    gsap.fromTo(textContentRef.current?.children || [], 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // Fade in visual graphic container
    gsap.fromTo(visualRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.5, ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%"
        }
      }
    );

    // Parallax effect on the image
    gsap.to(orbitRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: visualRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="py-32 px-10 md:px-20 relative bg-[#242323] overflow-hidden">
      {/* Decorative stars in background */}
      <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_#fff]"></div>
      <div className="absolute bottom-40 left-32 w-1 h-1 bg-[#b91f1f] rounded-full shadow-[0_0_10px_2px_#b91f1f]"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <div ref={textContentRef} className="space-y-8">
          <h2 className="text-sm font-space uppercase tracking-[0.5em] text-[#b91f1f] font-bold">About Nakshatra</h2>
          <h3 className="text-5xl md:text-6xl font-orbitron font-black leading-[1.1] text-white">
            DEFINING THE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bdb9b2] to-[#b91f1f]">NEXT HORIZON.</span>
          </h3>
          <p className="font-space text-[#bdb9b2]/80 text-lg leading-relaxed max-w-xl">
            NAKSHATRA is an aerospace-focused hackathon organised by the Aerospace Club, Madhav Institute of Technology & Science (MITS), Gwalior. We bring together students to innovate and solve challenges across space, astronomy, aeronautics, and aerospace technology.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-[#b91f1f]/50 transition-colors">
              <iconify-icon icon="lucide:cpu" className="iconify text-3xl text-[#b91f1f] mb-4 group-hover:scale-110 transition-transform block" ></iconify-icon>
              <h4 className="font-orbitron font-bold text-xl text-white">Hardware</h4>
              <p className="font-space text-sm text-[#bdb9b2]/60 mt-2">Physical systems & robotics</p>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-[#b91f1f]/50 transition-colors">
              <iconify-icon icon="lucide:binary" className="iconify text-3xl text-[#b91f1f] mb-4 group-hover:scale-110 transition-transform block" ></iconify-icon>
              <h4 className="font-orbitron font-bold text-xl text-white">Software</h4>
              <p className="font-space text-sm text-[#bdb9b2]/60 mt-2">Algorithms & simulations</p>
            </div>
          </div>
        </div>

        <div ref={visualRef} className="relative w-full aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/10 group">
          {/* Deep Parallax Masking */}
          <div className="w-full h-full absolute inset-0 bg-[#242323] z-10 transition-transform duration-1000 ease-out origin-top group-hover:scale-y-0" />
          
          <img 
            ref={orbitRef} 
            src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=2000" 
            alt="Aerospace Astronaut" 
            className="w-full h-full object-cover scale-[1.2] opacity-80 group-hover:opacity-100 transition-opacity duration-700 filter contrast-125 saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#242323] via-transparent to-[#242323]/40"></div>
          
          {/* Futuristic corner brackets */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#b91f1f] opacity-50"></div>
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[#b91f1f] opacity-50"></div>
        </div>
      </div>
    </section>
  );
}
