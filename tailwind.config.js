module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
        colors: {
            serenity: {
                primary: '#0B6B74',
                gray: '#21272A',
                warning: '#F1C21B',
                info: '#2368F8',
                placeholder: '#4D5358',
                step: 'rgb(234,235,236)',
                'text': '#878D96',
                'light-gray': '#F4F4F4',
                'subtle-border': 'rgba(135, 141, 150, 0.2)',
                'primary-highlight': '#0C7882',
                'secondary-text': '#878D96',
            },
        },
        textColor: {
            'primary': '#21272A',
            'secondary': '#878D96',
            'danger': '#e3342f',
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
