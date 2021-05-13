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
            label="Email (required)"
            placeholder="Email address"
            class="inherit-full-input"
            :error-message="$utils.validateRequiredField($v, 'email')"
          />
          <PhoneInput
            v-model="form.phone_number"
            label="Phone number (required)"
            placeholder="eg 0349990390"
            @input="$v.$touch()"
          />
          <cv-text-input
            v-model="form.tin"
            label="TIN Number"
            placeholder="TIN Number"
            class="inherit-full-input"
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
          <cv-button
            class="border-serenity-primary text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary px-6"
            kind="tertiary"
          >
            Cancel
          </cv-button>
          <div class="flex items-center">
            <cv-button
              :icon="icon"
              kind="primary"
              class="bg-serenity-primary ml-6"
              @click="save"
            >
              Next
            </cv-button>
          </div>
        </div>
      </div>
    </cv-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  data() {
    return {
      form: {},
      icon: ChevronRight,
    }
  },

  created() {
    this.form = this.storeData
  },

  computed: {
    ...mapState({
      storeData: (state) => state.clients.form,
    }),
  },

  validations: {
    form: {
      company_name: { required },
      email: { email },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'clients/addToCurrentUser',
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
