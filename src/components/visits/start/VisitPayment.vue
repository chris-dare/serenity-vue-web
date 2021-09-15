<template>
  <SeForm class="space-y-4">
    <ModeOfPayment
      v-model="localValue"
      :show-cash-options="hasUserAccount"
      :v="v"
      :total="localValue.service_tier.charge"
    />

    <p
      v-if="hasNoAccount"
      class="error"
    >
      This patient has no registered account with which to pay for the service selected
    </p>
  </SeForm>
</template>

<script>
import ModeOfPayment from '@/components/payment/ModeOfPayment'
import modelMixin from '@/mixins/model'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'VisitPayment',

  components: { ModeOfPayment },

  mixins: [modelMixin],

  props: {
    v: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapState({
      patientAccounts: state => state.billing.patientAccounts,
    }),

    ...mapGetters({
      hasNoAccount: 'billing/hasNoAccount',
      userAccounts: 'billing/userAccounts',
    }),

    hasUserAccount() {
      return !!this.userAccounts.length
    },
  },

  async created() {
    if (!this.localValue.patient?.user?.id) return
    await this.getPatientAccounts({ id: this.localValue.patient.id, params: { fee_payable: this.localValue.service_tier?.charge } } )
  },


  methods: {
    ...mapActions({
      getPatientAccounts: 'billing/getPatientAccounts',
    }),


  },
}
</script>
