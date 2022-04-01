<template>
  <cv-form
    autocomplete="off"
    class="flex items-center justify-between mt-4"
    @submit.prevent
  >
    <div class="flex w-full items-end justify-between space-x-2">
      <div v-if="beginPos">
        <slot />
      </div>
      <DatePicker
        v-model="localValue"
        type="range"
        class="w-1/3 se-white-date-picker"
      />
      <div v-if="!beginPos">
        <slot />
      </div>
    </div>
  </cv-form>
</template>

<script>
import ModelMixin from '@/mixins/model'

export default {
  name: 'BillingTableFilters',

  mixins: [ModelMixin],

  props: {
    beginPos: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
