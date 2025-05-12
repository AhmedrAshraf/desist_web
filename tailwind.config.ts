/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
          primary: '#1B2D45',    // Deep navy background
          secondary: '#2D4059',  // Lighter navy for cards
          accent: '#EA5455',     // Professional red accent
          text: {
            primary: '#FFFFFF',
            secondary: '#B0B6BE',
            muted: '#8D96A7'
          }
        }
      },
    },
  },
  plugins: [],
} 