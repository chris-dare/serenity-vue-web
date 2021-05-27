export default {
  data() {
    return {
      timer: null,
      currentTime: Date.now(),
      milliseconds: 1000,
    }
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  created() {
    setInterval(() => {
      this.currentTime = Date.now()
    }, this.milliseconds)
  },

}
