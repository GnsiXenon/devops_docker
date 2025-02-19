import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      'green': '#81f499',
      'celeste': '#afece7',
      'lescouleurscasertarien': '#99c5b5',
      'grayblue': '#899e8b',
      'gray': '#706c61',
      'white': '#ffffff',
      'blue': '#23b2a4',
      'gren': '#008000',
      'red': '#f48c8c',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
