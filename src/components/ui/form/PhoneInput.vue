<template>
  <div>
    <p class="bx--label text-primary leading-none">{{ label }}</p>
    <VuePhoneNumberInput
      ref="phoneInput"
      v-model="input"
      default-country-code="GH"
      valid-color="#0B6B74"
      required
    />
    <p
      v-if="errorMessage"
      class="error"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import startsWith from 'lodash/startsWith'
import split from 'lodash/split'
import get from 'lodash/get'
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
  },

  data() {
    return {
      selectedDialCode: '+233',
    }
  },

  computed: {
    input: {
      set(val) {
        this.selectedDialCode = split(this.formattedValue, ' ')[0]
        this.$emit('input', this.convertToFormattedPhoneNumber(val))
      },
      get() {
        return this.convertFromFormattedPhoneNumber(this.value)
      },
    },

    formattedValue() {
      return get(this.$refs, 'phoneInput.phoneFormatted')
    },
  },

  methods: {
    convertFromFormattedPhoneNumber(value) {
      return startsWith(value, '+')
        ? value.substr(this.selectedDialCode.length, value.length)
        : value
    },

    convertToFormattedPhoneNumber(value) {
      if (!value) {
        return
      }
      return startsWith(value, '+') ? value : this.selectedDialCode.concat(value.replace(/\s/g, ''))
    },
  },
}
</script>