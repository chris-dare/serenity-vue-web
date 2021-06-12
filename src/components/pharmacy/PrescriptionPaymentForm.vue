<template>
  <div class="space-y-4">
    <div
      v-if="patient"
      class="flex flex-col items-center"
    >
      <img
        class="w-32"
        src="@/assets/img/qr.png"
        alt=""
      >
      <div class="text-lg">
        {{ patient.fullName }}
      </div>
      <div class="text-sm font-light">{{ patient.gender_age_description }}</div>
    </div>
    <div class="border-t border-solid border-b border-gray-300 py-4">
      <div class="text-lg font-bold mb-4">
        Payment Transaction
      </div>
      <div class="grid grid-cols-4 gap-2 font-light font-bold">
        <div>Transaction ID</div>
        <div>Payment Type</div>
        <div>Cashier</div>
        <div>Phone number</div>
      </div>
      <div class="grid grid-cols-4 gap-2 mb-2">
        <div>1111111</div>
        <div>Cash</div>
        <div>Bruce Wayne</div>
        <div>0553009106</div>
      </div>
    </div>
    <div>
      <div
        v-for="drug in medicationRequests"
        :key="drug.drug"
        class="border-b border-solid border-gray-200 py-2"
      >
        <div class="flex justify-between font-bold mb-1">
          <div>{{ drug.medication_detail[0].display }}</div>
          <div>{{ drug.medication.selling_price | formatMoney | toCedis }}</div>
        </div>
        <div>{{ drug.quantity }}</div>
      </div>
    </div>
    <div class="flex justify-end items-center">
      <div class="font-light mr-1">Total</div>
      <div class="text-lg font-bold">{{ totalAmount | formatMoney | toCedis }}</div>
    </div>
    <div class="flex items-center justify-between">
      <SeButton
        variant="secondary"
        @click="prev"
      >
        Back
      </SeButton>
      <div class="flex">
        <SeButton
          variant="secondary"
          class="mr-4"
          @click="$emit('cancel')"
        >
          Cancel Bill
        </SeButton>
        <SeButton
          :loading="loading"
          @click="submit"
        >
          Receive Payment<ChevronRight class="w-4 h-4 text-white ml-4" />
        </SeButton>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import Checkmark from '@carbon/icons-vue/es/checkmark/32'
import { mapActions } from 'vuex'
export default {
  name: 'PrescriptionPaymentForm',

  props: {
    step: {
      type: [Number, String],
      default: null,
    },

    medicationRequests: {
      type: [Object, String],
      default: null,
    },

    patient: {
      type: [Object, String],
      default: null,
    },
  },

  data() {
    return {
      form: {
      },
      visible: false,
      loading: false,
      icons: {
        Checkmark,
      },
      prescriptions: {
        data: [
          {
            drug: 'Hydrocodone 5MG / 500MG tabs',
            duration: '7 days',
            dosage: '2 times daily',
            quantity: 24,
            instruction: 'Take 1 tablet orally every 4 to 5 hours as needed for pain',
            refill: new Date(),
          },
          {
            drug: 'Efpac 5MG / 500MG tabs',
            duration: '7 days',
            dosage: '2 times daily',
            quantity: 24,
            instruction: 'Take 1 tablet orally every 4 to 5 hours as needed for pain',
            refill: new Date(),
          },
        ],
        state: null,
      },
    }
  },

  computed: {
    totalAmount() {
      let total = 0
      this.medicationRequests.forEach(el => {
        total += parseFloat(el.medication.selling_price)
      })
      return total
    },
  },

  validations: {
    form:  {
      first_name: {required},
      last_name: {required},
      gender: {required},
      birth_date: {required},
      email: {required, email},
      mobile: {required},
    },
  },

  methods: {
    ...mapActions({
      dispenseDrugs: 'patients/dispenseDrugs',
    }),
    async submit() {
      this.loading = true

      try {
        const medicationRequests = this.medicationRequests
        await this.dispenseDrugs({medicationRequests})
        this.$toast.open({
          message: 'Medication successfully dispensed',
        })
        this.$store.dispatch('patients/getMedicationRequests')
        this.$emit('success')
        
      } catch (error) {
        this.loading = false
      }
    },

    prev() {
      this.$emit('prev')
    },
    addRow() {
      this.form.drugs.push({
        uid: Math.random().toString(36).substring(7),
        name: '',
        quantity: '',
        duration: '',
        instruction: '',
      })
    },
    removeRow(index) {
      const drugs = this.form.drugs
      drugs.splice(index, 1)
    },
  },
}
</script>
