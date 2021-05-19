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
        has-create
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
        @create="$trigger('encounter:add:diagnosis:open')"
      >
        <EncounterDiagnosis :data="currentEncounterDiagnosis" />
      </ToggleList>
      <ToggleList
        title="Presenting Complaint"
        has-create
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
        @create="$trigger('encounter:add:diagnosis:open', 'chief-complaint')"
      >
        <p class="text-gray-500">{{ currentEncounterPresentingComplaint }}</p>
      </ToggleList>
      <ToggleList
        title="History of Presenting Complaint"
        has-create
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
        @create="$trigger('encounter:add:diagnosis:open', 'chief-complaint')"
      >
        <EncounterDiagnosis :data="currentEncounterComplaints" />
      </ToggleList>
      <ToggleList
        title="Patient Vitals"
        :has-create="$userCan('vitals.write')"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
        @create="$trigger('profile:medication:request:open')"
      >
        <EncounterPatientVitals />
      </ToggleList>
      <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
        <div slot="title">
          <p class="text-serenity-primary">Social History</p>
        </div>
      </ToggleList>
      <ToggleList
        title="Laboratory Tests"
        has-create
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
        @create="$trigger('service:request:open', 'laboratory-procedure')"
      >
        <EncounterServiceRequests />
      </ToggleList>
      <ToggleList
        title="Reports / Documents"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      >
        <EncounterDiagnosticReports />
      </ToggleList>
      <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
        <div slot="title">
          <p class="text-serenity-primary">Review of Systems</p>
        </div>
      </ToggleList>
      <ToggleList
        title="Medications / Treatment Plan"
        :has-create="$userCan('medication.orders.write')"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
        @create="$trigger('profile:medication:request:open')"
      />
      <ToggleList
        title="Notes"
        has-create
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
        @create="$trigger('notes:open')"
      >
        <EncounterNotes />
      </ToggleList>
      <ToggleList
        title="Bills / Receipts"
        class="border-solid border-t border-serenity-subtle-border px-4 pt-4"
      />
    </div>

    <EncounterDiagnosisModal />
    <NotesModal
      required
      @save="createNote"
      @update="updateNote"
    />
  </div>
</template>

<script>
import EncounterPatientVitals from './EncounterPatientVitals'
import EncounterDiagnosis from './EncounterDiagnosis'
import EncounterNotes from './EncounterNotes'
import EncounterDiagnosisModal from './EncounterDiagnosisModal'
import EncounterServiceRequests from './EncounterServiceRequests'
import EncounterDiagnosticReports from './EncounterDiagnosticReports'
import { mapState, mapActions, mapGetters } from 'vuex'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'EncounterDetailCard',

  components: { EncounterPatientVitals, EncounterDiagnosis, EncounterDiagnosisModal, EncounterNotes, EncounterServiceRequests, EncounterDiagnosticReports },

  computed: {
    ...mapState({
      currentEncounter: state => state.encounters.currentEncounter,
    }),
    ...mapGetters({
      fullName: 'auth/fullName',
      currentEncounterComplaints: 'encounters/currentEncounterComplaints',
      currentEncounterDiagnosis: 'encounters/currentEncounterDiagnosis',
      currentEncounterPresentingComplaint: 'encounters/currentEncounterPresentingComplaint',
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
