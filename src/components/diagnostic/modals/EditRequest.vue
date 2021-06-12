<template>
  <cv-modal
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <div>
        <h1>Electrolyte panel</h1>
        <p class="text-secondary text-sm">+#433534545</p>
        <p class="text-secondary text-sm">Dr. Grey Stroop</p>
      </div>
    </template>
    <template slot="content">
      <div>
        <SeButton
          variant="secondary"
        >
          Reject lab sample
        </SeButton>
        <SeButton>
          Accept sample
        </SeButton>
        <SeButton
          variant="gray"
        >
          External processing
        </SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'EditRequestModal',

  data() {
    return {
      visible: false,
      form: {},
      loading: false,
    }
  },

  events: {
    'edit-request:add:open': function() {
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
