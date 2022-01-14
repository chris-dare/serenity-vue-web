<template>
  <cv-form
    autocomplete="off"
    class="mt-4"
    @submit.prevent
  >
    <div class="grid grid-cols-2 gap-12">
      <slot />
      <DateRangePicker
        v-model="localValue"
        type="range"
        label="Date Range"
        class="flex-none se-white-date-picker"
        @change="$emit('change', localValue)"
      />
    </div>
  </cv-form>
</template>

<script>
import ModelMixin from '@/mixins/model'

export default {
  name: 'PharmacyDateFilters',

  mixins: [ModelMixin],
}
</script>
