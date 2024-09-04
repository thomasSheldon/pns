/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primaryBackground : "#D6EFFF",
          primaryText: "#366510",
        },
        transitionTimingFunction: {
          'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
          'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        },
        fontFamily: {
          archivo: ['"Archivo Black"', 'sans-serif'], // Add the new font family
        },
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        smd: "840px",
        md: "1020px",
        lg: "1280px",
        xlg: "1439px",
        xl: "1700px",
      },
    },
    plugins: [],
  }
  