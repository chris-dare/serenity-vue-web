<template>
  <cv-form
    autocomplete="off"
    class="flex items-end justify-between mt-4"
    @submit.prevent
  >
    <div class="flex items-center gap-1 w-1/2">
      <MultiSelect
        v-model="localValue.status"
        title="Status"
        :multiple="false"
        :options="['booked', 'pending', 'arrived', 'fullfilled', 'cancelled', 'noshow', 'entered-in-error', 'waitlist']"
        class="multiselect-white flex-1"
        @input="$emit('change', localValue)"
      />

      <MultiSelect
        v-model="localValue.appointmentType"
        title="Type"
        :multiple="false"
        :options="['ROUTINE', 'FOLLOWUP', 'CHECKUP', , 'EMERGENCY']"
        class="multiselect-white flex-1"
        @input="$emit('change', localValue)"
      />

      <MultiSelect
        v-model="localValue.id"
        title="Patient"
        :multiple="false"
        :options="patients"
        :custom-label="$utils.customNameLabel"
        label="first_name"
        track-by="id"
        class="multiselect-white flex-1"
        custom-field="id"
        @input="$emit('change', localValue)"
      />

      <MultiSelect
        v-model="localValue.healthcare_service__id"
        title="Service"
        :multiple="false"
        :options="services"
        label="healthcare_service_name"
        track-by="id"
        class="multiselect-white flex-1"
        custom-field="id"
        @input="$emit('change', localValue)"
      />
    </div>
    <DateRangePicker
      v-model="localValue"
      type="range"
      label="Date Range"
      class="flex-none se-white-date-picker"
      @change="$emit('change', localValue)"
    />
  </cv-form>
</template>

<script>
import { mapState } from 'vuex'
import ModelMixin from '@/mixins/model'

export default {
  name: 'AppointmentTableFilters',

  mixins: [ModelMixin],

  computed: {
    ...mapState({
      services: (state) => state.services.services,
      patients: (state) => state.patients.patients,
    }),
  },
}
</script>
