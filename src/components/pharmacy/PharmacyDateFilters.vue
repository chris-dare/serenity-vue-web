<template>
  <cv-form
    autocomplete="off"
    class="mt-4"
    @submit.prevent
  >
    <div class="grid grid-cols-3 gap-12 items-end">
      <slot />
      <DatePicker
        v-model="localValue"
        type="range"
        label="Date Range"
        class="flex-none se-white-date-picker"
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
