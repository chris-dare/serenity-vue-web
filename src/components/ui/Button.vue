<template>
  <div class="w-auto">
    <cv-button
      :class="[buttonClass, full ? 'w-full' : '', icon ? '' : 'px-4']"
      class="flex items-center justify-center"
      kind="primary"
      :size="size"
      :icon="icon"
      :disabled="loading"
      @click="go"
    >
      <svg
        v-if="loading"
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <slot>{{ label }}</slot>
    </cv-button>
  </div>
</template>

<script>
export default {
  name: 'SeButton',

  props: {
    label: {
      type: String,
      default: '',
    },

    full: {
      type: Boolean,
      default: false,
    },
  
    loading: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: 'field',
    },

    to: {
      type: [String,Object],
      default: null,
    },

    icon: {
      type: [String,Object],
      default: null,
    },

    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        // The value must match one of these strings
        return (
          ['primary', 'secondary', 'tertiary', 'danger', 'outline', 'ghost', 'white', 'default'].indexOf(value) !== -1
        )
      },
    },
  },

  computed: {
    buttonClass() {
      if (this.variant == 'outline') {
        return 'border-serenity-primary text-serenity-primary bg-white hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary'
      }

      if (this.variant  === 'secondary') {
        return 'bg-black text-white'
      }

      if (this.variant  === 'danger') {
        return 'bg-red-500 text-white'
      }

      if(this.variant === 'white') {
        return 'bg-white hover:bg-white text-serenity-placeholder'
      }

      return 'bg-serenity-primary hover:bg-serenity-primary-highlight'
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
