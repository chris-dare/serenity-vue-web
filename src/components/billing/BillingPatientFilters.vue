<template>
  <cv-form
    autocomplete="off"
    class="flex items-end justify-between mt-4"
    @submit.prevent
  >
    <div class="grid grid-cols-3 items-end">
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
  name: 'BillingTableFilters',

  mixins: [ModelMixin],
}
</script>
