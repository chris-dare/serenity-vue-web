<template>
  <BaseModal
    :name="name"
    @closed="close"
  >
    <template slot="title">
      <div>
        <h1>Reason for rejection</h1>
        <p class="text-secondary text-sm">#433534545</p>
        <p class="text-secondary text-sm">Dr. Grey Stroop</p>
      </div>
    </template>
    <template>
      <div>
        <cv-text-area
          v-model="form.comments"
          label="Special comments"
          placeholder="Enter comments here..."
          :rows="5"
          class="col-span-2  py-3"
        />
      </div>

      <div class="flex items-center justify-between mt-12">
        <SeButton
          variant="secondary"
          @click="close"
        >
          Go back
        </SeButton>
        <div class="flex items-center">
          <SeButton
            :loading="loading"
          >
            Save
          </SeButton>
          <SeButton
            :loading="loading"
          >
            Approve and sent >
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
export default {
  name: 'RejectionModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      loading: false,
      name: 'rejection-modal',
    }
  },

  events: {
    'rejectlab:add:open': function() {
      this.open()
    },
  },
}
</script>
