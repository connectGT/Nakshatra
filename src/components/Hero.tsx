import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      tl.to('.hero-bg', { scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' })
        .to('.hero-overlay', { opacity: 1, duration: 1.5 }, "-=1.5")
        .fromTo('.hero-eyebrow', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=1.2")
        .fromTo('.hero-title', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.9")
        .fromTo('.hero-subtitle', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
        .fromTo('.hero-message', { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.6")
        .fromTo('.hero-ctas', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
        .fromTo('.hero-meta-bottom', { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.4")
        .fromTo('.hero-meta-right', { opacity: 0, x: 5 }, { opacity: 1, x: 0, duration: 1 }, "-=0.6");
        
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full min-h-[100svh] overflow-hidden bg-[#020408] flex">
      {/* 1. Video / Background Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          playsInline 
          loop 
          preload="auto"
          poster="/refined_hero_landscape.jpg"
          className="hero-bg w-full h-full object-cover object-center scale-[1.02] blur-[2px]"
        >
          <source src="/dummy-cinematic.mp4" type="video/mp4" />
        </video>
        <img 
          src="/refined_hero_landscape.jpg" 
          alt="Cinematic Cosmic Landscape" 
          className="hero-bg w-full h-full object-cover object-center absolute inset-0 -z-10 scale-[1.02] blur-[2px]"
        />
      </div>


      {/* 2. Atmospheric Overlay (Readability Gradient) */}
      <div className="absolute inset-0 z-10 hero-overlay opacity-0 pointer-events-none bg-gradient-to-r from-[#03060C]/95 via-[#03060C]/60 to-transparent w-[95%] md:w-[65%] lg:w-[50%]"></div>
      
      {/* 3. Hero Content Layer */}
      {/* Max width constrained to 580-650px, left position 7-9vw */}
      <div className="absolute z-20 left-6 md:left-[8vw] top-[48%] -translate-y-1/2 w-full max-w-[620px] pr-6 md:pr-0 flex flex-col">
        
        <div className="hero-eyebrow text-brand-silver/60 font-mono tracking-[0.3em] text-[9px] md:text-[11px] mb-6 md:mb-8 uppercase">
          IDEAS BEYOND BOUNDARIES
        </div>
        
        {/* Title size reduced by 20% compared to previous, elegant silver-white */}
        <h1 className="hero-title text-4xl sm:text-5xl md:text-[clamp(3rem,4.5vw,4.5rem)] font-display font-bold tracking-tight text-[#F2F5F9] mb-4 leading-none">
          NAKSHATRA
        </h1>
        
        <div className="hero-subtitle text-sm md:text-lg font-light text-brand-blue/80 tracking-[0.15em] mb-10 font-sans">
          THE AEROSPACE HACKATHON 2026
        </div>
        
        <div className="hero-message mb-12 pointer-events-auto border-l border-brand-blue/30 pl-6">
          <h3 className="text-base md:text-lg text-brand-silver/90 font-medium tracking-wide">
            Build. Explore. Innovate.
          </h3>
        </div>

        <div className="hero-ctas flex flex-col sm:flex-row gap-5 pointer-events-auto w-full sm:w-auto">
          {/* Refined Primary CTA */}
          <button className="bg-[#E2E8F0] hover:bg-white text-[#0A101C] px-8 py-3.5 font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-3 text-[13px] shadow-[0_0_15px_rgba(141,184,255,0.05)] hover:shadow-[0_0_20px_rgba(141,184,255,0.2)] hover:-translate-y-[1px]">
            Explore Challenges <span className="text-brand-blue transition-transform group-hover:translate-x-1">→</span>
          </button>
          
          {/* Refined Secondary CTA */}
          <button className="group flex items-center justify-center gap-3 px-8 py-3.5 border border-brand-silver/15 text-brand-silver/80 hover:border-brand-blue/40 hover:text-white transition-all duration-300 text-[13px] hover:bg-[#8DB8FF]/5 bg-transparent">
            <Play size={14} className="text-brand-silver/50 group-hover:text-brand-blue transition-colors" />
            <span className="tracking-wide font-light">Watch Trailer</span>
          </button>
        </div>
        
      </div>

      {/* 4. Technical Metadata Layer */}
      
      {/* Bottom Left Scroll */}
      <div className="absolute bottom-10 left-6 md:left-[8vw] z-20 hero-meta-bottom flex flex-col gap-3">
        <div className="text-[9px] font-mono tracking-widest text-brand-silver/40">
          01 / 04 — SCROLL TO EXPLORE
        </div>
        <div className="w-8 h-[1px] bg-brand-blue/20"></div>
      </div>

      {/* Bottom Metadata - Single subtle technical baseline */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex items-center text-[9px] font-mono tracking-[0.2em] text-brand-silver/30 hero-meta-bottom w-full max-w-[800px] justify-center">
        <div className="flex items-center gap-8 w-full justify-center">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-brand-silver/10"></div>
          <span>INDIA WIDE</span>
          <div className="w-[1px] h-3 bg-brand-silver/20"></div>
          <span>STUDENT INNOVATORS</span>
          <div className="w-[1px] h-3 bg-brand-silver/20"></div>
          <span>AEROSPACE & SPACE</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-brand-silver/10"></div>
        </div>
      </div>

      {/* Right Side Markers - Smaller, lower contrast, aligned to grid */}
      <div className="absolute right-8 md:right-[5vw] top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-12 hero-meta-right">
        {['EXPLORE', 'INNOVATE', 'COLLABORATE', 'LAUNCH'].map((item, i) => (
          <div key={item} className="flex items-center gap-4 group cursor-default">
            <div className="text-[8px] font-mono tracking-[0.25em] text-brand-silver/15 group-hover:text-brand-blue/50 transition-colors" style={{ writingMode: 'vertical-rl' }}>
              {item}
            </div>
            {i === 0 && <div className="h-4 w-[1px] bg-brand-blue/20 absolute -right-1 top-0"></div>}
          </div>
        ))}
      </div>

    </section>
  );
};

export default Hero;
