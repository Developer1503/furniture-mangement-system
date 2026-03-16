/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        'brand-gold': '#C9A84C',
        'brand-dark-gold': '#8B6914',
      }
    },
  },
  plugins: [],
}
