module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
        colors: {
            serenity: {
                primary: '#0B6B74',
                'light-gray': '#F4F4F4',
                gray: '#21272A',
                warning: '#F1C21B',
                'primary-highlight': '#0C7882',
                step: 'rgb(234,235,236)',
            },
        },
        height: {
            main: 'calc(100vh - 3rem)',
        },
        width: {
            102: '32rem',
        },
        fontFamily: {
            graphik: 'Graphik',
            body: ['Graphik'],
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
