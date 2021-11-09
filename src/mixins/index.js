import Vue from 'vue'
import get from 'lodash/get'


Vue.mixin({
  computed: {
    $providerId() {
      return get(this.$store.state, 'auth.provider.id')
    },
    $locationId() {
      return get(this.$store.state, 'global.location')
    },
  },
  beforeDestroy() {
    if (this.$route && this.$route.name !== 'AuthLogin') {
      sessionStorage.setItem('redirectUrl', this.$route.fullPath)
    }

  },
  methods: {
    $resetData(field) {
      let originalData = this.$options.data.apply(this)
      if(field){
        originalData = { [field]: originalData[field] }
      }
      Object.assign(this.$data, originalData)
    },
  },
})
