/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        'cyberpunk': ['Cyberpunk'],
        'bebas': ['BebasNeue'],
        'mont': ['Montserrat']
      }
    },
  },
  plugins: [],
}

