// @ts-nocheck
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function WhyParticipate() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(textRef.current?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "expo.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    );

    gsap.fromTo(cardsRef.current?.children || [],
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(1.2)",
        scrollTrigger: { trigger: containerRef.current, start: "top 60%" }
      }
    );
  }, { scope: containerRef });

  const steps = [
    { num: "01", title: "Explore", desc: "Engage with aerospace-focused problem statements across space, astronomy, and aeronautics." },
    { num: "02", title: "Build", desc: "Develop cutting-edge software or hardware solutions during the intense 12-hour build sprint." },
    { num: "03", title: "Collaborate", desc: "Team up across disciplines to combine unique skill sets and solve complex challenges." },
    { num: "04", title: "Present", desc: "Pitch your innovations directly to industry experts and university leaders." }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-[#1c1b1b] text-white px-10 md:px-20 relative overflow-hidden">
      {/* Background SVG Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={textRef} className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 className="text-6xl md:text-8xl font-syncopate font-bold leading-none uppercase text-white">Why <br/><span className="text-[#bdb9b2]">Join?</span></h2>
          <p className="max-w-md text-lg text-[#bdb9b2]/80 font-space font-medium">
            Engage with aerospace problem statements and build innovative solutions that push boundaries.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10, backgroundColor: 'rgba(0, 98, 255, 0.1)', borderColor: 'rgba(0, 240, 255, 0.5)' }}
              transition={{ duration: 0.3 }}
              className="p-10 border border-white/10 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-md group cursor-pointer flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <h4 className="text-3xl font-orbitron font-bold mb-6 text-white group-hover:text-[#b91f1f] transition-colors">
                  <span className="text-[#bdb9b2] text-xl block mb-2">{step.num} /</span>
                  {step.title}
                </h4>
                <p className="opacity-60 text-sm font-space text-[#bdb9b2] leading-relaxed">{step.desc}</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#b91f1f] group-hover:bg-[#b91f1f]/10 transition-all">
                <iconify-icon icon="lucide:arrow-right" className="iconify text-xl group-hover:text-[#b91f1f] transition-colors" ></iconify-icon>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
