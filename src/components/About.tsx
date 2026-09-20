import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, suffix: '+', label: 'Challenge Tracks' },
  { value: 48, suffix: 'H', label: 'Build Window' },
  { value: 500, suffix: '+', label: 'Innovators Expected' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        const duration = 1600;
        const startTime = performance.now();
        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease out expo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
    });
    return () => trigger.kill();
  }, [value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline: words reveal from bottom clip
      gsap.from('.about-word', {
        scrollTrigger: { trigger: '.about-headline', start: 'top 80%' },
        y: '100%',
        opacity: 0,
        duration: 1,
        stagger: 0.04,
        ease: 'power3.out',
      });

      // Body text fade
      gsap.from('.about-body', {
        scrollTrigger: { trigger: '.about-body', start: 'top 85%' },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
      });

      // Line draw
      gsap.fromTo('.about-line', { scaleX: 0, transformOrigin: 'left center' }, {
        scrollTrigger: { trigger: '.about-line', start: 'top 85%' },
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Stats
      gsap.from('.about-stat', {
        scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const headline = 'THE NEXT FRONTIER IS BUILT BY THOSE WILLING TO EXPLORE IT.'.split(' ');

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-[#020408] via-[#000000] to-[#000000] overflow-hidden"
    >
      {/* Subtle left radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_left,rgba(141,184,255,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: headline */}
        <div>
          <div className="about-headline overflow-hidden">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light leading-tight text-white mb-8 flex flex-wrap gap-x-[0.35em]">
              {headline.map((word, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <span className="about-word inline-block">{word}</span>
                </span>
              ))}
            </h2>
          </div>

          {/* Stats row */}
          <div className="about-stats flex gap-10 mt-10">
            {stats.map((s) => (
              <div key={s.label} className="about-stat flex flex-col gap-1">
                <div className="text-3xl md:text-4xl font-display font-bold text-white">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] font-mono tracking-widest text-brand-silver/40 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: body */}
        <div className="flex flex-col gap-6 pt-2">
          <div className="about-line w-full h-[1px] bg-brand-blue/30" />
          <p className="about-body text-brand-silver/80 font-light leading-relaxed text-lg">
            Nakshatra 2026 is an elite national aerospace hackathon bringing together the brightest student minds to engineer solutions for real-world space challenges.
          </p>
          <p className="about-body text-brand-silver/50 font-light leading-relaxed">
            Beyond a competition, it is a launchpad. We combine the rigor of aerospace research with the agility of modern technology to foster innovation that pushes boundaries. Step into an environment designed for collaboration, discovery, and breakthroughs.
          </p>
          <a
            href="#challenges"
            className="about-body inline-flex items-center gap-3 text-brand-blue font-mono text-xs tracking-widest mt-4 hover:gap-5 transition-all duration-300"
          >
            VIEW CHALLENGES →
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
