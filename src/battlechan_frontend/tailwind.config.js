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
      'green': "#3A6841",
      "light-green": "#18AF00",
    },
  },
  plugins: [],
}

