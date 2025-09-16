/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1: {
          red: '#E10600',
          dark: '#15151E',
          gray: '#38383F',
          light: '#F7F4F9',
        }
      },
      fontFamily: {
        'formula': ['Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}