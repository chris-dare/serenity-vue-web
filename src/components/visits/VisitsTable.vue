<template>
  <div class="space-y-4">
    <Search
      v-model="filter"
      placeholder="Search for visit"
    />

    <div class="flex justify-between">
      <FilterGroup
        v-model="selected"
        :filters="filters"
      />

      <!-- <DatePicker
        v-model="date"
        type="range"
        class="w-60"
        @change="refresh"
      /> -->
    </div>

    <DataTable
      :columns="columns"
      :data="data"
      :loading="loading"
      no-data-label="You have no visits"
      :pagination="pagination"
      @pagination="storePagination"
    >
      <template #default="{row}">
        <cv-data-table-cell>
          <div class="py-2">
            <InfoImageBlock
              :label="concatData(row.patient_detail, ['first_name', 'lastname']) | capitalize"
              :description="getPatientDetail(row.patient_detail)"
              :url="row.patient_detail.photo"
            />
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.assigned_to_name | capitalize }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.next_encounter_due, 'dd MMM, yyyy') }}</p>
            <p class="text-secondary text-xs">{{ $date.formatDate(row.next_encounter_due, 'HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ getEncounterClassDisplayName(row.visit_class) }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <Tag>{{ row.status }}</Tag>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div class="flex items-center cursor-pointer space-x-4">
            <TableActions
              :actions="tableActions(row)"
              :data-cy="`table-actions-${row.id}`"
              @end="end(row.id)"
              @vitals="$trigger('reception:capture:vitals:open', { patient: row.patient, visit: row.id, encounters: row.upcoming_encounters })"
              @view="view(row)"
            />
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>

    <CaptureVitalsModal />
  </div>
</template>

<script>
import DataMixin from '@/mixins/data'
import { mapActions, mapState } from 'vuex'
import CaptureVitalsModal from '@/components/vitals/CaptureVitalsModal'
import debounce from 'lodash/debounce'

export default {
  name: 'VisitsTable',

  components: { CaptureVitalsModal },

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
        'Assigned to',
        'Encounter due in',
        'Type',
        'Status',
        'Action',
      ],
      selected: 'all',
      searchTerms: ['status'],
      filter: '',
    }
  },

  computed: {
    ...mapState({
      visits: (state) => state.visits.visits,
      visitsTotal: (state) => state.visits.visitsTotal,
      practitionerVisits: (state) => state.visits.practitionerVisits,
      practitionerVisitsTotal: (state) => state.visits.practitionerVisitsTotal,
      provider: (state) => state.auth.provider,
      encounterClasses: (state) => state.resources.encounterClasses,
    }),

    data() {
      return this.selected === 'all' ? this.$date.sortByDate(this.visits, 'arrived_at', 'desc') : this.$date.sortByDate(this.practitionerVisits, 'arrived_at', 'desc')
    },

    total() {
      return this.selected === 'all' ? this.visitsTotal : this.practitionerVisitsTotal
    },

    filters() {
      return [
        { display: `All Visits (${ this.visitsTotal })`, code: 'all' },
        { display: ` My Visits (${ this.practitionerVisitsTotal })`, code: 'my' },
      ]
    },
  },

  watch: {
    filter(search) {
      this.searchVisits(search)
    },

    selected() {
      this.pageLength = this.data.length
      this.page = 1
    },
  },

  beforeMount() {
    if (this.hideSearch) {
      this.pageSizes = [5, 10, 15]
      this.pageLength = 5
    }
    this.paginate = true
    this.selected = this.$isCurrentWorkspace('OPD') ? 'my' : 'all'
    this.getEncounterClasses()
    this.getData({ page_size: localStorage.getItem('pageSize') || 5, page: 1, ...this.params })
  },

  methods: {
    ...mapActions({
      getData: 'visits/getVisits',
      deleteVisit: 'visits/deleteVisit',
      setCurrentVisit: 'visits/setCurrentVisit',
      getAllVisits: 'visits/getAllVisits',
      getMyVisits: 'visits/getMyVisits',
      getEncounterClasses: 'resources/getEncounterClasses',
    }),

    searchVisits: debounce(function(search) {
      this.getData({ search, ...this.params })
    }, 300, false),

    refresh: debounce(function() {
      this.getData({ ...this.params })
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
      this.setCurrentVisit(row)
      this.$router.push({name: this.route, params: { id: row.patient }, query: { visit: row.id }})
    },

    async storePagination(ev) {
      this.pageStart = ev.start || 1
      this.pageLength = ev.length
      this.page = ev.page

      this.loading = true

      if (this.selected === 'all') {
        await this.getAllVisits({ page: this.page, page_size: ev.length })
        this.loading = false
        return
      }

      await this.getMyVisits({ page: this.page, page_size: ev.length })
      this.loading = false
    },

    async end(id) {
      this.$trigger('actions-modal:open', {
        confirmButtonText: 'End',
        type: 'delete',
        confirmButtonVariant: 'danger',
        label: 'Are you sure you want to end this visit?',
        callback: async () => {
          try {
            this.loading = true
            await this.deleteVisit(id)
            this.$toast.open({ message: 'The visit has ended' })
            this.loading = false
          } catch (error) {
            this.loading = false
          }
        },
      })
    },

    getPatientDetail(detail) {
      let age = detail.age ? `, ${detail.age} years` : ''
      return `${detail.mobile}${age}`
    },
  },
}
</script>
