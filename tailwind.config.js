// const { url } = require("inspector");

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        animate:'animate 1s linear infinite'
      },

      keyframes: {
        animate: {
          '0%': { transform: 'scale-100 , opacity: 0'},
          '25%, 75%': { opacity: '1' },
          '100%': {transform: 'scale-150, opacity: 0'},
        },
      },
      

      backgroundImage: theme => ({
        'hero-pattern': "url('/hero-img.JPEG')",
      })
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide"),require('@tailwindcss/forms')],
  }
};

