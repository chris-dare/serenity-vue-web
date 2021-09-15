export default {
  data() {
    return {
      width: 0,
    }
  },

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.width = window.innerWidth
    },
  },

  computed: {
    windowWidth() {
      return (this.width || document.documentElement.clientWidth || document.body.clientWidth)
    },

    isMobile() {
      return this.windowWidth < 640
    },

    isTablet() {
      return this.windowWidth < 1024 && this.windowWidth > 640
    },
  },
}
