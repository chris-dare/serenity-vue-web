<template>
  <cv-form
    autocomplete="off"
    class="flex items-center justify-between mt-4"
    @submit.prevent
  >
    <div class="flex w-full items-end align-items-center justify-between ">
      <div v-if="beginPos">
        <slot />
      </div>
      <div class="flex items-end">
        <DatePicker
          v-model="localValue.date"
          placeholder="Date range"
          type="range"
          class=" se-white-date-picker min-w-32"
        />
        <MultiSelect
          v-if="$router.currentRoute.path !== '/' && $router.currentRoute.path !== '/billing'"
          v-model="localValue.bill_detail_preference"
          placeholder="Bill Detail"
          :multiple="false"
          :options="['Summarized', 'Detailed']"
          class="multiselect-white mx-3 min-w-32"
        />
        <MultiSelect
          v-if="$router.currentRoute.path !== '/' && $router.currentRoute.path !== '/billing'"
          v-model="localValue.should_payer_view_diagnoses"
          placeholder="Payer view Diagnoses"
          :multiple="false"
          :options="['True', 'False']"
          class="multiselect-white min-w-32"
        />
        <Search
          v-if="$router.currentRoute.path !== '/' && $router.currentRoute.path !== '/billing'"
          v-model="localValue.mr_number"
          placeholder="Search MR no"
          type="search"
          class="se-input-white mx-3"
          small
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
