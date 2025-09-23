/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        ui: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#121212',
          800: '#181818',
          700: '#202020',
          600: '#282828',
          500: '#303030',
          400: '#404040',
          300: '#505050',
          200: '#606060',
          100: '#909090',
          50: '#f5f5f5',
        },
        neon: {
          blue: '#00f2ff',
          purple: '#7000ff',
          pink: '#ff00c3',
          green: '#00ff8f',
          yellow: '#fff200',
        },
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
        secondary: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#fbd7a5',
          300: '#f9bc6d',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        accent: {
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
        theme: {
          extend: {
            colors: {
              primary: '#1DB9FF', // Neon Blue
              accent: '#9B51E0', // Neon Purple
              secondary: '#2C2C2C', // Soft Gray
              textPrimary: '#FFFFFF', // Main text, headings on dark bg
              textSecondary: '#B0B0B0', // Subtext, placeholder text
              backgroundMain: '#121212', // Dark Black
              backgroundCard: '#1F1F1F', // Dark Gray
              overlay: 'rgba(255,255,255,0.05)', // Overlay
              success: '#00FF85', // Green
              error: '#FF5C5C', // Red
              warning: '#FFC400', // Yellow
            },
          },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'glow': 'glow 1.5s ease-in-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounce 1s infinite',
        'hover-up': 'hoverUp 0.3s ease-out forwards',
        'neon-pulse': 'neonPulse 1.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 242, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 242, 255, 0.8), 0 0 30px rgba(0, 242, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        hoverUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-8px)' },
        },
        neonPulse: {
          '0%, 100%': { textShadow: '0 0 5px rgba(0, 242, 255, 0.8), 0 0 10px rgba(0, 242, 255, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(0, 242, 255, 1), 0 0 30px rgba(0, 242, 255, 0.8), 0 0 40px rgba(0, 242, 255, 0.6)' },
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
