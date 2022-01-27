<template>
  <div class="space-y-4">
    <div class="flex items-end">
      <div class="w-2/3">
        <Search
          v-model="filter"
          placeholder="Search for patient, enter name or MR number"
        />
      </div>
      <div class="w-1/3 pl-4">
        <DatePicker
          v-model="prescription_date"
          kind="single"
          class="se-input-gray"
          :max-date="new Date()"
          placeholder="Select date of prescription"
          @input="searchPatients(search)"
        />
      </div>
    </div>
    <div
      v-if="!modal"
      class="my-4 flex items-center justify-between"
    >
      <FilterGroup
        v-model="search"
        :filters="filters"
      />
      <FilterDropdown
        v-if="false"
        v-model="selectedFilter"
      />
    </div>

    <div :class="{'bg-white p-3': patient }">
      <div
        v-if="patient"
        class="flex items-center justify-between mb-4"
      >
        <p class=" text-gray-500">Prescriptions</p>
        <div
          v-if="hasActiveEncounter"
          class="bg-serenity-light-gray w-9 h-9 rounded-full ml-6 flex items-center justify-center"
          @click="$trigger('profile:medication:request:open')"
        >
          <img
            src="@/assets/img/pills--add 1.svg"
            class="w-4 h-4"
          >
        </div>
      </div>
      <DataTable
        ref="table"
        :data="filteredPrescriptions"
        :columns="columns"
        :loading="prescriptions.loading"
        :has-expand-all="true"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <div class="flex items-center py-2">
              <InfoImageBlock
                :label="row.patient.fullName | capitalize"
                :description="row.patient.gender_age_description"
                size="base"
              />
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p v-if="row.encounter_medication_request[0].practitioner_detail">
                {{ row.encounter_medication_request[0].practitioner_detail.name }}
              </p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.encounter_medication_request[0].priority }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ $date.formatDate(row.encounter_medication_request[0].created_at, 'dd MMM, yyyy') }}</p>
            </div>
          </cv-data-table-cell>
          <!-- <cv-data-table-cell>
            <div>
              <Tag
                :variant="getStatusVariant(row.status)"
              >
                {{ row.status }}
              </Tag>
            </div>
          </cv-data-table-cell> -->
          <cv-data-table-cell>
            <div class="flex items-center cursor-pointer space-x-4">
              <TableActions
                :actions="tableActions(row)"
                :loading="printLoading"
                @view="$router.push({ name: route, params: { id: row.patient_id} })"
              />
            </div>
          </cv-data-table-cell>
        </template>
        <template #expand="{ row }">
          <div class="px-14 py-4">
            <DataTable
              ref="table"
              :data="row.encounter_medication_request"
              :columns="nestedTableColumns"
              :has-expand-all="true"
            >
              <template #default="request">
                <cv-data-table-cell>
                  <div>
                    <p class="font-bold text-serenity-primary">
                      {{ $utils.getFirstData(request.row.medication_detail) }}
                      {{ $utils.getFirstData(request.row.medication_request_dosage_instruction, 'strength') }}
                    </p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p>{{ $utils.getFirstData(request.row.medication_request_dosage_instruction, 'frequency') }}</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p>{{ $utils.getFirstData(request.row.medication_request_dosage_instruction, 'period') }} {{ $utils.getFirstData(request.row.medication_request_dosage_instruction, 'period_unit') }}</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p>{{ $utils.getFirstData(request.row.medication_request_notes, 'display') }}</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <Tag
                      :variant="getStatusVariant(request.row.status)"
                    >
                      {{ request.row.status }}
                    </Tag>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <slot
                    name="action"
                    :row="request.row"
                  />
                </cv-data-table-cell>
              </template>
            </DataTable>
          </div>
        </template>
      </DataTable>
    </div>
    <PrescriptionModal />
  </div>
</template>

<script>
/* eslint-disable */
import EncounterPrescriptionsApi from '@/api/encounter-prescriptions.js'
import PrescriptionModal from '@/components/patients/modals/PrescriptionModal'
import { mapState, mapGetters, mapActions } from 'vuex'
import DataMixin from '@/mixins/data'
import debounce from 'lodash/debounce'
import Patient from '@/models/Patient'
export default {
  name: 'PrescriptionsTable',

  mixins: [DataMixin],

  components: {PrescriptionModal},

  props: {
    modal: {
      type: Boolean,
      default: false,
    },

    route: {
      type: String,
      default: 'PatientSummary',
    },

    filters: {
      type: Array,
      default: () => [],
    },

    patient: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      rowSelects: null,
      selectedFilter: '',
      filter: '',
      searchTerms: ['gender'],
      prescriptions: {
        loading: false,
        data: [],
      },
      prescription_date: null,
      printLoading: false,
    }
  },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
      workspaceType: (state) => state.global.workspaceType,
      provider: (state) => state.auth.provider,
    }),

    ...mapGetters({
      data: 'patients/patients',
      hasActiveEncounter: 'encounters/hasActiveEncounter',
    }),

    filteredPrescriptions() {
      return this.prescriptions.data.filter(el => {
        return el.encounter_medication_request && el.encounter_medication_request.length > 0
      })
    },

    columns() {
      let columns = [
        'Prescriptions',
        'Requester',
        'Priority',
        'Date prescribed',
        // 'Status'
      ]

      if (this.$isCurrentWorkspace('PHARM')) {
        columns.push('Action')
      }

      return columns
    },

    nestedTableColumns() {
      let columns = [
        'Drug name',
        'Frequency',
        'Duration',
        'Special Instruction',
        'Status'
      ]

      if (this.$isCurrentWorkspace('OPD')) {
        columns.push('Action')
      }

      return columns
    }
  },

  watch: {
    filter(search) {
      this.searchPatients(search)
    },
  },

  beforeMount() {
    if (this.modal) {
      this.pageSizes = [5, 10, 15]
      this.pageLength = 5
    }
  },

  mounted() {
    this.paginate = true
    this.refresh(false)
    this.fetchPrescriptions()
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatients',
      searchPatientsStore: 'patients/searchPatients',
      printing: 'encounters/exportPrescription',
    }),

    tableActions() {
      return [
        { label: 'Dispense', event: 'view', show: this.$isCurrentWorkspace('PHARM') },
        // { label: 'Print prescription', event: 'print', show: true },
      ]
    },

    async printPrescription(drug){
      try {
        this.printLoading = true
        await this.printing(drug.id)
        this.printLoading = false
      } catch (error) {
        this.printLoading = false
      }
    },

    searchPatients: debounce(function(search) {
      this.fetchPrescriptions({ search })
    }, 300, false),

    async fetchPrescriptions(params = {}) {
      if (this.patient) {
        params.patient = this.patient
      }
      params.date = this.prescription_date
      this.prescriptions.loading = true
      const response = await EncounterPrescriptionsApi.list(this.provider.id, params)

      const prescriptions = response.data
        .filter(el => {
          return el.encounter_medication_request.length > 0
        })
        .map(el => {
          el.patient_id = el.encounter_medication_request[0].patient
          el.encounter_medication_request = el.encounter_medication_request
            .map(drug => {
              drug.patient = new Patient(drug.patient_detail).getNormalizedView()
              return drug
            })
          el.patient = new Patient(el.encounter_medication_request[0].patient_detail).getNormalizedView()
          return el
        })
      this.prescriptions.loading = false
      this.prescriptions.data = prescriptions
    },

    getStatusVariant(status) {
      if (status === 'billable') {
        return 'primary'
      }

      if (status === 'completed') {
        return 'error'
      }

      return 'success'
    },
  },
}
</script>
