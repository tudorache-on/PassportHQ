/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./pages/**/*.{html,js}", "index.html"],
  theme: {
    extend: {
      screens: {
        'xlg': '1536px',
        'xl': '1800px',
        '2xl': '2000px'
      }
    },
  },
  plugins: [],
}
