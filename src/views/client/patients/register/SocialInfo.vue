<template>
  <SeForm>
    <div class="grid grid-cols-2 gap-8">
      <MultiSelect
        v-model="form.marital_status"
        title="Marital Status"
        :multiple="false"
        :options="statuses"
        label="display"
        track_by="code"
        placeholder="Marital Status"
        custom-field="code"
      />
      <MultiSelect
        v-model="form.religious_affiliation"
        title="Religion"
        :multiple="false"
        :options="religions"
        label="display"
        track_by="code"
        placeholder="Religion"
        custom-field="code"
      />

      <cv-text-input
        v-model="form.preferred_communication"
        label="Home Language"
        placeholder="Primary language you speak"
        type="text"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.meta.email"
        label="Occupation"
        type="text"
        placeholder="Occupation"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.meta.company"
        label="Company/Employer"
        placeholder="Where do you work?"
        type="text"
        class="inherit-full-input"
      />
      <MsisdnPhoneInput
        v-model="form.meta.office_phone_number"
        label="Office Phone number"
      />
    </div>
    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          variant="outline"
        >
          Cancel
        </SeButton>
        <SeButton
          :to="{ name: previous }"
          variant="secondary"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :icon="icon"
          @click="save"
        >
          Next: Payment
        </SeButton>
      </div>
    </div>
  </SeForm>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'SocialInfo',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        meta: {},
      },
      previous: 'EmergencyContact',
      next: 'Payment',
      parent: 'Patients',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.patients.currentPatient,
      statuses: state => state.resources.maritalStatuses,
      religions: state => state.resources.religiousAffiliations,
    }),
  },

  methods: {
    ...mapActions({
      addToStoreData: 'patients/addToCurrentPatient',
      refresh: 'patients/refreshCurrentPatient',
    }),

    save() {
      // this.$v.$touch()

      // if (this.$v.$invalid) {
      //   this.$toast.open({
      //     message: 'Fill all required fields!',
      //     type: 'error',
      //   })
      //   return
      // }

      this.addToStoreData(this.form)
      this.$router.push({ name: this.next })
    },
  },
}
</script>
