<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Beneficiary ({{ filteredData.length }})</p>

        <SeButton
          class="mx-2"
          @click="$trigger('insurance-patient:add:open')"
        >
          Add new Beneficiary
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
            <InfoImageBlock :label="concatData(row, ['first_name', 'last_name']) | capitalize" />
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
            <div class="flex items-center cursor-pointer space-x-4">
              <TableActions
                :actions="tableActions(row)"
                :loading="loading"
                @view="addCurrent(row)"
                @suspend="suspendCurrent(row)"
              />
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
    <AddInsurancePatient />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/data'
import AddInsurancePatient from '@/components/admin/modals/AddInsurancePatient'

export default {
  name: 'InsuranceBenefactors',

  components: { AddInsurancePatient },

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
      suspendMember: 'clients/suspendMember',
    }),

    async refresh() {
      this.loading = true
      let id = this.$route.params.id
      await this.getData( id )
      this.loading = false
    },

    tableActions() {
      return [
        { label: 'View', event: 'view', show: true },
        { label: 'Suspend', event: 'suspend', show: true },
      ]
    },

    addCurrent(client){
      this.$router.push({ name: 'Billing:Patient', params: { id: client.patientId }})
    },

    async suspendCurrent(client){
      const id = this.$route.params.id
      this.loading = true
      try {
        let data = await this.suspendMember({
          id: client.uuid,
          cid: id,
          action: 'suspend',
        })
        this.$toast.open({
          message: data.message,
        })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },

}
</script>
