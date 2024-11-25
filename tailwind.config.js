/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3AB4FD',
        Grey: '#969696',
        PrimaryText: '#051621',
        Success: '#55B938',
        ErrorRed: '#ED4337',
        bg_primary: '#C3EAFF',
        lightBlue: '#EBF8FF',
        
      },
      fontFamily: {
        circular: ['CircularStd', 'sans-serif'],
      },
      fontWeight: {
        book: 400,
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
  },
  plugins: [],
};
