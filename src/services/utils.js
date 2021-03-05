
const validateRequiredField = ($v, field) => {
  const $field = $v.form[field]
  const formattedField = field.charAt(0).toUpperCase() 
    + field.slice(1).replace(/([-_]\w)/g, g => ' '+g[1].toUpperCase())
  console.info($field)
  if($field.$error && $field.$dirty){
    if($field.sameAsPassword === false){
      return 'Passwords do not match'
    }
    return `${formattedField} is required`
  }
  return ''
}

const createRandom = (number = 10) => {
  return Math.floor(Math.random() * number) + 1
}

export default {
  install(Vue) {
    Vue.prototype.$utils = {
      validateRequiredField,
      createRandom,
    }
  },
}
