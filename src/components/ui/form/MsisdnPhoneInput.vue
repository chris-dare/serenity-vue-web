<template>
  <cv-form autocomplete="off">
    <p class="bx--label text-primary leading-none">{{ label }}</p>
    <VuePhoneNumberInput
      ref="phoneInput"
      v-model="localValue"
      default-country-code="GH"
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
import startsWith from 'lodash/startsWith'

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
  },

  data() {
    return {
      selectedDialCode: '+233',
    }
  },

  computed: {
    localValue: {
      get() {
        return startsWith(this.value, '+')
          ? this.unformattedValue
          : this.value
      },
      set(val) {
        this.selectedDialCode = split(this.formattedValue, ' ')[0]
        this.$emit('input', this.convertTo(val))
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

  methods: {
    convertTo(val) {
      if (!val) return ''
      if (val.length >= 15) {
        return val.slice(0, 15)
      }

      if (get(this.$refs, 'phoneInput.phoneFormatted')) {
        return get(this.$refs, 'phoneInput.phoneFormatted').split(' ').join('')
      }

      return val.split(' ').join('')
    },
  },
}
</script>
