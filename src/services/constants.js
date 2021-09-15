export default {
  install(Vue) {
    Vue.prototype.$global = {
      USER_ACCOUNT_TYPE: 'user-account',
      CASH_TYPE: 'cash',
    }
  },
}
