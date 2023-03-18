/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto'],
        Fredoka: ['Fredoka One'],
      },
      screens: {
        'sm2': '425px',
        'sm3': '310px',
      },
    },
  },
  plugins: [],
}
