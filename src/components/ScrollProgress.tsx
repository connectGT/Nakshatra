// @ts-nocheck
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
