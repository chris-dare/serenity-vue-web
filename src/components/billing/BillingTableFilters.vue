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
      <div class="flex">
        <DatePicker
          v-model="localValue.date"
          placeholder="Date range"
          type="range"
          class="flex-1 se-white-date-picker"
        />
        <MultiSelect
          v-if="$router.currentRoute.path !== '/' && $router.currentRoute.path !== '/billing'"
          v-model="localValue.bill_detail_preference"
          placeholder="Bill Detail"
          :multiple="false"
          :options="['Summarized', 'Detailed']"
          class="multiselect-white flex-1"
        />
        <MultiSelect
          v-if="$router.currentRoute.path !== '/' && $router.currentRoute.path !== '/billing'"
          v-model="localValue.should_payer_view_diagnoses"
          placeholder="Payer view Diagnoses"
          :multiple="false"
          :options="['True', 'False']"
          class="multiselect-white flex-1"
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
