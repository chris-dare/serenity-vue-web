<template>
  <span>
    <cv-button-skeleton v-if="loading" />
    <cv-button
      v-else
      :class="[buttonClass, full ? 'w-full' : '', icon ? '' : 'px-4']"
      class="flex items-center justify-center"
      kind="primary"
      :size="size"
      :icon="icon"
      @click="go"
    >
      <slot>{{ label }}</slot>
    </cv-button>
  </span>
</template>

<script>
export default {
  name: 'Button',

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
