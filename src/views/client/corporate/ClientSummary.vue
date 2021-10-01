<template>
  <div>
    <div
      class="grid grid-cols-2 gap-4"
    >
      <PatientSummaryCard
        title="General Information"
        :loading="loading"
        :fields="companyFields"
      />
      <PatientSummaryCard
        title="Admin Information"
        :loading="loading"
        :fields="adminFields"
      />
    </div>
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PatientSummaryCard from '@/components/patients/PatientSummaryCard'
export default {
  name: 'ClientSummary',

  components: {PatientSummaryCard},

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState({
      client: (state) => state.clients.client,
      clientAccount: (state) => state.clients.clientAccount,
    }),

    companyFields() {
      return [
        { label: 'State', value: this.clientAccount.status },
        { label: 'Authorized By', value: this.client.company.authorizedBy },
        { label: 'Address', value: this.client.company.address },
      ]
    },

    adminFields() {
      return [
        { label: 'First Name', value: this.client.company.admin_first_name },
        { label: 'Last Name', value: this.client.company.admin_last_name },
        { label: 'Phone Number', value: this.client.company.admin_phoneno },
        { label: 'Admin Email', value: this.client.company.admin_email },
      ]
    },

    overviewTypes() {
      const types = [
        {
          label: 'Record a deposit',
          type: 'Add',
          description: 'Make records of a deposit made to the account',
          action: 'client',
        },
        {
          label: 'Employees',
          type: 'User',
          description: 'View, add or delete an employee',
          action: 'benefactor',
        },
      ]

      return types
    },
  },

  methods: {
    change(client) {
      this.menu = client.type

      switch (client.action) {
      case 'client':
        this.$trigger('deposit:add:open', { ...this.client, ...this.clientAccount })
        break
      case 'benefactor':
        this.$router.push({ name: 'ClientEmployees', params: { id: this.client.company.main_branch_id }})
        break

      default:
        break
      }
    },
  },
}
</script>
