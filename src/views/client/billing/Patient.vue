<template>
  <AppStatePage
    :loading="loading"
    :error="error"
    class="max-w-7xl mx-auto"
  >
    <div class="space-y-2">
      <div>
        <PatientInfoCard class="mb-0 border-b border-solid border-tetiary">
          <div class="space-y-1">
            <p class="text-right text-xl font-semibold">{{ $currency(getBalance(patient) || 0).format() }}</p>
            <p class="text-right text-secondary text-sm">Account balance</p>
            <div class="space-x-2 flex items-center">
              <SeButton @click="$trigger('billing:topup:open:two', patient)">Load Account</SeButton>
            </div>
          </div>
        </PatientInfoCard>

        <Dependents v-if="patient.user" />
      </div>

      <DetailPageNav
        :links="links"
      />
      <router-view />
    </div>
    <BillingTopUpModal />
  </AppStatePage>
</template>

<script>
import PatientInfoCard from '@/components/patients/PatientInfoCard'
import Dependents from '@/components/dependents/Dependents'
import { mapActions, mapGetters, mapState } from 'vuex'
import DetailPageNav from '@/components/patients/DetailPageNav'
import BillingTopUpModal from '@/components/billing/topup/BillingTopUpModal'

export default {
  name: 'BillingPatient',

  components: { PatientInfoCard, Dependents, DetailPageNav, BillingTopUpModal },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      error: null,
      columns: [
        'Benefactor name',
        'MR Number',
        'Date',
        'Amount',
      ],
      links: [
        { label: 'Summary', path: 'Billing:Patient' },
        { label: 'Payment History', path: 'Billing:PatientBills' },
        { label: 'Account History', path: 'Billing:PatientAccountHistory' },
      ],
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
    }),
    ...mapGetters({
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
      patientAccountBalance: 'patients/patientAccountBalance',
    }),
  },

  watch: {
    $route: {
      immediate: true,
      async handler(route, oldRoute) {
        if (route.params.id === oldRoute?.params?.id) {
          return
        }
        await this.initBillingPatientInformation(this.id)
      },
    },
  },

  beforeRouteLeave (from,to,next) {
    this.refresh()
    next()
  },

  methods: {
    ...mapActions({
      initBillingPatientInformation: 'patients/initBillingPatientInformation',
      refresh: 'patients/refreshCurrentPatient',
    }),
    getBalance(patient){
      if (patient.payment_methods.corporate[0]){
        return patient.payment_methods.corporate[0].balance || 0
      } else if (patient.payment_methods.insurance[0]) {
        return patient.payment_methods.insurance[0].balance || 0
      } else {
        return 0
      }
    },
  },

}
</script>
