<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="close"
  >
    <template slot="content">
      <slot />
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'BaseModal',

  props: {
    eventName: {
      type: String,
      default: 'location',
    },
  },

  data() {
    return {
      visible: false,
    }
  },

  computed: {
    openEventName() {
      return `${this.eventName}:add:open`
    },
    editEventName() {
      return `${this.eventName}:edit:open`
    },
    closeEventName() {
      return `${this.eventName}:close`
    },
  },

  events: {
    openEventName: function() {
      this.visible = true
    },
    editEventName: function(data) {
      this.visible = true
      this.form = data.params[0]
    },
    closeEventName: function() {
      this.close()
    },
  },

  methods: {
    close() {
      this.form = {}
      this.$v.$reset()
      this.visible = false
      this.$emit('close')
    },
  },
}
</script>
