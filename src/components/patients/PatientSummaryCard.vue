<template>
  <EditableCard :title="title">
    <div>
      <div class="grid grid-cols-2 gap-6 text-xs my-5 w-full">
        <div
          v-for="(field, index) in fields"
          :key="index"
        >
          <p class="text-secondary text-xs mb-1">{{ field.label }}</p>
          <p class="text-xs font-bold">{{ field.value || 'N/A' }}</p>
        </div>
      </div>
    </div>
  </EditableCard>
</template>

<script>
export default {
  name: 'PatientSummaryCard',

  props: {
    patient: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style></style>
