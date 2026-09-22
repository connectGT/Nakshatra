# Theme

Brand Navy: #060b14
Brand Blue: #8DB8FF
Brand Gold: #D9B46A
Brand Silver: #E2E8F0
Brand Red: #FF4A4A

## tailwind.config.js
`js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#05080D',
        'brand-dark': '#071321',
        'brand-blue': '#8DB8FF',
        'brand-silver': '#E9EEF5',
        'brand-gold': '#D9B46A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syncopate', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      letterSpacing: {
        'widest': '.25em',
      }
    },
  },
  plugins: [],
}

`

## index.css
`css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&family=Syncopate:wght@400;700&display=swap');

@import "tailwindcss";

@theme {
  --color-brand-navy: #05080D;
  --color-brand-dark: #071321;
  --color-brand-blue: #8DB8FF;
  --color-brand-silver: #E9EEF5;
  --color-brand-gold: #D9B46A;

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Syncopate', sans-serif;
  --font-mono: 'Space Mono', monospace;

  --tracking-widest: 0.25em;
}

body {
  background-color: #020408;
  color: var(--color-brand-silver);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ── Shimmer sweep animation ── */
@keyframes shimmer-sweep {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
.shimmer-sweep {
  animation: shimmer-sweep 2.5s ease-in-out infinite;
  animation-play-state: paused;
}
.group:hover .shimmer-sweep {
  animation-play-state: running;
}

/* ── Subtle floating animation ── */
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-10px) rotate(1deg); }
}
.float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

/* ── Pulsing glow ── */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 0px rgba(141, 184, 255, 0); }
  50%       { box-shadow: 0 0 20px rgba(141, 184, 255, 0.2); }
}
.glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}

/* ── Custom scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #020408; }
::-webkit-scrollbar-thumb { background: #1a2a40; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #8DB8FF; }

html { scroll-behavior: smooth; }

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

`
