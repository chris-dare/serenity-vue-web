<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="search"
      placeholder="Search for appointment"
    />

    <div class="flex justify-end">
      <DateRangePicker
        v-model="date"
        class="flex-none se-date-picker se-no-label"
      />
    </div>

    <DataTable
      :columns="columns"
      :data="filteredData"
      :loading="loading"
    >
      <template #no-data>
        <div class="bg-white w-full h-auto flex flex-col justify-center items-center py-6 my-4">
          <img
            src="@/assets/img/calendar--event 1.svg"
            class="w-12 h-12"
            alt=""
          >
          <p class="my-2">Uh oh! You have no appointments.</p>
          <p class="text-secondary font-light mb-6">You currently have no active or incoming appointments.</p>
          <router-link
            :to="{name:'SelectPatient'}"
            tag="cv-button"
            class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
            kind="primary"
          >
            Book an appointment <Add class="ml-4 w-5 h-5 text-white" />
          </router-link>
        </div>
      </template>
      <template #default="{row}">
        <cv-data-table-cell>
          <div class="flex items-center py-2">
            <img
              class="w-10 h-10 rounded-full mr-3"
              :src="row.image"
              alt=""
            >
            <div>
              <p>{{ $faker().name.findName() }}</p>
              <p class="text-secondary text-xs">
                {{ $faker().random.boolean() ? 'male' : 'female' }}, {{ $utils.createRandom(100) }} years
              </p>
            </div>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate($faker().date.recent(), 'yyyy/MM/dd') }}</p>
            <p class="text-secondary text-xs">{{ $date.formatDate($faker().date.recent(), 'HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>Specialist Appointment</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>Virtual</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $faker().phone.phoneNumber() }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div
            class="flex items-center cursor-pointer"
            @click="visible = !visible"
          >
            View
            <div
              class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center"
            >
              <img
                src="@/assets/img/view 1.svg"
                alt=""
              >
            </div>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
    <AppointmentSummaryModal
      :visible.sync="visible"
      @print="billingVisible = !billingVisible"
    />
    <BillingModal :visible.sync="billingVisible" />
  </div>
</template>

<script>
import AppointmentSummaryModal from '@/components/appointments/AppointmentSummaryModal'
import BillingModal from '@/components/appointments/BillingModal'
import DataMixin from '@/mixins/data'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppointmentsTable',

  components: {AppointmentSummaryModal, BillingModal},

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      rowSelects: null,
      billingVisible: false,
      date: {},
      columns: [
        'Patient',
        'Date/Time',
        'Service',
        'Type',
        'Mobile',
        'Action',
      ],
      visible: false,
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.appointments.appointments,
    }),
  },

  created() {
    this.getSlots()
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'appointments/getAppointments',
      getSlots: 'appointments/getSlots',
    }),
  },
}
</script>
