import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Rewards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.rewards-left', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        x: -30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.reward-card', {
        scrollTrigger: { trigger: '.rewards-right', start: 'top 80%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="rewards"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-[#020408] to-[#000000] overflow-hidden"
    >
      {/* Right side ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_right,rgba(217,180,106,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div className="rewards-left">
          <div className="text-brand-blue/60 font-mono tracking-widest text-xs mb-4 uppercase">Recognition</div>
          <h2 className="text-3xl md:text-5xl font-display text-white mb-8">
            BEYOND THE <br /> HORIZON
          </h2>
          <p className="text-brand-silver/50 font-light leading-relaxed mb-10">
            Exceptional solutions deserve exceptional recognition. Winners receive research grants, access to exclusive aerospace facilities, and long-term mentorship from leading scientists.
          </p>
          {/* Decorative planet ring graphic */}
          <div className="relative w-48 h-48 opacity-[0.08] hidden lg:block">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
              <circle cx="100" cy="100" r="50" stroke="#8DB8FF" strokeWidth="0.8" />
              <circle cx="100" cy="100" r="70" stroke="#8DB8FF" strokeWidth="0.4" strokeDasharray="3 5" />
              <ellipse cx="100" cy="100" rx="95" ry="25" stroke="#8DB8FF" strokeWidth="0.6" transform="rotate(-20 100 100)" />
              <circle cx="100" cy="100" r="6" fill="#8DB8FF" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Right: reward cards */}
        <div className="rewards-right flex flex-col gap-5">
          {/* Featured tier — shimmer card */}
          <div className="reward-card relative border border-brand-gold/20 p-8 bg-[#0a0800] overflow-hidden group hover:border-brand-gold/40 transition-colors duration-300">
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent pointer-events-none" />
            {/* Left border charge */}
            <div className="absolute left-0 top-0 w-[2px] h-0 bg-brand-gold/50 group-hover:h-full transition-all duration-500 ease-out" />

            <div className="text-brand-gold/70 font-mono text-xs tracking-widest mb-3">TIER 01 — PRIME</div>
            <h3 className="text-2xl text-white font-medium mb-4">Prime Innovator Award</h3>
            <p className="text-brand-silver/50 font-light text-sm leading-relaxed">
              Research grant, exclusive access to ISRO facilities, and specialised mentorship for 6 months post-event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="reward-card relative border border-white/[0.06] p-6 bg-[#000000] overflow-hidden group hover:border-brand-blue/20 transition-colors duration-300">
              <div className="absolute left-0 top-0 w-[2px] h-0 bg-brand-blue/40 group-hover:h-full transition-all duration-500" />
              <div className="text-brand-silver/30 font-mono text-[10px] tracking-widest mb-2">TIER 02</div>
              <h3 className="text-lg text-white font-medium mb-2">Vanguard Award</h3>
              <p className="text-brand-silver/40 font-light text-xs leading-relaxed">Innovation grant and incubation support from partner organisations.</p>
            </div>
            <div className="reward-card relative border border-white/[0.06] p-6 bg-[#000000] overflow-hidden group hover:border-brand-blue/20 transition-colors duration-300">
              <div className="absolute left-0 top-0 w-[2px] h-0 bg-brand-blue/40 group-hover:h-full transition-all duration-500" />
              <div className="text-brand-silver/30 font-mono text-[10px] tracking-widest mb-2">SPECIAL</div>
              <h3 className="text-lg text-white font-medium mb-2">Research Merit</h3>
              <p className="text-brand-silver/40 font-light text-xs leading-relaxed">Outstanding technical paper recognition and publication support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
