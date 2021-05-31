<template>
  <div v-if="hasNoCurrentEncounter">
    There's no current encounter
  </div>
  <div
    v-else
    class="bg-white pb-4"
  >
    <div class="p-4 grid grid-cols-2">
      <div>
        <p class="text-secondary">Doctor in charge</p>
        <InfoImageBlock
          :label="fullName"
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
        <p class="text-gray-500">{{ currentEncounterPresentingComplaint }}</p>
      </ToggleList>
      <ToggleList
        title="History of Presenting Complaint"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
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
      />
      <ToggleList
        title="Notes"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <EncounterNotes />
      </ToggleList>
      <ToggleList
        title="Bills / Receipts"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      />
    </div>
  </div>
</template>

<script>
import EncounterDiagnosis from './EncounterDiagnosis'
import EncounterNotes from './EncounterNotes'
import EncounterServiceRequests from './EncounterServiceRequests'
import EncounterDiagnosticReports from './EncounterDiagnosticReports'
import { mapState, mapGetters } from 'vuex'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'EncounterDetailCard',

  components: {
    VitalsDetail: () => import(/* webpackPrefetch: true */ '@/components/vitals/VitalsDetail'),
    EncounterDiagnosis,
    EncounterNotes,
    EncounterServiceRequests,
    EncounterDiagnosticReports,
    SocialHistoryDetails: () => import('@/components/patients/details/SocialHistoryDetails'),
    EncounterReviewSystemTable: () => import(/* webpackPrefetch: true */ './EncounterReviewSystemTable'),
  },

  computed: {
    ...mapState({
      currentEncounter: state => state.encounters.currentEncounter,
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
    }),
    
    hasNoCurrentEncounter() {
      return !!isEmpty(this.currentEncounter)
    },
  },

  
}
</script>
