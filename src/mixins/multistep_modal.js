export default {
  data() {
    return {
      step: 0,
    }
  },
  methods: {
    next(form) {
      console.info(Object.assign({}, this.form))
      this.form = Object.assign(this.form, form)
      console.info(Object.assign({}, this.form))
      this.$refs.steps.next(this.form)
    },
    prev(form) {
      this.form = Object.assign(this.form, form)
      this.$refs.steps.prev(this.form)
    },
  },
}