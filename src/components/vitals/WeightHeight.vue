<template>
  <div>
    <p class="text-primary my-4 font-bold">
      Record weight and height of patient
    </p>
    <div class="grid grid-cols-2 gap-6">
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="localValue.weight"
          type="text"
          label="Weight"
        />
        <p class="mb-2">Kg</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="localValue.height"
          type="text"
          label="Height"
        />
        <p class="mb-2">cm</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="localValue.bmi"
          type="text"
          label="BMI (Calculated)"
        />
        <p class="mb-2">Patient BMI</p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-12 mb-6">
      <SeButton
        variant="secondary"
        @click="$router.push({ name: 'PatientCharts' })"
      >
        Cancel
      </SeButton>
      <SeButton
        :icon="icon"
        :disabled="disabled"
        @click="$emit('next', 1)"
      >
        Next
      </SeButton>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import ModelMixin from '@/mixins/model'

export default {
  name: 'WeightHeight',

  mixins: [ModelMixin],

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      icon: ChevronRight,
    }
  },
}
</script>
