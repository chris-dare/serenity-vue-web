<template>
  <BaseModal
    :name="name"
    title="Mark this patient as deceased"
    width="450px"
    @closed="close"
  >
    <template>
      <div class="space-y-8">
        <DatePicker
          v-model="form.deceased_date_time"
          type="datetime"
          class="w-full max-w-full inherit-full-input se-input-gray"
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
  </BaseModal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import modalMixin from '@/mixins/modal'
export default {
  name: 'MarkAsDeceasedModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      loading: false,
      name: 'mark-as-deceased-modal',
    }
  },

  events: {
    'profile:deceased:open': function(){
      this.open()
    },
    'profile:deceased:close': function(){
      this.close()
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
  },
}
</script>
