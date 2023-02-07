/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        '25vh': '25vh',
        '50vh': '50vh',
        '75vh': '75vh',
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
