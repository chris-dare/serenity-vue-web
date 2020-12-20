<template>
  <div>
    <p class="text-primary my-4 font-bold">
      What is the preferred payment method?
    </p>
    <div class="grid grid-cols-3 gap-4">
      <PatientCard
        @click="selected = payment.value"
        :is-selected="selected === payment.value"
        :details="payment"
        :type="payment.type"
        v-for="(payment, index) in paymentTypes"
        :key="index"
      />
    </div>
    <div v-if="selected === 'momo'" class="grid grid-cols-2 gap-4 mt-8">
      <cv-select
        v-model="form.method_of_payment"
        label="Mobile Money Network"
        class="inherit-full-input"
      >
        <cv-select-option disabled selected hidden
          >Mobile Money</cv-select-option
        >
        <cv-select-option
          v-for="(network, index) in networks"
          :key="index"
          :value="network"
          >{{ network }}</cv-select-option
        >
      </cv-select>
      <cv-text-input class="inherit-full-input" label="Mobile Money Number" v-model="form.number"></cv-text-input>
    </div>
    <div v-if="selected === 'card'" class="grid grid-cols-2 gap-4 mt-8">
      <cv-text-input class="inherit-full-input" label="Card Number" placeholder="0000 - 0000 - 0000 - 0000" v-model="form.number"></cv-text-input>
      <cv-text-input class="inherit-full-input" label="Name on Card" placeholder="James Baduor" v-model="form.name"></cv-text-input>
      <cv-text-input class="inherit-full-input" label="Expiration (mm/yy)" placeholder="12/20" v-model="form.exp"></cv-text-input>
      <cv-text-input class="inherit-full-input" label="CVC" v-model="form.cvc"></cv-text-input>
    </div>
    <div class="flex items-center justify-between my-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary mr-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
          >Cancel</cv-button
        >
        <cv-button
          @click="$router.push({ name: 'DateDoctor' })"
          class="bg-black"
          kind="primary"
          >Go back</cv-button
        >
      </div>
      <div class="flex items-center">
        <cv-button
          @click="$router.push({ name: 'AppointmentNotes' })"
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary"
          >Next: Notes/Comments</cv-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import PatientCard from '@/components/appointments/PatientCard'
import { mapState } from 'vuex'
export default {
  name: 'AppointmentPayment',

  components: { PatientCard },

  data() {
    return {
      selected: 'cash',
      form: {},
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
}
</script>
