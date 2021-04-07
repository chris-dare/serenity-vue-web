<template>
  <EditableCard :title="title">
    <div>
      <div :class="[`grid grid-cols-${cols} gap-6 text-xs my-5 w-full`]">
        <InfoBlock
          v-for="(field, index) in fields"
          :key="index"
          :label="field.label"
          :description="field.value || 'N/A'"
          :loading="loading"
        />
      </div>
    </div>
  </EditableCard>
</template>

<script>
export default {
  name: 'PatientSummaryCard',

  props: {
    title: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => [],
    },
    cols: {
      type: Number,
      default: 2,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
