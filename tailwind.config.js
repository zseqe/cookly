/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#10110F',
        bgSecondary: '#171916',
        bgCard: '#20231F',
        bgInteractive: '#282C26',
        textPrimary: '#F5F2E9',
        textSecondary: '#B3B5AA',
        textMuted: '#82877B',
        accentOlive: '#B8C58A',
        accentSage: '#8EAA85',
        warmCream: '#E9DFC7',
        stateError: '#E78375',
        stateSuccess: '#9EC69A',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};