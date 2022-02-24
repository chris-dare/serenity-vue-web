import patients from '@/api/patients'

export default {
  install(Vue) {
    Vue.prototype.$api = {
      patients,
    }
  },
}