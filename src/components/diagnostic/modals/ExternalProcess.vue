<template>
  <BaseModal
    :name="name"
  >
    <template slot="title">
      <div>
        <h1>Electrolyte panel</h1>
        <p class="text-secondary text-sm">#433534545</p>
        <p class="text-secondary text-sm">Dr. Grey Stroop</p>
      </div>
    </template>
    <template>
      <div>
        <cv-select
          v-model="doctor"
          class="se-custom-input"
          label="Service provider"
        >
          <cv-select-option
            disabled
            hidden
            selected
          >
            Select one service provider
          </cv-select-option>
        </cv-select>
        <cv-date-picker
          v-model="form.birth_date"
          kind="single"
          class="inherit-full-input mt-5"
          placeholder="dd/mm/yyyy"
          date-label="Choose a due date"
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
            class="mx-3"
            :loading="loading"
          >
            Approve and send >
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
export default {
  name: 'ExternalModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      loading: false,
      name: 'external-process-modal',
    }
  },

  events: {
    'external:add:open': function() {
      this.open()
    },
  },
}
</script>
