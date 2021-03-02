export default ({ store }, inject) => {
  const userCan = permission =>
    store.$auth.$state.user &&
    store.$auth.$state.user.permissions &&
    store.$auth.$state.user.permissions.includes(permission)

  inject('userCan', userCan)
}
