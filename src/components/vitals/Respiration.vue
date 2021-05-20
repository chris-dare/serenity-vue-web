<template>
  <div>
    <p class="text-primary my-4 font-bold">
      Respiration rate and SPO2
    </p>
    <div class="grid grid-cols-2 gap-6">
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="localValue.respiration_rate"
          type="text"
          label="Respiratory rate"
        />
        <p class="mb-2">per min</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="localValue.saturation"
          type="text"
          label="Arterial blood oxygen saturation"
        />
        <p class="mb-2">%</p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          @click="$router.push({ name: 'PatientCharts' })"
        >
          Cancel
        </SeButton>
        <SeButton
          variant="secondary"
          @click="$emit('next', 3)"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :icon="icon"
          :disabled="disabled"
          @click="$emit('confirm')"
        >
          Confirm
        </SeButton>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import ModelMixin from '@/mixins/model'

export default {
  name: 'Respiration',

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
