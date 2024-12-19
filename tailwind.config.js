/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-color))",
        secondary: "rgb(var(--secondary-color))",
        primarytext: "rgb(var(--text-color))",
        primaryborder: "rgb(var(--border-color))",
      },
      boxShadow: {
        standard: "0 0 5px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
