
const validateRequiredField = ($v, field) => {
  return $v.form[field].$error && $v.form[field].$dirty
    ? `${field} is required`
    : ''
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
