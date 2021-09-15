<template>
  <div>
    <cv-form @submit.prevent="">
      <!-- title -->
      <div class=" gap-8 my-8">
        <FormInput
          v-model="form.company_name"
          type="text"
          label="Company name"
          placeholder=""
          disabled
        />
        <div
          class="grid justify-center my-8"
        >
          <cv-radio-group>
            <cv-radio-button
              v-model="form.state"
              name="Verified"
              label="Verified"
              value="verified"
            />
            <cv-radio-button
              v-model="form.state"
              name="Unverified"
              label="Unverfied"
              value="unverified"
            />
            <cv-radio-button
              v-model="form.state"
              name="Suspended"
              label="Suspended"
              value="suspended"
            />
          </cv-radio-group>
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
            {{ form.main_branch_id ? 'Update Company' : 'Create company' }}
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
  name: 'Verification',

  mixins: [MultiStep],

  data() {
    return {
      form: {
      },
      icon: ChevronRight,
      previous: 'CompanyAdminInformation',
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
      admin_email: { email: (val) => email(emailFormatter(val)) },
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
