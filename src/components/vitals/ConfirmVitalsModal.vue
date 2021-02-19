<template>
  <div class="bg-white p-6 my-6">
    <div>
      <p class="mb-6 text-lg text-serenity-primary">Confirm Vitals Submission</p>
      <div class="grid grid-cols-4">
        <div class="space-y-1 h-40 border-b border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Height (cm)</p>
          <p class="text-black text-4xl font-semibold">{{ form.height || 0 }} <span class="text-base font-light">cm</span></p>
        </div>
        <div class="space-y-1 h-40 border-b border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Weight (kg)</p>
          <p class="text-black text-4xl font-semibold">{{ form.weight || 0 }} <span class="text-base font-light">kg</span></p>
        </div>
        <div class="space-y-1 h-40 border-b border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">(Calculated) BMI</p>
          <p class="text-black text-4xl font-semibold">{{ form.bmi || 0 }}</p>
        </div>
        <div class="space-y-1 h-40 border-b border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Temperature (C)</p>
          <p class="text-black text-4xl font-semibold">{{ form.temperature || 0 }} <span class="text-base font-light">°C</span></p>
        </div>
        <div class="space-y-1 h-40 border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Pulse</p>
          <p class="text-black text-4xl font-semibold">{{ form.pulse || 0 }} <span class="text-base font-light">/min</span></p>
        </div>
        <div class="space-y-1 h-40 border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Respiratory rate</p>
          <p class="text-black text-4xl font-semibold">{{ form.respiration_rate || 0 }} <span class="text-base font-light">/min</span></p>
        </div>
        <div class="space-y-1 h-40 border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Blood Pressure</p>
          <p class="text-black text-4xl font-semibold">{{ form.systolic || 0 }} /{{ form.diastolic || 0 }}</p>
        </div>
        <div class="space-y-1 h-40 flex items-center justify-center flex-col">
          <p class="text-secondary">Arterial blood oxygen saturation</p>
          <p class="text-black text-4xl font-semibold">{{ form.saturation || 0 }} <span class="text-base font-light">%</span></p>
        </div>
      </div>
      <div class="flex items-center justify-between mt-12">
        <SeButton variant="secondary">Go back</SeButton>
        <SeButton>Submit<ChevronRight class="w-4 h-4 text-white ml-4" /></SeButton>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'ConfirmVitalsModal',

  components: { ChevronRight },

  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
