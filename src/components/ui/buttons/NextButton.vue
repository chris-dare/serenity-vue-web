<template>
  <div
    variant="secondary"
    class="flex items-center mb-4 space-x-1 cursor-pointer"
    @click="go"
  >
    <span><slot>Next</slot></span>
    <ArrowRight class="w-4" />
  </div>
</template>

<script>
import ArrowRight from '@carbon/icons-vue/es/arrow--right/32'
export default {
  name: 'NextButton',

  components: { ArrowRight },

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
