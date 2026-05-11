import type { Config } from 'tailwindcss'
import { brand } from '@engine/config/brand'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: `hsl(var(--primary))`,
          foreground: `hsl(var(--primary-foreground))`,
        },
        accent: {
          DEFAULT: `hsl(var(--accent))`,
          foreground: `hsl(var(--accent-foreground))`,
          tint: `hsl(var(--accent-tint))`,
        },
        background: `hsl(var(--background))`,
        foreground: `hsl(var(--foreground))`,
        muted: {
          DEFAULT: `hsl(var(--muted))`,
          foreground: `hsl(var(--muted-foreground))`,
        },
        border: `hsl(var(--border))`,
        success: `hsl(var(--success))`,
        warning: `hsl(var(--warning))`,
        destructive: `hsl(var(--destructive))`,
      },
      borderRadius: {
        lg: brand.radius,
        md: `calc(${brand.radius} - 2px)`,
        sm: `calc(${brand.radius} - 4px)`,
      },
      fontFamily: {
        heading: [brand.fonts.heading, 'sans-serif'],
        body:    [brand.fonts.body, 'sans-serif'],
        mono:    [brand.fonts.mono, 'monospace'],
      },
      maxWidth: {
        content: '1280px',  // 12-column grid max-width
      },
      boxShadow: {
        'card-hover': '0 6px 24px rgba(0,0,0,0.08)',
      },
      transitionDuration: {
        '150': '150ms',  // UI interactions
        '200': '200ms',  // Page transitions, drawers
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config

