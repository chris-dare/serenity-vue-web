<template>
  <div class="w-4/5 mx-auto space-y-4">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center space-x-2 py-2">
          <Avatar name="Pope Jones" />
          <div>
            <p class="font-semibold text-lg">Pope Jones</p>
            <p class="text-secondary text-sm">Male, 22 years</p>
            <p class="text-sm">MR No: 230</p>
          </div>
        </div>
        <div
          v-if="selectedClient && selectedClient.company.state === 'verified'"
          class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
        >
          <img
            src="@/assets/img/edit 1.svg"
            class="w-4 h-4 cursor-pointer"
          >
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <SeButton
          class="mx-2"
        >
          More Action
        </SeButton>
      </div>
    </div>
    <div class="bg-white px-4 py-6">
      <p class="text-secondary text-md">Dependants</p>

      <div class=" grid grid-cols-5 divide-x divide-gray-100 divide-solid">
        <div
          class="flex flex-col justify-center h-24"
        >
          <div class="flex items-center space-x-2 py-2">
            <Avatar name="Papa Dadson" />
            <div>
              <p>Papa Dadze</p>
              <p class="text-secondary text-sm">Male, 22 years</p>
              <p class="text-secondary text-sm">Father</p>
            </div>
          </div>
        </div>
        <div
          class="flex items-center space-x-2 py-2 cursor-pointer"
          @click="$trigger('dependant:add:open', {...client})"
        >
          <Avatar name="+" />
          <div>
            <p class="text-sm">Add new dependant</p>
          </div>
        </div>
      </div>
    </div>
   
    <div class="bg-white">
      <p class="p-4 text-md">Payment History</p>

      <DataTable
        ref="table"
        :columns="columns"
        :loading="loading"
        :pagination="{
          numberOfItems: 5,
          pageSizes: [5, 10, 15, 20, 25]
        }"
        :data="bills && bills" 
      >
        <template #default="{row}">
          <cv-data-table-cell>
            <div>
              Dadson Papa
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              {{ row.transactionData.id }}
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            {{ $date.formatDate(row.transactionData.created_at, 'yyyy/MM/dd') }}
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.transactionData.amount }}</p>
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
    <EditClient />
    <AddDependant />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Add from '@carbon/icons-vue/es/add/32'
import EditClient from '@/components/admin/modals/EditClient'
import AddDependant from '@/components/admin/modals/AddDependant'
// import PatientSummaryCard from '@/components/patients/PatientSummaryCard'
export default {
  name: 'ClientDetail',

  components: { EditClient, AddDependant },

  data() {
    return {
      loading: false,
      add: Add,
      date1: '',
      date2: '',
      bills: [],
      clientAccount: [],
      selected: 'about',
      links: [
        { label: 'About', value: 'about' },
        { label: 'Bills', path: 'bills' },
      ],
      form: {},
      menu: 'client',
      selectedClient: {},
      columns: [
        'Benefactor name',
        'MR number',
        'Date',
        'Amount',
      ],
    }
  },

  computed: {
    ...mapState({
      client: (state) => state.clients.client,
      storeData: (state) => state.clients.form,
    }),
    companyFields() {
      return [
        { label: 'State', value: this.selectedClient && this.selectedClient.state },
        { label: 'Authorized By', value: this.selectedClient && this.selectedClient.authorizedBy },
        { label: 'Address', value: this.selectedClient && this.selectedClient.company.address },
        // { label: 'Email', value: this.'aha' },
      ]
    },
    
    adminFields() {
      return [
        { label: 'First Name', value: this.selectedClient && this.selectedClient.company.admin_first_name },
        { label: 'Last Name', value: this.selectedClient && this.selectedClient.company.admin_last_name },
        { label: 'Phone Number', value: this.selectedClient && this.selectedClient.company.admin_phoneno },
        { label: 'Admin Email', value: this.selectedClient && this.selectedClient.company.admin_email },
      ]
    },

    overviewTypes() {
      const types = [
        {
          label: 'Recode a deposit',
          type: 'Add',
          description: 'Make records of a deposit made to the account',
          action: 'client',
        },
        {
          label: 'Benefactors',
          type: 'User',
          description: 'View, add or delete a benefactor',
          action: 'benefactor',
        },
      ]

      return types
    },
  },

  // beforeRouteEnter (to, from, next) {
  //   next(async vm => {
  //     vm.loading = true
  //     vm.loading = false
  //   })
  // },

  created(){
    this.selectedClient = this.client
    this.loadClientAccount()
    this.loadClientBills()
  },

  methods: {
    ...mapActions({
      getClient: 'clients/getClientBy',
      getClientAccount: 'clients/getClientAccount',
      getClientBills: 'clients/getClientBills',
      addToStoreData: 'clients/addToCurrentUser',
    }),
    change(client) {
      this.menu = client.type

      if (client.action === 'client') {
        this.$trigger('deposit:add:open', {...this.client})
      }
      if (client.action === 'benefactor') {
        this.$trigger('workspace:add:open')
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    async refresh() {
      this.loading = true
      await this.loadClientAccount()
      this.loading = false
    },
    editClient(){
      this.addToStoreData(this.selectedClient.company)
      this.$router.push({name:'RegisterProvider', params: {id: this.selectedClient.company.main_branch_id}})
    },
    async loadClientAccount() {
      let id = this.$route.params.id
      await this.getClientAccount( id )
        .then( data => {
          this.selectedClient = data.returnedData
        })
        .catch(() => {
          // this.goBack()
        })
    },
    async loadClientBills() {
      this.loading = true
      let id = this.$route.params.id
      await this.getClientBills( id )
        .then( data => {
          this.bills = data.returnedData
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
      this.loading = false
    },
    loadClient() {
      let id = this.$route.params.id
      this.getClient( id )
        .then(({data}) => {
          this.selectedClient = data.returnedData
        })
        .catch(() => {
          // this.goBack()
          this.$router.go(-1)
        })
    },
  },

}
</script>