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
        title="Patient Vitals"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <VitalsDetail
          small
          :form="vitals"
        />
      </ToggleList>
      <ToggleList
        title="Social History"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <div class="py-6 space-y-4">
          <div
            v-for="(item, index) in currentEncounterSocialHistory"
            :key="index"
            class=" capitalize grid grid-cols-2"
          >
            <div class="text-serenity-primary">{{ index.split("_").join(" ").toLowerCase() }}</div>
            <div>{{ item || 'N/A' }}</div>
          </div>
        </div>
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

    <NotesModal
      required
      @save="createNote"
      @update="updateNote"
    />
  </div>
</template>

<script>
import EncounterDiagnosis from './EncounterDiagnosis'
import EncounterNotes from './EncounterNotes'
import EncounterServiceRequests from './EncounterServiceRequests'
import EncounterDiagnosticReports from './EncounterDiagnosticReports'
import { mapState, mapActions, mapGetters } from 'vuex'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'EncounterDetailCard',

  components: {
    VitalsDetail: () => import(/* webpackPrefetch: true */ '@/components/vitals/VitalsDetail'),
    EncounterDiagnosis,
    EncounterNotes,
    EncounterServiceRequests,
    EncounterDiagnosticReports,
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
    }),
    
    hasNoCurrentEncounter() {
      return !!isEmpty(this.currentEncounter)
    },
  },

  methods: {
    ...mapActions({
      createPatientNote: 'encounters/createNote',
      updatePatientNote: 'encounters/updateNote',
    }),

    async createNote(notes) {
      this.loading = true
      try {
        const noteForm = { display: notes, encounter_patient_id: this.$route.params.id }
        await this.createPatientNote(noteForm)
        this.$toast.open({
          message: 'Notes created successfully',
        })
        this.$trigger('notes:close')
      } catch (error) {
        // empty
      } finally {
        this.loading = false
      }
    },
  
    async updateNote(data) {
      this.loading = true
      try {
        
        const noteForm = { ...data, display: data.notes }
        delete noteForm.notes
        await this.updatePatientNote(noteForm)
        this.$toast.open({
          message: 'Notes created successfully',
        })
        this.$trigger('notes:close')
      } catch (error) {
        // empty
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
