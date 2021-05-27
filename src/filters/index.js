import Vue from 'vue'
import { format } from 'date-fns'

export function capitalize (value) {
  if (!value) return ''
  value = value.toString().toLowerCase()
  return value.charAt(0).toUpperCase() + value.slice(1)
}
export function removeDash (value) {
  if (!value) return ''
  value = value.toString().toLowerCase()
  return value.split('-').join(' ')
}
export function removeUnderscore (value) {
  if (!value) return ''
  value = value.toString().toLowerCase()
  return value.split('_').join(' ')
}

export function formatDate(value) {
  if (!value) return ''
  return format(value)
}

export function toCedis(value) {
  return `Gh¢${value}`
}

function formatMoney(num) {
  return parseFloat(num).toFixed(2)
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const filters = { toCedis, formatMoney, formatDate, capitalize, removeDash, removeUnderscore }

export default Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})