import { format } from 'date-fns'

const formatDate = (date, formatString = 'yyyy-MM-dd HH:mm') => format(date, formatString)
const sortDate = (dates) => {
  return dates.sort((a, b) => b.date - a.date)
}

export default {
  install(Vue) {
    Vue.prototype.$date = {
      formatDate,
      sortDate,
    }
  },
}
