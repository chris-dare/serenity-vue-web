<template>
  <cv-form
    autocomplete="off"
    class="flex items-end justify-between mt-4"
    @submit.prevent
  >
    <div class="flex w-full items-end justify-between space-x-2">
      <slot />

      <DatePicker
        v-model="localValue"
        type="range"
        class="w-1/3 se-white-date-picker"
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
