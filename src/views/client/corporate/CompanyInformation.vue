<template>
  <div>
    <cv-form @submit.prevent="">
      <!-- title -->
      <div>
        <div class="grid grid-cols-2 gap-8 my-8">
          <cv-text-input
            v-model="form.company_name"
            label="Company name (required)"
            placeholder="Company Name"
            type="text"
            class="inherit-full-input"
            :invalid-message="$utils.validateRequiredField($v, 'company_name')"
          />
          <cv-text-input
            v-model="form.email"
            type="email"
            label="Email (required)"
            placeholder="Email address"
            class="inherit-full-input"
            :error-message="$utils.validateRequiredField($v, 'email')"
          />
          <MsisdnPhoneInput
            v-model="form.phone_number"
            label="Phone number (required)"
            :error-message="$utils.validateRequiredField($v, 'phone_number')"
          />
          <cv-text-input
            v-model="form.tin_number"
            label="TIN"
            placeholder="TIN"
            class="inherit-full-input"
            :invalid-message="$utils.validateRequiredField($v, 'tin_number')"
          />
        </div>

        <cv-text-area
          v-model="form.address"
          placeholder="Location address"
          label="Full provider address (required)"
          type="text"
          class="w-full"
        />

        <div class="flex items-center justify-between mt-12 mb-6 w-full">
          <SeButton
            variant="outline"
            @click="cancel"
          >
            Cancel
          </SeButton>
          <div class="flex items-center">
            <SeButton
              :icon="icon"
              @click="save"
            >
              Next
            </SeButton>
          </div>
        </div>
      </div>
    </cv-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import MultiStep from '@/mixins/multistep'

export default {
  mixins: [MultiStep],

  data() {
    return {
      form: {},
      icon: ChevronRight,
      parent: 'CorporateClients',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.clients.form,
    }),
  },

  created() {
    this.form = this.storeData
  },

  validations: {
    form: {
      company_name: { required },
      email: { email: email(), required },
      phone_number: { required },
      tin_number: { minLength: minLength(10)},
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'clients/addToCurrentUser',
      // refresh: 'clients/refreshForm',
    }),
    actionChange() {},
    save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.addToStoreData(this.form)
      this.$router.push({name: 'CompanyAdminInformation'})
    },
  },
}
</script>
