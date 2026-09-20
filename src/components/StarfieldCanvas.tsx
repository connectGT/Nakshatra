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
