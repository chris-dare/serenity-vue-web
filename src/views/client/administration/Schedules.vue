<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Schedules ({{ dataCount || 0 }})</p>
        <SeButton
          v-if="$isCurrentWorkspace('ADMIN')"
          @click="$trigger('schedule:add:open')"
        >
          Add new schedule
          <Add class="ml-4 w-5 h-5" />
        </SeButton>
      </div>

      <SeForm
        class="flex items-end justify-between mt-4"
      >
        <div class="flex items-center gap-1 w-2/5">
          <MultiSelect
            v-model="filters.practitioner"
            title="Practitioner"
            :multiple="false"
            :options="practitioners"
            :custom-label="$utils.customNameLabel"
            label="first_name"
            track-by="id"
            class="multiselect-white flex-1"
            custom-field="id"
            @input="filter"
          />

          <MultiSelect
            v-model="filters.location"
            title="Location"
            :multiple="false"
            :options="locations"
            label="location_name"
            track-by="id"
            class="multiselect-white flex-1"
            custom-field="id"
            @input="filter"
          />
          <MultiSelect
            v-model="filters.healthcare_service"
            title="Service"
            :multiple="false"
            :options="services"
            label="healthcare_service_name"
            track-by="id"
            class="multiselect-white flex-1"
            custom-field="id"
            @input="filter"
          />
        </div>
        <DateRangePicker
          v-model="date"
          type="range"
          label="Date Range"
          class="flex-none se-white-date-picker"
          @change="filter"
        />
      </SeForm>

      <Calendar :loading="loading" />
    </div>
    <AddEditSchedule />
    <ViewScheduleDetails />
  </div>
</template>

<script>
import Calendar from '@/components/schedules/Calendar'
import AddEditSchedule from '@/components/schedules/AddEditSchedule'
import ViewScheduleDetails from '@/components/schedules/ViewScheduleDetails'
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/data'

export default {
  name: 'Schedules',

  components: { Calendar, AddEditSchedule, ViewScheduleDetails },

  mixins: [DataMixin],

  data() {
    return {
      date: {
        start: this.$date.startOfMonth(),
        end: this.$date.endOfMonth(),
      },
      calOptions: {
        dateFormat: 'm/d/Y',
      },
      filters: {},
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

  beforeMount() {
    this.filter()
    this.convertToDatePickerFormat()
  },

  methods: {
    ...mapActions({
      getSchedules: 'schedules/getSchedules',
    }),

    async filter() {
      this.loading = true
      this.convertFromDatePickerFormat()
      try {
        await this.getSchedules(this.filters)
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    convertFromDatePickerFormat() {
      this.filters.planning_horizon_start__gte = this.date.start ? this.$date.formatQueryParamsDate(this.date.start) : null
      this.filters.planning_horizon_end__lte = this.date.end ? this.$date.formatQueryParamsDate(this.date.end) : null
    },

    convertToDatePickerFormat() {
      this.date = {
        start: this.filters.planning_horizon_start__gte,
        end: this.filters.planning_horizon_end__lte,
      }
    },
  },

}
</script>
