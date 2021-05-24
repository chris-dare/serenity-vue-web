<template>
  <div class="w-4/5 mx-auto space-y-4">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center">
          <div class="space-y-1">
            <p class="font-semibold">{{ client && client.companyName }}</p>
            <p class="text-secondary">
              Corporate Client
            </p>
            <div class="flex items-center">
              <p>Client TIN No: {{ client && client.company.tin_number }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <div v-if="client && client.company.state != 'verified'">
          <!-- <SeButton>
            Raise claim
          </SeButton> -->
          <SeButton @click="editClient">
            Edit Client
          </SeButton>
        </div>
        <SeButton 
          v-else 
          @click="$trigger('client:add:open')"
        >
          Verify Client
        </SeButton>
      </div>
    </div>
    <div class="bg-white px-4 py-6 grid grid-cols-5 divide-x divide-gray-100 divide-solid">
      <div
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ client && client.state }}</p>
        <p class="text-secondary text-sm">Account type</p>
      </div>
      <div
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ client && client.amount }}</p>
        <p class="text-secondary text-sm">Current Balance</p>
      </div>
      <div
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ client && client.creditDurationInDays || '-' }}</p>
        <p class="text-secondary text-sm">Credit duration</p>
      </div>
      <div
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ client && client.maximum_employees_allowed || '-' }}</p>
        <p class="text-secondary text-sm">Maximum employees allowed</p>
      </div>
      <div
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ client && $date.formatDate(client.creditStartDate, 'yyyy/MM/dd') }}</p>
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
        :fields="generalFields"
      />
      <PatientSummaryCard
        title="Admin Information"
        :fields="emergencyFields"
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
      <cv-data-table
        :columns="columns"
        :pagination="{
          numberOfItems: 5,
          pageSizes: [5, 10, 15, 20, 25]
        }"
        :data="[]"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in 5"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              {{ $date.formatDate($faker().date.recent(), 'yyyy/MM/dd') }}
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                {{ Math.random() }}
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>Specialist Appointment</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>Virtual</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $faker().phone.phoneNumber() }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $faker().phone.phoneNumber() }}</p>
              </div>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
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
      clientAccount: [],
      selected: 'about',
      links: [
        { label: 'About', value: 'about' },
        { label: 'Bills', path: 'bills' },
      ],
      columns: [
        'Date',
        'Bill ID',
        'Service',
        'Price',
        'Practitioner',
        'Payment Method',
      ],
    }
  },

  computed: {
    ...mapState({
      client: (state) => state.clients.client,
    }),
    generalFields() {
      return [
        { label: 'State', value: this.client.state },
        { label: 'Authorized By', value: this.client.authorizedBy },
        { label: 'Address', value: this.client.company.address },
        // { label: 'Email', value: this.$faker().lorem.word() },
      ]
    },
    
    emergencyFields() {
      return [
        { label: 'First Name', value: this.client.company.admin_first_name },
        { label: 'Last Name', value: this.client.company.admin_last_name },
        { label: 'Phone Number', value: this.client.company.admin_phoneno },
        { label: 'Admin Email', value: this.client.company.admin_email },
      ]
    },
  },

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.loading = true
      await vm.loadClientAccount()
      vm.loading = false
    })
  },

  methods: {
    ...mapActions({
      getClient: 'clients/getClientBy',
      getClientAccount: 'clients/getClientAccount',
      addToStoreData: 'clients/addToCurrentUser',
    }),
    goBack() {
      this.$router.go(-1)
    },
    editClient(){
      this.addToStoreData(this.client.company)
      this.$router.push({name:'CompanyInformation'})
    },
    loadClientAccount() {
      let id = this.$route.params.id
      console.log('load', this.$route.params.id)
      this.getClientAccount( id )
        .then( data => {
          this.client = data.returnedData
        })
        .catch(() => {
          // this.goBack()
        })
    },
    loadClient() {
      let id = this.$route.params.id
      console.log('load', this.$route.params.id)
      this.getClient( id )
        .then(({data}) => {
          this.client = data.returnedData
        })
        .catch(() => {
          // this.goBack()
        })
    },
  },

}
</script>