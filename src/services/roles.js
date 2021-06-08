import store from '@/store'

const userCan = (permission) => {
  return store.getters['auth/userRoles'] &&
  store.getters['auth/userRoles'].includes(permission)
}

const isCurrentWorkspace = (permission) => {
  return store.state.global.workspaceType === permission
}

export default {
  install(Vue) {
    Vue.prototype.$userCan = userCan
    Vue.prototype.$isCurrentWorkspace = isCurrentWorkspace
  },
}
