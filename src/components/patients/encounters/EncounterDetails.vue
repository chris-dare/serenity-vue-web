<template>
  <div class="divide-solid divide-y divide-subtle">
    <ToggleList
      title="Patient Vitals"
      class="pt-4"
    >
      <div class="space-y-4">
        <VitalsDetail
          small
          :form="vitals"
        />
        <SeButton
          v-if="$userCan('vitals.write')"
          variant="secondary-outline"
          @click="$trigger('capture:vitals:open')"
        >
          Record new Vitals <Add class="w-5 ml-2" />
        </SeButton>
      </div>
    </ToggleList>
    <ToggleList
      title="Chief Complaint"
      class="pt-4"
    >
      <cv-text-area
        v-model="form.chief_complaint"
        :rows="5"
        placeholder="Reason for visit"
        @input="throttledSend"
      />
    </ToggleList>
    <ToggleList
      title="History of Present illness"
      class="pt-4"
    >
      <cv-text-area
        v-model="form.history_of_presenting_illness"
        :rows="5"
        placeholder="Progress of complaint"
        @input="throttledSend"
      />
    </ToggleList>
    <ToggleList
      title="Past Medical History"
      class="pt-4"
    >
      <EncounterMedicalHistory />
    </ToggleList>
    <ToggleList
      title="Social History"
      class="pt-4"
    >
      <EncounterSocialHistory />
    </ToggleList>
    <ToggleList
      title="Family History"
      class="pt-4"
    >
      <cv-text-area
        v-model="family.FAMILY_HISTORY"
        :rows="5"
        placeholder="Family history"
      />

      <div class="flex justify-end mt-2">
        <SeButton @click="throttledSendHistory">save</SeButton>
      </div>
    </ToggleList>
    <ToggleList
      title="Review of systems"
      class="pt-4"
    >
      <EncounterReviewSystems />
    </ToggleList>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  name: 'EncounterDetails',

  components: {
    VitalsDetail: () => import(/* webpackPrefetch: true */ '@/components/vitals/VitalsDetail'),
    EncounterMedicalHistory: () => import('@/components/patients/encounters/EncounterMedicalHistory'),
    EncounterSocialHistory: () => import('@/components/patients/encounters/EncounterSocialHistory'),
    EncounterReviewSystems: () => import('@/components/patients/encounters/EncounterReviewSystems'),
  },

  data() {
    return {
      form: {},
      family: {},
    }
  },



  computed: {
    ...mapState({
      encounter: state => state.encounters.currentEncounter,
    }),
    ...mapGetters({
      vitals: 'encounters/currentEncounterLatestVitals',
      currentPatientSocialHistory: 'encounters/currentPatientSocialHistory',
    }),
  },

  watch: {
    encounter: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.form = { ...val }
        }
      },
    },

    currentPatientSocialHistory: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.family = { ...val }
        }
      },
    },
  },

  methods: {
    ...mapActions({
      updateEncounter: 'encounters/updateEncounter',
      createObservation: 'patients/createObservation',
    }),

    async submitAnswer() {
      await this.updateEncounter(this.form)
    },

    throttledSend: debounce(function() {
      this.submitAnswer()
    }, 1500),

    async throttledSendHistory() {
      await this.createObservation({ payload: { FAMILY_HISTORY: this.family.FAMILY_HISTORY }, patient: this.$route.params.id })
    },
  },
}
</script>
