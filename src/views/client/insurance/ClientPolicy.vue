<template>
  <div class="space-y-4">
    <!-- <div class="flex justify-end">
      <DatePicker
        v-model="filters.date"
        type="range"
        class="w-40"
      />
    </div> -->

    <div class="bg-white px-4 py-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="font-semibold">Care Policies</p>
        </div>
        <div>
          <p
            class="cursor-pointer flex"
            style="font-size: 14px; color: #0B6B74 !important;"
            @click="$trigger('policy:add:open', {})"
          >
            <img
              src="@/assets/img/add--filled 2.svg"
              width="20"
              class="cursor-pointer mr-1"
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
        v-show="!loading && policies"
        class="pt-8"
      >
        <div
          v-for="(policy, index) in policies"
          :key="index"
        >
          <div
            class="grid grid-cols-7 gap-4"
          >
            <div class="flex items-center col-span-6">
              <div class="space-y-1">
                <h1 class="font-semibold">{{ policy.name }}</h1>
                <p class="text-secondary text-sm flex">
                  Service(s):
                  <span class="text-primary px-4"><ol
                    v-for="(list, ind) in listService(policy.service_categories)"
                    :key="ind"
                  > <li>-  {{ list }}</li></ol></span>
                </p>
              </div>
            </div>
            <div>
              <div            
                class="bg-serenity-light-gray w-10 h-10 rounded-full ml-8 flex items-center justify-center"
                @click="editPolicy(policy)"
              >
                <img
                  src="@/assets/img/edit 1.svg"
                  class="w-4 h-4 cursor-pointer"
                >
              </div>
            </div>
          </div>
          <hr
            v-if="index < policies.length - 1"
            class="my-4"
          >
        </div>
      </div>
      <div
        v-if="policies.length === 0 && !loading"
        class="flex items-center justify-center"
      >
        No policies available
      </div>
    </div>

    <CreateNewPolicy @done="getPolicies" />
    <CreatePolicyExclusions />
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
import CreatePolicyExclusions from '@/components/insurance/PolicyExclusions'

export default {
  name: 'ClientPolicy',

  components: { CreateNewPolicy, CreatePolicyExclusions },

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
      policies: [
        {
          uuid: 'some-unique-uuid',
          name: 'Medicaid',
          service_categories: [
            ' consultation', 'medication', 'hospitalization', 
          ],  
          exclusions:{
            medications: [],
            specialties: [],
            diagnostics: [],
            procedures: [],
          },
        }  ,{
          uuid: 'some-unique-uuid',
          name: 'Medicaid',
          service_categories: [
            ' consultation',  'hospitalization', 
          ],  
          exclusions:{
            medications: [],
            specialties: [],
            diagnostics: [],
            procedures: [],
          },
        },  
      ],
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
        this.getPolicies()
      },
    },
  },

  methods: {
    ...mapActions({
      getClientPolicies: 'clients/getClientPolicies',
    }),

    listService(list){
      return list.map(element => {
        if (element.code) {
          return element.code
        } else {
          return element
        }
      })
    },

    actionOnPagination(ev) {
      this.filters = { page: ev.page, page_size: ev.length }
      this.getPolicies()
    },

    async getPolicies() {
      let id = this.$route.params.id
      try {
        this.loading = true
        const { data } = await this.getClientPolicies(id)
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
    editPolicy(policy){
      let obj = policy
      obj.service_categories = policy.service_categories.map(ele => { if(!ele.code){return { code: ele}} else {return ele}})
      this.$trigger('policy:edit:open', { ...obj })
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
