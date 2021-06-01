<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
  >
    <template slot="title">
      <h1>Start patient visit</h1>
    </template>
    <template slot="content">
      <div>
        <p>Find patient</p>

        <Search
          v-model="search"
          placeholder="Search for patient, enter name or MR number"
          class="my-4"
        />

        <DataTable
          ref="table"
          :columns="columns"
          :pagination="pagination"
          :data="filteredData"
          :loading="loading"
          @pagination="actionOnPagination"
        >
          <template #default="{ row }">
            <cv-data-table-cell>
              <div class="flex items-center py-2">
                <InfoImageBlock
                  :label="row.name"
                  :description="row.gender_age_description"
                  size="base"
                />
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ row.next_appointment ? $date.formatDate(row.next_appointment) : 'No appointment' }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ 'Cash' }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <SeButton @click="save(row)">Start Visit</SeButton>
            </cv-data-table-cell>
          </template>
        </DataTable>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DataMixin from '@/mixins/data'

export default {
  name: 'StartVisitModal',

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      columns: ['Patient', 'Appointment', 'Payment Type', 'Action'],
      visible: false,
    }
  },

  computed: {
    ...mapGetters({
      data: 'patients/patients',
    }),

    filteredPatients() {
      return this.patients.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase()),
      )
    },
  },

  events: {
    'visit:start:open': function(){
      this.visible = true
    },
    'visit:start:close': function(){
      this.visible = false
    },
  },

  beforeMount() {
    this.pageSizes = [5, 10, 15]
    this.pageLength = 5
    this.paginate = true
    this.searchTerms = ['name', 'mr_number', 'mobile', 'gender']
    this.refresh(false)
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatients',
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
      refreshCurrentAppointment: 'appointments/refreshCurrentAppointment',
    }),

    save(patient) {
      if (patient.next_appointment) {
        // 
      } else {
        this.refreshCurrentAppointment()
        this.addToCurrentAppointment({ patient })
        this.visible = false
        this.$trigger('book:appointment:open')
      }
    },
  },
}
</script>
