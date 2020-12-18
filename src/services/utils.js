
const validateRequiredField = ($v, field) => {
    return $v.form[field].$error && $v.form[field].$dirty
      ? `${field} is required`
      : ''
}

// validateRequiredField(field) {
//     return this.$v.internalFaq[field].$error && this.$v.internalFaq[field].$dirty
//       ? `${this.$t(field)} ${this.$t('is_required')}`
//       : ''
//   },

export default {
  install(Vue) {
    Vue.prototype.$utils = {
        validateRequiredField,
    }
  },
}
