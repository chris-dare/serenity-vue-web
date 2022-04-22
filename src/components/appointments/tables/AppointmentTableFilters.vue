<template>
  <cv-form
    autocomplete="off"
    class="flex items-end justify-between mt-4"
    @submit.prevent
  >
    <div class="flex items-center gap-1 w-1/3">
      <MultiSelect
        v-model="localValue.status"
        title="Status"
        :multiple="false"
        :options="['proposed', 'pending', 'booked', 'arrived', 'fullfilled', 'cancelled', 'noshow', 'entered-in-error', 'waitlist']"
        class="multiselect-white flex-1"
        @input="$emit('change', localValue)"
      />

      <MultiSelect
        v-model="localValue.appointment_type"
        title="Type"
        :multiple="false"
        :options="['ROUTINE', 'FOLLOWUP', 'CHECKUP', , 'EMERGENCY']"
        class="multiselect-white flex-1"
        @input="$emit('change', localValue)"
      />

      <!-- <AutoCompletePatients
        v-model="localValue.patient"
        class="multiselect-white flex-1"
        custom-field="id"
        @input="$emit('change', localValue)"
      /> -->

      <!-- <MultiSelect
        v-model="localValue.healthcare_service_name"
        title="Service"
        :multiple="false"
        :options="services"
        label="healthcare_service_name"
        track-by="id"
        class="multiselect-white flex-1"
        custom-field="healthcare_service_name"
        @input="$emit('change', localValue)"
      /> -->
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
