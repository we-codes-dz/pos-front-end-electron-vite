import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: '#eab308',

          secondary: '#24c55e',

          accent: '#4b5563',

          neutral: '#e5e7eb',

          'base-100': '#f3f4f6',

          info: '#2563eb',

          success: '#fcd34d',

          warning: '#f59e0b',

          error: '#b91c1c'
        }
      }
    ]
  },
  plugins: [require('daisyui'), nextui()]
}
