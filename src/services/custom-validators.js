import isUndefined from 'lodash/isUndefined'
import isEmpty from 'lodash/isEmpty'

export const emailFormatter = (value) => {
  if (!value) return value
  let parts = value.split('@')
  if (parts.length !== 2) return value
  parts[1] = parts[1].toLowerCase()
  return parts.join('@')
}

export const bpValidator = (value) => {
  if (isEmpty(value) || isUndefined(value)) {
    return true
  }
  const regex = new RegExp(/^\b(29[0-9]|2[0-9][0-9]|[01]?[0-9][0-9]?)\/(29[0-9]|2[0-9][0-9]|[01]?[0-9][0-9]?)$/)
  return regex.test(value)
}
