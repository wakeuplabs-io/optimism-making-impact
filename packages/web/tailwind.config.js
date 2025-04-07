/** @type {import('tailwindcss').Config} */
import tailwindcssTypography from '@tailwindcss/typography';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // Start of new custom colors
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        ['white-high']: 'var(--white-high)',
        ['white-medium']: 'var(--white-medium)',
        ['white-low']: 'var(--white-low)',
        ['dark-high']: 'var(--dark-high)',
        ['dark-medium']: 'var(--dark-medium)',
        ['dark-low']: 'var(--dark-low)',
        ['background-brighter']: 'var(--background-brighter)',
        background: 'var(--background)',
        gray: {
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
        },
        slate: {
          500: 'var(--slate-500)',
        },
        ['mi-stone']: {
          300: 'var(--mi-stone-300)',
        },
        ['mi-lime']: {
          400: 'var(--mi-lime-400)',
        },
        ['mi-red']: {
          400: 'var(--mi-red-400)',
        },
        ['mi-gray']: {
          100: 'var(--mi-gray-100)',
          200: 'var(--mi-gray-200)',
          600: 'var(--mi-gray-600)',
        },
        // End of new custom colors

        // Start of Card tag colors
        simplicity: 'var(--simplicity)',
        familiarity: 'var(--familiarity)',
        extencibility: 'var(--extencibility)',
        awareness: 'var(--awareness)',
        understanding: 'var(--understanding)',
        // End of Card tag colors

        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        'step-separator': `url(data:image/svg+xml,%3Csvg%20width%3D%225%22%20height%3D%225%22%20viewBox%3D%220%200%205%205%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%222.5%22%20cy%3D%222.5%22%20r%3D%222.5%22%20fill%3D%22%238C8C8C%22%2F%3E%0A%3C%2Fsvg%3E%0A)`,
        'step-separator-past': `url(data:image/svg+xml,%3Csvg%20width%3D%225%22%20height%3D%225%22%20viewBox%3D%220%200%205%205%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%222.5%22%20cy%3D%222.5%22%20r%3D%222.5%22%20fill%3D%22%23D9D9D9%22%2F%3E%0A%3C%2Fsvg%3E)`,
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
};
