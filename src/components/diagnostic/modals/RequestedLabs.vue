<template>
  <cv-modal
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <div>
        <h1>Complete blood count</h1>
        <p class="text-secondary text-sm">What action do you want to perform?</p>
      </div>
    </template>
    <template slot="content">
      <div class="mt-5">
        <SeButton
          variant="secondary"
        >
          Reschedule lab appointment
        </SeButton>
        <SeButton>
          Move to smaple request >
        </SeButton>
        <p class="text-secondary text-sm mt-2">Lab test requires a patient sample</p>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'RequestedLabsModal',

  data() {
    return {
      visible: false,
      form: {},
      loading: false,
    }
  },

  events: {
    'requestedlabs:add:open': function() {
      this.visible = true
    },
  },

  methods: {
    close() {
      this.visible = false
    },
  },
}
</script>
