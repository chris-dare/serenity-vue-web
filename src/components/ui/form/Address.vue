<template>
  <div class="grid md:grid-cols-2 gap-8">
    <cv-text-input
      v-model="form.postal_code"
      label="GhanaPost GPS"
      type="text"
      placeholder="Ghana post code"
      class="inherit-full-input"
      :invalid-message="$utils.validateRequiredField($v, 'postal_code')"
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
    
    <cv-select
      v-model="form.state"
      label="Region"
      class="inherit-full-input"
      :invalid-message="$utils.validateRequiredField($v, 'state')"
      @input="onChange"
    >
      <cv-select-option
        disabled
        selected
        hidden
      >
        Region
      </cv-select-option>
      <cv-select-option
        v-for="(region, index) in regions"
        :key="index"
        :value="region"
      >
        {{ region }}
      </cv-select-option>
    </cv-select>
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

  data() {
    return {
      useOptions: ['home', 'work', 'temp', 'old', 'billing'],
      typeOptions: ['postal', 'physical', 'both'],
    }
  },

  validations() {
    return {
      form: {
        state: {
          required: requiredIf(() => {
            return this.addressHasValue
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
        postal_code: {
          required: requiredIf(() => {
            return this.addressHasValue
          }),
        },
      },
    }
  },

  computed: {
    ...mapState({
      regions: (state) => state.global.regions,
    }),

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