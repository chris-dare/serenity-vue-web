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
      :data="filteredData"
      :loading="loading"
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
          <div class="py-2">
            <InfoImageBlock
              :label="row.patient.fullName"
              :description="row.patient.gender_age_description"
            />
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.slot.start, 'yyyy/MM/dd') }}</p>
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
            />
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>

    <AppointmentSummaryModal
      :appointment="selectedAppointment"
      @print="$trigger('billing:details:open')"
    />

    <BillingModal
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
import BillingModal from '@/components/appointments/BillingModal'
import DataMixin from '@/mixins/data'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppointmentsTable',

  components: {AppointmentSummaryModal, BillingModal, AppointmentTableActions, AppointmentTableFilters},

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
      filters: {},
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
    this.searchTerms = ['']
    this.filter(false)
  },

  methods: {
    ...mapActions({
      getData: 'appointments/getAppointments',
      cancelAppointment: 'appointments/cancelAppointment',
      deleteAppointment: 'appointments/deleteAppointment',
    }),

    async filter(refresh = true) {
      this.loading = true
      try {
        await this.getData({refresh, filters: { ...this.filters } })
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
      this.$router.push({name: 'AppointmentUpdate', params: { id: row.id }})
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
