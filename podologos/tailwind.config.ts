import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lexend)', 'system-ui', 'sans-serif'],
        lexend: ['var(--font-lexend)', 'sans-serif'],
      },
      colors: {
        azul: '#2087ED',
        cinza: '#C3C5C7',
        cinzaTexto: '#636C74',
        cinzaTextoClaro: '#A4AAB2',
        vermelho: '#EB5757',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      addUtilities({
        '.hide-password-toggle': {
          '&::-ms-reveal': {
            display: 'none',
          },
          '&::-ms-clear': {
            display: 'none',
          },
          '&::-webkit-contacts-auto-fill-button': {
            display: 'none !important',
          },
          '&::-webkit-credentials-auto-fill-button': {
            display: 'none !important',
          },
        }
      })
    }
  ],
};
export default config;
