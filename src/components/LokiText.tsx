import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LokiTextProps {
  text: string;
  onComplete: () => void;
}

export default function LokiText({ text, onComplete }: LokiTextProps) {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  
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
    text.split('').forEach((_, i) => {
      scrambleIntervals[i] = window.setInterval(() => {
        if (lettersRef.current[i]) {
          const useRealLetter = Math.random() > 0.4;
          const char = useRealLetter 
            ? text[i] 
            : altChars[Math.floor(Math.random() * altChars.length)];
            
          const font = lokiFonts[Math.floor(Math.random() * lokiFonts.length)];
          const caseChar = Math.random() > 0.5 ? char.toLowerCase() : char.toUpperCase();
          
          lettersRef.current[i]!.innerText = caseChar;
          lettersRef.current[i]!.style.fontFamily = font;
          lettersRef.current[i]!.style.fontWeight = Math.random() > 0.5 ? 'bold' : 'normal';
        }
      }, 70);
    });

    // 2. Resolve Sequence Logic
    const startResolve = () => {
      if (isResolving) return;
      isResolving = true;
      
      let currentIdx = 0;
      resolveInterval = window.setInterval(() => {
        if (currentIdx >= text.length) {
          window.clearInterval(resolveInterval);
          setTimeout(onComplete, 800);
          return;
        }

        window.clearInterval(scrambleIntervals[currentIdx]);
        const el = lettersRef.current[currentIdx];
        if (el) {
          el.innerText = text[currentIdx];
          el.style.fontFamily = '"Cabinet Grotesk", sans-serif';
          el.style.fontWeight = '900';
          
          // No red flare, just simple snap to white
          gsap.to(el, { color: '#ffffff', duration: 0.1 });
        }
        
        currentIdx++;
      }, 200);
    };

    // 3. Trigger on Video Load
    const video = document.createElement('video');
    video.src = "/assets/hero-bg.mp4";
    video.preload = "auto";
    
    if (video.readyState >= 3) {
      setTimeout(startResolve, 800);
    } else {
      video.oncanplay = startResolve;
      video.onerror = startResolve;
    }

    const timeout = setTimeout(startResolve, 5000);

    return () => {
      scrambleIntervals.forEach(interval => window.clearInterval(interval));
      window.clearInterval(resolveInterval);
      clearTimeout(timeout);
    };
  }, [text, onComplete]);

  return (
    <span className="block" style={{ letterSpacing: '-0.02em' }}>
      {text.split('').map((_, i) => (
        <span
          key={i}
          ref={el => { lettersRef.current[i] = el; }}
          className="inline-block"
          style={{ transition: 'color 0.2s', color: '#ffffff' }}
        >
          _
        </span>
      ))}
    </span>
  );
}

