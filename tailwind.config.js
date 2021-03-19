module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        serenity: {
          primary: '#0B6B74',
          gray: '#21272A',
          placeholder: '#4D5358',
          step: 'rgb(234,235,236)',
          'light-gray': '#F4F4F4',
          'subtle-border': 'rgba(135, 141, 150, 0.2)',
          'primary-highlight': '#0C7882',
          auth: '#121619',
        },
        success: '#24A148',
        warning: '#F1C21B',
        info: '#2368F8',
        danger: '#F73842',
        primary: '#21272A',
        secondary: '#878D96',
        tetiary: '#f4f4f4',
        table: '#eceeee',
        dark: '#121619',
        orange: '#F2994A',
      },
      textColor: {
        primary: '#21272A',
        danger: '#e3342f',
      },
      height: {
        main: 'calc(100vh - 3rem)',
      },
      width: {
        102: '32rem',
      },
      maxWidth: {
        102: '32rem',
      },
      fontFamily: {
        graphik: 'Graphik, Open Sans',
        body: ['Graphik', 'Open Sans'],
      },
      backgroundImage: () => ({
        logo: "url('/fonts/auth_bg.svg')",
      }),
      backgroundSize: {
        'logo-size': '50% 90%',
      },
      borderColor: (theme) => ({
        ...theme('colors'),
        subtle: 'rgba(135, 141, 150, 0.2)',
      }),
      minWidth: {
        32: '8rem',
      },
    },
  },
  variants: {
    extend: {
      zIndex: ['hover', 'active'],
    },
  },
  plugins: [],
}
