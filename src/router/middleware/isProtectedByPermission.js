import Vue from 'vue'

export default function isProtectedByPermission ({ next, permission, from }) {
  const canView = Vue.prototype.$userCan(permission)
  const redirect = from.name ? from.name : 'Dashboard'

  if (!canView) {
    Vue.prototype.$toast.error('You do not have the required permission to view this page')
    return next({ name: redirect })
  }
    
  return next()
    
}