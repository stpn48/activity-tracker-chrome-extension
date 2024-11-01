/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust as needed
  ],
  theme: {
    extend: {
      fontFamily: {
        geistSans: ["GeistSans", "sans-serif"],
        geistMono: ["GeistMono", "monospace"],
      },
    },
  },
  plugins: [],
};
