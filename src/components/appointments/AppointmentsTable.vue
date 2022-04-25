<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="params.search"
      placeholder="Search for appointment by patient name, service, etc"
      @input="searchData"
    />

    <AppointmentTableFilters
      v-model="params"
      :date.sync="dateParam"
      @change="searchData"
      @update:date="searchData"
    />

    <DataTable
      :columns="columns"
      :pagination="pagination"
      :data="data"
      :loading="loading"
      @pagination="actionOnPagination"
    >
      <template #no-data>
        <div class="bg-white w-full h-auto flex flex-col justify-center items-center py-6">
          <img
            src="@/assets/img/calendar--event 1.svg"
            class="w-12 h-12"
            alt=""
          >
          <p class="my-2">Uh oh! You have no appointments.</p>
          <p class="text-secondary font-light mb-6">You currently have no active or incoming appointments.</p>
        </div>
      </template>
      <template #default="{row}">
        <cv-data-table-cell>
          <div class="py-2">
            <InfoImageBlock
              :label="row.patient_full_name | capitalize"
              :description="$utils.formatGenderAge(row.patient_gender, row.patient_age)"
              :url="row.patient_photo"
            />
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.slot_start, 'dd MMM, yyyy') }}</p>
            <p class="text-secondary text-xs">{{ $date.formatDate(row.slot_start, 'HH:mm a') }} - {{ $date.formatDate(row.slot_end, 'HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.healthcare_service_name }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.appointment_type | capitalize }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <Tag
              :variant="getStatusVariant(row.status)"
            >
              {{ row.status }}
            </Tag>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.patient_mobile }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div class="flex items-center cursor-pointer space-x-6">
            <AppointmentTableActions
              :status="row.status"
              :data-qa="`table-actions-${row.id}`"
              @edit="edit(row)"
              @cancel="confirmRemove(row)"
              @view="view(row)"
              @reschedule="reschedule(row)"
              @check-in="checkIn(row)"
            />
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>

    <AppointmentSummaryModal
      :appointment="selectedAppointment"
      @print="$trigger('billing:details:open')"
      @cancel="selectedAppointment = $event"
    />

    <BillingDetailsModal
      :appointment="selectedAppointment"
    />

    <NotesModal
      label="Reason for cancellation"
      save-label="Cancel Appointment"
      required
      @save="cancel(null, $event)"
    />

    <ConfirmDeleteModal
      :loading="loading"
      @delete="cancel($event, null)"
    />
  </div>
</template>

<script>
import DataMixin from '@/mixins/paginated'
import { mapActions, mapGetters, mapState } from 'vuex'
import AppointmentTableFilters from '@/components/appointments/tables/AppointmentTableFilters'
import AppointmentSummaryModal from '@/components/appointments/AppointmentSummaryModal'
import AppointmentTableActions from '@/components/appointments/tables/AppointmentTableActions'
import BillingDetailsModal from '@/components/appointments/BillingDetailsModal'

export default {
  name: 'AppointmentsTable',

  components: { AppointmentTableFilters, AppointmentSummaryModal, AppointmentTableActions, BillingDetailsModal },

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dateFields: ['start', 'end'],
      columns: [
        'Patient',
        'Date/Time',
        'Service',
        'Type',
        'Status',
        'Mobile',
        'Action',
      ],
      selectedAppointment: {},
    }
  },

  computed: {
    ...mapState({
      total: (state) => state.appointments.appointmentsCount,
    }),
    ...mapGetters({
      data: 'appointments/appointments',
    }),
  },

  async mounted() {
    this.refresh()
  },

  beforeMount() {
    if (this.hideSearch) {
      this.pageSizes = [5, 10, 15]
      this.params.page_size = 5
    }
  },

  methods: {
    ...mapActions({
      getData: 'appointments/getAppointments',
      cancelAppointment: 'appointments/cancelAppointment',
      actionAppointment: 'appointments/actionAppointment',
      deleteAppointment: 'appointments/deleteAppointment',
      setCurrentAppointment: 'appointments/setCurrentAppointment',
    }),

    view(appointment) {
      this.selectedAppointment = appointment
      this.$trigger('appointment:summary:open')
    },

    edit(row) {
      this.setCurrentAppointment(row)
      this.$router.push({name: 'AppointmentUpdate', params: { id: row.id }, query: {type: 'update'}})
    },

    reschedule(row) {
      this.setCurrentAppointment(row)
      this.$router.push({name: 'AppointmentUpdate', params: { id: row.id }, query: {type: 'reschedule'}})
    },

    async checkIn(row) {
      await this.actionAppointment({ appointmentId: row.uuid, payload: { action: 'CHECK-IN' }})
      this.$toast.open({
        message: `Patient ${row.patient_full_name} visit has started`,
      })
    },

    async cancel(id, comment) {
      await this.cancelAppointment({ appointmentId: id || this.selectedAppointment.uuid, payload: { action: 'CANCEL', comment }})
      this.$toast.open({ message: 'Appointment successfully cancelled' })
      this.$trigger('notes:close')
      this.$trigger('confirm:delete:close')
    },

    confirmRemove(row) {
      this.selectedAppointment = row
      this.$trigger('confirm:delete:open', { data: row.uuid, label: 'Are you sure you want to cancel this appointment?', buttonLabel: 'Cancel' })
    },

    getStatusVariant(status) {
      if (status === 'pending') {
        return 'primary'
      }

      if (status === 'cancelled') {
        return 'error'
      }

      return 'success'
    }, 
  },
}
</script>
