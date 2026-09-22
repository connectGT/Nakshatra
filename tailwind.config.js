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
        'brand-blue': '#bdb9b2',
        'brand-cyan': '#b91f1f',
        'brand-silver': '#E9EEF5',
        'space-blue': '#242323',
        'electric-blue': '#bdb9b2',
        'neon-cyan': '#b91f1f',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Satoshi', 'system-ui', 'sans-serif'],
        display: ['Tanker', 'sans-serif'],
        tanker: ['Tanker', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        syncopate: ['Syncopate', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        'widest': '.25em',
      }
    },
  },
  plugins: [],
}
