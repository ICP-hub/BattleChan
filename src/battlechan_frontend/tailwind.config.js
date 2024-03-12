/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'dark': "#000",
      'light': "#fff",
      'red': "#FF4343",
      'green': "#3A6841",
      'dark-green': "#0C150D",
      'dirty-light-green': "#345D3A",
      "light-green": "#18AF00",
    },
  },
  plugins: [],
}

