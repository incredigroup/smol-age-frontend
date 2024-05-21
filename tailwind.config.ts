import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        'game-page': "url('/static/images/backgroundGif.gif')",
        'landing-page': "url('/static/images/updatedLandingBG.gif')",
        'landing-page-mobile': "url('/static/images/mobileGifNoMammoth.gif')",
        rockboard: "url('/static/images/rockboard.webp')",
      },
      colors: {
        'smol-brown': {
          DEFAULT: '#41251f',
          alternative: '#9b7240',
          light: '#90864c',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: {
          DEFAULT: 'hsl(var(--background))',
          light: 'hsl(var(--background-light))',
          dark: 'hsl(var(--background-dark))',
        },
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          dark: 'hsl(var(--accent-dark))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        beat: {
          '0%': { transform: 'scale(0.9)' },
          '80%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        beat: 'beat 0.75s infinite',
      },
      textShadow: {
        xl: '3px 3px 0px rgba(10, 10, 10, 1)',
        '2xl': '3px 3px 0px rgba(65, 65, 65, 1)',
        '3xl': '5px 5px 0px rgba(65, 65, 65, 1)',
      },
      boxShadow: {
        button:
          '-4px 0 0 0 #444, 4px 0 0 0 #444, 0 -4px 0 0 #444, 0 4px 0 0 #444, inset -3px 0 0 0 #999, inset 0 -3px 0 0 #999',
        'button-hover':
          '-4px 0 0 0 #444, 4px 0 0 0 #444, 0 -4px 0 0 #444, 0 4px 0 0 #444, inset -5px 0 0 0 #999, inset 0 -5px 0 0 #999',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config;

export default config;
