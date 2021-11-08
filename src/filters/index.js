import Vue from 'vue'
import { format } from 'date-fns'
import { upperFirst, lowerCase } from 'lodash'

export function capitalize (val) {
  if (!val) return '-'
  let words = val.split(' ')
  const word = words.map((el) => {
    return upperFirst(lowerCase(el))
  })

  return word.join(' ')
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

export function convertArrayToString (value) {
  if (!value || !value.length) return ''
  return value.split(',').join(' ')
}

export function formatDate(value) {
  if (!value) return ''
  return format(value)
}

export function toCedis(value) {
  return `Gh¢${value}`
}

function displayCase(value) {
  if(!value)return '-'
  return upperFirst(lowerCase(value))
}

function formatMoney(num) {
  return parseFloat(num).toFixed(2)
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const filters = { toCedis, formatMoney, formatDate, capitalize, removeDash, removeUnderscore, displayCase, convertArrayToString }

export default Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
