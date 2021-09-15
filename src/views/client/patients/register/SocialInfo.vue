<template>
  <MultiStepBase
    next-label="Next: Payment"
    :loading="loading"
    :next="next"
    :previous="previous"
    :icon="icon"
    :query="$route.query"
    @cancel="cancel"
    @save="reRoute"
  >
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

      <MultiSelect
        v-model="form.patient_communication"
        title="Home Language"
        :multiple="false"
        :options="languages"
        label="display"
        track_by="code"
        placeholder="Primary language you speak"
        custom-field="code"
        preselect
      />
      <cv-text-input
        v-model="form.occupation"
        label="Occupation"
        type="text"
        placeholder="Occupation"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.employer"
        label="Company/Employer"
        placeholder="Where do you work?"
        type="text"
        class="inherit-full-input"
      />
    </div>
  </MultiStepBase>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'SocialInfo',

  mixins: [MultiStep],

  data() {
    return {
      form: {},
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
      languages: state => state.resources.languages,
    }),
  },

  methods: {
    ...mapActions({
      addToStoreData: 'patients/addToCurrentPatient',
      refresh: 'patients/refreshCurrentPatient',
    }),
  },
}
</script>
