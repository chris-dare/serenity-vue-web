<template>
  <div>
    <p class="text-primary my-4 font-bold">
      Record weight and height of patient
    </p>
    <div class="grid grid-cols-2 gap-6">
      <div class="flex items-end space-x-3">
        <cv-text-input label="Weight" v-model="internalForm.weight">
        </cv-text-input>
        <p class="mb-2">Kg</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input label="Height" v-model="internalForm.height">
        </cv-text-input>
        <p class="mb-2">cm</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input label="BMI (Calculated)" v-model="internalForm.bmi">
        </cv-text-input>
        <p class="mb-2">Patient BMI</p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-12 mb-6">
      <cv-button
        @click="$router.push({ name: 'PatientCharts' })"
        class="border-serenity-primary px-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
        kind="tertiary"
        >Cancel</cv-button
      >
      <div class="flex items-center">
        <cv-button
          @click="$emit('next', 1)"
          :icon="icon"
          kind="primary"
          :disabled="disabled"
          class="bg-serenity-primary ml-6"
          >Next</cv-button
        >
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
