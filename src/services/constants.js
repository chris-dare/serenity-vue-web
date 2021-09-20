export default {
  install(Vue) {
    Vue.prototype.$global = {
      USER_ACCOUNT_TYPE: 'user-account',
      CORPORATE_ACCOUNT_TYPE: 'corporate',
      CASH_TYPE: 'cash',
    }
  },
}
