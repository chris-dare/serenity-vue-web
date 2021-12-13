<template>
  <BaseModal
    :name="name"
    width="70%"
    :title="title"
    @closed="close"
  >
    <template>
      <div class="grid grid-cols-2 gap-4">
        <FormMixedInput
          v-for="(vital, index) in units"
          :key="index"
          v-model="form[vital.code]"
          :mask="vital.mask"
          :suffix-text="vital.display"
          :label="vital.label"
          :disabled="vital.disabled"
          :placeholder="vital.placeholder"
          :invalid-message="$utils.validateRequiredField($v, vital.code)"
          :type="vital.type"
          @input="setBMI(vital.code)"
        />
      </div>
      <div class="space-y-4 mt-8">
        <div class="flex items-center justify-between">
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
            Submit<ChevronRight class="w-4 h-4 text-white ml-4" />
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import { minValue, maxValue } from 'vuelidate/lib/validators'
import { bpValidator } from '@/services/custom-validators'
import modalMixin from '@/mixins/modal'

export default {
  name: 'CaptureVitalsModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      visible: false,
      loading: false,
      patient: null,
      name: 'capture-vitals-modal',
    }
  },

  events: {
    'capture:vitals:open': function(){
      this.open()
      this.patient = this.$route.params.id
    },
    'reception:capture:vitals:open': async function(data){
      // this.getEncounters({patient: data.params[0].patient, visit: data.params[0].visit.id, status: 'planned' })
      this.setVitalsEncounter(data.params[0].encounters[0])
      await this.getVitalsUnitTypes()
      this.open()
      this.patient = data.params[0].patient
    },
    'capture:vitals:close': function(){
      this.close()
    },
  },

  computed: {
    ...mapState({
      vitalsOptions: state => state.resources.vitalsUnitTypes,
      currentEncounter: state => state.encounters.currentEncounter,
    }),

    units() {
      return this.vitalsOptions.map(option => {
        option.label = option.code === 'DEGREES_CELCIUS' ? 'temperature' : option.code.split('_').join(' ').toLowerCase()
        option.disabled = option.code === 'BMI'
        option.type = option.code === 'BMI' ? 'number' : 'text'
        option.placeholder = option.code === 'BLOOD_PRESSURE' ? '120/80' : ''
        option.mask = option.code === 'BLOOD_PRESSURE' ? '###/###' : ''
        option.type = option.code === 'BLOOD_PRESSURE' ? 'text' : 'number'
        return option
      })
    },

    title() {
      return `Vitals - ${this.currentEncounter?.patient_detail ?
        this.currentEncounter.patient_detail.first_name: ''} ${this.currentEncounter?.patient_detail ? this.currentEncounter.patient_detail.lastname: ''}`
    },
  },

  validations: {
    form: {
      BLOOD_PRESSURE: {
        bpValidator,
      },
      OXYGEN_SATURATION: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
    },
  },

  methods: {
    ...mapActions({
      createVitals: 'patients/createVitals',
      getVitalsUnitTypes: 'resources/getVitalsUnitTypes',
      getEncounters: 'encounters/getEncounters',
      setVitalsEncounter: 'encounters/setVitalsEncounter',
    }),

    async save() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Please these fields are required!',
          type: 'error',
        })
        return
      }
      try {
        this.loading = true
        await this.createVitals({ payload: this.form, patient: this.patient })
        this.$toast.open({ message: 'Vitals saved' })
        this.loading = false
        this.close()
      } catch (error) {
        if (isEmpty(this.currentEncounter)) {
          this.$toast.error('This patient has no encounter')
        }
        this.loading = false
      }
    },

    setBMI: debounce(function(code) {
      if (code === 'OXYGEN_SATURATION' && this.$v.form?.OXYGEN_SATURATION?.$invalid) {
        this.$v?.form?.OXYGEN_SATURATION?.$touch()
      }
      
      if (!this.form.WEIGHT_KG || !this.form.HEIGHT_CM) return this.form.BMI
      if (code !== 'WEIGHT_KG' && code !== 'HEIGHT_CM') return this.form.BMI

      let weight = parseInt(this.form.WEIGHT_KG)
      let height = parseInt(this.form.HEIGHT_CM)

      let bmi = (weight/(Math.pow(height, 2))) * 10000

      this.form.BMI = bmi.toFixed(2)
    }, 300, false),

    afterCloseFunction() {
      this.setVitalsEncounter(null)
    },
  },
}
</script>
