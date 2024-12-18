/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}","./screens/**/*.{js,jsx,ts,tsx}","./navigation/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#00ddb3',
        secondary: '#6C5248',
      }
    },
  },
  plugins: [],
}

