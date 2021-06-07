<template functional>
  <EditableCard :title="props.title">
    <div>
      <div :class="[`grid grid-cols-${props.cols} gap-6 text-xs my-5 w-full`]">
        <InfoBlock
          v-for="(field, index) in props.fields"
          :key="index"
          :label="field.label"
          :description="field.value || '-'"
          :loading="props.loading"
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
