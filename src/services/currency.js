import currency from 'currency.js'

const cedi = (value, symbol = 'GHS') => currency(value, { symbol, decimal: '.', separator: ',' })

export default {
  install(Vue) {
    Vue.prototype.$currency = cedi
  },
}
