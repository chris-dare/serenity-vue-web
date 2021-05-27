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
        v-model="form.payment_options[0].payment_type"
        :options="methods"
        title="Primary method of payment"
        placeholder="Payment Type"
        :multiple="false"
        label="display"
        track-by="code"
        custom-field="code"
        preselect
      />
      <MultiSelect
        v-if="isMoMo"
        v-model="form.payment_options[0].payment_details.payment_provider"
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
        v-model="form.payment_options[0].payment_details.msisdn"
        label="Phone number"
      />
      <FormCountrySelect
        v-if="isMoMo"
        v-model="form.payment_options[0].payment_details.country"
        title="Country"
        placeholder="Country"
      />
    </div>
    <PatientSuccessModal :visible.sync="visible" />
  </MultiStepBase>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import PatientSuccessModal from '@/components/patients/modals/PatientSuccessModal'
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Payment',

  components: {PatientSuccessModal},

  mixins: [MultiStep],

  data() {
    return {
      form: {
        payment_options: [{
          payment_details: {},
        }],
      },
      icon: Checkmark,
      visible: false,
      parent: 'Patients',
      previous: 'SocialInfo',
      loading: false,
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.patients.currentPatient,
      vendors: (state) => state.resources.vendors,
      methods: (state) => state.resources.paymentMethods,
    }),

    isMoMo() {
      return this.form.payment_options[0].payment_type === 'MOBILE_MONEY'
    },
  },

  created() {
    if(!this.form.payment_options[0].payment_details.msisdn){ 
      this.form.payment_options[0].payment_details.msisdn = this.form.mobile
    }
  },

  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      gender: { required },
      mobile: { required },
    },
  },
  
  methods: {
    ...mapActions({
      addToStoreData: 'patients/addToCurrentPatient',
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
      refresh: 'patients/refreshCurrentPatient',
      createPatient: 'patients/createPatient',
      updatePatient: 'patients/updatePatient',
    }),

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid || this.disabled) {
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
        const data = await this.createPatient(this.form)
        this.$toast.open({
          message: 'Patient successfully added',
        })

        if (this.$route.query.reroute) {
          this.rerouteToAppointment(data)
        }
        this.visible = true
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
        await this.updatePatient(this.form)
        this.$toast.open({
          message: 'Patient successfully updated',
        })
        this.$router.push({name: 'PatientSummary', params: { id:this.form.id }})
      } catch (error) {
        console.info(error)
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
      }

      this.loading = false
    },

    rerouteToAppointment(patient) {
      this.addToCurrentAppointment({ patient })
      this.router.push({ name: 'DateDoctor' })
    },

  },
}
</script>
