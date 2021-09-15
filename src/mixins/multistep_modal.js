export default {
  data() {
    return {
      step: 0,
    }
  },
  methods: {
    next(form) {
      this.form = Object.assign(this.form, form)
      this.$refs.steps.next(this.form)
    },
    prev(form) {
      this.form = Object.assign(this.form, form)
      this.$refs.steps.prev(this.form)
    },
  },
}