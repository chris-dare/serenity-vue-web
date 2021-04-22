<template>
  <div class="grid md:grid-cols-2 gap-8">
    <!-- <SingleSelect
      v-model="form.use"
      :options="useOptions"
      title="Use"
      placeholder=""
      preselect
      :invalid-message="$utils.validateRequiredField($v, 'use')"
      @input.native="onChange"
    />
    <SingleSelect
      v-model="form.type"
      :options="typeOptions"
      title="Type"
      placeholder=""
      :invalid-message="$utils.validateRequiredField($v, 'type')"
      preselect
      @input.native="onChange"
    /> -->
    <!-- <cv-text-input
      v-model="form.city"
      label="City"
      placeholder="City"
      class="inherit-full-input"
      :invalid-message="$utils.validateRequiredField($v, 'city')"
      @input="onChange"
    />
    <cv-text-input
      v-model="form.district"
      label="District"
      placeholder="District"
      class="inherit-full-input"
      :invalid-message="$utils.validateRequiredField($v, 'district')"
      @input="onChange"
    /> -->

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
    <cv-select
      v-model="form.country"
      label="Country"
      class="inherit-full-input"
      :invalid-message="$utils.validateRequiredField($v, 'country')"
      @input="onChange"
    >
      <cv-select-option
        disabled
        selected
        hidden
      >
        Country
      </cv-select-option>
      <cv-select-option
        v-for="(country, index) in countries"
        :key="index"
        :value="country.name"
      >
        {{ country.name }}
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
        // city: {
        //   required: requiredIf(() => {
        //     return this.addressHasValue
        //   }),
        // },
        // use: {
        //   required: requiredIf(() => {
        //     return this.addressHasValue
        //   }),
        // },
        // type: {
        //   required: requiredIf(() => {
        //     return this.addressHasValue
        //   }),
        // },
        // district: {
        //   required: requiredIf(() => {
        //     return this.addressHasValue
        //   }),
        // },
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
      countries: (state) => state.global.countries,
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
      set(val) {
        console.log('val', val)
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