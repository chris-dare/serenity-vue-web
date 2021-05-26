<template>
  <div>
    <cv-form @submit.prevent="">
      <!-- title -->
      <div>
        <div class="grid grid-cols-2 gap-8 my-8">
          <cv-text-input
            v-model="form.admin_first_name"
            label="First name (required)"
            type="text"
            placeholder="Admin First Name"
            class="inherit-full-input"
            :invalid-message="$utils.validateRequiredField($v, 'admin_first_name')"
          />
          <cv-text-input
            v-model="form.admin_last_name"
            label="Last name (required)"
            placeholder="Admin last or family name"
            type="text"
            class="inherit-full-input"
            :invalid-message="$utils.validateRequiredField($v, 'admin_last_name')"
          />
          <!-- <PhoneInput
            v-model="form.admin_phoneno"
            label="Phone number (required)"
            placeholder="eg 0349990390"
            @input="$v.$touch()"
          /> -->
          <MsisdnPhoneInput
            v-model="form.admin_phoneno"
            label="Phone number (required)"
            :error-message="$utils.validateRequiredField($v, 'admin_phoneno')"
          />
          <cv-text-input
            v-model="form.admin_email"
            label="Email"
            placeholder="Email"
            class="inherit-full-input"
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
            {{ form.main_branch_id ? 'Update company' : 'Create company' }}
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

export default {
  name: 'CompanyAdminInformation',

  mixins: [MultiStep],

  data() {
    return {
      form: {
      },
      icon: ChevronRight,
      previous: 'CompanyInformation',
      parent: 'CorporateClients',
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
      admin_first_name: { required },
      admin_last_name: { required },
      admin_phoneno: { required },
      admin_email: { email },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'clients/addToCurrentUser',
      createClient: 'clients/create',
      updateClient: 'clients/update',
      refresh: 'clients/refreshForm',
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
      console.info(JSON.parse(JSON.stringify(this.storeData)))
      let payload = {
        company_name : this.form.company_name,
        tin_number: this.form.tin_number,
        address: this.form.address,
        admin_first_name: this.form.admin_first_name,
        admin_last_name: this.form.admin_last_name,
        admin_phoneno : this.form.admin_phoneno,
        admin_email: this.form.admin_email,
        authorizedBy: this.userName,
      }
      try {
        await this.createClient(payload)
        this.$toast.open({
          message: 'Company successfully created!',
        })
        this.loading = false
        this.$router.push({name: 'CorporateClients'})
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
      this.loading = true
      console.info(JSON.parse(JSON.stringify(this.storeData)))
      try {
        await this.updateClient(this.form)
        this.$toast.open({
          message: 'Company successfully updated!',
        })
        this.loading = false
        this.$router.push({name: 'CorporateClients'})
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
      this.loading = false
    },
  },
}
</script>
