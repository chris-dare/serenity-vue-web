<template>
  <cv-modal
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <p class="text-lg font-semibold capitalize">Update medical history</p>
    </template>

    <template slot="content">
      <SeForm class="space-y-8">
        <AutoCompleteClinicalTables
          v-model="form.PREVIOUS_ILLNESS"
          multiple
          title="Past illness"
          @remove="removeIllness"
        />

        <MultiSelect
          v-model="form.allergies"
          title="Allergies"
          :options="options.allergies"
          placeholder="Type and press enter"
          preselect
          taggable
          multiple
          label="code"
          track-by="id"
          class="se-input-gray"
          @tag="addTag('allergies', $event)"
          @remove="remove('allergies', $event)"
        />

        <AutoCompleteMedication
          v-model="form.PREVIOUS_MEDICATION"
          title="Medications"
          multiple
          @remove="removeMedication"
        />

        <MultiSelect
          v-model="form.PREVIOUS_HOSPITALIZATION"
          title="Past surgeries"
          :options="options.PREVIOUS_HOSPITALIZATION"
          placeholder="Type and press enter"
          preselect
          taggable
          multiple
          label="code"
          track-by="id"
          class="se-input-gray"
          @tag="addTag('PREVIOUS_HOSPITALIZATION', $event)"
          @remove="remove('observation', $event)"
        />

        <div class="flex items-center justify-between space-x-2">
          <SeButton
            variant="secondary"
            @click="close"
          >
            Go back
          </SeButton>
          <SeButton
            :loading="loading"
            @click="save"
          >
            Update
          </SeButton>
        </div>
      </SeForm>
    </template>
  </cv-modal>
</template>

<script>
import modalMixin from '@/mixins/modal'
import { mapActions, mapState, mapGetters } from 'vuex'
// import xorBy from 'lodash/xorBy'

export default {
  name: 'MedicalHistoryModal',

  mixins: [modalMixin],

  data() {
    return {
      form : {
        allergies: [],
        PREVIOUS_ILLNESS: [],
        PREVIOUS_MEDICATION: [],
        PREVIOUS_HOSPITALIZATION: [],
      },
      options: {
        allergies: [],
        PREVIOUS_ILLNESS: [],
        PREVIOUS_HOSPITALIZATION: [],
      },
      loading: false,
      removedObservations: [],
      removedAllergies: [],
    }
  },

  events: {
    'medical:history:open': function(){
      this.visible = true
      this.init()
    },
    'medical:history:close': function(){
      this.close()
    },
  },

  computed: {
    ...mapState({
      allergies: state => state.patientAllergies.allergies,
    }),

    ...mapGetters({
      patientPreviousIllness: 'patients/patientPreviousIllness',
      patientPreviousHospitalization: 'patients/patientPreviousHospitalization',
      patientPastMedications: 'patients/patientPastMedications',
    }),

    hasAllergies() {
      return !!this.form.allergies.find(allergy => !allergy.type)
    },

    hasHistory() {
      return !!this.newMedications.length
        || !!this.newIllness.length
        || !!this.newSurgeries.length
    },

    newMedications() {
      return this.form.PREVIOUS_MEDICATION
        .filter(medication => !this.patientPastMedications.map(med => med.value).includes(medication))
        .map(med => {
          return {
            code: med,
          }
        })
    },
  
    newIllness() {
      return this.form.PREVIOUS_ILLNESS
        .filter(medication => !this.patientPreviousIllness.map(med => med.value).includes(medication.value || medication))
        .map(med => {
          return {
            code: med,
          }
        })
    },
  
    newSurgeries() {
      return this.form.PREVIOUS_HOSPITALIZATION.filter(med => !med.id)
    },
  },

  watch: {
    allergies(val) {
      this.form.allergies = val.slice()
    },

    patientPreviousIllness: {
      immediate: true,
      handler(val) {
        this.form.PREVIOUS_ILLNESS = val.map(illness => illness.value)
      },
    },
  
    patientPreviousHospitalization: {
      immediate: true,
      handler(val) {
        this.form.PREVIOUS_HOSPITALIZATION = val.map(illness => {
          return {
            code: illness.value,
            id: illness.id,
          }
        })
      },
    },
  
    patientPastMedications: {
      immediate: true,
      handler(val) {
        this.form.PREVIOUS_MEDICATION = val.map(illness => illness.value)
      },
    },
  },  

  methods: {
    ...mapActions({
      createMedicalHistory: 'patients/createMedicalHistory',
      deleteObservation: 'patients/deleteObservation',
      createAllergies: 'patientAllergies/createAllergies',
      deleteAllergy: 'patientAllergies/deleteAllergy',
    }),

    init() {
      this.form.allergies = this.allergies.slice()

      this.form.PREVIOUS_ILLNESS = this.patientPreviousIllness.map(illness => illness.value)

      this.form.PREVIOUS_HOSPITALIZATION = this.patientPreviousHospitalization.map(illness => {
        return {
          code: illness.value,
          id: illness.id,
        }
      })

      this.form.PREVIOUS_MEDICATION = this.patientPastMedications.map(illness => illness.value)
    },

    addTag(field, tag) {
      let newTag = {
        code: tag,
        value: tag,
      }
      this.options[field].push(newTag)
      this.form[field].push(newTag)
    },

    async save() {
      try {
        this.loading = true
        if (this.hasAllergies) {
          await this.createAllergies({ payload: this.form.allergies.filter(allergy => !allergy.type), patient: this.$route.params.id })
        }

        if (this.hasHistory) {
          let form = { PREVIOUS_ILLNESS: this.newIllness, PREVIOUS_MEDICATION: this.newMedications, PREVIOUS_HOSPITALIZATION: this.newSurgeries }
          await this.createMedicalHistory({ payload: form, patient: this.$route.params.id })
        }

        if (this.removedAllergies.length > 0) {
          this.removedAllergies.forEach(async allergy => {
            await this.deleteAllergy(allergy.id)
          })
        }

        if (this.removedObservations.length > 0) {
          this.removedObservations.forEach(async observation => {
            await this.deleteObservation(observation.id ? observation.id : observation)
          })
        }
        
        this.loading = false
        this.visible = false
        this.$resetData()
      } catch (error) {
        this.loading = false
      }
    },

    removeIllness(payload) {
      let illness = this.patientPreviousIllness.find(ill => ill.value === payload)
      if (!illness) return
      this.removedObservations.push(illness)
    },

    removeMedication(payload) {
      let medication = this.patientPastMedications.find(med=> med.value === payload)
      if (!medication) return
      this.removedObservations.push(medication)
    },

    remove(type = 'allergies', payload) {
      if (!payload.id) {
        return
      }

      if (type === 'allergies') {
        this.removedAllergies.push(payload)
        return
      }

      this.removedObservations.push(payload)
    },
  },
}
</script>
