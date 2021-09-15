<template>
  <cv-form autocomplete="off">
    <p class="bx--label text-primary leading-none space-x-1">
      <span
        v-if="required"
        class="error"
      >*</span>
      <span>{{ label }}</span>
    </p>
    <VuePhoneNumberInput
      ref="phoneInput"
      v-model="localValue"
      :default-country-code="code"
      valid-color="#0B6B74"
      required
      type="tel"
    />
    <p
      v-if="errorMessage"
      class="error"
    >
      {{ errorMessage }}
    </p>
  </cv-form>
</template>

<script>
import split from 'lodash/split'
import get from 'lodash/get'
import parsePhoneNumber from 'libphonenumber-js'

export default {
  name: 'MsisdnPhoneInput',

  props: {
    value: {
      type: String,
      default:'',
    },

    errorMessage: {
      type: String,
      default:'',
    },

    label: {
      type: String,
      default: '',
    },

    required: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selectedDialCode: '+233',
      code: 'GH',
    }
  },

  computed: {
    localValue: {
      get() {
        return this.convertFromMsidn(this.value)
      },
      set(val) {
        this.selectedDialCode = split(this.formattedValue, ' ')[0]
        this.$emit('input', this.convertToMsisdn(val))
      },
    },

    formattedValue() {
      return get(this.$refs, 'phoneInput.phoneFormatted') ?  get(this.$refs, 'phoneInput.phoneFormatted') : this.value
    },

    formatNational() {
      const phoneNumber = parsePhoneNumber(this.localValue, 'GH')
      return phoneNumber.format('E.164')
    },
  },

  watch: {
    value(val) {
      if (val.startsWith('+')) {
        const phoneNumber = parsePhoneNumber(val, 'GH')
        this.selectedDialCode = `+${phoneNumber.countryCallingCode}`


        this.code = phoneNumber.country
      }
    },
  },

  methods: {
    convertToMsisdn(val) {
      if (!val) {
        return ''
      }

      if (val.length >= 15) {
        return val.slice(0, 15)
      }
      const phoneNumber = parsePhoneNumber(val, this.code)

      return phoneNumber ? phoneNumber.format('E.164') : val
    },

    convertFromMsidn(val) {
      if (!val) {
        return ''
      }
      const phoneNumber = parsePhoneNumber(val, this.code)

      this.code = phoneNumber ? phoneNumber.country : 'GH'


      return phoneNumber ? phoneNumber.formatNational() : val
    },
  },
}
</script>
