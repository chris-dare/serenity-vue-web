<template>
  <cv-modal
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <h1>Vitals</h1>
    </template>
    <template slot="content">
      <div class="grid grid-cols-2 gap-4">
        <MixedInput
          v-for="(vital, index) in units"
          :key="index"
          v-model="form[vital.code]"
          :suffix-text="vital.display"
          :label="vital.label"
          :disabled="vital.disabled"
          :placeholder="vital.placeholder"
          :invalid-message="$utils.validateRequiredField($v, vital.code)"
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
  </cv-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'
import { required } from 'vuelidate/lib/validators'
const bpvalidator = (value) => !!value?.includes('/')

export default {
  name: 'CaptureVitalsModal',

  data() {
    return {
      form: {},
      visible: false,
      loading: false,
      patient: null,
    }
  },

  events: {
    'capture:vitals:open': function(){
      this.visible = true
      this.patient = this.$route.params.id
    },
    'reception:capture:vitals:open': async function(data){
      this.getEncounters({patient: data.params[0].patient, visit: data.params[0].visit, status: 'planned' })
      await this.getVitalsUnitTypes()
      this.visible = true
      this.patient = data.params[0].patient
    },
    'capture:vitals:close': function(){
      this.close()
    },
  },

  computed: {
    ...mapState({
      vitalsOptions: state => state.resources.vitalsUnitTypes,
    }),

    units() {
      return this.vitalsOptions.map(option => {
        option.label = option.code === 'DEGREES_CELCIUS' ? 'temperature' : option.code.split('_').join(' ').toLowerCase()
        option.disabled = option.code === 'BMI'
        option.type = option.code === 'BMI' ? 'number' : 'text'
        option.placeholder = option.code === 'BLOOD_PRESSURE' ? '80/120' : ''
        return option
      })
    },
  },

  validations: {
    form: {
      BLOOD_PRESSURE: {
        required,
        bpvalidator,
      },
    },
  },

  methods: {
    ...mapActions({
      createVitals: 'patients/createVitals',
      getVitalsUnitTypes: 'resources/getVitalsUnitTypes',
      getEncounters: 'encounters/getEncounters',
    }),

    close() {
      this.form = {}
      this.visible = false
    },

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
        this.loading = false
      }
    },

    setBMI: debounce(function(code) {
      if (!this.form.WEIGHT_KG || !this.form.HEIGHT_CM) return this.form.BMI
      if (code !== 'WEIGHT_KG' && code !== 'HEIGHT_CM') return this.form.BMI

      let weight = parseInt(this.form.WEIGHT_KG)
      let height = parseInt(this.form.HEIGHT_CM)

      let bmi = (weight/(Math.pow(height, 2))) * 10000

      this.form.BMI = bmi.toFixed(2)
    }, 300, false),
  },
}
</script>
