<template>
  <BaseModal
    :name="name"
    title="Start/Continue Encounters"
    @closed="close"
  >
    <template>
      <div class="space-y-6">
        <InfoImageBlock
          :label="patient.name"
          :description="patient.gender"
          :subtext="patient.mobile"
          :url="patient.photo"
          label-class="text-black font-semibold"
          description-class="text-sm"
          size="large"
        />
        <p class="font-semibold">Pending encounters(click to select and proceed)</p>
        <div
          v-for="(en, index) in filteredEncounters"
          :key="en.id"
          class="flex space-x-2 cursor-pointer p-4 hover:bg-serenity-primary-highlight hover:bg-opacity-20"
          :class="{'bg-serenity-primary-highlight bg-opacity-20': encounter.id === en.id}"
          @click="encounter = en"
        >
          <p>{{ index + 1 }}.</p>
          <div class="flex-1 flex items-center justify-between">
            <div>
              <p>{{ en.service_type_name }} with {{ en.encounter_participant[0].practitioner_detail.name }}</p>
              <p class="text-secondary text-xs"> {{ en.status_comment }} </p>
            </div>
            <div class="text-right">
              <p class="">{{ $date.formatDate(en.start_time) }} </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between mt-8">
        <SeButton
          variant="secondary"
          @click="close"
        >
          Go back
        </SeButton>
        <SeButton
          :disabled="hasNoEncounter"
          @click="goToWizard"
        >
          Consult<ChevronRight class="w-4 h-4 text-white ml-4" />
        </SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import modalMixin from '@/mixins/modal'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'PatientEncountersModal',

  components: { ChevronRight },

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      name: 'patient-encounters-modal',
      encounter: {},
    }
  },

  events: {
    'profile:patient:encounters:open': function(){
      this.open()
    },
    'profile:patient:encounters:close': function(){
      this.close()
    },
  },

  computed: {
    ...mapState({
      encounters: state => state.encounters.encounters,
    }),
    ...mapGetters({
      onGoingEncounters: 'encounters/onGoingEncounters',
    }),

    hasNoEncounter() {
      return !this.encounter?.id
    },

    patient() {
      if (!this.onGoingEncounters.length) return {} 
      return this.onGoingEncounters.map(patient => {
        patient.patient_detail.name = `${ patient.patient_detail.first_name} ${ patient.patient_detail.lastname}`
        return patient
      })[0].patient_detail
    },

    filteredEncounters() {
      return this.encounters.filter(en => en.status === 'in-progress' || en.status === 'planned' || en.status === 'triaged' || en.status === 'arrived' || en.status === 'onleave')
      // .filter(enc => enc.encounter_participant.find(en => en.practitioner_role === this.$practitionerId))
    },
  },

  methods: {
    ...mapActions({
      startEncounter: 'encounters/startEncounter',
    }),

    async goToWizard() {
      if (this.encounter.status === 'in-progress') {
        this.$router.push({ name: 'EncounterReview', params: { encounter: this.encounter.id, id: this.$route.params.id } })
        return
      }

      try {
        this.loading = true
        await this.startEncounter(this.encounter.id)
        this.$router.push({ name: 'EncounterReview', params: { encounter: this.encounter.id, id: this.$route.params.id } })
        this.loading = false
      } catch (error) {
        console.log('er', error.data)
      } finally {
        this.loading = false
      }
      
    },

    manageCheck(encounter) {
      let available = this.localValue.selectedBills.find(b => b.id == encounter.id)
      if (available) {
        this.localValue.selectedBills = this.localValue.selectedBills.filter(b => b.id !== encounter.id)
      } else {
        this.localValue.selectedBills.push(encounter)
      }
    },
  },
}
</script>
