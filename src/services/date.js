import { format } from 'date-fns'

const formatDate = (date, formatString = 'yyyy-MM-dd HH:mm') => format(date, formatString)

export default {
  install(Vue) {
    Vue.prototype.$date = {
        formatDate,
    }
  },
}
