/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0d6f3b', hover: '#1a9e55' },
        accent:  { DEFAULT: '#ffc400' },
        surface: {
          DEFAULT: '#111827',
          card:    '#1f2937',
          border:  '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
