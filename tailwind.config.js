/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'bottom-only': '0 10px 20px -10px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        popup: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
        popup: 'popup 0.4s ease-out forwards',
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        fadeDown: 'fadeDown 0.6s ease-out forwards',
        fadeLeft: 'fadeLeft 0.6s ease-out forwards',
        fadeRight: 'fadeRight 0.6s ease-out forwards',
      },
      colors: {
        'parrot-green': {
          100: '#f3fbe7',
          200: '#def5b4',
          300: '#c7ee81',
          400: '#afe94f',
          500: '#8ec63f', // rgb(142, 198, 63)
          600: '#79b039',
          700: '#5e8d2f',
          800: '#446a25',
          900: '#2a471a',
        },
      },
    },
  },
  plugins: [],
};
