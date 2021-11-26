export default {
  data() {
    return {
      visible: false,
    }
  },

  methods: {
    close() {
      this.$resetData()

      if (this.$v) {
        this.$v.$reset()
      }
              
      this.visible = false
      if (this.name) {
        this.$modal.hide(this.name)
      }
      
      this.afterCloseFunction()
      
    },

    open() {
      this.visible = true

      if (this.name) {
        this.$modal.show(this.name)
      }
      
    },

    afterCloseFunction() {},
  },
}