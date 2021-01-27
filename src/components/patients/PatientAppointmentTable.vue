<template>
  <div>
    <div>
      <cv-data-table
        :columns="columns"
        :data="[]"
        ref="table"
      >
        <template slot="batch-actions">
          <cv-button>
            Delete
          </cv-button>
        </template>
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in 5"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center py-2">
                <img
                  class="w-10 h-10 rounded-full mr-3"
                  :src="$faker().image.image()"
                  alt=""
                />
                <div>
                  <p>{{ $faker().name.findName() }}</p>
                  <p class="text-secondary text-xs">
                    Outpatient
                  </p>
                </div>
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
                <p>{{ $date.formatDate($faker().date.recent(), 'yyyy/MM/dd') }}</p>
                <p class="text-secondary text-xs">{{ $date.formatDate($faker().date.recent(), 'HH:mm a') }}</p>
              </div>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientAppointmentTable',
  data() {
    return {
      columns: [
        'Doctor',
        'Service',
        'Type of Appointment',
        'Date',
      ],
    }
  },
}
</script>
