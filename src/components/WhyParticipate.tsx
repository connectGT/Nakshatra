import { useEffect, useRef } from 'react';
import { Compass, Cpu, Users, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    id: '01',
    title: 'Explore',
    description: 'Dive deep into complex aerospace datasets and simulation environments to uncover new possibilities.',
    icon: Compass,
  },
  {
    id: '02',
    title: 'Build',
    description: 'Engineer robust software and hardware solutions using cutting-edge space technology stacks.',
    icon: Cpu,
  },
  {
    id: '03',
    title: 'Collaborate',
    description: 'Work alongside driven peers and receive mentorship from industry veterans and scientists.',
    icon: Users,
  },
  {
    id: '04',
    title: 'Launch',
    description: 'Deploy your prototypes and gain visibility among top aerospace organizations.',
    icon: Rocket,
  }
];

const WhyParticipate = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.why-card', {
        scrollTrigger: { trigger: '.why-grid', start: 'top 80%' },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-[#000000] overflow-hidden"
    >
      {/* Ambient radial glow behind the grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(141,184,255,0.03)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="why-header flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="text-brand-blue/60 font-mono tracking-widest text-xs mb-4 uppercase">Why Participate</div>
            <h2 className="text-3xl md:text-5xl font-display text-white">MISSION PARAMETERS</h2>
          </div>
          <p className="max-w-md text-brand-silver/50 font-light text-sm">
            Designed for those who seek to contribute to the next generation of space exploration and aerospace engineering.
          </p>
        </div>

        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="why-card relative bg-[#000000] p-10 group overflow-hidden cursor-default"
            >
              {/* Hover fill */}
              <div className="absolute inset-0 bg-brand-blue/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="text-brand-blue/20 font-mono text-xs mb-10 tracking-widest">{reason.id}</div>

              <div className="relative z-10 mb-6">
                <reason.icon
                  size={30}
                  className="text-brand-silver/30 group-hover:text-brand-blue transition-all duration-500"
                  strokeWidth={1}
                />
                {/* Icon glow on hover */}
                <div className="absolute -inset-2 rounded-full bg-brand-blue/10 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
              </div>

              <h3 className="relative z-10 text-xl text-white font-medium mb-4 tracking-wide">{reason.title}</h3>
              <p className="relative z-10 text-brand-silver/40 font-light text-sm leading-relaxed">
                {reason.description}
              </p>

              {/* Bottom blue line reveal */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-brand-blue/0 via-brand-blue/50 to-brand-blue/0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyParticipate;
