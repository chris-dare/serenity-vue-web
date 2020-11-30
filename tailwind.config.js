module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            serenity: {
                primary: '#0B6B74',
                'primary-highlight': '#0C7882',
                gray: '#21272A'
            }
        },
        height: {
            main: 'calc(100vh - 3rem)'
        },
        width: {
            102: '32rem'
        },
        fontFamily: {
            graphik: 'Graphik',
            body: ['Graphik']
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
