<template>
  <div class="divide-solid divide-y divide-subtle">
    <ToggleList
      class="pt-4"
    >
      <div slot="title">
        <p
          class="text-serenity-primary w-full"
        >
          Patient Vitals <span class="text-secondary ml-1 text-xs">- as at {{ $date.formatDate(latestVitalsDate) }}</span>
        </p>
      </div>
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
      class="pt-4"
      :status="saving"
    >
      <div slot="title">
        <p
          class="text-serenity-primary w-full"
        >
          Chief Complaint <span class="text-secondary ml-1 text-xs">- Edited by: {{ encounter.chief_complaint_editors_display }} </span>
        </p>
      </div>
      <cv-text-area
        v-model="form.chief_complaint"
        :rows="5"
        placeholder="Reason for visit"
      />
      <div class="flex justify-end py-4">
        <SeButton
          :loading="loadingNotes"
          @click="throttledSend"
        >
          Save
        </SeButton>
      </div>
    </ToggleList>
    <ToggleList
      class="pt-4"
      :status="saving"
    >
      <div slot="title">
        <p
          class="text-serenity-primary w-full"
        >
          History of Presenting illness <span class="text-secondary ml-1 text-xs">- Edited by: {{ encounter.history_of_presenting_illness_editors_display
          }} </span>
        </p>
      </div>
      <cv-text-area
        v-model="form.history_of_presenting_illness"
        :rows="5"
        placeholder="Progress of complaint"
      />

      <div class="flex justify-end py-4">
        <SeButton
          :loading="loadingNotes"
          @click="throttledSend"
        >
          Save
        </SeButton>
      </div>
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
      <EncounterSocialHistory ref="socialHistory" />
    </ToggleList>
    <ToggleList
      title="Family History"
      class="pt-4"
      :status="saving"
    >
      <cv-text-area
        v-model="family.FAMILY_HISTORY"
        :rows="5"
        placeholder="Family history"
      />

      <div class="flex justify-end py-4">
        <SeButton
          :loading="loadingHistory"
          @click="throttledSendHistory"
        >
          Save
        </SeButton>
      </div>
    </ToggleList>
    <ToggleList
      title="General review"
      class="pt-4"
    >
      <EncounterReviewSystems
        ref="reviewGeneralSystems"
        type="GENERAL"
      />
    </ToggleList>
    <ToggleList
      title="Systemic review"
      class="pt-4"
    >
      <EncounterReviewSystems ref="reviewSystemicSystems" />
    </ToggleList>
    <ToggleList
      title="Notes"
      class="pt-4"
    >
      <div>
        <cv-text-area
          v-model="notes.display"
          :rows="5"
          placeholder="Additional notes"
        />
        <div class="flex justify-end mt-2">
          <SeButton
            :loading="loading"
            @click="createNote"
          >
            save
          </SeButton>
        </div>
      </div>

      <div>
        <p class="mb-2 font-semibold">Notes</p>

        <div
          v-if="!currentEncounterNotes || !currentEncounterNotes.length"
          class="flex items-center my-4"
        >
          No notes available
        </div>
        <div
          v-else
          class="space-y-3 space-x-3"
        >
          <Tag
            v-for="(note, index) in currentEncounterNotes"
            :key="index"
            variant="success"
          >
            <div class="flex items-center space-x-2">
              <span>{{ note.display }}</span>
              <Close
                class="w-4 cursor-pointer"
                @click="removeNote(note.id)"
              />
            </div>
          </Tag>
        </div>
      </div>
    </ToggleList>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'

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
      notes: {},
      open: [false, false, false, false, false, false],
      loading: false,
      historySaved: true,
      saving: null,
      loadingHistory: false,
      loadingNotes: false,
    }
  },

  computed: {
    ...mapState({
      encounter: state => state.encounters.currentEncounter,
      provider: state => state.auth.provider,
      patient: state => state.patients.currentPatient,
    }),
    ...mapGetters({
      vitals: 'encounters/currentEncounterLatestVitals',
      currentPatientSocialHistory: 'encounters/currentPatientSocialHistory',
      latestVitalsDate: 'encounters/latestVitalsDate',
      currentEncounterNotes: 'encounters/currentEncounterNotes',
    }),
  },

  // watch: {
  //   encounter: {
  //     immediate: true,
  //     handler(val, oldVal) {
  //       if (val !== oldVal) {
  //         this.form = { ...val }
  //       }
  //     },
  //   },

  //   currentPatientSocialHistory: {
  //     immediate: true,
  //     handler(val, oldVal) {
  //       if (val !== oldVal) {
  //         this.family = { ...val }
  //       }
  //     },
  //   },
  // },

  mounted() {
    this.form = { ...this.encounter }
    this.family = { ...this.currentPatientSocialHistory }
  },

  beforeDestroy() {
    if (!isEmpty(this.notes.display)) {
      this.createNote()
    }
  },

  methods: {
    ...mapActions({
      updateEncounter: 'encounters/updateEncounter',
      createObservation: 'patients/createObservation',
      createPatientNote: 'encounters/createNote',
      updatePatientNote: 'encounters/updateNote',
      recordEncounterAction: 'encounters/recordEncounterAction',
      deletePatientNote: 'encounters/removeNote',
    }),

    async submitAnswer() {
      if ((isEqual(this.form.chief_complaint, this.encounter.chief_complaint) && isEqual(this.form.history_of_presenting_illness, this.encounter.history_of_presenting_illness))) {
        return
      }
      this.loadingNotes = true
      this.saving = 'saving'
      try {
        const form = {
          action: 'record-chief-complaint',
          encounter_uuid: this.encounter.uuid,
          patient_uuid: this.patient.uuid,
          data: {
            chief_complaint: this.form.chief_complaint,
            history_of_presenting_illness: this.form.history_of_presenting_illness,
          },
        }

        // if ((!isEqual(this.form.chief_complaint, this.encounter.chief_complaint))) {
        //   form.data.chief_complaint = this.form.chief_complaint
        // }

        // if ((!isEqual(this.form.history_of_presenting_illness, this.encounter.history_of_presenting_illness))) {
        //   form.data.history_of_presenting_illness = this.form.history_of_presenting_illness
        // }
        
        await this.recordEncounterAction(form)
        this.saving = 'saved'
        this.$toast.open({
          message: 'Compliant updated successfully',
        })
      } catch (error) {
        this.saving = 'error'
      } finally {
        this.loadingNotes = false
      }

    },

    throttledSend: debounce(function() {
      this.submitAnswer()
    }, 1500),

    throttledSendHistory: debounce(function() {
      this.sendHistory()
    }, 1500),

    throttledSendNotes: debounce(function() {
      this.createNote()
    }, 1500),

    async sendHistory() {
      this.saving = 'saving'
      this.loadingHistory = true
      try {
        await this.createObservation({ payload: { FAMILY_HISTORY: this.family.FAMILY_HISTORY }, patient: this.$route.params.id })
        this.saving = 'saved'
        this.$toast.open({
          message: 'History updated successfully',
        })
      } catch (error) {
        this.saving = 'error'
      } finally {
        this.loadingHistory = false
      }
    },

    actionChange(ev) {
      this.open = this.$refs.acc.state.map((item, index) => index === ev.changedIndex)
    },

    async createNote() {
      this.loading = true
      try {
        const noteForm = { display: this.notes.display, patient: this.$route.params.id }
        // TODO: follow up with the notes and practitioner role issue
        // practitioner_role: this.$providerId
        await this.createPatientNote(noteForm)
        this.$toast.open({
          message: 'Note created successfully',
        })
        this.notes = {}
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
          message: 'Note updated successfully',
        })
        this.$trigger('notes:close')
      } catch (error) {
        // empty
      } finally {
        this.loading = false
      }
    },

    async removeNote(id) {
      this.loading = true
      try {
        await this.deletePatientNote(id)
        this.$toast.open({
          message: 'Note removed successfully',
        })
      } catch (error) {
        // empty
      } finally {
        this.loading = false
      }
    },

    saveAll() {
      // try {
      if (!isEmpty(this.form) && (!isEqual(this.form.chief_complaint, this.encounter.chief_complaint) || !isEqual(this.form.history_of_presenting_illness, this.encounter.history_of_presenting_illness))) {
        this.submitAnswer()
      }

      if (this.family.FAMILY_HISTORY && this.family.FAMILY_HISTORY !== this.currentPatientSocialHistory.FAMILY_HISTORY) {
        this.sendHistory()
      }
      if (this.notes.display) {
        this.createNote()
      }
      if (this.$refs.socialHistory) {
        this.$refs.socialHistory.save()
      }
      
      this.$refs.reviewGeneralSystems.externalSave()
      this.$refs.reviewSystemicSystems.externalSave()
        
      // } catch (error) {
      //   this.$toast.open({
      //     message: 'Error saving fields',
      //     type: 'error',
      //   })
      // }
      
    },
  },

  
}
</script>
