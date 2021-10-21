<template>
  <div class="space-y-8 divide-y">
    <div
      class="grid grid-cols-3 gap-4"
    >
      <FormInput
        v-for="(item, index) in inputItems"
        :key="index"
        v-model="form[item.prop]"
        :placeholder="item.placeholder"
        :label="item.label"
      />
    </div>

    <div class="space-y-4">
      <h4>Results</h4>
      <div class="divide-x divide-solid divide-gray-200 flex space-x-8">
        <MewsScore label="9" />
        <div class="pl-8">
          <div class="space-y-1 ">
            <p class="font-bold text-xl">Action to take</p>
            <p>Continue with normal 8 hours vitals / MEWS</p>
          </div>

          <p class="text-placeholder mt-8">**If any single category scores a 3: Escalate immediately for medical re-assessment.</p>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <SeButton
        variant="secondary"
        @click="$emit('close')"
      >
        Go back
      </SeButton>
      <SeButton
        :loading="loading"
      >
        Submit
      </SeButton>
    </div>
  </div>
</template>

<script>
import MewsScore from '../MewsScore.vue'
export default {
  name: 'ObservationVitalCharts',

  components: {MewsScore},

  data() {
    return {
      form: {
        intakes: [{}],
      },
      loading: false,
      inputItems: [
        { label: 'Respiratory rate', placeholder: 'Enter a respiratory rate', prop: 'respiration_rate' },
        { label: 'Heart Rate', placeholder: 'Enter heart rate', prop: 'heart_rate' },
        { label: 'Systolic BP', placeholder: 'Enter systolic BP', prop: 'systolic_bp' },
        { label: 'Temperature ( °C) ', placeholder: 'Enter Temperature', prop: 'temperature' },
        { label: 'A.V.P.U', placeholder: 'Enter A.V.P.U', prop: 'avpu' },
        { label: 'SpO2 (%)', placeholder: 'Enter SpO2 percentage', prop: 'spo2' },
        { label: 'Blood Sugar', placeholder: 'Enter Blood Sugar', prop: 'blood_sugar' },
      ],
    }
  },
}
</script>
