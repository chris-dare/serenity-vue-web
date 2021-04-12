<template>
  <cv-form autocomplete="off">
    <p class="bx--label text-primary leading-none">{{ label }}</p>
    <VuePhoneNumberInput
      ref="phoneInput"
      v-model="input"
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
import startsWith from 'lodash/startsWith'
import split from 'lodash/split'
import get from 'lodash/get'
import parsePhoneNumber from 'libphonenumber-js'

export default {
  name: 'PhoneInput',

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
  
    formatAsNational: {
      type: Boolean,
      default: false,
    },

    countryCode: {
      type: String,
      default: '+233',
    },
  },

  data() {
    return {
      selectedDialCode: '+233',
      code: 'GH',
    }
  },


  computed: {
    input: {
      set(val) {
        this.selectedDialCode = split(this.formattedValue, ' ')[0]
        if (val.length > 15) return
  
        this.$emit('input', this.formatAsNational || !this.spaceLessValue ? val : this.spaceLessValue)
      },
      get() {
        return startsWith(this.value, '+')
          ? this.unformattedValue
          : this.value
      },
    },

    formattedValue() {
      return get(this.$refs, 'phoneInput.phoneFormatted') ?  get(this.$refs, 'phoneInput.phoneFormatted') : this.value
    },

    unformattedValue() {
      return this.spaceLessValue.slice(this.selectedDialCode.length)
    },

    spaceLessValue() {
      return this.formattedValue.split(' ').join('')
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
}
</script>