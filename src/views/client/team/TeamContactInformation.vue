<template>
  <div>
    <cv-form
      autocomplete="off"
      @submit.prevent
    >
      <div class="grid grid-cols-2 gap-4 items-start">
        <PhoneInput
          v-model="form.phone_number"
          label="Phone number"
          :error-message="$utils.validateRequiredField($v, 'phone_number')"
          format-as-national
          :country-code.sync="form.country_code"
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
        />
      </div>
      <FormInput
        v-model="form.postal_address"
        label="Postal Address"
        placeholder="Postal Address"
        type="text"
        class="inherit-full-input my-8"
        required
      />
      <FormInput
        v-model="form.home_address"
        label="Home/Residential address"
        placeholder="Home/Residential address"
        type="text"
        class="inherit-full-input my-8"
        required
      />
      <div class="flex items-center justify-between mt-12 mb-6">
        <div class="flex items-center space-x-2">
          <SeButton
            :to="{ name: 'Team' }"
            variant="outline"
          >
            Cancel
          </SeButton>
          <SeButton
            variant="secondary"
            :to="{ name: 'TeamBiodata' }"
          >
            Go back
          </SeButton>
        </div>
        <SeButton
          :icon="icon"
          @click="save"
        >
          Next
        </SeButton>
      </div>
    </cv-form>
  </div>
</template>

<script>
import { required, email, minLength, maxLength} from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'
import isEmpty from 'lodash/isEmpty'
import { emailFormatter } from '@/services/custom-validators'

export default {
  name: 'TeamContactInformation',

  mixins: [MultiStep],

  data() {
    return {
      form: {},
    }
  },

  validations: {
    form: {
      phone_number: { required, maxLength: maxLength(15), minLength: minLength(9) },
      email: { required, email: (val) => email(emailFormatter(val))},
    },
  },

  computed: {
    ...mapState({
      storeData: (state) => state.practitioners.currentUser,
    }),
  },

  created() {
    if (isEmpty(this.storeData)) {
      this.$router.push({name: 'TeamBiodata'})
    }
  },

  methods: {
    ...mapActions({
      addToStoreData: 'practitioners/addToCurrentUser',
    }),

    save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.addToStoreData(this.form)
      this.$router.push({ name: 'TeamIdentification' })
    },
  },
}
</script>
