export default {
  name: 'HasPermissionDirective',
  bind(el, binding, vnode) {
    const action = binding.value
    const hasPermissionTo = vnode.context.$store.getters['auth/hasPermissionTo']

    // hide or disable the element if no permission granted for this specific action
    if (!hasPermissionTo(action)) {
      if (['INPUT', 'SELECT', 'TEXTAREA'].indexOf(el.nodeName) > -1) {
        el.disabled = true
      } else {
        el.style.display = 'none'
      }
    }
  },
}
