/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm' : {'min':'430px','max':'530px'}
    },
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.antialiased': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

