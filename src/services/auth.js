function requiresAuth(route){
  for(let i = 0; i < route.matched.length; i++){
    let meta = route.matched[i].meta
    if(meta && meta.requiresAuth){
      return true
    }
  }
  return false
}

export default {
  install(Vue, {router, store}) {
    router.beforeEach((to, from, next) => {
      const loggedIn = store.state.auth.loggedIn
      const pathRequiresAuth = requiresAuth(to)
      const isAuthRoute = ['AuthLogin'].includes(to.name)
      if(loggedIn && isAuthRoute){
        next({name: 'GetStarted'})
        return
      }
      if(!loggedIn && pathRequiresAuth){
        next({name: 'AuthLogin'})
        return
      }
      next()
    })
  },
}