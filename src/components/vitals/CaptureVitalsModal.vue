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
          v-model="form.weight"
          label="Weight"
          suffix-text="Kg"
        />
        <MixedInput
          v-model="form.height"
          label="Height"
          suffix-text="cm"
        />
        <MixedInput
          v-model="form.bmi"
          label="BMI (Calculated)"
          suffix-text="bmi"
        />
        <MixedInput
          v-model="form.temperature"
          label="Temperature"
          suffix-text="°C"
        />
        <MixedInput
          v-model="form.systolic"
          label="BP Systolic"
          suffix-text="mmHg"
        />
        <MixedInput
          v-model="form.diastolic"
          label="BP Diastolic"
          suffix-text="mmHg"
        />
        <MixedInput
          v-model="form.pulse"
          label="Pulse"
          suffix-text="per min"
        />
        <MixedInput
          v-model="form.respiration_rate"
          label="Respiratory rate"
          suffix-text="per min"
        />
        <MixedInput
          v-model="form.saturation"
          label="Arterial blood oxygen saturation"
          suffix-text="%"
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
import { decimal } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'CaptureVitalsModal',

  data() {
    return {
      form: {},
      visible: false,
      loading: false,
    }
  },

  events: {
    'capture:vitals:open': function(){
      this.$resetData()
      this.visible = true
    },
    'capture:vitals:close': function(){
      this.close()
    },
  },

  validations: {
    form: {
      weight: { decimal },
      height: { decimal },
      bmi: { decimal },
      saturation: { decimal },
      temperature: { decimal },
    },
  },

  methods: {
    ...mapActions({
      createVitals: 'patients/createVitals',
    }),
    close() {
      this.form = {}
      this.visible = false
    },

    async save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.error('All fields should be decimal')
        return
      }

      try {
        this.loading = true
        await this.createVitals({ payload: this.form, patient: this.$route.params.patient })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
