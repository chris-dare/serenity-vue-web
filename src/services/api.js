import patients from '@/api/patients'
import resources from '@/api/resources'

export default {
  install(Vue) {
    Vue.prototype.$api = {
      patients,
      resources,
    }
  },
}