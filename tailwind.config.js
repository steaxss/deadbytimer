/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./overlay.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f0ff',
          100: '#e9e2ff',
          200: '#d6cbff',
          300: '#b8a4ff',
          400: '#9571ff',
          500: '#7046da',
          600: '#5c37b8',
          700: '#4c2e96',
          800: '#3e2577',
          900: '#2a175e',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#44ff41',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        info: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#5ac8ff',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ff4141',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        'square': ['SquareFont', 'monospace'],
        'poppins': ['Poppins', 'sans-serif'],
        'russo': ['Russo One', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scroll-text': 'scroll-text 6s linear infinite',
        'warning-pulse': 'warning-pulse 0.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            'background': 'linear-gradient(90deg, rgba(181, 121, 255, 0.15) 0%, rgba(181, 121, 255, 0.25) 50%, rgba(181, 121, 255, 0.15) 100%)',
            'border-color': 'rgba(181, 121, 255, 0.4)'
          },
          '50%': { 
            'background': 'linear-gradient(90deg, rgba(181, 121, 255, 0.25) 0%, rgba(181, 121, 255, 0.35) 50%, rgba(181, 121, 255, 0.25) 100%)',
            'border-color': 'rgba(181, 121, 255, 0.6)'
          }
        },
        'scroll-text': {
          '0%': { transform: 'translateX(80%)' },
          '100%': { transform: 'translateX(-80%)' }
        },
        'warning-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      }
    },
  },
  plugins: [],
}