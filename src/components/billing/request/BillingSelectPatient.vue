<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next: Select Service"
    :query="$route.query"
    data-cy="billing-select-patient"
    @cancel="cancel"
    @save="validateAndReroute"
  >
    <div
      class="mt-5"
    >
      <SelectPatientTable
        :columns="columns"
        :patient.sync="form.patient"
      />
    </div>
  </MultiStepBase>
</template>

<script>
import SelectPatientTable from '@/components/appointments/tables/SelectPatientTable'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapState, mapActions } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'BillingSelectPatient',

  components: { SelectPatientTable },

  mixins: [MultiStep],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        patient: {},
      },
      columns: ['Patient', 'Mobile'],
      radioVal: null,
      search: '',
      icon: ChevronRight,
      selected: 'existing',
      loading: false,
      next: 'BillingService',
      parent: 'BillingDashboard',
    }
  },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
      storeData: (state) => state.checkout.currentCheckout,
    }),

    disabled() {
      return !this.form.patient
    },
  },

  validations: {
    form: {
      patient: { minLength: minLength(1), required  },
    },
  },

  methods: {
    ...mapActions({
      refresh: 'checkout/refreshCheckout',
      addToStoreData: 'checkout/addToCheckout',
    }),

    cancel(){
      this.$router.push({ name: 'Dashboard' })
      this.refresh()
    },

    onClick(type) {
      this.selected = type.value
      // if (type.value === 'existing') {
      // } else {
      //   // this.selected = type.value
      //   // this.$trigger('labpatient:add:open')
      // }
      
    },
  },
}
</script>
