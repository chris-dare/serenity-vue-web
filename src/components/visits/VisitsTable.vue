<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="search"
      placeholder="Search for visit"
    />

    <DataTable
      :columns="columns"
      :data="filteredData"
      :loading="loading"
    >
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
            <p>{{ $date.formatDate(Date.now(), 'yyyy/MM/dd') }}</p>
            <p class="text-secondary text-xs">{{ $date.formatDate(Date.now(), 'HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.service.healthcare_service_name }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.service.categories }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div class="flex items-center cursor-pointer space-x-6">
            <div
              class="flex items-center cursor-pointer space-x-2"
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
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataMixin from '@/mixins/data'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppointmentsTable',

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      columns: [
        'Patient',
        'MR Number',
        'Type',
        'Service',
        'Action',
      ],
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
    this.refresh({refresh: false})
  },

  methods: {
    ...mapActions({
      getData: 'appointments/getAppointments',
    }),
  },
}
</script>
