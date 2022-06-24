<template>
  <cv-form
    autocomplete="off"
    class="flex items-end justify-between mt-4"
    @submit.prevent
  >
    <div class="flex items-center gap-1 w-2/3">
      <MultiSelect
        v-model="localValue.status"
        title="Status"
        :multiple="false"
        :options="['active', 'draft', 'completed']"
        class="multiselect-white flex-1"
        @input="$emit('change', localValue)"
      />

      <FormInput
        v-model="localValue.accession_number"
        type="text"
        label="Accession number"
        placeholder="Enter Accession number"
        class="white-input flex-1"
        @input="$emit('change', localValue)"
      />

      <AutoCompletePatients
        v-model="localValue.patient_id"
        class="multiselect-white flex-1"
        custom-field="uuid"
        :custom-label="(value) => `${$utils.concatData(value, ['title', 'first_name', 'last_name'])} - (${value.mr_number})`"
        @input="$emit('change', localValue)"
      />

      <MultiSelect
        v-model="localValue.healthcare_service_id"
        title="Service"
        :multiple="false"
        :options="services"
        label="healthcare_service_name"
        track-by="id"
        class="multiselect-white flex-1"
        custom-field="uuid"
        @input="$emit('change', localValue)"
      />
    </div>
    <DatePicker
      v-model="localDate"
      type="range"
      label="Date Range"
      class="flex-none se-white-date-picker w-80"
    />
  </cv-form>
</template>

<script>
import { mapState } from 'vuex'
import ModelMixin from '@/mixins/model'

export default {
  name: 'AppointmentTableFilters',

  mixins: [ModelMixin],

  props: {
    date: {
      type: [Object, String],
      default: null,
    },
  },

  computed: {
    ...mapState({
      services: (state) => state.services.services,
      patients: (state) => state.patients.patients,
    }),

    localDate: {
      set(val) {
        this.$emit('update:date', val)
      },
      get() {
        return this.date
      },
    },
  },
}
</script>
