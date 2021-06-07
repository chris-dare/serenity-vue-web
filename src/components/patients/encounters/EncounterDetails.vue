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
            class="flex items-center space-x-2"
            variant="success"
          >
            <span>{{ note.display }}</span>
            <Close
              class="w-4 cursor-pointer"
              @click="removeNote(note.id)"
            />
          </Tag>
        </div>
      </div>
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
      notes: {},
      open: [false, false, false, false, false, false],
      loading: false,
    }
  },



  computed: {
    ...mapState({
      encounter: state => state.encounters.currentEncounter,
      provider: state => state.auth.provider,
    }),
    ...mapGetters({
      vitals: 'encounters/currentEncounterLatestVitals',
      currentPatientSocialHistory: 'encounters/currentPatientSocialHistory',
      latestVitalsDate: 'encounters/latestVitalsDate',
      currentEncounterNotes: 'encounters/currentEncounterNotes',
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
      createPatientNote: 'encounters/createNote',
      updatePatientNote: 'encounters/updateNote',
      deletePatientNote: 'encounters/removeNote',
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

    actionChange(ev) {
      this.open = this.$refs.acc.state.map((item, index) => index === ev.changedIndex)
      // this.$refs.acc.state = this.$refs.acc.state.map((item, index) => index === ev.changedIndex);
    },

    async createNote() {
      this.loading = true
      try {
        const noteForm = { display: this.notes.display, patient: this.$route.params.id }
        // practitioner_role: this.provider.practitionerRoleId }
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
          message: 'Note created successfully',
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
  },
}
</script>
