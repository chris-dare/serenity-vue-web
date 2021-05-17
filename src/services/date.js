import format from 'date-fns/format'
import startOfDay from 'date-fns/startOfDay'
import startOfMonth from 'date-fns/startOfMonth'
import endOfDay from 'date-fns/endOfDay'
import endOfMonth from 'date-fns/endOfMonth'
import formatDistance from 'date-fns/formatDistance'

const formatDate = (date, formatString = 'yyyy-MM-dd HH:mm') => format(new Date(date), formatString)

const sortDate = (dates) => {
  return dates.sort((a, b) => b.date - a.date)
}
const startOfDate = (date = new Date()) => startOfDay(date)
const endOfDate = (date = new Date()) => endOfDay(date)
const startOfMonthDate = (date = new Date()) => startOfMonth(date)
const endOfMonthDate = (date = new Date()) => endOfMonth(date)

const distanceInWords = (date) => formatDistance(
  new Date(date),
  new Date(),
  { addSuffix: true },
)

const formatQueryParamsDate = (dateString) => {
  let date = new Date(dateString)
  return `${format(date, 'yyyy-MM-dd')}T${format(date, 'HH:mm:ss')}Z`
}

const queryNow = () => formatQueryParamsDate(new Date())

export default {
  install(Vue) {
    Vue.prototype.$date = {
      formatDate,
      sortDate,
      startOfDate,
      endOfDate,
      formatQueryParamsDate,
      startOfMonth: startOfMonthDate,
      endOfMonth: endOfMonthDate,
      queryNow,
      distanceInWords,
    }
  },
}
