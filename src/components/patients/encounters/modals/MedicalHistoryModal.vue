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
        <MultiSelect
          v-model="form.PREVIOUS_ILLNESS"
          title="Past illness"
          :options="options.PREVIOUS_ILLNESS"
          placeholder="Type and press enter"
          preselect
          taggable
          multiple
          label="code"
          track-by="id"
          class="se-input-gray"
          @tag="addTag('PREVIOUS_ILLNESS', $event)"
          @remove="remove('observation', $event)"
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
          @remove="remove"
        />

        <AutoCompleteMedication
          v-model="form.PREVIOUS_MEDICATION"
          title="Medications"
          multiple
          @remove="remove('observation', $event)"
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
import xorBy from 'lodash/xorBy'

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
      return !!this.form.PREVIOUS_ILLNESS.filter(allergy => !allergy.id)
        || !!this.form.PREVIOUS_HOSPITALIZATION.filter(allergy => !allergy.id)
        || !!this.form.PREVIOUS_MEDICATION.filter(allergy => !allergy.id)
    },

    newMedications() {
      let formOne = this.form.PREVIOUS_MEDICATION.map(medication => {
        return {
          value: medication,
        }
      })
      return xorBy(formOne, this.patientPastMedications, 'value')
        .map(med => {
          return {
            code: med.value,
          }
        })
    },
  
    newIllness() {
      return this.form.PREVIOUS_ILLNESS.filter(med => !med.id)
    },
  
    newSurgeries() {
      return this.form.PREVIOUS_HOSPITALIZATION.filter(med => !med.id)
    },
  },

  watch: {
    allergies(val) {
      this.form.allergies = val
    },

    patientPreviousIllness: {
      immediate: true,
      handler(val) {
        this.form.PREVIOUS_ILLNESS = val.map(illness => {
          return {
            code: illness.value,
            id: illness.id,
          }
        })
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
      this.form.allergies = this.allergies

      this.form.PREVIOUS_ILLNESS = this.patientPreviousIllness.map(illness => {
        return {
          code: illness.value,
          id: illness.id,
        }
      })

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
            await this.deleteObservation(observation.id)
          })
        }
        
        this.loading = false
        this.visible = false
        this.$resetData()
      } catch (error) {
        this.loading = false
      }
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

    // async removeAllergy(tag) {
    //   if (tag.type) {
    //     await this.deleteAllergy(tag.id)
    //   }
        
    //   this.form.allergies = this.form.allergies.filter(allergy => allergy.id !== tag.id)
      
    // },

    // async removeMedicalHistory(field, tag) {
    //   if (tag.id) {
    //     await this.deleteObservation(tag.id)
    //     return
    //   }
        
    //   this.form[field] = this.form[field].filter(his => his.id !== tag.id)
      
    // },

    // async removeMedication(tag) {
    //   await this.deleteObservation(this.patientPastMedications.find(med => med.value === tag).id)
    // },
  },
}
</script>
