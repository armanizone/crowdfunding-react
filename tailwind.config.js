/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, 
        padding: '0.75rem'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
