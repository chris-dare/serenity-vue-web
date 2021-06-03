<template>
  <div
    class="inline-flex justify-center items-center px-3 py-0.5 text-sm space-x-1"
    :class="[customClasses, full ? 'w-full h-9 rounded-md' : 'w-auto rounded-full']"
  >
    <Checkmark
      v-if="variant === 'success'"
      class="text-green-800 w-4"
    />
    <div
      v-else
      class="w-2 h-2 rounded-full"
      :class="dotClasses"
    />
    <div>
      <slot />
    </div>
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
        return ['success', 'primary', 'error', 'warning'].indexOf(value) !== -1
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
      if (this.variant == 'warning') {
        return 'bg-yellow-100 text-warning'
      }

      return ''
    },

    dotClasses() {
      if (this.variant == 'primary') {
        return 'bg-blue-800 text-blue-800'
      }

      if (this.variant == 'success') {
        return 'bg-green-800 text-green-800'
      }
    
      if (this.variant == 'error') {
        return 'bg-red-800 text-red-800'
      }
      if (this.variant == 'warning') {
        return 'bg-warning text-warning'
      }

      return ''
    },
  },
}
</script>
