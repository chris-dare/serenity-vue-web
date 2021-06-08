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
        {{ form[option.prop] || '-' }} <span v-if="option.extra_prop">/{{ form[option.extra_prop] || '-' }}</span> <span class="text-base font-light">{{ option.unit }}</span>
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
        { label: 'Height (cm)', prop: 'HEIGHT_CM', unit: 'cm'},
        { label: 'Weight (kg)', prop: 'WEIGHT_KG', unit: 'kg'},
        { label: '(Calculated) BMI', prop: 'BMI', unit: ''},
        { label: 'Temperature (C)', prop: 'DEGREES_CELCIUS', unit: '°C'},
        { label: 'Pulse', prop: 'PULSE', unit: '/min'},
        { label: 'Respiratory rate', prop: 'RESPIRATORY_RATE', unit: '/min'},
        { label: 'Blood Pressure', prop: 'BLOOD_PRESSURE'},
        { label: 'Arterial blood oxygen saturation', prop: 'OXYGEN_SATURATION', unit: '%'},
      ],
    }
  },
}
</script>
