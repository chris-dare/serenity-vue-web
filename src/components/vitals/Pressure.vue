<template>
  <div>
    <p class="text-primary my-4 font-bold">
      Blood pressure and Pulse
    </p>
    <div class="grid grid-cols-2 gap-6">
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="internalForm.systolic"
          type="text"
          label="BP Systolic"
        />
        <p class="mb-2">mmHg</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="internalForm.diastolic"
          type="text"
          label="BP Diastolic"
        />
        <p class="mb-2">mmHg</p>
      </div>
      <div class="flex items-end space-x-3">
        <cv-text-input
          v-model="internalForm.pulse"
          type="text"
          label="Pulse"
        />
        <p class="mb-2">per min</p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary px-6 mr-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
          @click="$router.push({ name: 'PatientCharts' })"
        >
          Cancel
        </cv-button>
        <cv-button
          class="bg-black px-6"
          kind="primary"
          @click="$emit('next', 1)"
        >
          Go back
        </cv-button>
      </div>
      <div class="flex items-center">
        <cv-button
          :icon="icon"
          kind="primary"
          :disabled="disabled"
          class="bg-serenity-primary ml-6"
          @click="$emit('next', 3)"
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
  name: 'Pressure',

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
