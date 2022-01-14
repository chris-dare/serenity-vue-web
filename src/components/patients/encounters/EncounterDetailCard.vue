<template>
  <div v-if="hasNoCurrentEncounter">
    There is no current encounter
  </div>
  <div
    v-else
    class="bg-white pb-4"
  >
    <div class="p-4 grid grid-cols-2 relative">
      <div>
        <p class="text-secondary">Doctor in charge</p>
        <InfoImageBlock
          :label="currentEncounterPractitioner.name"
          description="General practitioner"
        />
      </div>
      <div>
        <p class="text-secondary mb-2">Date and Time of Encounter</p>
        <div class="flex items-center text-primary">
          <p>
            {{ $date.formatDate(currentEncounter.start_time, 'EEEE,  MMM dd, yyyy hh:mm a') }}
          </p>
        </div>
      </div>
      <div class="absolute right-4 top-4">
        <IconButton
          v-if="$userCan('encounters.pastencounters.write')"
          :loading="loading"
          @click="goToWizard"
        >
          <Edit class="w-4 h-4 text-serenity-primary" />
        </IconButton>
      </div>
    </div>
    <div>
      <ToggleList
        title="Diagnosis"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <EncounterDiagnosis :data="currentEncounterDiagnosis" />
      </ToggleList>
      <ToggleList
        title="Presenting Complaint"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <p
          v-if="!currentEncounterPresentingComplaint"
          class="text-sm text-center my-4"
        >
          No history of presenting illness
        </p>
        <p class="text-gray-500">{{ currentEncounterPresentingComplaint }}</p>
      </ToggleList>
      <ToggleList
        title="History of Presenting Complaint"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <p
          v-if="!currentEncounterHistoryComplaint"
          class="text-sm text-center my-4"
        >
          No chief complaint
        </p>
        <p class="text-gray-500">{{ currentEncounterHistoryComplaint }}</p>
      </ToggleList>
      <ToggleList
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <div slot="title">
          <p
            class="text-serenity-primary w-full"
          >
            Patient Vitals <span class="text-secondary ml-1 text-xs">- as at {{ $date.formatDate(latestVitalsDate) }}</span>
          </p>
        </div>
        <VitalsDetail
          small
          :form="vitals"
        />
      </ToggleList>
      <ToggleList
        title="Social History"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <SocialHistoryDetails :history="currentEncounterSocialHistory" />
      </ToggleList>
      <ToggleList
        title="Laboratory Tests"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <EncounterServiceRequests />
      </ToggleList>
      <ToggleList
        title="Reports / Documents"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <EncounterDiagnosticReports />
      </ToggleList>
      <ToggleList
        title="Review of Systems"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <EncounterReviewSystemTable />
      </ToggleList>
      <ToggleList
        title="Medications / Treatment Plan"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <EncounterMedicationTable hide-action />
      </ToggleList>
      <ToggleList
        title="Care Plans"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <CarePlanTable />
      </ToggleList>
      <ToggleList
        title="Referrals"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <ReferralsTable />
      </ToggleList>
      <ToggleList
        title="Notes"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <EncounterNotes />
      </ToggleList>
      
      <!-- <ToggleList
        title="Bills / Receipts"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      /> -->
    </div>
  </div>
</template>

<script>
import EncounterDiagnosis from './EncounterDiagnosis'
import EncounterNotes from './EncounterNotes'
import EncounterServiceRequests from './EncounterServiceRequests'
import EncounterDiagnosticReports from './EncounterDiagnosticReports'
import CarePlanTable from '@/components/patients/tables/CarePlanTable'
import ReferralsTable from '@/components/patients/tables/ReferralsTable'
import { mapState, mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'EncounterDetailCard',

  components: {
    VitalsDetail: () => import(/* webpackPrefetch: true */ '@/components/vitals/VitalsDetail'),
    EncounterDiagnosis,
    EncounterNotes,
    EncounterServiceRequests,
    EncounterDiagnosticReports,
    CarePlanTable,
    ReferralsTable,
    SocialHistoryDetails: () => import('@/components/patients/details/SocialHistoryDetails'),
    EncounterReviewSystemTable: () => import(/* webpackPrefetch: true */ './EncounterReviewSystemTable'),
    EncounterMedicationTable: () => import(/* webpackPrefetch: true */ '@/components/patients/encounters/EncounterMedicationTable'),
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapState({
      currentEncounter: state => state.encounters.currentPatientEncounter,
    }),
    ...mapGetters({
      fullName: 'auth/fullName',
      currentEncounterComplaints: 'encounters/currentEncounterComplaints',
      currentEncounterDiagnosis: 'encounters/currentEncounterDiagnosis',
      currentEncounterPresentingComplaint: 'encounters/currentEncounterPresentingComplaint',
      currentEncounterHistoryComplaint: 'encounters/currentEncounterHistoryComplaint',
      vitals: 'encounters/currentEncounterLatestVitals',
      currentEncounterSocialHistory: 'encounters/currentEncounterSocialHistory',
      currentEncounterExamSystems: 'encounters/currentEncounterExamSystems',
      latestVitalsDate: 'encounters/latestVitalsDate',
      currentEncounterPractitioner: 'encounters/currentEncounterPractitioner',
    }),

    hasNoCurrentEncounter() {
      return !!isEmpty(this.currentEncounter)
    },
  },

  methods: {
    ...mapActions({
      startEncounter: 'encounters/startEncounter',
    }),

    async goToWizard() {
      if (this.currentEncounter.status === 'in-progress' || this.currentEncounter.status === 'finished') {
        this.$router.push({ name: 'EncounterReview', params: { encounter: this.currentEncounter.id, id: this.$route.params.id } })
        return
      }

      try {
        this.loading = true
        await this.startEncounter(this.currentEncounter.id)
        this.$router.push({ name: 'EncounterReview', params: { encounter: this.currentEncounter.id, id: this.$route.params.id } })
        this.loading = false
      } catch (error) {
        console.log('er', error.data)
      } finally {
        this.loading = false
      }
      
    },
  },

}
</script>
