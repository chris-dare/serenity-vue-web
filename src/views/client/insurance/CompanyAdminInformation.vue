<template>
  <div>
    <cv-form @submit.prevent="">
      <!-- title -->
      <div>
        <div class="grid grid-cols-2 gap-8 my-8">
          <FormInput
            v-model="form.admin_first_name"
            required
            label="First name"
            type="text"
            placeholder="Admin First Name"
            class="inherit-full-input"
            :invalid-message="$utils.validateRequiredField($v, 'admin_first_name')"
          />
          <FormInput
            v-model="form.admin_last_name"
            required
            label="Last name"
            placeholder="Admin last or family name"
            type="text"
            class="inherit-full-input"
            :invalid-message="$utils.validateRequiredField($v, 'admin_last_name')"
          />

          <MsisdnPhoneInput
            v-model="form.admin_phoneno"
            label="Phone number"
            :error-message="$utils.validateRequiredField($v, 'admin_phoneno')"
            required
          />
          <FormInput
            v-model="form.admin_email"
            label="Email"
            placeholder="Email"
            class="inherit-full-input"
            required
          />
        </div>

        <div class="flex items-center justify-between mt-12 mb-6">
          <div class="flex">
            <SeButton
              class="mr-4"
              variant="outline"
              @click="cancel"
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
          <cv-button-skeleton
            v-if="loading"
          />
          <cv-button
            v-else
            :icon="icon"
            kind="primary"
            class="bg-serenity-primary"
            :loading="loading"
            @click="submit"
          >
            {{ form.main_branch_id ? 'Next' : 'Create company' }}
          </cv-button>
        </div>
      </div>
    </cv-form>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import MultiStep from '@/mixins/multistep'
import { emailFormatter } from '@/services/custom-validators'

export default {
  name: 'CompanyAdminInformation',

  mixins: [MultiStep],

  data() {
    return {
      form: {
      },
      icon: ChevronRight,
      previous: 'InsuranceInformation',
      parent: 'InsuranceClients',
      loading: false,
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.clients.form,
    }),
    ...mapGetters({
      userName: 'auth/fullName',
    }),
  },

  created() {
    this.form = this.storeData
  },

  validations: {
    form: {
      company_name: { required },
      admin_first_name: { required },
      admin_last_name: { required },
      admin_phoneno: { required },
      admin_email: { email: (val) => email(emailFormatter(val)) },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'clients/addToCurrentUser',
      createClient: 'clients/create',
      updateClient: 'clients/update',
      refresh: 'clients/refreshForm',
      getData: 'clients/getClients',
    }),
    actionChange() {},
    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }
      this.addToStoreData(this.form)
      if (this.form.main_branch_id) {
        this.update()
      } else {
        this.save()
      }
    },
    async save(){
      this.loading = true
      let payload = {
        company_name : this.form.company_name,
        tin_number: this.form.tin_number,
        address: this.form.address,
        admin_first_name: this.form.admin_first_name,
        admin_last_name: this.form.admin_last_name,
        admin_phoneno : this.form.admin_phoneno,
        admin_email: this.form.admin_email,
        authorizedBy: this.$utils.formatName(this.userName),
        organization_type: 'INS',
      }
      try {
        await this.createClient(payload)
        this.$toast.open({
          message: 'Company successfully created!',
        })
        this.loading = false
        this.$router.push({name: 'InsuranceClients'})
        this.getData()
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
      this.loading = false
      // $trigger('success:open', 'Company successfully created!!')
    },
    async update(){
      this.addToStoreData(this.form)
      this.$router.push({name: 'Verification'})
    },
  },
}
</script>
