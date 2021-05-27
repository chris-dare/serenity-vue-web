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
      >
        <template #default="{ row }">
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
              <p>{{ $date.formatDate(row.start, 'yyyy/MM/dd') }}</p>
              <p class="text-secondary text-xs">{{ $date.formatDate(row.start, 'HH:mm a') }} - {{ $date.formatDate(row.end, 'HH:mm a') }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <Tag :variant="row.isPast ? 'error' : 'success'">{{ row.isPast ? 'past' : row.status }}</Tag>
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
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
        '',
      ],
    }
  },

  computed: {
    ...mapGetters({
      appointments: 'appointments/patientAppointments',
    }),

    data() {
      return this.appointments(this.$route.params.id)
    },
  },
}
</script>
