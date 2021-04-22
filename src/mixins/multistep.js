import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  data() {
    return {
      icon: ChevronRight,
    }
  },
  created() {
    console.log('form', this.form)
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
  },
}