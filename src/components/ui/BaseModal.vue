<template>
  <cv-modal
    close-aria-label="Close"
    :visible="show"
    v-bind="$attrs"
    :size="size"
    @modal-hidden="close"
  >
    <template slot="title">
      <slot name="title">
        <p class="text-lg font-semibold">{{ title }}</p>
      </slot>
    </template>
    <template slot="content">
      <slot />
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'BaseModal',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: '',
    },

    size: {
      type: String,
      default: 'xs',
    },
  },

  computed: {
    show: {
      set(val) {
        this.$emit('update:visible', val)
      },
      get() {
        return this.visible
      },
    },
  },

  methods: {
    close() {
      this.$resetData()

      if (this.$v) {
        this.$v.$reset()
      }
              
      this.show = false
      this.$emit('close')
    },
  },
}
</script>
