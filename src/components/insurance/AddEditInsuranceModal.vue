<template>
  <BaseModal
    :name="name"
    @closed="close"
  >
    <template>
      <div class="space-y-8">
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'Add' }} insurance service</p>
        <AddInsuranceForm
          v-model="form"
          @invalid="setDisabledState"
        />

        <div class="flex justify-between items-center">
          <SeButton
            variant="outline"
            @click="close"
          >
            Cancel
          </SeButton>
          <SeButton
            :disabled="disabled"
            :loading="loading"
            @click="submit"
          >
            Save
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import AddInsuranceForm from '@/components/forms/AddInsuranceForm'
import modalMixin from '@/mixins/modal'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import InsuranceAPI from '@/api/insurance'
import { mapActions } from 'vuex'

export default {
  name: 'AddEditInsuranceModal',

  components: { AddInsuranceForm },

  mixins: [modalMixin],

  data() {
    return {
      form: {
        contribution_currency: 'GHS',
      },
      loading: false,
      patient: null,
      disabled: true,
      name: 'add-edit-insurance-modal',
    }
  },

  events: {
    'insurance:add:open': function(data){
      this.getInsuranceProvider({filters: { organization_type: 'INS'}})
      this.open()
      this.patient = data.params[0]
      if (this.patient) {
        this.form = pick(this.patient, ['first_name', 'last_name', 'mobile', 'email', 'gender', 'birth_date'])
        
        this.form.contribution_currency = 'GHS'
      }
    },

    'insurance:edit:open': function(data){
      this.open()
      this.form = data.params[0]
    },
  },

  methods: {
    ...mapActions({
      getInsuranceProvider: 'clients/getClients',
      getPatientAccounts: 'billing/getPatientAccounts',
      
    }),

    async submit() {
      try {
        this.loading = true
        this.form.date_of_birth = this.form.birth_date
        await InsuranceAPI.registerPatientAsBeneficiary(this.$providerId, this.form.managing_organization, omit(this.form, 'birth_date'))
        this.$toast.open('Patient added successfully')
        this.getPatientAccounts({ id: this.patient.id })
        this.close()
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        }) 
      } finally {
        this.loading = false
      }
    },

    setDisabledState(event) {
      this.disabled = event
    },
  },

}
</script>
