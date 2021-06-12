const scrollTop = (divId) => {
  var element = document.getElementById(divId)
  element.scrollTop = 0
}
  
export default {
  install(Vue) {
    Vue.prototype.$scrollTop = scrollTop
  },
}