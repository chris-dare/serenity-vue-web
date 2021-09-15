<template>
  <MultiStepBase
    next-label="Next: Emergency"
    :loading="loading"
    :next="next"
    :previous="previous"
    :icon="icon"
    :query="$route.query"
    @cancel="cancel"
    @save="save"
  >
    <div class="grid grid-cols-2 gap-8 mb-8">
      <MsisdnPhoneInput
        v-model="form.mobile"
        label="Phone number"
        :error-message="$utils.validateRequiredField($v, 'mobile')"
        required
        @input="$v.$touch()"
      />
      <FormInput
        v-model="form.email"
        label="Email address"
        placeholder="Email address"
        class="inherit-full-input"
        :invalid-message="$utils.validateRequiredField($v, 'email')"
        required
        @input="$v.$touch()"
      />
    </div>
    <Address
      v-model="form.address"
      :disabled="disabled"
    />
  </MultiStepBase>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'
import isEmpty from 'lodash/isEmpty'
import UsersAPI from '@/api/users'
import { emailFormatter } from '@/services/custom-validators'

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
    let data = {
      form: {
        email: {
          email: (val) => email(emailFormatter(val)),
          required,
          async isUnique(value) {
            if (value === '' || !this.$v.form.email.email || this.storeData.id) return true

            const { data } = await UsersAPI.search({ email: value }).catch(() => false)

            if (data && data.length) {
              return false
            } else {
              return true
            }
          },
        },
        mobile: {
          required,
          async isUnique(value) {
            if (value === '' || value.length < 10 || this.storeData.id) return true

            const { data } = await UsersAPI.search({ mobile: value }).catch(() => false)

            if (data.length) {
              return false
            } else {
              return true
            }
          },
        },
      },
    }
    return data
  },

  computed: {
    ...mapState({
      storeData: (state) => state.patients.currentPatient,
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
      this.addToStoreData(this.form)

      if (this.$v.$error) {
        this.$toast.open({
          message: 'Fill all required fields!',
          type: 'error',
        })
        return
      }

      this.$router.push({ name: this.next, query: { ...this.$route.query } })
    },
  },
}
</script>
