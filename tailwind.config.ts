/* eslint-disable prettier/prettier */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/template/**/*.{js,ts,jsx,tsx,mdx}',
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
    },
  },
  plugins: [],
}
export default config
