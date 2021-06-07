<template>
  <div>
    <p class="text-primary my-4 font-bold">
      Record patient temperature
    </p>
    <div class="grid grid-cols-2 gap-6">
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="localValue.temperature"
          type="text"
          label="Temperature"
        />
        <p class="mb-2">°C</p>
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
          @click="$emit('next', 0)"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :icon="icon"
          :disabled="disabled"
          @click="$emit('next', 2)"
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
  name: 'Temperature',

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
