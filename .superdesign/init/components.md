# Components

## StarDivider.tsx
`	sx
const StarDivider = () => (
  <div className="flex items-center gap-4 w-full max-w-7xl mx-auto px-6 md:px-12 py-2">
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-brand-silver/10" />
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 opacity-40">
      <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#8DB8FF" />
    </svg>
    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-brand-silver/10" />
  </div>
);

export default StarDivider;

`

## StarfieldCanvas.tsx
`	sx
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
  color: string;
}

const StarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const scrollYRef = useRef(0);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = [
      'rgba(255,255,255,',
      'rgba(141,184,255,',
      'rgba(233,238,245,',
    ];

    const initStars = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      starsRef.current = Array.from({ length: 220 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.08 + 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const scrollOffset = scrollYRef.current * 0.04;

      for (const star of starsRef.current) {
        const drawY = (star.y - scrollOffset) % h;
        ctx.beginPath();
        ctx.arc(star.x, drawY < 0 ? drawY + h : drawY, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${star.opacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const handleResize = () => {
      initStars();
    };

    initStars();
    draw();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default StarfieldCanvas;

`

## ScrollProgress.tsx
`	sx
import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-brand-blue/60 to-brand-blue transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;

`

