import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  data() {
    return {
      icon: ChevronRight,
    }
  },
  created() {
    this.form = { ...this.form , ...this.storeData }
  },
    
  beforeDestroy() {
    this.addToStoreData(this.form)
  },
}