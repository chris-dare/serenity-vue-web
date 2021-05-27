import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  data() {
    return {
      icon: ChevronRight,
      loading:false,
    }
  },

  // created() {
  //   this.form = { ...this.form , ...this.storeData }
  // },

  watch: {
    storeData: {
      immediate: true,
      handler(val) {
        this.form = { ...this.form , ...val }
      },
    },
  },

  events: {
    'multistep:save': function() {
      this.addToStoreData({ ...this.form , ...this.storeData })
    },
  },

  methods: {
    cancel() {
      this.refresh()
      this.$router.push({name: this.parent})
    },

    validateAndReroute() {
      this.$v.$touch()

      this.addToStoreData(this.form)

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields!',
          type: 'error',
        })
        return
      }

      

      if (this.modal) {
        this.$emit('next')
        return
      }
      this.$router.push({ name: this.next, query: { ...this.$route.query } })
    },

    reRoute() {
      this.addToStoreData(this.form)

      if (this.modal) {
        this.$emit('next')
        return
      }
      this.$router.push({ name: this.next, query: { ...this.$route.query } })
    },
  },
}