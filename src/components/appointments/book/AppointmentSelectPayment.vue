<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next: Notes/Comments"
    :previous="previous"
    :query="$route.query"
    @cancel="cancel"
    @save="reRoute"
  >
    <div class="space-y-6">
      <p class="text-primary my-4 font-bold">
        What is the preferred payment method?
      </p>

      <ModeOfPayment
        v-model="form"
        :v="$v"
        :patient="form.patient"
      />
    </div>
  </MultiStepBase>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import ModeOfPayment from '@/components/payment/ModeOfPayment'
import MultiStep from '@/mixins/multistep'
import { mapState, mapActions } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'AppointmentSelectPayment',

  components: {ModeOfPayment},

  mixins: [MultiStep],

  data() {
    return {
      selected: 'cash',
      form: {
        payment_type: 'cash',
      },
      visible: false,
      icon: ChevronRight,
      next: this.$route.meta.next,
      parent: this.$route.meta.parent,
      previous: this.$route.meta.previous,
    }
  },

  computed: {
    ...mapState({
      networks: (state) => state.global.networks,
      storeData: (state) => state.appointments.currentAppointment,
    }),
  },

  validations() {
    if (this.form.transaction_type !== 'cash') {
      return {
        form: {
          account_id: { required },
        },
      }
    }

    if(this.form.transaction_type === 'cash'){
      return {
        form: {
          amount: { required, minValue: minValue(this.bill.charge) },
          currency: { required },
        },
      }
    }
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
    }),

    save() {
      this.addToCurrentAppointment(this.form)
      this.$router.push({ name: 'AppointmentNotes' })
    },
  },
}
</script>
