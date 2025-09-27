/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'prompt': ['Prompt', 'sans-serif']
      },
      colors: {
        'saan-green': '#16a34a',
        'saan-pink': '#ec4899'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #d4f5d4 0%, #4ade80 100%)',
      }
    },
  },
  plugins: [],
}