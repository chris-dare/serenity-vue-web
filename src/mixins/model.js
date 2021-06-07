export default {
  props: {
    value: {
      type: [Object, String, Number, Boolean, Date, Array],
      default: null,
    },
  },
  data() {
    return {
      localValue: '',
    }
  },
    
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.localValue = newVal
      },
    },
    
    localValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    },
  },
}