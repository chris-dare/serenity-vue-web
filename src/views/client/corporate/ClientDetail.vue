<template>
  <AppStatePage
    :loading="loading"
    :error="error"
    class="max-w-7xl mx-auto"
  >
    <div class="space-y-4">
      <CorporateDetailSummary
        :client="client"
        @edit="editClient"
        @update="$trigger('client:add:open', {...client } )"
        @verify="$trigger('client:edit:open', { ...client.company })"
      />

      <div class="bg-white px-4 py-6 grid grid-cols-5 divide-x divide-gray-100 divide-solid">
        <div
          v-for="(field, index) in summaryFields"
          :key="index"
          class="flex flex-col items-center justify-center h-24"
        >
          <p class="text-xl font-semibold text-center">{{ field.value || '-' }}</p>
          <p class="text-secondary text-sm text-center">{{ field.label }}</p>
        </div>
      </div>

      <DetailPageNav
        :links="links"
      />

      <router-view />
    </div>
    <EditClient />
    <ClientDeposit />
  </AppStatePage>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Add from '@carbon/icons-vue/es/add/32'
import BillingAPI from '@/api/billing'
import EditClient from '@/components/admin/modals/EditClient'
import ClientDeposit from '@/components/admin/modals/ClientDeposit'
import DetailPageNav from '@/components/patients/DetailPageNav'
import CorporateDetailSummary from '@/components/corporate/CorporateDetailSummary'

export default {
  name: 'ClientDetail',

  components: { EditClient, ClientDeposit, DetailPageNav, CorporateDetailSummary },

  data() {
    return {
      loading: false,
      error: false,
      add: Add,
      filters: {
        date: null,
      },
      bills: [],
      clientAccount: [],
      selected: 'about',
      links: [
        { label: 'About', path: 'ClientSummary' },
        { label: 'Bills', path: 'ClientBills' },
        { label: 'Transactions', path: 'ClientTransactions' },
      ],
      form: {},
      menu: 'client',
      selectedClient: {
        company: {},
      },
      totalPendingBill: null,
    }
  },

  computed: {
    ...mapState({
      client: (state) => state.clients.client,
      storeData: (state) => state.clients.form,
      provider: (state) => state.auth.provider,
    }),

    summaryFields() {
      return [
        { label: 'Account type', value: this.client.state },
        { label: 'Current Balance', value: this.$currency(this.client.amount).format() },
        { label: 'Credit duration', value: this.client.creditDurationInDays },
        { label: 'Maximum employees allowed', value: this.client.maximum_employees_allowed },
        { label: 'Credit start data', value: this.$date.formatDate(this.client.creditStartDate, 'dd MMM, yyyy') },
      ]
    },
  },

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      try {
        await vm.init()
        vm.loading = false
      } catch (error) {
        vm.error = error.detail || 'Error loading page. Please check your internet connection and try again.'
        vm.loading = false
      }
    })
  },

  methods: {
    ...mapActions({
      getClient: 'clients/getClientBy',
      getClientAccount: 'clients/getClientAccount',
      addToStoreData: 'clients/addToCurrentUser',
    }),

    async init() {
      this.loading = true
      const id = this.$route.params.id
      this.getClient(id)
      this.getClientAccount(id)
      const { data } = await BillingAPI.pendingBillsTotal(this.provider.id, id)
      this.totalPendingBill = data.returnedData.total_bill
    },

    editClient() {
      this.addToStoreData(this.client.company)
      this.$router.push({ name: 'CompanyInformation', query: { id: this.client.company.main_branch_id } })
    },
  },

}
</script>
