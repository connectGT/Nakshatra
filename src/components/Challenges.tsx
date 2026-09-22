// @ts-nocheck
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Challenges() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tracksRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<SVGSVGElement>(null);
  const codeRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    // Reveal
    gsap.fromTo(titleRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );

    gsap.fromTo(tracksRef.current?.children || [],
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out", scrollTrigger: { trigger: tracksRef.current, start: "top 80%" } }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="tracks" className="py-32 px-10 md:px-20 bg-[#242323] text-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <h3 ref={titleRef} className="text-5xl md:text-7xl font-syncopate font-bold text-center mb-24 uppercase tracking-tight">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bdb9b2] to-[#b91f1f]">Mission</span>
        </h3>
        
        <div ref={tracksRef} className="grid md:grid-cols-2 gap-10">
          {/* Software Track */}
          <div className="relative group overflow-hidden rounded-[2rem] aspect-[4/5] md:aspect-square border border-white/10 hover:border-[#b91f1f]/50 transition-colors duration-700">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" 
              alt="Software Track"
              className="absolute inset-0 w-full h-full object-cover scale-[1.15] group-hover:scale-100 transition-transform duration-1000 ease-out filter brightness-50 contrast-125 group-hover:brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242323] via-[#242323]/50 to-transparent"></div>
            
            <div className="absolute inset-0 p-12 flex flex-col justify-between">
              <div>
                <iconify-icon icon="lucide:code" className="text-4xl text-[#b91f1f] mb-6"></iconify-icon>
                <div className="overflow-hidden"><h4 className="text-4xl font-orbitron font-bold text-white uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">SOFTWARE</h4></div>
              </div>
              <div>
                <p className="text-[#bdb9b2]/80 font-space text-lg leading-relaxed mb-8 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out">
                  Develop software-based solutions for navigation systems, orbital calculations, or deep-space communication simulations.
                </p>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#b91f1f] animate-pulse"></span>
                  <span className="text-xs font-space uppercase tracking-widest font-bold opacity-60">Vertical 01</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hardware Track */}
          <div className="relative group overflow-hidden rounded-[2rem] aspect-[4/5] md:aspect-square border border-white/10 hover:border-[#bdb9b2]/50 transition-colors duration-700">
            <img 
              src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1000" 
              alt="Hardware Track"
              className="absolute inset-0 w-full h-full object-cover scale-[1.15] group-hover:scale-100 transition-transform duration-1000 ease-out filter brightness-50 contrast-125 group-hover:brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242323] via-[#242323]/50 to-transparent"></div>
            
            <div className="absolute inset-0 p-12 flex flex-col justify-between">
              <div>
                <iconify-icon icon="lucide:cpu" className="text-4xl text-[#bdb9b2] mb-6"></iconify-icon>
                <div className="overflow-hidden"><h4 className="text-4xl font-orbitron font-bold text-white uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">HARDWARE</h4></div>
              </div>
              <div>
                <p className="text-[#bdb9b2]/80 font-space text-lg leading-relaxed mb-8 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out">
                  Engineer physical prototypes, avionics, sensor arrays, or scale-model propulsion mechanisms for flight testing.
                </p>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#bdb9b2] animate-pulse"></span>
                  <span className="text-xs font-space uppercase tracking-widest font-bold opacity-60">Vertical 02</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
