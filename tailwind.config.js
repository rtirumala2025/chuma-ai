/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chumaGreen: {
          light: '#4ade80',
          DEFAULT: '#16A34A',
          dark: '#15803d',
        }
      }
    },
  },
  plugins: [],
}