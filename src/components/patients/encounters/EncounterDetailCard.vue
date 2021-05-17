<template>
  <div class="bg-white pb-4">
    <div class="p-4 grid grid-cols-2">
      <div>
        <p class="text-secondary mb-2">Doctor in charge</p>
        <div class="flex items-center">
          <img
            class="w-10 h-10 rounded-full mr-3"
            :src="$faker().image.image()"
            alt=""
          >
          <div>
            <p class="text-black">Dr. {{ $faker().name.findName() }}</p>
            <p class=" text-secondary">General practitioner</p>
          </div>
        </div>
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
      <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
        <div slot="title">
          <div class="flex items-center justify-between">
            <p class="text-serenity-primary">Diagnosis</p>
            <AddFilled
              class="w-5 h-5 text-serenity-primary"
              @click="$trigger('encounter:add:diagnosis:open')"
            />
          </div>
        </div>
        <EncounterDiagnosis />
      </ToggleList>
      <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
        <div slot="title">
          <p class="text-serenity-primary">Presenting Complaint</p>
        </div>
        <p class=" text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
      </ToggleList>
      <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
        <div slot="title">
          <p class="text-serenity-primary">History of Presenting Complaint</p>
        </div>
        <p class=" text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
      </ToggleList>
      <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
        <div slot="title">
          <p class="text-serenity-primary">Patient Vitals</p>
        </div>
        <EncounterPatientVitals />
      </ToggleList>
      <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
        <div slot="title">
          <p class="text-serenity-primary">Social History</p>
        </div>
      </ToggleList>
      <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
        <div slot="title">
          <p class="text-serenity-primary">Laboratory Tests</p>
        </div>
        <EncounterPatientVitals />
      </ToggleList>
    </div>

    <EncounterDiagnosisModal />
  </div>
</template>

<script>
import EncounterPatientVitals from './EncounterPatientVitals'
import EncounterDiagnosis from './EncounterDiagnosis'
import EncounterDiagnosisModal from './EncounterDiagnosisModal'
import { mapState } from 'vuex'

export default {
  name: 'EncounterDetailCard',

  components: { EncounterPatientVitals, EncounterDiagnosis, EncounterDiagnosisModal },

  computed: {
    ...mapState({
      currentEncounter: state => state.encounters.currentEncounter,
    }),
  },

  methods: {
    end() {
      this.$trigger('visit:end:open', {
        callback: async () => {
          this.loading = true
          try {
            await this.endEncounter()
            this.$toast.open({
              message: 'Encounter ended successfully',
            })
          } catch (error) {
            // empty
          } finally {
            this.loading = false
          }
        },
      })
    },
  },
}
</script>
