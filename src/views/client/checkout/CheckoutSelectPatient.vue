<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next: payment"
    @cancel="cancel"
    @save="validateAndReroute"
  >
    <div class="space-y-2 pt-6">
      <p>Total Cost:</p>
      <h1 class="text-4xl font-bold">{{ $currency(cartTotal).format() }}</h1>
    </div>
    <div class="my-6 h-0 border-t border-solid border-dark border-opacity-10" />
    <div class="flex">
      <InfoLinkCard
        v-for="(type, index) in patientTypes"
        :key="index"
        :is-selected="selected === type.value"
        :details="type"
        :type="type.type"
        @click="onClick(type)"
      />
    </div>
    <div class="mt-5">
      <AddPatientForm
        v-if="selected === 'new'"
        v-model="form.patient"
      />
      <SelectPatientTable
        v-else
        :columns="columns"
        :patient.sync="form.patient"
      />
    </div>
  </MultiStepBase>
</template>

<script>
import SelectPatientTable from '@/components/appointments/tables/SelectPatientTable'
import AddPatientForm from '@/components/forms/AddPatientForm'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapState, mapActions, mapGetters } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'CheckoutSelectPatient',

  components: { SelectPatientTable, AddPatientForm },

  mixins: [MultiStep],

  data() {
    return {
      form: {
        patient: {},
      },
      columns: ['Patient', 'Mobile'],
      icon: ChevronRight,
      patientTypes: [
        {
          label: 'Existing patient',
          description: 'Quickly search for a patient by name',
          type: 'search',
          value: 'existing',
        },
        {
          label: 'New patient',
          description: 'Create record for a new patient',
          type: 'newpatient',
          value: 'new',
        },
      ],
      selected: 'existing',
      loading: false,
      next: 'CheckoutPaymentOptions',
      parent: '',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.checkout.checkoutData,
    }),
    ...mapGetters({
      cartTotal: 'checkout/cartTotal',
    }),
  },

  validations: {
    form: {
      patient: { minLength: minLength(1), required  },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'checkout/addToCheckout',
      refresh: 'checkout/refreshCheckout',
    }),

    onClick(type) {
      this.selected = type.value
    },
  },
}
</script>
