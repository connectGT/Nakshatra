// @ts-nocheck
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Criteria() {
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(leftRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 70%" } });
    gsap.fromTo(rightRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 70%" } });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-10 md:px-20 bg-[#1c1b1b] text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div ref={leftRef}>
          <h3 className="text-5xl font-orbitron font-bold mb-12">Entry Criteria</h3>
          <ul className="space-y-6">
            <li className="flex gap-6 pb-6 border-b border-white/5">
              <span className="text-2xl font-mono text-[#bdb9b2] font-bold">01.</span>
              <div>
                <h5 className="font-bold font-space uppercase tracking-widest mb-2">Multi-Disciplinary</h5>
                <p className="text-[#bdb9b2]/60 text-sm font-space">Open to UG, PG, Engg, Medical, Law, Arts, Commerce and others.</p>
              </div>
            </li>
            <li className="flex gap-6 pb-6 border-b border-white/5">
              <span className="text-2xl font-mono text-[#bdb9b2] font-bold">02.</span>
              <div>
                <h5 className="font-bold font-space uppercase tracking-widest mb-2">Team Dynamics</h5>
                <p className="text-[#bdb9b2]/60 text-sm font-space">2-4 Members per team. Inter-college and inter-specialisation allowed.</p>
              </div>
            </li>
            <li className="flex gap-6 pb-6">
              <span className="text-2xl font-mono text-[#bdb9b2] font-bold">03.</span>
              <div>
                <h5 className="font-bold font-space uppercase tracking-widest mb-2">Strict Integrity</h5>
                <p className="text-[#bdb9b2]/60 text-sm font-space">Solution must be original. Plagiarism leads to disqualification.</p>
              </div>
            </li>
          </ul>
        </div>
        <div ref={rightRef}>
          <h3 className="text-5xl font-orbitron font-bold mb-12">Mission Rules</h3>
          <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-4 text-sm font-space text-[#bdb9b2]/80">
            <p>• One team per participant.</p>
            <p>• Select only one problem statement.</p>
            <p>• Final Round is offline at MITS Campus, Gwalior.</p>
            <p>• Judges' decisions are final and binding.</p>
            <p>• Organisers reserve all rights to schedule modifications.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
