<template>
  <MultiStepBase
    :icon="icon"
    next-label="Join a wait queue"
    :previous="previous"
    :modal="modal"
    :query="$route.query"
    @cancel="cancel"
    @save="save"
  >
    <p
      class="text-primary mb-4 font-bold"
    >
      Select a doctor for the appointment
    </p>
    <div class="flex items-center space-x-4 my-4">
      <!-- <SeButton
        :icon="time"
        @click="getNextSlot"
      >
        Give me the next time slot
      </SeButton> -->
      <!-- <SeButton
        :icon="time"
        variant="success"
        :loading="buttonLoading"
        @click="save"
      >
        Join a wait queue
      </SeButton> -->
    </div>

    <div
      class="grid min-h-full"
    >
      <PractitionersList
        v-model="form.slot"
        :data="practitioners"
      />
    </div>
    
    <!-- <div
      class="grid min-h-full"
    >
      <SlotList
        v-model="form.slot"
        :data="filteredData"
        :data-loading="loading"
      />
    </div> -->
  </MultiStepBase>
</template>

<script>
import Time from '@carbon/icons-vue/es/time/32'
import SlotList from '@/components/appointments/lists/SlotList'
import SlotListItem from '@/components/appointments/lists/SlotListItem'
import PractitionersList from '@/components/appointments/lists/PractitionersList'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'
import startOfDay from 'date-fns/startOfDay'
import isSameDay from 'date-fns/isSameDay'


export default {
  name: 'AppointmentWalkInSlot',

  // eslint-disable-next-line vue/no-unused-components
  components: { SlotList, SlotListItem, PractitionersList },

  mixins: [MultiStep],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },

    buttonLoading: {
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
      localValue: {},
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
      practitioners: 'practitioners/practitioners',
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

  // async beforeMount() {
  //   await this.filter()
  // },

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

    save() {
      this.$emit('save', this.form)
    },

    async filter(val) {
      try {
        this.loading = true
        const filters = this.convertFromDatePickerFormat(val || this.filters)
        await this.getSlots({ healthcareservice: this.storeData.service.id, ...filters })
        this.loading = false
        
      } catch (error) {
        this.loading = false
        
      }
      this.loading = false

    },

    async getNextSlot() {
      this.loading = true
      try {
        await this.getNextAvailableSlot({  healthcareservice_id: this.storeData.service.id, is_today: true })
        this.loading = false
        
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
