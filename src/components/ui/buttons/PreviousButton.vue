<template>
  <div
    variant="secondary"
    class="flex items-center mb-4 space-x-1 cursor-pointer"
    @click="go"
  >
    <ArrowLeft class="w-4" /> <span><slot>Back</slot></span>
  </div>
</template>

<script>
import ArrowLeft from '@carbon/icons-vue/es/arrow--left/32'
export default {
  name: 'PreviousButton',

  components: { ArrowLeft },

  props: {
    to: {
      type: [String,Object],
      default: null,
    },
  },

  methods: {
    go() {
      if (this.to) {
        this.$router.push(this.to)
        return
      }

      this.$emit('click')
    },
  },

}
</script>
