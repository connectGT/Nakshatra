import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scheduleSteps = [
  { phase: '01', title: 'Registration Opens', date: 'Oct 15, 2025', desc: 'Teams register and submit intent to participate.' },
  { phase: '02', title: 'Idea Submission', date: 'Nov 10, 2025', desc: 'Submit your problem statement and initial solution brief.' },
  { phase: '03', title: 'Shortlist Announcement', date: 'Dec 05, 2025', desc: 'Top teams announced and invited to the finale.' },
  { phase: '04', title: 'Grand Finale', date: 'Jan 20–22, 2026', desc: '48-hour intensive build sprint and final judging.' },
];

const Schedule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.schedule-header', {
        scrollTrigger: { trigger: '.schedule-header', start: 'top 80%' },
        y: 25,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // SVG line draw left to right
      if (lineRef.current) {
        const length = 1000;
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(lineRef.current, {
          scrollTrigger: { trigger: '.schedule-track', start: 'top 75%' },
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.inOut',
        });
      }

      // Nodes pop in sequentially
      gsap.from('.schedule-node', {
        scrollTrigger: { trigger: '.schedule-track', start: 'top 75%' },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.3,
        ease: 'back.out(2)',
        transformOrigin: 'center center',
      });

      // Cards slide up
      gsap.from('.schedule-card', {
        scrollTrigger: { trigger: '.schedule-track', start: 'top 75%' },
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
      id="schedule"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-[#000000] overflow-hidden"
    >
      {/* Centre radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(141,184,255,0.025)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="schedule-header mb-24 text-center">
          <div className="text-brand-blue/60 font-mono tracking-widest text-xs mb-4 uppercase">Timeline</div>
          <h2 className="text-3xl md:text-5xl font-display text-white">FLIGHT SCHEDULE</h2>
        </div>

        <div className="schedule-track relative">
          {/* Animated SVG connector line (desktop) */}
          <div className="absolute top-[22px] left-0 w-full hidden md:block pointer-events-none overflow-hidden px-[12.5%]">
            <svg width="100%" height="4" className="overflow-visible">
              <line
                ref={lineRef}
                x1="0" y1="2" x2="1000" y2="2"
                stroke="rgba(141,184,255,0.25)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {scheduleSteps.map((step, i) => (
              <div key={i} className="schedule-card relative flex flex-col items-center text-center group">
                {/* Node dot (desktop) */}
                <div className="schedule-node w-4 h-4 rounded-full bg-[#000000] border border-brand-blue/50 z-10 mb-8 hidden md:flex items-center justify-center group-hover:border-brand-blue group-hover:shadow-[0_0_12px_rgba(141,184,255,0.4)] transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/0 group-hover:bg-brand-blue transition-colors duration-300" />
                </div>

                {/* Mobile vertical line */}
                <div className="w-[1px] h-12 bg-white/10 md:hidden mb-4" />

                <div className="text-brand-blue/40 font-mono text-sm mb-3">{step.phase}</div>
                <h3 className="text-lg text-white font-medium mb-2 group-hover:text-brand-blue transition-colors duration-300">{step.title}</h3>
                <div className="text-brand-silver/40 font-mono text-[10px] tracking-widest uppercase mb-3">{step.date}</div>
                <p className="text-brand-silver/30 font-light text-xs leading-relaxed max-w-[180px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
