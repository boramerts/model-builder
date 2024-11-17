/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
            './src/**/*.{js,jsx,ts,tsx}', // Include all JS/TS files in src
            './public/index.html',        // Include index.html if needed
  ],
  theme: {
    extend: {},
  },
  colors: {
    ...colors,
  },
  plugins: [],
}

