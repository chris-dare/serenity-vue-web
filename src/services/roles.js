import store from '@/store'

const userCan = (permission) => {
  return store.getters['auth/userRoles'] &&
  store.getters['auth/userRoles'].includes(permission)
}

export default {
  install(Vue) {
    Vue.prototype.$userCan = userCan
  },
}
