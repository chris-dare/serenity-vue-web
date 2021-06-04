<template>
  <div>
    <p class="text-primary my-4 font-bold">
      What time would the patient want to see the doctor?
    </p>
    <p
      v-if="codeNotAvailable"
      class="error"
    >
      Select a specialty to continue
    </p>
    <div v-else>
      <div class="grid">
        <DatePicker
          v-model="filters"
          type="datetimerange"
          disable-dates-before-today
          :disabled="codeNotAvailable"
          @change="filter"
        />
      </div>
      <div class="flex items-center space-x-4 my-4">
        <SeButton
          :icon="time"
          :disabled="codeNotAvailable"
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
  </div>
</template>

<script>
import Time from '@carbon/icons-vue/es/time/32'
import SlotList from '@/components/appointments/lists/SlotList'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'
import startOfDay from 'date-fns/startOfDay'
import isSameDay from 'date-fns/isSameDay'


export default {
  name: 'SelectSlot',

  components: { SlotList },

  mixins: [MultiStep],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },

    specialty: {
      type: Object,
      default: () => {},
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
    codeNotAvailable() {
      return !this.specialty?.id
    },
    
  },

  watch: {
    specialty(val) {
      if (val && val.id) {
        this.filter()
      }
    },
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
      try {
        this.loading = true
        const filters = this.convertFromDatePickerFormat(val || this.filters)
        await this.getSlots({ healthcareservice: this.specialty.id, ...filters })
      } catch (error) {
        this.loading = false
      }
      this.loading = false

    },

    async getNextSlot() {
      try {
        this.loading = true
        await this.getNextAvailableSlot({ healthcareservice_id: this.specialty.id })
        
      } catch (error) {
        this.loading = false
        
      }
      this.loading = false

    },

    convertFromDatePickerFormat(val) {
      return {
        start__gte: this.$date.formatQueryParamsDate(val[0]),
        end__lte: isSameDay(val[0], val[1]) || !val[1] ? this.$date.formatQueryParamsDate(this.$date.endOfDate(val[0])) : this.$date.formatQueryParamsDate(val[1]),
      }
    },
  },
}
</script>
