<template>
  <div class="space-y-4">
    <div class="flex justify-end">
      <DatePicker
        v-model="filters.date"
        type="range"
        class="w-40"
      />
    </div>

    <div class="bg-white px-4 py-6">
      <div
        class="flex  items-center justify-between"
      >
        <div>
          <p class="font-semibold">Care Policies</p>
        </div>
        <div>
          <p>Add new policy</p>
        </div>
      </div>
      <div class="flex items-center justify-center my-8"> <p>No policies available</p></div>
    </div>
 
    <!-- <BillingCorporateSettlePayment />
    <p class="text-serenity-primary my-6 font-semibold">What would you like to do?</p>
    <div class="grid grid-cols-4 gap-2 lg:gap-4 my-4">
      <DashboardCard
        v-for="(list, index) in overviewTypes"
        :key="index"
        :details="list"
        :type="list.type"
        custom-class="bg-white border-0"
        @click="change(list)"
      />
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import BillingCorporateSettlePayment from '@/components/billing/BillingCorporateSettlePayment'
import ClientAPI from '@/api/clients'

export default {
  name: 'ClientPolicy',


  // components: { BillingCorporateSettlePayment },

  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },

  data() {
    return {
      filters: {},
      columns: [
        'Date',
        'Bill ID',
        'Service Provider',
        'Price',
        'Practitioner',
        'Status',
        'Action',
      ],
      loading: false,
      bills: [],
      meta: {
        total: 0,
      },
    }
  },

  computed: {
    ...mapGetters({
      noDataLabel: 'clients/getCurrentClientNoDataLabel',
    }),
    overviewTypes() {
      const types = [
        {
          label: 'Add a policy',
          type: 'Add',
          description: 'Make records of a deposit made to the account',
          action: 'add',
        },
      ]

      return types
    },
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getClientBills()
      },
    },
  },

  methods: {
    actionOnPagination(ev) {
      this.filters = { page: ev.page, page_size: ev.length }
      this.getClientBills()
    },

    async getClientBills() {
      try {
        this.loading = true
        const { data } = await ClientAPI.getClientBills(this.$providerId, this.id, this.filters)
        this.bills = data.results
        this.meta = data.meta
        this.loading = false
      } catch (error) {
        this.loading = false
      }
      this.loading = false
    },

    settle(bill) {
      this.$trigger('corporate:settle:open', bill)
    },
    change(client) {
      this.menu = client.type

      switch (client.action) {
      case 'add':
        this.$trigger('deposit:add:open', { ...this.client, ...this.clientAccount })
        break
      case 'benefactor':
        this.$router.push({ name: 'InsuranceBenefactors', params: { id: this.client.company.main_branch_id }})
        break

      default:
        break
      }
    },
  },
}
</script>
