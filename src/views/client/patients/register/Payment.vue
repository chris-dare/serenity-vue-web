<template>
  <MultiStepBase
    next-label="Finish"
    :loading="loading"
    :previous="previous"
    :icon="icon"
    :query="$route.query"
    @cancel="cancel"
    @save="submit"
  >
    <div class="grid grid-cols-2 gap-8">
      <MultiSelect
        v-model="form.patient_top_up_payment_methods[0].type"
        :options="methods"
        title="Primary method of payment"
        placeholder="Payment Type"
        :multiple="false"
        label="display"
        track-by="code"
        custom-field="code"
        preselect
      />
      <AddInsuranceForm
        v-if="form.patient_top_up_payment_methods[0].type === $global.INSURANCE_TYPE && !form.id"
        v-model="insurance"
        class="col-span-2"
        @invalid="setDisabledState"
      />
      <MultiSelect
        v-if="isMoMo"
        v-model="form.patient_top_up_payment_methods[0].momo_vendor"
        :options="vendors"
        label="display"
        track-by="code"
        custom-field="code"
        title="Payment provider"
        placeholder="Payment Type"
        :multiple="false"
      />
      <MsisdnPhoneInput
        v-if="isMoMo"
        v-model="form.patient_top_up_payment_methods[0].msisdn"
        label="Phone number"
      />
    </div>
    <PatientSuccessModal :visible.sync="visible" />
  </MultiStepBase>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import PatientSuccessModal from '@/components/patients/modals/PatientSuccessModal'
import AddInsuranceForm from '@/components/forms/AddInsuranceForm'
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required, email } from 'vuelidate/lib/validators'
import { emailFormatter } from '@/services/custom-validators'
import PatientAPI from '@/api/patients'
import InsuranceAPI from '@/api/insurance'
import omit from 'lodash/omit'
// import pick from 'lodash/pick'

export default {
  name: 'Payment',

  components: { PatientSuccessModal, AddInsuranceForm },

  mixins: [MultiStep],

  data() {
    return {
      form: {
        patient_top_up_payment_methods: [{}],
      },
      insurance: {},
      icon: Checkmark,
      visible: false,
      parent: 'Patients',
      previous: 'SocialInfo',
      loading: false,
      insuranceInvalid: false,
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.patients.currentPatient,
      vendors: (state) => state.resources.vendors,
      methods: (state) => state.resources.paymentMethods,
    }),

    isMoMo() {
      return this.form.patient_top_up_payment_methods[0].type === 'mobile-money'
    },

    isInsurance() {
      return this.form.patient_top_up_payment_methods[0].type === this.$global.INSURANCE_TYPE
    },
  },

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      gender: { required },
      birth_date: { required },
      mobile: { required },
      email: { required, email: (val) => email(emailFormatter(val)) },
    },
  },

  created() {
    this.getPaymentMethods()
    this.getMobileMoneyVendors()
  },

  methods: {
    ...mapActions({
      addToStoreData: 'patients/addToCurrentPatient',
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
      getInsuranceProvider: 'clients/getClients',
      refresh: 'patients/refreshCurrentPatient',
      createPatient: 'patients/createPatient',
      updatePatient: 'patients/updatePatient',
      getPaymentMethods: 'resources/getPaymentMethods',
      getMobileMoneyVendors: 'resources/getMobileMoneyVendors',
    }),

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid || (!this.form.id && this.insuranceInvalid && this.isInsurance)) {
        this.$toast.error('Fill all required fields in previous steps!')
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true
      try {
        
        const data = await this.createPatient(omit(this.form, ['photo']))
        await this.uploadImage({ ...data, ...this.form })

        if (this.form.patient_top_up_payment_methods[0].type === this.$global.INSURANCE_TYPE) {
          this.insurance = {
            ...this.insurance,
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            mobile: this.form.mobile,
            email: this.form.email,
            gender: this.form.gender,
            date_of_birth: this.form.birth_date,
          }
          await InsuranceAPI.registerPatientAsBeneficiary(this.$providerId, this.insurance.managing_organization, this.insurance)
        }

        
        this.$toast.open({
          message: 'Patient successfully added',
        })

        if (this.$route.query.reroute) {
          this.rerouteToAppointment(data)
          return
        }

        this.confirmChanges(data.id)
        // this.visible = true
        this.loading = false

      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
        throw error
      }
    },

    async update() {
      this.loading = true

      this.addToStoreData(this.form)

      try {
        await this.uploadImage(this.form)
        await this.updatePatient(omit(this.form, ['photo']))
        this.$toast.open({
          message: 'Patient successfully updated',
        })
        this.$router.push({name: 'PatientSummary', params: { id:this.form.id }})
      } catch (error) {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
      }

      this.loading = false
    },

    async uploadImage(form) {
      if (!form.photo || typeof form.photo === 'string') return
      try {
        let fd = new FormData()
        fd.append('object_name', form.photo)
        await PatientAPI.upload(this.$providerId, form.id, fd)
      } catch (error) {
        console.log('error', error)
      }
    },

    confirmChanges(id) {
      this.$trigger('actions-modal:open', {
        confirmButtonText: 'Go to patient profile',
        cancelButtonText: 'Return to dashboard',
        label: 'Patient Profile has been successfully created!',
        callback: async () => {
          this.$router.push({ name: 'PatientSummary', params: { id }})
        },
        cancel: async () => {
          this.$router.push({ name: 'Patients'})
        },
      })
    },

    rerouteToAppointment(patient) {
      this.addToCurrentAppointment({ patient })
      this.router.push({ name: 'DateDoctor' })
    },

    setDisabledState(event) {
      this.insuranceInvalid = event
    },

  },
}
</script>
