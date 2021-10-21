<template>
  <AppStatePage
    :loading="loading"
    :error="error"
    class="max-w-7xl mx-auto"
  >
    <div class="space-y-4">
      <InsuranceDetailSummary
        :client="{...client, ...clientAccount}"
        @edit="editClient"
        @update="$trigger('client:add:open', {...client } )"
        @verify="$trigger('client:edit:open', { ...client, ...clientAccount })"
        @clientaccount="createAccount"
      />

      <div class="bg-white px-4 py-6 grid grid-cols-3 divide-x divide-gray-100 divide-solid">
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
// import BillingAPI from '@/api/billing'
import EditClient from '@/components/admin/modals/EditClient'
import ClientDeposit from '@/components/admin/modals/ClientDeposit'
import DetailPageNav from '@/components/patients/DetailPageNav'
import InsuranceDetailSummary from '@/components/insurance/InsuranceDetailSummary'

export default {
  name: 'ClientDetail',

  components: { EditClient, ClientDeposit, DetailPageNav, InsuranceDetailSummary },

  data() {
    return {
      loading: false,
      error: false,
      add: Add,
      filters: {
        date: null,
      },
      bills: [],
      selected: 'about',
      links: [
        { label: 'About', path: 'InsuranceSummary' },
        { label: 'Bills', path: 'InsuranceBills' },
        { label: 'Transactions', path: 'InsuranceTransactions' },
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
      clientAccount: (state) => state.clients.clientAccount,
      storeData: (state) => state.clients.form,
      provider: (state) => state.auth.provider,
    }),

    summaryFields() {
      if (this.clientAccount) {
        return [
          { label: 'Account type', value: this.clientAccount.account_type },
          { label: 'Current Balance', value: this.$currency(this.clientAccount.balance).format() },
          { label: 'Credit start data', value: this.$date.formatDate(this.clientAccount.service_period_start, 'dd MMM, yyyy') },
        ]
      } else {
        return [
          { label: 'Account type', value: '' },
          { label: 'Current Balance', value: this.$currency(0).format() },
          { label: 'Credit start data', value: this.$date.formatDate('', 'dd MMM, yyyy') },
        ]
      }
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
      providerClient: 'clients/providerAccount',
    }),

    async init() {
      this.loading = true
      const id = this.$route.params.id
      this.getClient(id)
      this.getClientAccount(id)
      console.log(this.client)
      // const { data } = await BillingAPI.pendingBillsTotal(this.provider.id, id)
      this.totalPendingBill = 0
    },

    editClient() {
      this.addToStoreData({...this.client.company, ...this.clientAccount})
      this.$router.push({ name: 'CompanyInformation', query: { id: this.client.company.main_branch_id } })
    },

    async createAccount(){
      this.loading = true
      const id = this.$route.params.id
      await this.providerClient({owner: id})
      this.getClientAccount(id)
      this.loading = false
    },
  },


}
</script>
