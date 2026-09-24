import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'Cambria', 'serif'],
      },
      colors: {
        brand: {
          50: '#f0f9f3',
          100: '#d8f3dc',
          200: '#b7e4c7',
          300: '#95d5b2',
          400: '#74c69d',
          500: '#52b788',
          600: '#40916c',
          700: '#2d6a4f',
          800: '#1b4332',
          900: '#132f24',
          950: '#0a1a14',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        night: {
          700: '#1b273f',
          800: '#111a2e',
          900: '#0a0f1c',
          950: '#05070e',
        },
        ink: '#1a1a1a',
        neutralgrey: '#6b6b6b',
      },
      lineHeight: {
        tight: '1.2',
        relaxed: '1.5',
      },
      boxShadow: {
        card: '0 1px 3px rgba(16, 40, 30, 0.06), 0 8px 24px rgba(16, 40, 30, 0.06)',
        cardhover: '0 4px 12px rgba(16, 40, 30, 0.1), 0 16px 40px rgba(16, 40, 30, 0.12)',
        glow: '0 0 0 1px rgba(59,130,246,0.25), 0 20px 60px -10px rgba(37,99,235,0.45)',
        glowsoft: '0 30px 80px -20px rgba(37,99,235,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
}
