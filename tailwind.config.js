const plugin = require('tailwindcss/plugin')

console.log(plugin)

module.exports = {
  // mode: 'jit',
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // darkMode: 'class',
  theme: {
    extend: {},
  },
  // variants: {
  //   extend: {},
  // },
  plugins: [],
}
