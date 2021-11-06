<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Corporate Employees ({{ filteredData.length }})</p>

        <SeButton
          class="mx-2"
          @click="$trigger('corporate-patient:add:open')"
        >
          Add new employee
          <Add class="ml-4 w-5 h-5" />
        </SeButton>
      </div>

      <Search
        v-model="search"
        placeholder="Search for patients"
      />

      <DataTable
        ref="table"
        :data="filteredData"
        :columns="columns"
        :pagination="pagination"
        :loading="loading"
        @pagination="actionOnPagination"
      >
        <template #default="{row}">
          <cv-data-table-cell>
            <InfoImageBlock :label="$utils.formatName(concatData(row, ['first_name', 'last_name']))" />
          </cv-data-table-cell>

          <cv-data-table-cell>
            <p>{{ row.mobile }}</p>
          </cv-data-table-cell>

          <cv-data-table-cell>
            <p>{{ row.email }}</p>
          </cv-data-table-cell>

          <cv-data-table-cell>
            <p>{{ row.occupational_role || '-' }}</p>
          </cv-data-table-cell>

          <cv-data-table-cell>
            <p>{{ row.maximum_dependents_allowed || 0 }}</p>
          </cv-data-table-cell>

          <cv-data-table-cell>
            <div
              class="flex items-center cursor-pointer"
              @click="addCurrent(row)"
            >
              View
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
    <AddCorporatePatient />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/data'
import AddCorporatePatient from '@/components/admin/modals/AddCorporatePatient'

export default {
  name: 'ClientEmployees',

  components: { AddCorporatePatient },

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      loading: false,
      columns: [
        'Employee',
        'Phone Number',
        'Email',
        'Occupational Role',
        'Max Dependants Allowed',
        'Action',
      ],
      searchTerms: ['last_name', 'first_name', 'occupational_role'],
      paginate: true,
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.corporate.corporate,
    }),
  },

  mounted() {
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'corporate/getCorporate',
      addToCurrent: 'corporate/addToCurrentDependent',
    }),

    async refresh() {
      this.loading = true
      let id = this.$route.params.id
      await this.getData( id )
      this.loading = false
    },

    addCurrent(client){
      this.$router.push({ name: 'Billing:Patient', params: { id: client.patientId }})
    },
  },

}
</script>
