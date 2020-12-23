<template>
  <div class="relative">
    <div>
      <slot name="label" />
    </div>
    <div ref="dropdown"  :class="[!visible ? 'scale-y-0 h-0' : 'scale-y-100 h-auto', withShadow ? 'shadow-lg' : '']" class="overflow-hidden transform origin-top transition-all duration-200 ease-in-out z-10 min-w-32 absolute right-0">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    withShadow: {
        type: Boolean,
        default: false,
    },
  },
  
  watch: {
    '$route': {
        deep: true,
        immediate: true,
        handler: function () {
            this.modalVisible = false
        },
    },
  },

  computed: {
    modalVisible: {
      set(val) {
        this.$emit('visible:update', val)
      },
      get() {
        return this.visible
      },
    },
  },
}
</script>

<style></style>
