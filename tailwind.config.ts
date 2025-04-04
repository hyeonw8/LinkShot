import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // 적용할 파일 경로
  darkMode: 'class', 
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

