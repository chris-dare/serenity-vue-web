<template>
  <div class="w-3/4 mx-auto">
    <p class="text-primary text-xl font-semibold">Capture vitals</p>
    <ConfirmVitalsModal
      v-if="confirmed"
      :loading="loading"
      :form="form"
      @save="save"
      @back="confirmed = false"
    />
    <cv-form
      v-else
      autocomplete="off"
      class="grid grid-cols-4 my-6 gap-6"
      @submit.prevent
    >
      <div>
        <cv-radio-group :vertical="true">
          <div
            v-for="(item, index) in navItems"
            :key="index"
            tag="div"
            :class="[
              checked == item.index
                ? 'border-serenity-primary'
                : 'border-serenity-subtle-border',
            ]"
            class="border-l-2  h-20 flex items-center border-solid px-4 cursor-pointer"
            @click="checked = item.index"
          >
            <div class="flex">
              <div>
                <CircleFilled
                  v-if="checked == item.index"
                  class="w-5 h-5"
                  :class="[
                    checked == item.index
                      ? 'text-serenity-primary'
                      : 'text-primary',
                  ]"
                />
                <CheckmarkOutline
                  v-else-if="checked >= item.index"
                  class="w-5 h-5 text-serenity-primary"
                />
                <div
                  v-else
                  class="w-5 h-5 border border-solid rounded-full"
                />
              </div>
              <div class="ml-4">
                <p
                  class="leading-4"
                  :class="[
                    checked == item.index
                      ? 'text-serenity-primary'
                      : 'text-primary',
                  ]"
                >
                  {{ item.label }}
                </p>
                <p class="text-xs text-secondary leading-7">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </cv-radio-group>
      </div>
      <div class="col-span-3 bg-white py-4 px-8">
        <component
          :is="stepComponent"
          v-model="form"
          @next="nextStep"
          @confirm="confirmed = true"
        />
      </div>
    </cv-form>
  </div>
</template>

<script>
import WeightHeight from '@/components/vitals/WeightHeight'
import Temperature from '@/components/vitals/Temperature'
import Pressure from '@/components/vitals/Pressure'
import Respiration from '@/components/vitals/Respiration'
import ConfirmVitalsModal from '@/components/vitals/ConfirmVitalsModal'
import CircleFilled from '@carbon/icons-vue/es/circle--filled/32'
import CheckmarkOutline from '@carbon/icons-vue/es/checkmark--outline/32.js'
import { decimal } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'PatientVitals',

  components: { CircleFilled, WeightHeight, Temperature, Pressure, Respiration, ConfirmVitalsModal, CheckmarkOutline },

  data() {
    return {
      checked: 0,
      confirmed: false,
      navItems: [
        { label: 'Weight and Height', description: 'Patient biological information', value: 'weight', index: 0},
        { label: 'Temperature', description: 'Phone and location of patient', value: 'temperature', index: 1},
        { label: 'Blood Pressure', description: 'Family and friends', value: 'pressure', index: 2},
        { label: 'Respiration Rate and SPO2', description: 'Work, religion, other addresses', value: 'respiration', index: 3},
      ],
      form: {},
      loading: false,
    }
  },

  computed: {
    stepComponent() {
      if (this.checked === 0) {
        return 'WeightHeight'
      }
      if (this.checked === 1) {
        return 'Temperature'
      }
      if (this.checked === 2) {
        return 'Pressure'
      }

      return 'Respiration'
    },
  },

  methods: {
    ...mapActions({
      createVitals: 'patients/createVitals',
    }),

    nextStep(step) {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'These fields should be decimal',
          type: 'error',
        })
        return
      }
      this.checked = step
    },

    async save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'These fields should be decimal',
          type: 'error',
        })
        return
      }

      try {
        this.loading = true
        await this.createVitals({ payload: this.form, patient: this.$route.query.id })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },

  validations: {
    localValue: {
      weight: { decimal },
      height: { decimal },
      bmi: { decimal },
    },
  },
}
</script>
