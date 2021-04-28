import currency from 'currency.js'

const cedi = value => currency(value, { symbol: 'GHc', decimal: '.', separator: ',' })

export default {
  install(Vue) {
    Vue.prototype.$currency = cedi
  },
}