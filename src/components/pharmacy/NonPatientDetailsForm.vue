<template>
  <div class="space-y-4">
    <p class="text-lg font-semibold">Customer Information</p>
    <div>
      <div class="grid grid-cols-2 gap-8 my-8">
        <cv-text-input
          v-model="form.first_name"
          :invalid-message="$utils.validateRequiredField($v, 'first_name')"
          label="First Name (required)"
          placeholder="Enter First name"
          type="text"
          class="inherit-full-input"
        />
        <cv-text-input
          v-model="form.last_name"
          :invalid-message="$utils.validateRequiredField($v, 'last_name')"
          label="Last Name (required)"
          type="text"
          placeholder="Enter Last name"
          class="inherit-full-input"
        />
        <cv-date-picker
          v-model="form.birth_date"
          :invalid-message="$utils.validateRequiredField($v, 'birth_date')"
          kind="single"
          class="inherit-full-input"
          placeholder="dd/mm/yyyy"
          date-label="Date of birth"
        />
        <div />
        <PhoneInput
          v-model="form.mobile"
          :error-message="$utils.validateRequiredField($v, 'mobile')"
          label="Phone number (required)"
          placeholder="eg 0349990390"
          @input="$v.$touch()"
        />
        <cv-text-input
          v-model="form.email"
          :invalid-message="$utils.validateRequiredField($v, 'email')"
          label="Email address (required)"
          type="email"
          placeholder="Email address"
          class="inherit-full-input"
        />
      </div>
      <div class="flex items-center justify-between">
        <SeButton
          variant="secondary"
          @click="$emit('prev', form)"
        >
          Go back
        </SeButton>
        <SeButton @click="$emit('next', form)">Next<ChevronRight class="w-4 h-4 text-white ml-4" /></SeButton>
      </div>
    </div>
    <div />
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import Checkmark from '@carbon/icons-vue/es/checkmark/32'

export default {
  name: 'NonPatientDetailsForm',

  props: {
    step: {
      type: [String, Number],
      default: null,
    },

    // eslint-disable-next-line vue/prop-name-casing
    _form: {
      type: Object,
      default: null,
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

  mounted() {
    this.form = Object.assign(this.form, this._form)
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
}
</script>
