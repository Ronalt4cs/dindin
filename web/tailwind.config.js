/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: 'var(--font-rubik) sans-serif',
        lato: 'var(--font-lato) sans-serif',
      },
      colors: {
        lightBlue: '#3A9FF1',
        purple: '#6460FB',
        darkBlue: '#000A4A',
        orange: '#FA8C10',
        pink: '#FF57D3',
      },
      backgroundColor: {
        lightBlue: '#3A9FF1',
        purple: '#6460FB',
        darkBlue: '#000A4A',
        orange: '#FA8C10',
        pink: '#FF57D3',
      },
    },
  },
  plugins: [],
}
