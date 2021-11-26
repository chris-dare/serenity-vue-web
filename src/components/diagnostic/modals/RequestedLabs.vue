<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
  >
    <template slot="title">
      <div>
        <h1>Complete blood count</h1>
        <p class="text-secondary text-sm">What action do you want to perform?</p>
      </div>
    </template>
    <template>
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
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
export default {
  name: 'RequestedLabsModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      loading: false,
      name: 'requested-labs-modal',
    }
  },

  events: {
    'requestedlabs:add:open': function() {
      this.open()
    },
  },
}
</script>
