import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Tiny canvas starfield used only in FinalCTA
const MiniStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1 + 0.2,
      o: Math.random() * 0.5 + 0.05,
    }));

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.o})`;
      ctx.fill();
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline scale reveal
      gsap.from('.final-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        scale: 1.06,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
      });

      // CTA button fade up
      gsap.from('.final-cta-btn', {
        scrollTrigger: { trigger: '.final-headline', start: 'top 60%' },
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power2.out',
      });

      // Button breathing pulse
      if (btnRef.current) {
        gsap.to(btnRef.current, {
          boxShadow: '0 0 24px rgba(141,184,255,0.25)',
          duration: 2.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }

      // Horizon glow pulse
      gsap.to('.final-glow', {
        opacity: 0.6,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-48 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-[#000000]"
    >
      {/* Starfield */}
      <MiniStars />

      {/* Horizon glow */}
      <div className="final-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-32 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(141,184,255,0.15)_0%,transparent_70%)]" />

      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-silver/10 to-transparent" />

      <div className="relative z-10 text-center flex flex-col items-center gap-12">
        <h2 className="final-headline text-4xl md:text-6xl lg:text-8xl font-display font-light text-white leading-none tracking-tight">
          THE SKY IS NOT <br />
          <span className="text-brand-silver/60">THE LIMIT.</span>
        </h2>

        <a
          ref={btnRef}
          href="#register"
          className="final-cta-btn relative px-12 py-5 border border-brand-blue/30 bg-brand-blue/[0.06] hover:bg-brand-blue/10 text-brand-blue transition-all duration-500 font-mono tracking-[0.25em] text-sm group"
        >
          <span className="relative z-10 flex items-center gap-4">
            EXPLORE NAKSHATRA
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </span>
        </a>

        <div className="text-brand-silver/20 font-mono text-[10px] tracking-widest">
          NAKSHATRA · THE AEROSPACE HACKATHON 2026
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
