// @ts-nocheck
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Rocket tracking scroll
    gsap.to(rocketRef.current, {
      y: () => (itemsRef.current?.offsetHeight || 0) - 50,
      ease: "none",
      scrollTrigger: {
        trigger: itemsRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

    // Reveal items
    const items = gsap.utils.toArray(itemsRef.current?.children || []);
    items.forEach((item: any, i) => {
      gsap.fromTo(item, 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1.5, ease: "power4.out",
          scrollTrigger: { trigger: item, start: "top 85%" }
        }
      );
    });
  }, { scope: containerRef });

  const events = [
    { date: "August 30, 2026", title: "Problem Statements Released", desc: "Official aerospace problem statements unveiled online." },
    { date: "September 05, 2026", title: "Registration Opens", desc: "Teams can begin registering their 2-4 members." },
    { date: "September 20-30, 2026", title: "Round 1 (Online Submission)", desc: "Submit your team's abstract and preliminary approach." },
    { date: "October 12-15, 2026", title: "Round 1 Results", desc: "Top teams shortlisted for the on-campus hackathon." },
    { date: "October 24-25, 2026", title: "Final Round @ MITS Gwalior", desc: "12-Hour On-Campus Hackathon & Prototype Building." }
  ];

  return (
    <section ref={containerRef} id="timeline" className="py-48 px-10 md:px-20 relative overflow-hidden bg-[#242323]">
      {/* Deep Background Image Parallax */}
      <img 
        src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2000" 
        alt="Space Nebula" 
        className="absolute inset-0 w-full h-full object-cover opacity-[0.15] scale-110 filter saturate-0 contrast-150 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#242323] via-transparent to-[#242323]"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="overflow-hidden mb-32">
          <h3 className="text-5xl md:text-7xl font-syncopate font-bold text-center text-white uppercase tracking-tighter">
            Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Chronology</span>
          </h3>
        </div>
        
        <div className="relative" ref={itemsRef}>
          {/* Minimalist Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
          
          {/* Progress tracker */}
          <div ref={rocketRef} className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 w-[2px] h-[100px] bg-gradient-to-b from-transparent via-[#b91f1f] to-transparent shadow-[0_0_15px_#b91f1f] z-10"></div>

          {events.map((evt, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row items-center justify-between mb-24 group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              <div className="w-full md:w-5/12 pl-10 md:pl-0">
                <div className={`p-8 bg-[#242323]/50 backdrop-blur-xl border-l-2 md:border-l-0 md:border-t-2 border-white/10 group-hover:border-[#b91f1f]/50 transition-colors duration-500 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right md:border-r-2 md:border-l-0'}`}>
                  <p className="text-[#b91f1f] font-mono text-sm tracking-widest mb-4 opacity-80">{evt.date}</p>
                  <h4 className="text-2xl md:text-3xl font-orbitron font-bold mb-4 text-white group-hover:translate-x-2 transition-transform duration-500">{evt.title}</h4>
                  <p className="text-[#bdb9b2]/60 font-space text-sm leading-relaxed">{evt.desc}</p>
                </div>
              </div>
              <div className="hidden md:block w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
