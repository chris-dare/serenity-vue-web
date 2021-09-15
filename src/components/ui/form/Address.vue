<template>
  <div class="grid md:grid-cols-2 gap-8">
    <cv-text-input
      v-model="form.postal_code"
      label="GhanaPost GPS"
      type="text"
      placeholder="Ghana post code"
      class="inherit-full-input"
      @input="onChange"
    />
    <cv-text-input
      v-model="form.line"
      label="Home/Residential address"
      placeholder="Home/Residential address"
      type="text"
      class="inherit-full-input"
      :invalid-message="$utils.validateRequiredField($v, 'line')"
      @input="onChange"
    />

    <FormCountrySelect
      v-model="form.country"
      title="Country"
      placeholder="Select a country"
      :error-message="$utils.validateRequiredField($v, 'country')"
      @input="onChange"
    />

    <MultiSelect
      v-model="form.state"
      :options="regions"
      :error-message="$utils.validateRequiredField($v, 'state')"
      title="Region / State"
      placeholder="Region / State"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { requiredIf } from 'vuelidate/lib/validators'
import isEmpty from 'lodash/isEmpty'
export default {
  name: 'Address',

  props: {
    value: {
      type: Object,
      default: () => {},
    },

    disabled:{
      type: Boolean,
      default: false,
    },
  },

  validations() {
    return {
      form: {
        state: {
          required: requiredIf(() => {
            return this.addressHasValue && !isEmpty(this.regions)
          }),
        },
        line: {
          required: requiredIf(() => {
            return this.addressHasValue
          }),
        },
        country: {
          required: requiredIf(() => {
            return this.addressHasValue
          }),
        },
      },
    }
  },

  computed: {
    ...mapState({
      countries: state => state.global.countries,
    }),

    regions() {
      if (!this.form.country) return []
      return this.countries.find(country => country.code === this.form.country).subdivisions
    },

    addressHasValue() {
      return !isEmpty(this.form)
    },

    form: {
      set(val) {
        this.$emit('input', val)
      },
      get() {
        return this.value
      },
    },

    internalDisabled: {
      set() {
        this.$emit('update:disabled', this.$v.$touch())
      },
      get() {
        return this.disabled
      },
    },
  },

  methods: {
    onChange() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.internalDisabled = true
      }
    },
  },
}
</script>
