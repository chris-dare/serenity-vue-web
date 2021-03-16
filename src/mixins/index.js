import Vue from 'vue'

Vue.mixin({
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
