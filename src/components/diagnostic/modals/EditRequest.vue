<template>
  <BaseModal
    :name="name"
  >
    <template slot="title">
      <div>
        <h1>Electrolyte panel</h1>
        <p class="text-secondary text-sm">+#433534545</p>
        <p class="text-secondary text-sm">Dr. Grey Stroop</p>
      </div>
    </template>
    <template>
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
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'

export default {
  name: 'EditRequestModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      loading: false,
      name: 'edit-request-modal',
    }
  },

  events: {
    'edit-request:add:open': function() {
      this.open()
    },
  },
}
</script>
