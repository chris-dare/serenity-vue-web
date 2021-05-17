<template>
  <div
    class="inline-flex justify-center items-center px-3 py-0.5 text-sm font-semibold"
    :class="[customClasses, full ? 'w-full h-9 rounded-md' : 'w-auto rounded-full']"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Tag',

  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: function(value) {
        return ['success', 'primary', 'error'].indexOf(value) !== -1
      },
    },

    full: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    customClasses() {
      if (this.variant == 'primary') {
        return 'bg-blue-100 text-blue-800'
      }

      if (this.variant == 'success') {
        return 'bg-green-100 text-green-800'
      }
    
      if (this.variant == 'error') {
        return 'bg-red-100 text-red-800'
      }

      return ''
    },
  },
}
</script>
