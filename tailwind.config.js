const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      visibility: ['group-hover'],
    },
    
      
  },
  darkMode: 'class',
  plugins: [
    nextui({
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Inter', 'sans-serif'],
      },
      // check stroke layout
      layout: {
        borderWidth: {
          small: '1px',
          medium: '1.5px',
          large: '2px',
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#4169E1',
              foreground: '#fff',
            },
           
          },
        },
        dark: {
          colors: {
            primary: '#4169E1',
            foreground: '#fff',

          },
        },
      },
    }),
    require('@tailwindcss/typography'),
  ],
};
