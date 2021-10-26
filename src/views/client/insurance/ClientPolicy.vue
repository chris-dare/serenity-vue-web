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
      <div class="flex items-center justify-between">
        <div>
          <p class="font-semibold">Care Policies</p>
        </div>
        <div>
          <p
            class="cursor-pointer"
            @click="$trigger('policy:add:open', {})"
          >
            Add new policy
          </p>
        </div>
      </div>
      <cv-skeleton-text
        v-if="loading"
        :paragraph="true"
        :line-count="3"
        width="100%"
        class="pt-8"
      />
      <div
        v-else
        class="pt-8"
      >
        <div
          v-for="(policy, index) in policies"
          :key="index"
          class="py-4"
        > 
          <h1 class="font-semibold">{{ policy.name }}</h1>
          <h3> Service categories: {{ policy.service_categoriese }} </h3>
        </div>
        <div
          v-if="policies.length === 0"
          class="flex items-center justify-center"
        >
          No policies available
        </div>
      </div>
    </div>

    <CreateNewPolicy />
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
import { mapGetters, mapActions } from 'vuex'
// import BillingCorporateSettlePayment from '@/components/billing/BillingCorporateSettlePayment'
import CreateNewPolicy from '@/components/insurance/NewPolicy'
import ClientAPI from '@/api/clients'

export default {
  name: 'ClientPolicy',

  components: { CreateNewPolicy },

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
      policies: [],
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
        this.getClientPolicies()
      },
    },
  },

  methods: {
    ...mapActions({
      getClientPolicies: 'clients/getClientPolicies',
    }),

    actionOnPagination(ev) {
      this.filters = { page: ev.page, page_size: ev.length }
      this.getClientPolicies()
    },

    async getClientPolicies() {
      try {
        this.loading = true
        const { data } = await ClientAPI.getClientPolicies(this.id)
        this.policies = data
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
        this.$trigger('deposit:add:open', {
          ...this.client,
          ...this.clientAccount,
        })
        break
      case 'benefactor':
        this.$router.push({
          name: 'InsuranceBenefactors',
          params: { id: this.client.company.main_branch_id },
        })
        break

      default:
        break
      }
    },
  },
}
</script>
