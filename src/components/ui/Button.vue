<template>
  <span>
    <cv-button-skeleton v-if="loading" />
    <cv-button
      v-else
      :class="[buttonClass, full ? 'w-full' : '']"
      class="px-4 flex items-center justify-center"
      kind="primary"
      :size="size"
      @click="$emit('click')"
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

    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        // The value must match one of these strings
        return (
          ['primary', 'secondary', 'tertiary', 'danger', 'outline', 'ghost', 'white'].indexOf(value) !== -1
        )
      },
    },
  },

  computed: {
    buttonClass() {
      if (this.variant == 'outline') {
        return 'border-serenity-primary text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary'
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
}
</script>
