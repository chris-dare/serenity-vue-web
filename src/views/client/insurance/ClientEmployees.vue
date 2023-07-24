<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Beneficiaries ({{ dataCount }})</p>

        <SeButton
          class="mx-2"
          @click="$trigger('insurance-patient:add:open')"
        >
          Add new Beneficiary
          <Add class="ml-4 w-5 h-5" />
        </SeButton>
      </div>

      <Search
        v-model="params.search"
        placeholder="Search for patients"
        @input="searchData"
      />

      <DataTable
        ref="table"
        :data="data"
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
            <p>{{ row.is_active ? 'Active' : 'Suspended' }}</p>
          </cv-data-table-cell>

          <cv-data-table-cell>
            <div class="flex items-center cursor-pointer space-x-4">
              <TableActions
                :actions="tableActions(row)"
                :loading="isloading"
                @view="addCurrent(row)"
                @suspend="suspendCurrent(row)"
                @edit="edit(row)"
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
import DataMixin from '@/mixins/paginated'
import AddInsurancePatient from '@/components/admin/modals/AddInsurancePatient'

export default {
  name: 'InsuranceBenefactors',

  components: { AddInsurancePatient },

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      loading: false,
      isloading: false,
      columns: [
        'Employee',
        'Phone Number',
        'Email',
        'Occupational Role',
        'Max Dependants Allowed',
        'Status',
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
    this.getInsuranceClients({filters: { organization_type: 'INS'}})
  },

  methods: {
    ...mapActions({
      getBeneficiaries: 'corporate/getBeneficiaries',
      addToCurrent: 'corporate/addToCurrentDependent',
      suspendMember: 'clients/suspendMember',
      getInsuranceClients: 'clients/getClients',
    }),

    async getData(params) {
      let id = this.$route.params.id
      await this.getBeneficiaries({ clientId: id, params })
    },

    tableActions(row) {
      return [
        { label: 'View', event: 'view', show: true },
        { label: 'Edit', event: 'edit', show: true },
        { label: row.is_active ? 'Suspend' : 'Activate', event: 'suspend', show: true },
      ]
    },

    edit(row) {
      this.$trigger('insurance-patient:edit:open', {...row})
    },

    addCurrent(client){
      this.$router.push({ name: 'Billing:Patient', params: { id: client.patient }})
    },

    async suspendCurrent(client){
      const id = this.$route.params.id
      this.isloading = true
      try {
        let data = await this.suspendMember({
          id: client.uuid,
          cid: id,
          action: client.is_active ? 'SUSPEND' : 'ACTIVATE',
        })
        this.$toast.open({
          message: data.message,
        })
        this.getData( id )
        this.isloading = false
      } catch (error) {
        this.isloading = false
      }
    },
  },

}
</script>
