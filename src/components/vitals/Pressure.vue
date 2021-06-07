<template>
  <div>
    <p class="text-primary my-4 font-bold">
      Blood pressure and Pulse
    </p>
    <div class="grid grid-cols-2 gap-6">
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="localValue.systolic"
          type="text"
          label="BP Systolic"
        />
        <p class="mb-2">mmHg</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="localValue.diastolic"
          type="text"
          label="BP Diastolic"
        />
        <p class="mb-2">mmHg</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="localValue.pulse"
          type="text"
          label="Pulse"
        />
        <p class="mb-2">per min</p>
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
          @click="$emit('next', 1)"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :icon="icon"
          :disabled="disabled"
          @click="$emit('next', 3)"
        >
          Next
        </SeButton>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import ModelMixin from '@/mixins/model'

export default {
  name: 'Pressure',

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
