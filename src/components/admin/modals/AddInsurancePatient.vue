<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    :title="type === 'update' ? 'Update Beneficiary' : 'Add new Beneficiary'"
    @closed="close"
  >
    <template>
      <SeForm>
        <FilterGroup
          v-if="type === 'add'"
          v-model="selected"
          :filters="filters"
          class="my-3"
        />
        <div>
          <div
            v-if="type === 'add'"
            class="my-3"
          >
            <AutoCompletePatients
              v-if="selected === 'existing'"
              v-model="patient"
              class="multiselect-white flex-1"
              :custom-label="(value) => `${$utils.concatData(value, ['title', 'first_name', 'last_name'])} - (${value.mr_number})`"
              @input="searchData"
            />
          </div>
          <AddInsuranceForm
            v-model="form"
            :edit="type === 'update'"
            @invalid="setDisabledState"
          />
        </div>
      </SeForm>
      <div class="flex justify-between items-center my-8">
        <p
          class="text-center"
          style="cursor: pointer"
          @click="close"
        >
          Cancel
        </p>
        <SeButton
          :loading="loading"
          @click="submit"
        >
          {{ type === 'update' ? 'Update Beneficiary' : 'Add Beneficiary' }}
        </SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import AddInsuranceForm from '@/components/forms/AddInsuranceForm'
import { emailFormatter } from '@/services/custom-validators'
import modalMixin from '@/mixins/modal'
import DataMixin from '@/mixins/paginated'

export default {
  name: 'AddInsurancePatient',

  components: { AddInsuranceForm },

  mixins: [modalMixin, DataMixin],

  data() {
    return {
      loading: false,
      visible: false,
      type: 'add',
      vertical: true,
      form: {},
      selected: 'existing',
      patient: null,
      disabled: true,
      name: 'add-insurance-patient-modal',
    }
  },

  computed:{
    ...mapState({
      client: (state) => state.clients.client,
      genders: (state) => state.resources.genders,
    }),

    ...mapGetters({
      userName: 'auth/fullName',
    }),

    filters() {
      return [
        { display: 'Existing Patient', code: 'existing' },
        { display: 'New Patient', code: 'new' },
      ]
    },
  },

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      mobile: { required },
      email: { required, email: (val) => email(emailFormatter(val)) },
      gender: { required },
      date_of_birth: { required },
      maximum_dependents_allowed: { required },
      occupational_role: { required },
      address: { required },
    },
  },

  events: {
    'insurance-patient:add:open': function(){
      let id = this.$route.params.id
      this.open()
      this.form.managing_organization = id
      this.type = 'add'
    },
    'insurance-patient:edit:open': function(data){
      this.open()
      let id = this.$route.params.id
      this.form = data.params[0]
      this.form.managing_organization = id
      this.type = 'update'
    },
  },

  watch: {
    patient: {
      handler(val) {
        if (val) {
          this.form = this.formattedFields(this.form)
        }
      },
    },
  },

  methods: {
    ...mapActions({
      depositClient: 'clients/deposit',
      updateClient: 'clients/update',
      addBenefactor: 'corporate/createInsuranceBenefactor',
      updateEmployee: 'corporate/updateBeneficiary',
      getBeneficiaries: 'corporate/getBeneficiaries',
    }),

    submit(){
      // this.$v.$touch()

      // if (this.$v.$invalid) {
      //   this.$toast.open({
      //     message: 'Please these fields are required!',
      //     type: 'error',
      //   })
      //   return
      // }

      if (this.type === 'update') {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true
      let id = this.$route.params.id
      this.form.date_of_birth = this.form.birth_date
      this.form.managing_organization = id
      this.form.mr_number = this.patient?.mr_number

      try {
        await this.addBenefactor({ id, form:  {...this.form} })
        this.$toast.open('Client beneficiary successfully created')
        this.$resetData()
        this.getBeneficiaries({ clientId: id })
        this.close()
      } catch (error) {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
    },

    async update() {
      this.loading = true
      let id = this.$route.params.id
      this.form.beneficiary_id = this.form.uuid
      try {
        await this.updateEmployee(this.form)
        this.$toast.open({
          message: 'Employee successfully updated',
        })
        this.getBeneficiaries({ clientId: id })
        this.close()
        this.loading = false
      } catch (error) {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
    },

    formattedFields(form) {
      let newForm = { ...form }

      if (this.patient) {
        newForm = {
          ...form,
          first_name: this.patient.first_name,
          last_name: this.patient.last_name,
          date_of_birth: this.patient.birth_date,
          gender: this.patient.gender,
          mobile: this.patient.mobile,
          email: this.patient.email,
        }
      }

      return newForm
    },

    setDisabledState(event) {
      this.disabled = event
    },
  },
}
</script>
