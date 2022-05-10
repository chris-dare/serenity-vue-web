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
      <div class="flex w-2/3">
        <DatePicker
          v-model="localValue.date"
          placeholder="Date range"
          type="range"
          class="w-1/3 se-white-date-picker"
        />
        <MultiSelect
          v-model="localValue.bill_detail_preference"
          placeholder="Bill Detail"
          :multiple="false"
          :options="['Summarized', 'Detailed']"
          class="multiselect-white w-1/3"
        />
        <MultiSelect
          v-model="localValue.should_payer_view_diagnoses"
          placeholder="Payer view Diagnoses"
          :multiple="false"
          :options="['True', 'False']"
          class="multiselect-white w-1/3"
        />
      </div>
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
