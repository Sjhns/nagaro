import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'white-transparent': '#ffffff1a',
        'white-hover-transparent': '#ffffff0b',
        neutral: 'rgb(64 64 64 / 1)',
        'iris-blue': 'rgb(29 155 240 / 1)',
        'divider-color': '#ffffff30',
        'gray-white-100': '#f0f1f0',
        'gray-white-200': '#f1f1f1',
        'gray-white-300': '#f5f5f5',
        'gray-white-400': '#bfc2bf',
        'dark-blue': 'linear-gradient(to bottom, #192A56, #0A192F);',
      },
      boxShadow: {
        'shadow-navy-blue': '0 1px 8px 3px rgba(15, 20, 159, 0.42);',
      },
      backgroundImage: {
        'dark-blue': 'linear-gradient(to bottom, #192A56, #0A192F);',
        'purple-gradient':
          'var(--green-gradient, linear-gradient(136deg, #917AFD 0%, #6246EA 100%));',
      },
    },
  },
  plugins: [],
}
export default config
