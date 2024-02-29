/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}','./node_modules/vue-tailwind-datepicker/**/*.js'],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        primary: colors.sky,
        'vtd-primary': colors.sky
      }
    }
  },
  plugins: [require('prettier-plugin-tailwindcss'), require('@tailwindcss/forms')]
}
