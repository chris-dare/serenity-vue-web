<template>
  <div>
    <p class="text-serenity-primary my-6 font-semibold">
      What would you like to do?
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-6 my-4">
      <InfoLinkCard
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
    <p class="text-serenity-primary my-6 font-semibold">
      Bills / invoices
    </p>
    <h3>{{ $route.name }}</h3>

    <BillingTable />

    <BillingTopUpModal />
  </div>
</template>

<script>
import BillingTable from '@/components/billing/BillingTable'
import BillingTopUpModal from '@/components/billing/topup/BillingTopUpModal'
import { mapActions } from 'vuex'

export default {
  name: 'BillingDashboard',

  components: { BillingTable, BillingTopUpModal },

  computed: {
    dashboardTypes() {
      return [
        {
          label: 'Top Up Account',
          description: 'Deposit patient accounts',
          type: 'destination',
          value: 'topup',
          hide: !this.$userCan('bills.acceptcash.write'),
        },
        {
          label: 'Receive payment',
          description: 'Receive payments',
          type: 'destination',
          value: 'receive',
          hide: !this.$userCan('bills.acceptcash.write'),
        },
        {
          label: 'Clients',
          description: 'Top up client accounts',
          type: 'baggage',
          value: 'clients',
        },
        {
          label: 'Raise bill',
          description: 'Raise a new bill for patient',
          type: 'cash',
          value: 'create',
        },
        
      ]
    },
  },

  created() {
    this.getCurrencies()
  },

  methods: {
    ...mapActions({
      getCurrencies: 'resources/getCurrencies',
    }),

    change(dashboard) {
      this.selected = dashboard.value

      switch (dashboard.value) {
      case 'topup':
        this.$trigger('billing:topup:open')
        break
      case 'receive':
        this.$trigger('billing:receive:open')
        break
      case 'clients':
        this.$router.push({ name: 'CorporateClients' })
        break
      case 'create':
        this.$router.push({ name: 'BillingSelectPatient' })
        break

      default:
        break
      }

    },
  },
}
</script>
