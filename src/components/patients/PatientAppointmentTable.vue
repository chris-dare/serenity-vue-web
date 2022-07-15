<template>
  <div class="space-y-4">
    <!-- <Search
      v-model="search"
      placeholder="Search for slot"
    /> -->
    <div>
      <DataTable
        ref="table"
        :columns="columns"
        :data="filteredData"
        :no-data-label="noDataLabel('appointments')"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <div class="py-2">
              <InfoImageBlock
                :label="row.patient.fullName | capitalize"
                :description="row.patient.gender_age_description"
                :url="row.patient.photo"
              />
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.service.healthcare_service_name }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.appointment_type | capitalize }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ $date.formatDate(row.slot_start, 'dd MMM, yyyy') }}</p>
              <p class="text-secondary text-xs">{{ $date.formatDate(row.slot_start, 'HH:mm a') }} - {{ $date.formatDate(row.slot_end, 'HH:mm a') }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div class="flex items-center">
              <Tag :variant="row.isPast ? 'error' : 'primary'">{{ row.isPast ? 'past' : row.status }}</Tag>
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import DataMixin from '@/mixins/data'

export default {
  name: 'PatientAppointmentTable',

  mixins: [DataMixin],

  data() {
    return {
      columns: [
        'Doctor',
        'Service',
        'Type of Appointment',
        'Date',
        'Status',
      ],
    }
  },

  computed: {
    ...mapState({
      patient: state => state.patients.currentPatient,
    }),
    ...mapGetters({
      appointments: 'appointments/patientAppointments',
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
    }),

    data() {
      return this.$date.sortByDate(this.appointments(this.patient.uuid), 'start', 'desc')
    },
  },
}
</script>
