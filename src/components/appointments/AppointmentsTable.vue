<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="search"
      placeholder="Search for appointment"
    />

    <AppointmentTableFilters
      v-model="filters"
      @change="filter"
    />

    <DataTable
      :columns="columns"
      :pagination="pagination"
      :data="filteredData"
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
              :label="row.patient.fullName"
              :description="row.patient.gender_age_description"
              :url="row.patient.photo"
            />
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.slot.start, 'dd MMM, yyyy') }}</p>
            <p class="text-secondary text-xs">{{ $date.formatDate(row.slot.start, 'HH:mm a') }} - {{ $date.formatDate(row.slot.end, 'HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.service.healthcare_service_name }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.appointmentType | capitalize }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.patient.phone }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div class="flex items-center cursor-pointer space-x-6">
            <AppointmentTableActions
              @edit="edit(row)"
              @delete="confirmRemove(row)"
              @view="view(row)"
              @reschedule="reschedule(row)"
            />
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>

    <AppointmentSummaryModal
      :appointment="selectedAppointment"
      @print="$trigger('billing:details:open')"
    />

    <BillingDetailsModal
      :appointment="selectedAppointment"
    />

    <NotesModal
      label="Reason for cancellation"
      save-label="Cancel Appointment"
      required
      @save="cancel"
    />

    <ConfirmDeleteModal
      :loading="loading"
      @delete="remove"
    />
  </div>
</template>

<script>
import AppointmentSummaryModal from '@/components/appointments/AppointmentSummaryModal'
import AppointmentTableActions from '@/components/appointments/tables/AppointmentTableActions'
import AppointmentTableFilters from '@/components/appointments/tables/AppointmentTableFilters'
import BillingDetailsModal from '@/components/appointments/BillingDetailsModal'
import DataMixin from '@/mixins/data'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppointmentsTable',

  components: {AppointmentSummaryModal, BillingDetailsModal, AppointmentTableActions, AppointmentTableFilters},

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
      date: {},
      filters: {
        ordering: 'start',
      },
      columns: [
        'Patient',
        'Date/Time',
        'Service',
        'Type',
        'Mobile',
        'Action',
      ],
      visible: false,
      selectedAppointment: {},
    }
  },

  computed: {
    ...mapGetters({
      data: 'appointments/appointments',
    }),
  },

  beforeMount() {
    if (this.hideSearch) {
      this.pageSizes = [5, 10, 15]
      this.pageLength = 5
    }
    this.paginate = true
    this.searchTerms = ['patient_name', 'healthcare_service_name']
    this.filter(true)
  },

  methods: {
    ...mapActions({
      getData: 'appointments/getAppointments',
      cancelAppointment: 'appointments/cancelAppointment',
      deleteAppointment: 'appointments/deleteAppointment',
      setCurrentAppointment: 'appointments/setCurrentAppointment',
    }),

    async filter(refresh = true) {
      this.loading = true
      try {
        let filters = { ...this.filters }

        if (this.filters.end) {
          filters.end__lte = this.$date.formatQueryParamsDate(this.filters.end)
          delete filters.end
        }

        if (this.filters.start) {
          filters.start__gte = this.$date.formatQueryParamsDate(this.filters.start)
          delete filters.start
        }

        await this.getData({ refresh, filters })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

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

    async cancel(note) {
      await this.cancelAppointment({appointmentId: 1, payload: { cancelationReason: note } })
      this.$toast.open({message: 'Appointment successfully cancelled'})
      this.$trigger('notes:close')
    },

    confirmRemove(row) {
      this.$trigger('confirm:delete:open', { data:row.id, label: 'Are you sure you want to delete this appointment?' })
    },


    async remove(rowId) {
      this.loading = true
      try {
        await this.deleteAppointment(rowId).then(() => {
          this.$toast.open({
            message: 'Appointment successfully deleted',
          })
        })
        this.loading = false
        this.$trigger('confirm:delete:close')
      } catch (error) {
        this.loading = false
        throw error
      }
    },
  },
}
</script>
