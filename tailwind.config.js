/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/*',
    '.index.html',
    './dist/*.html'
  ],
  theme: {
    extend: {
      maxWidth: {
        'custom': '57rem',
        'custom-team': '63rem',
      },
      screens: {
        small: '767px',
        xs: '300px',
      },
      colors: {
        'homeContact': '#edeef0',
        'base': '#f9fafb',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}