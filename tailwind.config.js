/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spooky: ['"Creepster"', "cursive"],
      },
      colors: {
        primary: "#2563eb",
        secondary: "#f1ac2a",
      },
    },
  },
  plugins: [],
};
