import { useEffect, useRef, useState } from 'react';


interface TypewriterTextProps {
  text: string;
  start: boolean;
  onComplete: () => void;
  className?: string;
}

export default function TypewriterText({ text, start, onComplete, className }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const textRef = useRef(text);
  
  useEffect(() => {
    if (!start) return;
    
    let currentIdx = 0;
    const interval = setInterval(() => {
      setDisplayedText(textRef.current.substring(0, currentIdx + 1));
      currentIdx++;
      
      if (currentIdx >= textRef.current.length) {
        clearInterval(interval);
        setTimeout(onComplete, 500); // 500ms pause after typing before fading out bg
      }
    }, 50); // 50ms per character
    
    return () => clearInterval(interval);
  }, [start, onComplete]);

  return (
    <p className={className} style={{ minHeight: '1.5em' }}>
      {displayedText}
      {start && displayedText.length < text.length && (
        <span className="inline-block w-[0.5em] h-[1em] bg-white ml-2 animate-pulse align-middle"></span>
      )}
    </p>
  );
}

