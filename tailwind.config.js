/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jaro: ["Jaro", "sans-serif"],
      },
      colors: {
        primary: "#28194b",
      },
    },
  },
  plugins: [],
};
