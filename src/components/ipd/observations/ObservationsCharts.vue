<template>
  <div class="space-y-8 divide-y">
    <div
      class="grid grid-cols-3 gap-4"
    >
      <FormInput
        v-for="(item, index) in inputItems"
        :key="index"
        v-model="form[item.prop]"
        :placeholder="item.placeholder"
        :label="item.label"
      />
    </div>
    <div class="flex justify-between items-center">
      <SeButton
        variant="secondary"
        @click="$emit('close')"
      >
        Go back
      </SeButton>
      <SeButton
        :loading="loading"
      >
        Submit
      </SeButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ObservationsCharts',

  data() {
    return {
      form: {},
      loading: false,
      inputItems: [
        { label: 'Temperature ( °C) ', placeholder: 'Enter Temperature', prop: 'temperature' },
        { label: 'Pulse', placeholder: 'Enter Pulse', prop: 'pulse' },
        { label: 'Respiratory', placeholder: 'Enter a respiratory', prop: 'respiration' },
        { label: 'BP', placeholder: 'Enter BP', prop: 'systolic_bp' },
        { label: 'Wounds', placeholder: 'Select type', prop: 'wounds' },
        { label: 'Drains', placeholder: 'Select type', prop: 'drains' },
        { label: 'Comments', placeholder: 'Enter comments', prop: 'comments' },
      ],
    }
  },
}
</script>
