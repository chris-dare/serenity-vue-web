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
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required, email } from 'vuelidate/lib/validators'
import { emailFormatter } from '@/services/custom-validators'
import PatientAPI from '@/api/patients'
import omit from 'lodash/omit'

export default {
  name: 'Payment',

  components: {PatientSuccessModal},

  mixins: [MultiStep],

  data() {
    return {
      form: {
        patient_top_up_payment_methods: [{}],
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
      return this.form.patient_top_up_payment_methods[0].type === 'mobile-money'
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

      if (this.$v.$invalid) {
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
        await this.uploadImage({...data, ...this.form})
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

  },
}
</script>
