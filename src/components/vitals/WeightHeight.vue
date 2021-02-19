<template>
  <div>
    <p class="text-primary my-4 font-bold">
      Record weight and height of patient
    </p>
    <div class="grid grid-cols-2 gap-6">
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="internalForm.weight"
          label="Weight"
        />
        <p class="mb-2">Kg</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="internalForm.height"
          label="Height"
        />
        <p class="mb-2">cm</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="internalForm.bmi"
          label="BMI (Calculated)"
        />
        <p class="mb-2">Patient BMI</p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-12 mb-6">
      <cv-button
        class="border-serenity-primary px-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
        kind="tertiary"
        @click="$router.push({ name: 'PatientCharts' })"
      >
        Cancel
      </cv-button>
      <div class="flex items-center">
        <cv-button
          :icon="icon"
          kind="primary"
          :disabled="disabled"
          class="bg-serenity-primary ml-6"
          @click="$emit('next', 1)"
        >
          Next
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'WeightHeight',

  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      icon: ChevronRight,
    }
  },

  computed: {
    internalForm: {
      get() {
        return this.form
      },
      set(value) {
        this.$emit('update:form', value)
      },
    },
  },
}
</script>
