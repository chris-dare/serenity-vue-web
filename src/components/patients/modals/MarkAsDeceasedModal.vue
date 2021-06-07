<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="close"
  >
    <template slot="content">
      <div class="space-y-8">
        <p class="text-lg font-semibold">Mark this patient as deceased</p>
        <DatePicker
          v-model="form.deceased_date_time"
          type="datetime"
          class="w-full max-w-full inherit-full-input"
          placeholder="dd/mm/yyyy"
          label="Date"
        />
        <cv-text-input
          v-model="form.cause_of_death"
          label="Cause of death"
          type="text"
          placeholder="Enter cause of death"
          class="inherit-full-input w-full mb-8"
          :rows="10"
        />
        <div class="mt-12 flex flex-col items-center justify-center space-y-4">
          <SeButton
            full
            :loading="loading"
          >
            Submit
          </SeButton>
          <p
            class="underline cursor-pointer"
            @click="close"
          >
            Go back
          </p>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'MarkAsDeceasedModal',

  data() {
    return {
      form: {},
      visible: false,
      loading: false,
    }
  },

  events: {
    'profile:deceased:open': function(){
      this.visible = true
    },
    'profile:deceased:close': function(){
      this.visible = false
    },
  },

  computed: {
    ...mapState({
      currentPatient: state => state.patients.currentPatient,
    }),
  },

  methods: {
    ...mapActions({
      markAsDeceased: 'patients/updatePatient',
    }),

    async save() {
      try {
        this.loading = true
        await this.updatePatient({...this.currentPatient, is_deceased: true, ...this.form})
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    close() {
      this.visible = false
      this.form = {}
    },
  },
}
</script>
