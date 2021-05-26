<template>
  <div class="w-4/5 mx-auto space-y-4">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center">
          <div class="space-y-1">
            <p class="font-semibold">{{ selectedClient && selectedClient.companyName }}</p>
            <p class="text-secondary">
              Corporate Client
            </p>
            <div class="flex items-center">
              <p>Client TIN No: {{ selectedClient && selectedClient.company.tin_number }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <div 
          v-if="selectedClient && selectedClient.company.state === 'verified'"
          class="grid grid-cols-2 " 
        >
          <SeButton 
            class="mx-2"
            @click="$trigger('client:add:open', {...client})"
          >
            Raise claim
          </SeButton>
          <SeButton @click="editClient">
            Edit Client
          </SeButton>
        </div>
        <SeButton 
          v-else 
          @click="$trigger('client:edit:open', {...client.company})"
        >
          Verify Client
        </SeButton>
      </div>
    </div>
    <div class="bg-white px-4 py-6 grid grid-cols-5 divide-x divide-gray-100 divide-solid">
      <div
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ selectedClient && selectedClient.state }}</p>
        <p class="text-secondary text-sm">Account type</p>
      </div>
      <div
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ selectedClient && selectedClient.amount }}</p>
        <p class="text-secondary text-sm">Current Balance</p>
      </div>
      <div
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ selectedClient && selectedClient.creditDurationInDays || '-' }}</p>
        <p class="text-secondary text-sm">Credit duration</p>
      </div>
      <div
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ selectedClient && selectedClient.maximum_employees_allowed || '-' }}</p>
        <p class="text-secondary text-sm">Maximum employees allowed</p>
      </div>
      <div
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ selectedClient && $date.formatDate(client.creditStartDate, 'yyyy/MM/dd') }}</p>
        <p class="text-secondary text-sm">Credit start date</p>
      </div>
    </div>

    <div class="mt-2 bg-white flex">
      <div
        v-for="(link, index) in links"
        :key="index"
        class="relative cursor-pointer items-center justify-center flex border-b-2 py-4 border-serenity-primary-highlight w-16"
        @click="selected = link.value"
      >
        {{ link.label }}
        <div
          class="w-4/5 mx-auto h-0.5 absolute bg-serenity-light-gray bottom-0"
          :class="{ 'bg-serenity-primary-highlight': link.value === selected }"
        />
      </div>
    </div>

    <div
      v-if="selected === 'about'"
      class="grid grid-cols-2 gap-4"
    >
      <PatientSummaryCard
        title="General Information"
        :fields="companyFields"
      />
      <PatientSummaryCard
        title="Admin Information"
        :fields="adminFields"
      />
    </div>
    <div v-else>
      <div class="flex justify-end">
        <cv-date-picker
          v-model="date"
          class="flex-none se-date-picker"
          kind="range"
          :cal-options="{
            dateFormat: 'm/d/Y',
          }"
        />
      </div>
      <DataTable
        ref="table"
        :columns="columns"
        :loading="loading"
        :pagination="{
          numberOfItems: 5,
          pageSizes: [5, 10, 15, 20, 25]
        }"
        :data="bills" 
      >
        <template #default="{row}">
          <cv-data-table-cell>
            {{ $date.formatDate(row.transactionData.created_at, 'yyyy/MM/dd') }}
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              {{ row.transactionData.id }}
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.providerDetails.name }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.transactionData.amount }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.transactionData.createdBy }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.transactionData.status }}</p>
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
    <EditClient />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Add from '@carbon/icons-vue/es/add/32'
import EditClient from '@/components/admin/modals/EditClient'
import PatientSummaryCard from '@/components/patients/PatientSummaryCard'
export default {
  name: 'ClientDetail',

  components: { PatientSummaryCard, EditClient },

  data() {
    return {
      loading: false,
      add: Add,
      date: '',
      bills: [],
      clientAccount: [],
      selected: 'about',
      links: [
        { label: 'About', value: 'about' },
        { label: 'Bills', path: 'bills' },
      ],
      form: {},
      // client: '',
      selectedClient: {},
      columns: [
        'Date',
        'Bill ID',
        'Service Provider',
        'Price',
        'Practitioner',
        'Status',
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
        // { label: 'Email', value: this.$faker().lorem.word() },
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
      addToStoreClient: 'clients/addToCurrentClient',
    }),
    goBack() {
      this.$router.go(-1)
    },
    editClient(){
      this.addToStoreClient(this.selectedClient.company)
      this.$router.push({name:'CompanyInformation'})
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
      console.log('load', this.$route.params.id)
      this.getClient( id )
        .then(({data}) => {
          this.selectedClient = data.returnedData
        })
        .catch(() => {
          // this.goBack()
        })
    },
  },

}
</script>