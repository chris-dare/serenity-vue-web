<template>
  <div
    class="w-4/5 mx-auto space-y-4"
  >
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center space-x-4">
          <ImageBlock
            :url="patient.url"
            :alt="patient.name"
          />
          <div>
            <p>{{ patient.name }}</p>
            <p class="text-secondary  capitalize">
              {{ patient.gender_age_description }}
            </p>
            <div class="mt-2 flex items-center">
              <div class="bg-green-700 w-3 h-3 rounded-full mr-2" />
              <p>MR No: {{ patient.mr_number }}</p>
            </div>
          </div>
        </div>
        <!-- <div
          class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
        >
          <img
            src="@/assets/img/edit 1.svg"
            class="w-4 h-4"
            @click="$router.push({name: 'Biodata', params: {id: patient.id}})"
          >
        </div> -->
      </div>
    </div>

    
    <PatientCard
      :is-selected="false"
      :details="dashboard"
      :type="dashboard.type"
      custom-class="bg-white border-0"
      @click="$trigger('active:billing:open')"
    />

    <div class="bg-white p-3">
      <div class="flex items-center justify-between mb-4">
        <p class=" text-gray-500">Bills/Orders</p>
        <div
          class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center cursor-pointer"
          @click="$trigger('transactions:details:open')"
        >
          <Add class="w-4 h-4 text-serenity-primary" />
        </div>
      </div>
      <DataTable
        ref="table"
        :columns="columns"
        :data="[]"
        :loading="loading"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <p>{{ row.created_at }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ $currency(Math.round(Math.random())).format() }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ $currency(Math.round(Math.random())).format() }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ $currency(Math.round(Math.random())).format() }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.paymentMethod }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p class="camelcase"><Tag>{{ row.status }}</Tag></p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <router-link
              tag="div"
              :to="`/patients/${row.id}`"
              class="flex items-center cursor-pointer"
            >
              View
              <div class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center">
                <img
                  src="@/assets/img/view 1.svg"
                  alt=""
                >
              </div>
            </router-link>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
    <ActiveBillingModal />
    <TransactionDetailsModal />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PatientCard from '@/components/appointments/PatientCard'
import ActiveBillingModal from '@/components/billing/ActiveBillingModal'
import TransactionDetailsModal from '@/components/billing/TransactionDetailsModal'

export default {
  name: 'SinglePatient',

  components: { PatientCard, ActiveBillingModal, TransactionDetailsModal },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      dashboard: {
        label: 'Active bill',
        description: 'Add more items to an active bill',
        type: 'align',
        value: 'add_notes',
      },
      columns: ['Date', 'Total Amount', 'Amount Paid', 'Balance', 'Method', 'Status', 'Action'],
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      workspaceType: (state) => state.global.workspaceType,
    }),

    ...mapGetters({
      data: 'patients/patients',
    }),

    isSelected() {
      return (index) => this.initialSelected === index
    },
  },

  beforeRouteEnter (to, from, next) {
    next(vm => vm.getPatient(vm.id))
  },

  methods: {
    ...mapActions({
      getPatient: 'patients/getPatient',
      getData: 'patients/getPatient',
    }),
  },
}
</script>
