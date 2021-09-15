<template>
  <div>
    <SeForm>
      <!-- title -->
      <div>
        <div class="grid grid-cols-2 gap-8 my-8">
          <FormInput
            v-model="form.company_name"
            label="Company name"
            required
            placeholder="Company Name"
            type="text"
            class="inherit-full-input"
            :invalid-message="$utils.validateRequiredField($v, 'company_name')"
          />

          <FormInput
            v-model="form.tin_number"
            label="TIN"
            placeholder="TIN"
            class="inherit-full-input"
          />
        </div>

        <FormInput
          v-model="form.address"
          type="textarea"
          placeholder="Location address"
          label="Full provider address"
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
    </SeForm>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
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
      // email: { email: email(), required },
      // phone_number: { required },
      // tin_number: { minLength: minLength(10)},
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'clients/addToCurrentUser',
      // refresh: 'clients/refreshForm',
    }),
    actionChange() {},
    refresh(){},
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
