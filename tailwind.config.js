/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        // you can configure the container to be centered
        center: true,

        // or have default horizontal padding
        padding: '1.4rem',

        // default breakpoints but with 40px removed
        screens: {
          sm: '480px',
          md: '768px',
          lg: '976px',
          xl: '1440px',
        },
      },
    },
  },
  plugins: [],
};
