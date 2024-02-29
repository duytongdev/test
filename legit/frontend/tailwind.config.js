/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
    './src/**/*',
    './node_modules/vue-tailwind-datepicker/**/*.js'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        primary: colors.sky,
        green: colors.emerald,
        red: colors.rose,
        'vtd-primary': colors.sky
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')({ nocompatible: true })]
}
