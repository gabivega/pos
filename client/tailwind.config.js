/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blue: "#00466A"
      }
    },
     screens: {
    xs: "480px",
    sm: "768px",
    md: "1000px",
    lg: "1240px"
  }

  },
  plugins: [require('tailwind-scrollbar-hide')],
 
}

