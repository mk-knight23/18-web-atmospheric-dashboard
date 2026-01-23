/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'weather': {
          'sunny': '#f59e0b',
          'rainy': '#3b82f6',
          'cloudy': '#94a3b8',
          'stormy': '#475569',
          'clear': '#0ea5e9',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
