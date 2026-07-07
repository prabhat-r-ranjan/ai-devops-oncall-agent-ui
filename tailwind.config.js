// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0e1a',
          800: '#111827',
          700: '#1a2332',
          600: '#1e2a3a',
        },
        accent: {
          purple: '#7c3aed',
          blue: '#3b82f6',
          indigo: '#4f46e5',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 30px -5px rgba(124, 58, 237, 0.3)',
        'glow-light': '0 0 20px -5px rgba(59, 130, 246, 0.2)',
      },
      borderColor: {
        'border': 'hsl(var(--border))',
      },
      backgroundColor: {
        'background': 'hsl(var(--background))',
      },
      textColor: {
        'foreground': 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [],
}