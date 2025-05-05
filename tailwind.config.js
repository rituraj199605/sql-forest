/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          100: '#FDF2E9',
          200: '#FBEADB',
          300: '#F4B183',
          400: '#E59C6B',
          600: '#D2691E',
        },
        mint: {
          100: '#E6F0ED',
          200: '#D1E0DB',
          600: '#3D7A68',
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}