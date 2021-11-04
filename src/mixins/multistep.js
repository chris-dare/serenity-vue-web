import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  data() {
    return {
      icon: ChevronRight,
      loading:false,
    }
  },

  watch: {
    storeData: {
      immediate: true,
      deep: true,
      handler(val) {
        this.form = val.id ? { ...this.form , ...val } : { ...val, ...this.form }
      },
    },
  },

  created() {
    if (!this.storeData.id) {
      this.form = { ...this.form , ...this.storeData }
    }
    
  },

  events: {
    'multistep:save': function() {
      this.addToStoreData(this.storeData.id ? { ...this.storeData, ...this.form } : { ...this.form , ...this.storeData })
    },
  },

  methods: {
    cancel() {
      this.refresh()
      if (this.modal) {
        this.$emit('stop')
        return
      }
      this.$router.push({name: this.parent})
    },

    validateAndReroute(reroute = true) {
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
      if(reroute){
        this.$router.push({ name: this.next, query: { ...this.$route.query } })
      }
    },

    goBack(){
      this.$emit('back')
    },

    nextRoute(){
      this.$router.push({ path: this.next, query: { ...this.$route.query } })
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
