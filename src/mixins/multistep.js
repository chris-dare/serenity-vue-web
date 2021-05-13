import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  data() {
    return {
      icon: ChevronRight,
      loading:false,
    }
  },
  created() {
    this.form = { ...this.form , ...this.storeData }
  },
    
  beforeDestroy() {
    this.addToStoreData(this.form)
  },

  methods: {
    cancel() {
      this.refresh()
      this.$router.push({name: this.parent})
    },

    validateAndReroute() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields!',
          type: 'error',
        })
        return
      }

      this.addToStoreData(this.form)
      this.$router.push({ name: this.next })
    },

    reRoute() {

      this.addToStoreData(this.form)
      this.$router.push({ name: this.next })
    },
  },
}