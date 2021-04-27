<template>
  <cv-form
    autocomplete="off"
    @submit.prevent=""
  >
    <div class="grid grid-cols-2 gap-8 mb-8">
      <MsisdnPhoneInput
        v-model="form.mobile"
        label="Phone number (required)"
        :error-message="$utils.validateRequiredField($v, 'mobile')"
      />
      <cv-text-input
        v-model="form.email"
        label="Email address"
        placeholder="Email address"
        class="inherit-full-input"
      />
    </div>
    <Address
      v-model="form.address"
      :disabled="disabled"
    />

    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          variant="outline"
        >
          Cancel
        </SeButton>
        <SeButton
          :to="{ name: previous }"
          variant="secondary"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :icon="icon"
          @click="save"
        >
          Next: Emergency
        </SeButton>
      </div>
    </div>
  </cv-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'ContactInfo',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        address: {},
      },
      next: 'EmergencyContact',
      previous: 'Biodata',
      parent: 'Patients',
      disabled: false,
    }
  },

  validations() {
    return {
      form: {
        mobile: { required },
      },
    }
  },

  computed: {
    ...mapState({
      countries: (state) => state.global.countries,
      storeData: (state) => state.patients.currentPatient,
      regions: (state) => state.global.regions,
    }),

    addressHasValue() {
      return !isEmpty(this.form.address)
    },
  },

  mounted() {
    this.getCountries()
  },

  methods: {
    ...mapActions({
      getCountries: 'global/getCountries',
      addToStoreData: 'patients/addToCurrentPatient',
      refresh: 'patients/refreshCurrentPatient',
    }),

    save() {
      this.$v.$touch()

      if (this.$v.$invalid || this.disabled) {
        this.$toast.open({
          message: 'Fill all required fields!',
          type: 'error',
        })
        return
      }

      this.addToStoreData(this.form)
      this.$router.push({ name: this.next })
    },
  },
}
</script>
