<template>
  <div>
    <p class="text-primary my-4 font-bold">
      What is the preferred payment method?
    </p>
    <div class="grid grid-cols-3 gap-4">
      <InfoLinkCard
        v-for="(payment, index) in paymentTypes"
        :key="index"
        :is-selected="form.payment_type === payment.value"
        :details="payment"
        :type="payment.type"
        @click="form.payment_type = payment.value"
      />
    </div>
    <div
      v-if="form.payment_type === 'momo'"
      class="grid grid-cols-2 gap-4 mt-8"
    >
      <cv-select
        v-model="form.method_of_payment"
        label="Mobile Money Network"
        class="inherit-full-input"
      >
        <cv-select-option
          disabled
          selected
          hidden
        >
          Mobile Money
        </cv-select-option>
        <cv-select-option
          v-for="(network, index) in networks"
          :key="index"
          :value="network"
        >
          {{ network }}
        </cv-select-option>
      </cv-select>
      <cv-text-input
        v-model="form.number"
        class="inherit-full-input"
        label="Mobile Money Number"
      />
    </div>
    <div
      v-if="form.payment_type === 'card'"
      class="grid grid-cols-2 gap-4 mt-8"
    >
      <cv-text-input
        v-model="form.number"
        class="inherit-full-input"
        type="text"
        label="Card Number"
        placeholder="0000 - 0000 - 0000 - 0000"
      />
      <cv-text-input
        v-model="form.name"
        class="inherit-full-input"
        type="text"
        label="Name on Card"
        placeholder="James Baduor"
      />
      <cv-text-input
        v-model="form.exp"
        class="inherit-full-input"
        label="Expiration (mm/yy)"
        type="text"
        placeholder="12/20"
      />
      <cv-text-input
        v-model="form.cvc"
        class="inherit-full-input"
        type="text"
        label="CVC"
      />
    </div>
    <div class="flex items-center justify-between my-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary mr-6 px-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
        >
          Cancel
        </cv-button>
        <cv-button
          class="bg-black px-6"
          kind="primary"
          @click="$router.push({ name: 'DateDoctor' })"
        >
          Go back
        </cv-button>
      </div>
      <div class="flex items-center">
        <cv-button
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary"
          @click="save"
        >
          Next: Notes/Comments
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AppointmentPayment',


  data() {
    return {
      selected: 'cash',
      form: {
        payment_type: 'cash',
      },
      visible: false,
      icon: ChevronRight,
      paymentTypes: [
        {
          label: 'Cash',
          description: 'Cash patients made to clinic billing',
          type: 'cash',
          value: 'cash',
        },
        {
          label: 'Mobile Money',
          description: 'Send mobile money via prefered network',
          type: 'momo',
          value: 'momo',
        },
        {
          label: 'Credit Card',
          description: 'Support for VISA or Mastercard payment',
          type: 'card',
          value: 'card',
        },
        {
          label: 'Insurance',
          description: 'Bills covered by third party insurance',
          type: 'insurance',
          value: 'insurance',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      networks: (state) => state.global.networks,
    }),
  },

  methods: {
    ...mapActions({
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
      getDoctors: 'doctors/getDoctors',
    }),

    save() {
      this.addToCurrentAppointment(this.form)
      this.$router.push({ name: 'AppointmentNotes' })
    },
  },
}
</script>
