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
        'custom': '57rem', // Adjust the value as needed
        'custom-team': '63rem', // Adjust the value as needed
      },
      screens: {
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