import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

// Content globs must be absolute — the dev server's cwd is not guaranteed
// to be this project's root (see postcss.config.js).
const root = dirname(fileURLToPath(import.meta.url))

/** @type {import('tailwindcss').Config} */
export default {
  content: [join(root, 'index.html'), join(root, 'src/**/*.{js,jsx}')],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#F4F7F3',
          100: '#E4EDE2',
          200: '#C9DBC6',
          300: '#A3C09F',
          400: '#7AA077',
          500: '#587F56',
          600: '#40653F',
          700: '#345233',
          800: '#283F27',
          900: '#1E3320',
          950: '#122114',
          DEFAULT: '#283F27',
        },
        canvas: {
          DEFAULT: '#FAF7F0',
          bright: '#FDFBF7',
          tint: '#F3EEE3',
        },
        ink: {
          DEFAULT: '#171B16',
          soft: '#3D423C',
          mid: '#6B7066',
          faint: '#9AA095',
        },
        gold: {
          DEFAULT: '#B99755',
          deep: '#8F6F2E',
          soft: '#EBDFC2',
        },
        line: {
          DEFAULT: '#E2DCCC',
          soft: '#EDE8DA',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Instrument Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.25rem, 1.2rem + 7.4vw, 8rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.75rem, 1.4rem + 4.6vw, 5.75rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(2.15rem, 1.3rem + 3vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        display: ['clamp(1.75rem, 1.2rem + 1.9vw, 2.85rem)', { lineHeight: '1.15', letterSpacing: '-0.005em' }],
        'title-lg': ['clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)', { lineHeight: '1.25' }],
        title: ['1.25rem', { lineHeight: '1.35' }],
        lead: ['clamp(1.05rem, 1rem + 0.3vw, 1.25rem)', { lineHeight: '1.6' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65' }],
        body: ['0.9375rem', { lineHeight: '1.6' }],
        meta: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        caption: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.04em' }],
        micro: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.18em' }],
      },
      letterSpacing: {
        micro: '0.08em',
      },
      maxWidth: {
        site: '112.5rem',
      },
      borderRadius: {
        frame: '2.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18, 33, 20, 0.05), 0 8px 24px rgba(18, 33, 20, 0.06)',
        frame: '0 24px 80px -24px rgba(18, 33, 20, 0.35)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(185, 151, 85, 0.5)' },
          '50%': { opacity: '0.75', boxShadow: '0 0 0 6px rgba(185, 151, 85, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        marquee: 'marquee 46s linear infinite',
      },
    },
  },
  plugins: [],
}
