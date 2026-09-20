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
