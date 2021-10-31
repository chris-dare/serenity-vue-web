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
      this.afterCloseFunction()
      
    },

    afterCloseFunction() {},
  },
}