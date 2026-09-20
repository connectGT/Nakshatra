import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const challengesData = [
  {
    num: '01',
    category: 'Orbital Mechanics',
    title: 'Debris Trajectory Prediction',
    desc: 'Develop high-accuracy models to predict the path of micro-debris in low earth orbit.',
  },
  {
    num: '02',
    category: 'Avionics',
    title: 'Autonomous Navigation Systems',
    desc: 'Build lightweight, fault-tolerant navigation algorithms for deep space probes.',
  },
  {
    num: '03',
    category: 'Data Processing',
    title: 'Satellite Imagery Analysis',
    desc: 'Utilize ML to process multi-spectral satellite feeds for real-time climate monitoring.',
  },
  {
    num: '04',
    category: 'Human Spaceflight',
    title: 'Life Support Optimization',
    desc: 'Optimize closed-loop life support systems for extended duration missions.',
  }
];

// Wireframe satellite SVG — purely decorative
const SatelliteSVG = () => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    {/* Body */}
    <rect x="44" y="44" width="32" height="32" rx="2" stroke="#8DB8FF" strokeWidth="0.8" opacity="0.5" />
    {/* Solar panels left */}
    <rect x="4" y="52" width="36" height="16" rx="1" stroke="#8DB8FF" strokeWidth="0.8" opacity="0.3" />
    <line x1="22" y1="52" x2="22" y2="68" stroke="#8DB8FF" strokeWidth="0.5" opacity="0.2" />
    <line x1="13" y1="52" x2="13" y2="68" stroke="#8DB8FF" strokeWidth="0.5" opacity="0.2" />
    <line x1="31" y1="52" x2="31" y2="68" stroke="#8DB8FF" strokeWidth="0.5" opacity="0.2" />
    {/* Solar panels right */}
    <rect x="80" y="52" width="36" height="16" rx="1" stroke="#8DB8FF" strokeWidth="0.8" opacity="0.3" />
    <line x1="98" y1="52" x2="98" y2="68" stroke="#8DB8FF" strokeWidth="0.5" opacity="0.2" />
    <line x1="89" y1="52" x2="89" y2="68" stroke="#8DB8FF" strokeWidth="0.5" opacity="0.2" />
    <line x1="107" y1="52" x2="107" y2="68" stroke="#8DB8FF" strokeWidth="0.5" opacity="0.2" />
    {/* Panel connections */}
    <line x1="40" y1="60" x2="44" y2="60" stroke="#8DB8FF" strokeWidth="0.8" opacity="0.4" />
    <line x1="76" y1="60" x2="80" y2="60" stroke="#8DB8FF" strokeWidth="0.8" opacity="0.4" />
    {/* Dish */}
    <line x1="60" y1="44" x2="60" y2="28" stroke="#8DB8FF" strokeWidth="0.8" opacity="0.35" />
    <ellipse cx="60" cy="24" rx="12" ry="6" stroke="#8DB8FF" strokeWidth="0.8" opacity="0.35" />
    {/* Signal lines */}
    <line x1="60" y1="18" x2="50" y2="8" stroke="#8DB8FF" strokeWidth="0.4" opacity="0.15" strokeDasharray="2 3" />
    <line x1="60" y1="18" x2="70" y2="8" stroke="#8DB8FF" strokeWidth="0.4" opacity="0.15" strokeDasharray="2 3" />
    <line x1="60" y1="18" x2="60" y2="4" stroke="#8DB8FF" strokeWidth="0.4" opacity="0.15" strokeDasharray="2 3" />
    {/* Corner dots */}
    <circle cx="44" cy="44" r="1.5" fill="#8DB8FF" opacity="0.4" />
    <circle cx="76" cy="44" r="1.5" fill="#8DB8FF" opacity="0.4" />
    <circle cx="44" cy="76" r="1.5" fill="#8DB8FF" opacity="0.4" />
    <circle cx="76" cy="76" r="1.5" fill="#8DB8FF" opacity="0.4" />
    {/* Center cross */}
    <line x1="56" y1="60" x2="64" y2="60" stroke="#8DB8FF" strokeWidth="0.5" opacity="0.3" />
    <line x1="60" y1="56" x2="60" y2="64" stroke="#8DB8FF" strokeWidth="0.5" opacity="0.3" />
    <circle cx="60" cy="60" r="2" stroke="#8DB8FF" strokeWidth="0.6" opacity="0.4" />
  </svg>
);

const Challenges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade
      gsap.from('.challenges-header', {
        scrollTrigger: { trigger: '.challenges-header', start: 'top 80%' },
        y: 25,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Rows slide in from left
      gsap.from('.challenge-row', {
        scrollTrigger: { trigger: '.challenges-list', start: 'top 80%' },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Satellite drift
      gsap.to('.satellite-float', {
        y: '-12px',
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
      gsap.to('.satellite-float', {
        rotation: 2,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center center',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="challenges"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-[#000000] to-[#020408] overflow-hidden"
    >
      {/* Decorative satellite - right side */}
      <div className="satellite-float absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 opacity-[0.12] pointer-events-none hidden md:block">
        <SatelliteSVG />
      </div>

      {/* Radial glow left */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_left,rgba(141,184,255,0.035)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="challenges-header mb-20">
          <div className="text-brand-blue/60 font-mono tracking-widest text-xs mb-4 uppercase">Challenge Tracks</div>
          <h2 className="text-3xl md:text-5xl font-display text-white">RESEARCH DOMAINS</h2>
        </div>

        <div className="challenges-list flex flex-col border-t border-white/[0.07]">
          {challengesData.map((challenge, i) => (
            <div
              key={i}
              className="challenge-row group border-b border-white/[0.07] py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer relative overflow-hidden"
            >
              {/* Blue progress line on top, draws on hover */}
              <div className="absolute top-0 left-0 h-[1px] w-0 bg-brand-blue/60 group-hover:w-full transition-all duration-700 ease-out" />

              <div className="flex items-start gap-6 flex-1 md:w-1/3">
                <span className="text-brand-blue/20 font-mono text-xs mt-1 tracking-widest shrink-0">{challenge.num}</span>
                <div>
                  <div className="text-brand-blue/50 font-mono text-[10px] tracking-widest uppercase mb-2">
                    {challenge.category}
                  </div>
                  <h3 className="text-xl md:text-2xl text-white font-medium group-hover:text-brand-blue transition-colors duration-300">
                    {challenge.title}
                  </h3>
                </div>
              </div>

              <div className="flex-1 md:w-1/2 md:pl-6">
                <p className="text-brand-silver/50 font-light leading-relaxed text-sm">
                  {challenge.desc}
                </p>
              </div>

              <div className="hidden md:flex items-center justify-end w-8 text-brand-silver/20 group-hover:text-brand-blue group-hover:translate-x-2 transition-all duration-300 text-lg">
                →
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="group px-8 py-4 border border-brand-silver/10 text-brand-silver/60 hover:border-brand-blue/40 hover:text-brand-blue transition-all duration-300 tracking-widest text-xs font-mono flex items-center gap-3">
            VIEW ALL CHALLENGES
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Challenges;
