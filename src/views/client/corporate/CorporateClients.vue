<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Corporate Clients ({{ filteredData.length }})</p>
        <router-link
          :to="{name:'CompanyInformation'}"
          tag="cv-button"
          class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
          kind="primary"
        >
          Add new company
          <Add class="ml-4 w-5 h-5" />
        </router-link>
      </div>

      <Search
        v-model="search"
        placeholder="Search for Clients"
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
            <InfoImageBlock :label="row.company_name | capitalize" />
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.tin_number }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.admin_phoneno }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p class="lowercase">{{ row.admin_email }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <router-link
              tag="div"
              :to="{ name: 'ClientSummary', params: { id: row.main_branch_id } }"
              class="cursor-pointer"
            >
              View
            </router-link>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/data'
import Add from '@carbon/icons-vue/es/add/32'
export default {
  name: 'CorporateClients',

  components: { Add },

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      loading: false,
      columns: [
        'Company name',
        'TIN Number',
        'Mobile',
        'Email',
        'Action',
      ],
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.clients.clients,
    }),
  },

  mounted() {
    this.paginate = true
    this.searchTerms = ['company_name', 'tin_number', 'state']
    this.refreshData()
  },

  methods: {
    ...mapActions({
      getData: 'clients/getClients',
    }),
    async refreshData() {
      this.loading = true

      try {
        await this.getData({filters: { organization_type: 'PAY'}})
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },

}
</script>
