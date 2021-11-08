<template>
  <div class="space-y-4">
    <Search
      v-model="filter"
      placeholder="Search for admission"
    />

    <div class="flex items-center justify-between">
      <FilterGroup
        v-model="selected"
        :filters="filterOptions"
      />

      <DatePicker
        v-model="filters.date"
        type="range"
      />
    </div>

    <DataTable
      :columns="columns"
      :data="normalizedData"
      :loading="loading"
      no-data-label="You have no admissions"
      :pagination="pagination"
      @pagination="storePagination"
    >
      <template #default="{row}">
        <cv-data-table-cell>
          <div class="py-2">
            <InfoImageBlock
              :label="concatData(row.patient_detail, ['first_name', 'lastname']) | capitalize"
              :description="row.patient_detail.mobile"
            />
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.arrived_at, 'dd MMM, yyyy') }}</p>
            <p class="text-secondary text-xs">{{ $date.formatDate(row.arrived_at, 'HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.ward }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.type }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <Tag>{{ row.mobile }}</Tag>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div class="flex items-center cursor-pointer space-x-4">
            <TableActions
              :actions="tableActions(row)"
              @end="end(row.id)"
              @vitals="$trigger('reception:capture:vitals:open', { patient: row.patient, admission: row.id })"
              @view="view(row)"
            />
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataMixin from '@/mixins/data'
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  name: 'AdmissionsTable',

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },

    route: {
      type: String,
      default: 'PatientSummary',
    },
  },

  data() {
    return {
      columns: [
        'Patient',
        'Date',
        'Ward',
        'Type',
        'Mobile',
        'Action',
      ],
      selected: 'all',
      searchTerms: ['status'],
      filter: '',
      filters: {
        date: {},
      },
    }
  },

  computed: {
    ...mapState({
      admissions: (state) => state.admissions.admissions,
      admissionsTotal: (state) => state.admissions.admissionsTotal,
      practitionerAdmissions: (state) => state.admissions.practitionerAdmissions,
      practitionerAdmissionsTotal: (state) => state.admissions.practitionerAdmissionsTotal,
      provider: (state) => state.auth.provider,
      encounterClasses: (state) => state.resources.encounterClasses,
    }),

    data() {
      return this.selected === 'all' ? this.$date.sortByDate(this.admissions, 'arrived_at', 'desc') : this.$date.sortByDate(this.practitionerAdmissions, 'arrived_at', 'desc')
    },

    total() {
      return this.selected === 'all' ? this.admissionsTotal : this.practitionerAdmissionsTotal
    },

    filterOptions() {
      return [
        { display: `Assigned to me (${ this.admissionsTotal })`, code: 'my' },
        { display: ` All (${ this.practitionerAdmissionsTotal })`, code: 'all' },
      ]
    },
  },

  watch: {
    filter(search) {
      this.searchAdmissions(search)
    },
  },

  beforeMount() {
    if (this.hideSearch) {
      this.pageSizes = [5, 10, 15]
      this.pageLength = 5
    }
    this.paginate = true
    this.getEncounterClasses()
    // this.refresh()
  },

  methods: {
    ...mapActions({
    //   getData: 'admissions/getAdmissions',
      getEncounterClasses: 'resources/getEncounterClasses',
      deleteAdmission: 'admissions/deleteAdmission',
    //   setCurrentAdmission: 'admissions/setCurrentAdmission',
    //   getAllAdmissions: 'admissions/getAllAdmissions',
    //   getMyAdmissions: 'admissions/getMyAdmissions',
    }),

    getData() {},

    searchAdmissions: debounce(function(search) {
      this.getData({ search })
    }, 300, false),

    tableActions(row) {
      return [
        { label: 'view', event: 'view', show: true },
        { label: 'end', event: 'end', show: row.status !== 'finished' },
        { label: 'capture vitals', event: 'vitals', show: row.status !== 'finished' && this.$userCan('vitals.write') },
      ]
    },

    getEncounterClassDisplayName(code) {
      return this.encounterClasses.find(enc => enc.code === code)?.display
    },

    view(row) {
      this.setCurrentAdmission(row)
      this.$router.push({name: this.route, params: { id: row.patient }})
    },

    async storePagination(ev) {
      this.pageStart = ev.start
      this.pageLength = ev.length
      this.page = ev.page

      this.loading = true

      if (this.selected === 'all') {
        await this.getAllAdmissions({ page: this.page, page_size: ev.length })
        this.loading = false
        return
      }

      await this.getMyAdmissions({ page: this.page, page_size: ev.length })
      this.loading = false
    },

    async end(id) {
      this.$trigger('actions-modal:open', {
        confirmButtonText: 'End',
        type: 'delete',
        confirmButtonVariant: 'danger',
        label: 'Are you sure you want to end this admission?',
        callback: async () => {
          try {
            this.loading = true
            await this.deleteAdmission(id)
            this.$toast.open({ message: 'The admission has ended' })
            this.loading = false
          } catch (error) {
            this.loading = false
          }
        },
      })
    },
  },
}
</script>
