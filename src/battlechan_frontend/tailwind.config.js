/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "green-gradient": "url('/src/images/dashboard_bg.png')",
      },
      fontFamily: {
        istok: ["istok", "sans-serif"],
      },
    },
    colors: {
      dark: "#000",
      light: "#fff",
      red: "#FF4343",
      green: "#3A6841",
      grey: "#9a9a9a",
      "dark-green": "#0C150D",
      "fresh-green": "rgb(70 166 85)",
      "dirty-light-green": "#345D3A",
      "light-green": "#18AF00",
      transparent: "#00000000",
    },
    screens: {
      small_phone: "430px",
      phone: "550px",
      tablet: "700px",
      big_tablet: "870px",
      laptop: "1000px",
      large:"1025px",
      xl: "1280px",
    },
  },
  plugins: [],
  darkMode: "class",
};
