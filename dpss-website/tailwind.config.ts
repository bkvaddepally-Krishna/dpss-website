import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pjs)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#0d6f3b", // Primary Green (brand color)
          hover: "#1a9e55",   // Secondary Green (hover/active)
        },
        accent: {
          DEFAULT: "#ffc400", // Gold Accent (CTAs, highlights)
        },
        typography: {
          dark: "#0f172a",    // Dark Text (headings)
          body: "#475569",    // Body Text (paragraphs)
          white: "#ffffff",
        },
        surface: {
          soft: "#f8faf9",    // Soft Background (sections)
        },
        border: {
          light: "#e5e7eb",   // Light Border
        },
      },
      borderRadius: {
        '2xl': '16px', // Cards
        'xl': '12px',  // Buttons
      },
      boxShadow: {
        // Use shadow-lg as default for elevated elements
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      }
    },
  },
  plugins: [],
};

export default config;
