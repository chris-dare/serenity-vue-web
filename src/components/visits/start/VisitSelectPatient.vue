<template>
  <div class="space-y-4">
    <p class="text-primary font-semibold">Find patient</p>

    <Search
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
    />

    <FilterGroup
      v-model="selectedFilter"
      :filters="filters"
    />
    <vue-page-transition name="fade">
      <div
        v-if="selectedFilter === 'new'"
        class="space-y-8"
      >
        <AddPatientForm
          v-model="localValue.patient"
        />

        <div
          class="flex justify-end"
          @click="create"
        >
          <SeButton>Create Patient and Continue</SeButton>
        </div>
      </div>

      <div v-else>
        <DataTable
          ref="table"
          :columns="columns"
          :pagination="pagination"
          :data="filteredData"
          :loading="loading"
          @pagination="storePagination"
        >
          <template #default="{ row }">
            <cv-data-table-cell>
              <div class="flex items-center py-2">
                <InfoImageBlock
                  :label="$utils.formatName(row.name)"
                  :description="row.gender_age_description"
                  :url="row.photo"
                  size="base"
                />
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $utils.hasData(row.next_appointment, 'start') ? $date.formatDate(row.next_appointment.start) : 'No appointment' }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ 'Cash' }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <SeButton @click="start(row)">Start Visit</SeButton>
            </cv-data-table-cell>
          </template>
        </DataTable>
      </div>
    </vue-page-transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/data'
import modelMixin from '@/mixins/model'
import AddPatientForm from '@/components/forms/AddPatientForm'
import { required } from 'vuelidate/lib/validators'
import debounce from 'lodash/debounce'

export default {
  name: 'VisitPatient',

  components: { AddPatientForm },

  mixins: [DataMixin, modelMixin],

  data() {
    return {
      search: '',
      columns: ['Patient', 'Appointment', 'Payment Type', 'Action'],
      selectedFilter: 'existing',
      searchTerms: null,
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
      total: (state) => state.patients.patientsCount,
      meta: (state) => state.patients.patientsMeta,
    }),

    ...mapGetters({
      data: 'patients/patients',
      getAppointment: 'appointments/getPatientAppointment',
    }),

    filters() {
      return [
        { display: 'Existing Patients', code: 'existing' },
        { display: 'New Patient', code: 'new' },
      ]
    },
  },

  watch: {
    search(val) {
      this.searchPatients(val)
    },

    selectedFilter(val) {
      if (val === 'new') {
        this.localValue.patient = {}
      }
    },
  },

  beforeMount() {
    this.pageSizes = [5, 10, 15]
    this.pageLength = 5
    this.refresh({ page: 1, page_size: 5 })
  },

  validations: {
    localValue: {
      patient: {
        first_name: { required },
        last_name: { required },
        mobile: { required },
        email: { required },
        gender: { required },
      },
    },
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatients',
      searchPatientsStore: 'patients/searchPatients',
    }),

    start(row) {
      this.localValue.patient = row
      this.$emit('save', row)
    },

    create() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Please fill all required fields!',
          type: 'error',
        })
        return
      }

      this.$emit('create')
    },

    searchPatients: debounce(function(search) {
      this.searchPatientsStore({ search, page: 1, page_size: 5 })
    }, 300, false),
  },
}
</script>
