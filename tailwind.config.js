import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/TS files in src
    "./public/index.html", // Include index.html if needed
  ],
  theme: {
    extend: {
      colors: {
        // Add any custom colors here
        ...colors,
      },
    },
  },
  plugins: [],
};
