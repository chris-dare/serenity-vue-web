<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next: Notes"
    :previous="previous"
    :modal="modal"
    :query="$route.query"
    @cancel="cancel"
    @save="validateAndReroute"
  >
    <p class="text-primary my-4 font-bold">
      What time would the patient want to see the doctor?
    </p>
    <div class="grid">
      <DatePicker
        v-model="filters"
        type="datetimerange"
        disable-dates-before-today
        @change="filter"
      />
    </div>
    <div class="flex items-center space-x-4 my-4">
      <SeButton
        :icon="time"
        @click="getNextSlot"
      >
        Give me the next time slot
      </SeButton>
      <SeButton
        v-if="false"
        :icon="time"
        variant="success"
      >
        Join a wait queue
      </SeButton>
    </div>
    <p
      class="text-primary mt-8 my-4 font-bold"
    >
      Select a doctor for the appointment
    </p>
    <div
      class="grid min-h-full"
    >
      <SlotList
        v-model="form.slot"
        :data="filteredData"
        :data-loading="loading"
      />
    </div>
  </MultiStepBase>
</template>

<script>
import Time from '@carbon/icons-vue/es/time/32'
import SlotList from '@/components/appointments/lists/SlotList'
import SlotListItem from '@/components/appointments/lists/SlotListItem'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'
import startOfDay from 'date-fns/startOfDay'
import isSameDay from 'date-fns/isSameDay'


export default {
  name: 'AppointmentSelectSlot',

  // eslint-disable-next-line vue/no-unused-components
  components: { SlotList, SlotListItem },

  mixins: [MultiStep],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        date: startOfDay(new Date()),
        slot: {},
      },
      filters: [new Date()],
      time: Time,
      loading: false,
      selected: 1,
      timezones: [
        {
          label: 'GMT',
          value: 'GMT',
        },
        {
          label: 'Timezone-2',
          value: 'timezone2',
        },
      ],
      pattern: '(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)',
      previous: 'ClinicsServices',
      parent: 'Appointments',
      next: 'AppointmentNotes',
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      storeData: (state) => state.appointments.currentAppointment,
    }),

    ...mapGetters({
      availableSlots: 'appointments/availableSlots',
      slots: 'appointments/slots',
    }),

    filteredData() {
      if (!this.form.date) return []
      // return this.availableSlots(this.form.date)
      return this.slots
    },

    disabled() {
      return !this.form.date || !this.form.doctor
    },

    
  },

  async beforeMount() {
    await this.filter()
  },

  validations: {
    form: {
      slot: { required  },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
      getSlots: 'appointments/getSlots',
      getNextAvailableSlot: 'appointments/getNextAvailableSlot',
    }),

    async filter(val) {
      this.loading = true
      const filters = this.convertFromDatePickerFormat(val || this.filters)
      await this.getSlots({ service_specialty: this.storeData.specialty.Code, ...filters })
      this.loading = false
    },

    async getNextSlot() {
      this.loading = true
      await this.getNextAvailableSlot({ service_specialty: this.storeData.specialty.Code })
      this.loading = false
    },

    convertFromDatePickerFormat(val) {
      return {
        start: this.$date.formatQueryParamsDate(val[0]),
        end: isSameDay(val[0], val[1]) || !val[1] ? this.$date.formatQueryParamsDate(this.$date.endOfDate(val[0])) : this.$date.formatQueryParamsDate(val[1]),
      }
    },
  },
}
</script>
