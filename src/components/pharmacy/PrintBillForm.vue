<template>
  <div class="space-y-4">
    <div class="flex flex-col items-center">
      <img
        class="w-32"
        src="@/assets/img/qr.png"
        alt=""
      >
      <div class="text-lg">Miss Eleanor Pena</div>
      <div class="text-sm font-light">Female, 23 years</div>
    </div>
    <div class="border-t border-solid border-b border-gray-300 py-4">
      <div class="text-lg font-bold mb-4">Payment Transaction</div>
      <div class="grid grid-cols-3 gap-2 mb-2">
        <div>0023223022</div>
        <div>0553009106</div>
        <div>Eleanor@gmail.com</div>
      </div>
      <div class="grid grid-cols-4 gap-2 font-light">
        <div>MR no.</div>
        <div>Phone number</div>
        <div>Email address</div>
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
      <div class="text-lg font-bold">
        {{ totalAmount | formatMoney | toCedis }}
      </div>
    </div>
    <div class="flex items-center justify-between">
      <SeButton
        variant="secondary"
        @click="$emit('cancel')"
      >
        Close
      </SeButton>
      <SeButton
        @click="$emit('cancel')"
      >
        Print Bill<ChevronRight
          class="w-4 h-4 text-white ml-4"
        />
      </SeButton>
    </div>
  </div>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark/32'

export default {
  name: 'PrintBillForm',

  props: {
    medicationRequests: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      form: {},
      visible: false,
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
            instruction:
              'Take 1 tablet orally every 4 to 5 hours as needed for pain',
            refill: new Date(),
          },
          {
            drug: 'Efpac 5MG / 500MG tabs',
            duration: '7 days',
            dosage: '2 times daily',
            quantity: 24,
            instruction:
              'Take 1 tablet orally every 4 to 5 hours as needed for pain',
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
      this.medicationRequests.forEach((el) => {
        total += parseFloat(el.medication.selling_price)
      })
      return total
    },
  },

  methods: {
    submit() {
      this.$emit('next')
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
