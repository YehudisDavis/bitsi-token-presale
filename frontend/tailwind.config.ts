import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        'bitsi-blue': '#0133e9',
        'bitsi-purple': '#6c28ee',
        'bitsi-violet': '#9b22f8',
        'bitsi-connect': '#b048ff',
        'bitsi-btn': '#5d37c5',
        'bitsi-btn-border': '#ece7f8',
      },
      backgroundImage: {
        'bitsi-gradient': 'linear-gradient(to bottom, #0133e9, #6c28ee)',
      },
    },
  },
  plugins: [],
}

export default config
