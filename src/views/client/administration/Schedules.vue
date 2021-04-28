<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Schedules ({{ 5 }})</p>
        <cv-button
          class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
          kind="primary"
          @click="$trigger('schedule:add:open')"
        >
          Add new schedule
          <Add class="ml-4 w-5 h-5" />
        </cv-button>
      </div>

      <div class="flex items-end justify-between mt-4">
        <div class="flex gap-1 w-2/5">
          <MultiSelect
            v-model="filters.practitioner"
            title="Practitioner"
            :multiple="false"
            :options="practitioners"
            label="first_name"
            class="multiselect-white flex-1"
          />

          <MultiSelect
            v-model="filters.location"
            title="Location"
            :multiple="false"
            :options="locations"
            label="location_name"
            class="multiselect-white flex-1"
          />
          <MultiSelect
            v-model="filters.service"
            title="Service"
            :multiple="false"
            :options="services"
            label="healthcare_service_name"
            class="multiselect-white flex-1"
          />
        </div>
        <DateRangePicker
          v-model="filters.date"
          class="flex-none se-date-picker"
        />
      </div>

      <Calendar />
    </div>
    <AddEditSchedule />
    <ViewScheduleDetails />
  </div>
</template>

<script>
import Calendar from '@/components/schedules/Calendar'
import AddEditSchedule from '@/components/schedules/AddEditSchedule'
import ViewScheduleDetails from '@/components/schedules/ViewScheduleDetails'
import { mapState } from 'vuex'
import DataMixin from '@/mixins/data'

export default {
  name: 'Schedules',

  components: { Calendar, AddEditSchedule, ViewScheduleDetails },

  mixin: [DataMixin],

  data() {
    return {
      date: '',
      calOptions: {
        dateFormat: 'm/d/Y',
      },
      filters: {
        date: {},
      },
    }
  },

  computed: {
    ...mapState({
      locations: (state) => state.locations.locations,
      practitioners: (state) => state.practitioners.users,
      services: (state) => state.services.services,
      data: (state) => state.schedules.schedules,
    }),
  },

}
</script>
