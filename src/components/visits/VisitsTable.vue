<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="search"
      placeholder="Search for visit"
    />

    <cv-radio-group>
      <cv-radio-button
        v-model="selected"
        name="group-1"
        label="All visits" 
        value="all"
      />
      <cv-radio-button
        v-model="selected"
        name="group-1"
        label="My visits" 
        value="my"
      />
    </cv-radio-group>

    <DataTable
      :columns="columns"
      :data="filteredData"
      :loading="loading"
      no-data-label="You have no visits"
      :pagination="pagination"
      @pagination="actionOnPagination"
    >
      <template #default="{row}">
        <cv-data-table-cell>
          <div class="py-2">
            <InfoImageBlock
              :label="concatData(row.patient_detail, ['first_name', 'lastname'])"
              :description="row.patient_detail.mobile"
            />
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.arrived_at, 'yyyy/MM/dd') }}</p>
            <p class="text-secondary text-xs">{{ $date.formatDate(row.arrived_at, 'HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.visit_class | capitalize }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <Tag>{{ row.status }}</Tag>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div class="flex items-center cursor-pointer space-x-4">
            <router-link
              class="flex items-center cursor-pointer space-x-2"
              :to="{ name: route, params: { id: row.patient }}"
            >
              View
            </router-link>
            <div
              class="flex items-center cursor-pointer space-x-2"
              @click="end(row.id)"
            >
              End
            </div>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataMixin from '@/mixins/data'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'VisitsTable',

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
        'Type',
        'Status',
        'Action',
      ],
      selectedAppointment: {},
      selected: 'all',
    }
  },

  computed: {
    ...mapState({
      visits: (state) => state.visits.visits,
      practitionerVisits: (state) => state.visits.practitionerVisits,
      provider: (state) => state.auth.provider,
    }),

    data() {
      return this.selected === 'all' ? this.$date.sortByDate(this.visits, 'arrived_at', 'desc') : this.$date.sortByDate(this.practitionerVisits, 'arrived_at', 'desc')
    },
  },

  beforeMount() {
    if (this.hideSearch) {
      this.pageSizes = [5, 10, 15]
      this.pageLength = 5
    }
    this.paginate = true
    this.searchTerms = ['']
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'visits/getVisits',
      deleteVisit: 'visits/deleteVisit',
    }),

    async end(id) {
      this.$trigger('confirm-action-modal:open', {
        label: 'this visit',
        type: 'end',
        callback: async ()=>{
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
  },
}
</script>
