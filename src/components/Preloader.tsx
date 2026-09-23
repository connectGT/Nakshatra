import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const wordContainerRef = useRef<HTMLDivElement>(null);
  
  const targetWord = "NAKSHATRA";
  
  // A mix of drastically different system and web fonts to create the classic 'Loki' typography chaos
  const lokiFonts = [
    '"Cabinet Grotesk", sans-serif',
    '"Plus Jakarta Sans", sans-serif',
    'Impact, charcoal, sans-serif',
    '"Courier New", Courier, monospace',
    'Georgia, serif',
    '"Times New Roman", Times, serif',
    '"Arial Black", Gadget, sans-serif',
    '"Trebuchet MS", Helvetica, sans-serif',
    '"Lucida Console", Monaco, monospace',
    '"Comic Sans MS", cursive',
    'Papyrus, fantasy',
    '"Palatino Linotype", "Book Antiqua", Palatino, serif'
  ];
  
  const altChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    let isResolving = false;
    let resolveInterval: number | undefined;
    const scrambleIntervals: number[] = [];

    // 1. Loki Scramble Loop
    targetWord.split('').forEach((_, i) => {
      scrambleIntervals[i] = window.setInterval(() => {
        if (lettersRef.current[i]) {
          // Mix of actual letter and random characters
          const useRealLetter = Math.random() > 0.4;
          const char = useRealLetter 
            ? targetWord[i] 
            : altChars[Math.floor(Math.random() * altChars.length)];
            
          // Randomize font family
          const font = lokiFonts[Math.floor(Math.random() * lokiFonts.length)];
          
          // Randomize case
          const caseChar = Math.random() > 0.5 ? char.toLowerCase() : char.toUpperCase();
          
          lettersRef.current[i]!.innerText = caseChar;
          lettersRef.current[i]!.style.fontFamily = font;
          lettersRef.current[i]!.style.fontWeight = Math.random() > 0.5 ? 'bold' : 'normal';
        }
      }, 70); // Rapid 70ms interval
    });

    // 2. Resolve Sequence Logic
    const startResolve = () => {
      if (isResolving) return;
      isResolving = true;
      
      let currentIdx = 0;
      resolveInterval = window.setInterval(() => {
        if (currentIdx >= targetWord.length) {
          window.clearInterval(resolveInterval);
          
          // Hold for a cinematic beat, then fade out
          setTimeout(() => {
            if (containerRef.current) {
              gsap.to(containerRef.current, {
                opacity: 0,
                duration: 1.2,
                ease: "power2.inOut",
                onComplete: onComplete
              });
            }
          }, 800);
          return;
        }

        // Lock the current letter
        window.clearInterval(scrambleIntervals[currentIdx]);
        const el = lettersRef.current[currentIdx];
        if (el) {
          el.innerText = targetWord[currentIdx];
          el.style.fontFamily = '"Cabinet Grotesk", sans-serif'; // Hero Font
          el.style.fontWeight = '900';
          
          // Subtle lock-in flare (no scale to prevent horizontal layout shift)
          gsap.fromTo(el, 
            { color: '#e63946', textShadow: '0 0 20px #e63946' },
            { color: '#ffffff', textShadow: '0 0 0px #e63946', duration: 0.4, ease: "power2.out" }
          );
        }
        
        currentIdx++;
      }, 200); // 200ms left-to-right stagger
    };

    // 3. Trigger on Image Load
    const heroImgUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80";
    const img = new Image();
    img.src = heroImgUrl;
    
    if (img.complete) {
      setTimeout(startResolve, 800);
    } else {
      img.onload = startResolve;
      img.onerror = startResolve;
    }

    const timeout = setTimeout(startResolve, 5000);

    return () => {
      scrambleIntervals.forEach(interval => window.clearInterval(interval));
      window.clearInterval(resolveInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#0a0a0c] flex items-center justify-center overflow-hidden">
      
      {/* Exact DOM replication of the Hero section layout to ensure perfect alignment */}
      <div className="relative z-20 text-center w-full px-6">
        
        <div className="mb-8 overflow-hidden opacity-0 pointer-events-none">
          <p className="font-bold uppercase tracking-[0.8em] text-[10px] md:text-xs">EROSPACE PRESENTS</p>
        </div>
        
        <h1 className="font-heading fluid-h1 font-black mb-6 leading-[0.85] text-white flex flex-col items-center">
          <span className="block" ref={wordContainerRef}>
            {targetWord.split('').map((_, i) => (
              <span
                key={i}
                ref={el => { lettersRef.current[i] = el; }}
                className="inline-block"
                style={{ transition: 'color 0.2s' }}
              >
                _
              </span>
            ))}
          </span>
        </h1>
        
        <div className="overflow-hidden mb-12 opacity-0 pointer-events-none">
          <p className="text-xl md:text-4xl font-light tracking-[0.2em]">THE AEROSPACE HACKATHON 2026</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-12 opacity-0 pointer-events-none">
          <div className="group">
            <span className="text-[9px] uppercase tracking-widest block mb-2">Location</span>
            <span className="font-bold text-lg pb-1">MITS, Gwalior</span>
          </div>
          <div className="group"><span className="text-[9px] uppercase tracking-widest block mb-2">Date</span><span className="font-bold text-lg pb-1">OCTOBER 2026</span></div></div><div className="mt-20 flex flex-wrap justify-center gap-8 opacity-0 pointer-events-none"><a href="#" className="bg-red-600 px-12 py-5 font-black text-[11px] uppercase tracking-[0.2em]">Register Now</a><a href="#" className="border border-white/20 px-12 py-5 font-black text-[11px] uppercase tracking-[0.2em]">Explore Challenges</a></div>

      </div>

    </div>
  );
}

