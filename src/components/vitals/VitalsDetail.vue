<template>
  <div
    class="grid"
    :class="[ small ? 'grid-cols-5' : 'grid-cols-4' ]"
  >
    <div
      v-for="(option, index) in options"
      :key="index"
      class="space-y-1 h-40 border-solid border-tetiary flex items-center justify-center flex-col last:border-r-0"
      :class="{ 
        'border-0' : small && index > 4,
        'border-b' : small && index < 5 || !small && index < 4,
        'border-r' : small && index !== 4 || !small && index !== 3,
      }"
    >
      <p
        class="text-secondary"
        :class="{ 'text-sm': small }"
      >
        {{ option.label }}
      </p>
      <p
        class="text-black font-semibold"
        :class="[ small ? 'text-3xl' : 'text-4xl' ]"
      >
        {{ form[option.prop] || 0 }} <span v-if="option.extra_prop">/{{ form[option.extra_prop] || 0 }}</span> <span class="text-base font-light">{{ option.unit }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VitalsDetail',

  props: {
    form: {
      type: Object,
      default: () => {},
    },
    small: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      options: [
        { label: 'Height (cm)', prop: 'height', unit: 'cm'},
        { label: 'Weight (kg)', prop: 'weight', unit: 'kg'},
        { label: '(Calculated) BMI', prop: 'bmi', unit: ''},
        { label: 'Temperature (C)', prop: 'temperature', unit: '°C'},
        { label: 'Pulse', prop: 'pulse', unit: '/min'},
        { label: 'Respiratory rate', prop: 'respiration_rate', unit: '/min'},
        { label: 'Blood Pressure', prop: 'systolic', extra_prop: 'diastolic'},
        { label: 'Arterial blood oxygen saturation', prop: 'saturation', unit: '%'},
      ],
    }
  },
}
</script>
