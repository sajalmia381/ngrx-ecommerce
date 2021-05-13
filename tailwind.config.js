const colors = require('tailwindcss/colors');
module.exports = {
    important: true,
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1440px'
      },
      colors: {
        primary: '#EE5E36',
        accent: '#FDE300',
        warn: '#58B57D',
        black: colors.black,
        white: colors.white,
        gray: colors.coolGray,
        red: colors.red,
        blue: colors.blue
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
