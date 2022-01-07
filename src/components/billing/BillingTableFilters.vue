<template>
  <cv-form
    autocomplete="off"
    class="flex items-end justify-between mt-4"
    @submit.prevent
  >
    <div class="flex items-center gap-1 w-1/2">
      <DateRangePicker
        v-model="localValue"
        type="range"
        label="Date Range"
        class="flex-none se-white-date-picker"
        @change="$emit('change', localValue)"
      />
    </div>
    <slot />
  </cv-form>
</template>

<script>
import ModelMixin from '@/mixins/model'

export default {
  name: 'BillingTableFilters',

  mixins: [ModelMixin],
}
</script>
