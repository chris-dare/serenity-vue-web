<template>
  <div class="space-y-4">
    <p class="text-lg font-semibold">Medication</p>
    <div
      v-for="(drug, index) in form.drugs"
      :key="drug.uid"
    >
      <div class="mb-4 grid grid-cols-3 gap-4">
        <cv-select
          v-model="drug.name"
          label="Name of medicine"
        >
          <cv-select-option
            disabled
            selected
            hidden
          >
            Name of drug
          </cv-select-option>
          <cv-select-option
            value="network"
          >
            In Patient Department
          </cv-select-option>
        </cv-select>
        <cv-select
          v-model="drug.duration"
          label="Duration"
        >
          <cv-select-option
            disabled
            selected
            hidden
          >
            Number of days
          </cv-select-option>
          <cv-select-option
            value="network"
          >
            In Patient Department
          </cv-select-option>
        </cv-select>

        <cv-text-input
          label="Dosage"
          type="text"
          placeholder="Quantity of drugs "
          class="inherit-full-input"
        />
        <cv-text-area
          v-model="drug.instruction"
          label="Quantiy of drugs "
          placeholder="Instruction on how to use the drug"
          :rows="10"
          class="col-span-2"
        />
      </div>
      <SeButton
        v-if="index == form.drugs.length - 1"
        @click="addRow"
      >
        Add New Drug <Add class="w-4 h-4 text-white ml-4" />
      </SeButton>
      <SeButton
        v-else
        @click="removeRow(index)"
      >
        Remove drug <Add class="w-4 h-4 text-white ml-4" />
      </SeButton>
    </div>
    <div class="flex items-center justify-between">
      <SeButton
        variant="secondary"
        @click="prev"
      >
        Go back
      </SeButton>
      <SeButton @click="submit">Checkout<ChevronRight class="w-4 h-4 text-white ml-4" /></SeButton>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import Checkmark from '@carbon/icons-vue/es/checkmark/32'

export default {
  name: 'AddPrescriptionForm',

  props: ['step'],

  data() {
    return {
      form: {
        drugs: [{
          uid: Math.random().toString(36).substring(7),
          name: '',
          quantity: '',
          duration: '',
          instruction: '',
        }],
      },
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
