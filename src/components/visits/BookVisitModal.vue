<template>
  <BaseModal
    :name="name"
    width="70%"
    title="Walk in patient visit"
    @closed="close"
  >
    <template>
      <AppRegisterLayout
        label=""
        :nav-items="navItems"
        :checked="step"
        modal
        @next="goToStep"
      >
        <component
          :is="stepComponent"
          v-model="form"
          modal
          :loading="loading"
          :v="$v"
          :appointment="form"
          @next="next"
          @save="startVisitOrContinue"
          @close="close"
          @create="addPatient"
          @previous="step--"
        />
        <div
          v-if="step !== 1"
          class="flex items-center justify-between mt-12 mb-6"
        >
          <SeButton
            variant="secondary"
            @click="previous"
          >
            Go back
          </SeButton>
          <div class="flex items-center space-x-2">
            <SeButton
              v-if="stepComponent === 'VisitPayment'"
              variant="secondary"
              @click="skip"
            >
              Skip
            </SeButton>
            <SeButton
              :icon="icon"
              :loading="loading"
              @click="next"
            >
              {{ isLastStep ? "Start Visit" : "Next" }}
            </SeButton>
          </div>
        </div>
      </AppRegisterLayout>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
import paymentMixin from '@/mixins/payment'
import { mapActions, mapGetters, mapState } from 'vuex'
import isToday from 'date-fns/isToday'
import parseISO from 'date-fns/parseISO'
import VisitSelectPatient from '@/components/visits/start/VisitSelectPatient'
import VisitSelectSlot from '@/components/visits/start/VisitSelectSlot'
import SelectClinic from '@/components/visits/start/SelectClinic'
import VisitNotesForm from '@/components/visits/start/VisitNotesForm'
import VisitPayment from '@/components/visits/start/VisitPayment'
import AppointmentDetail from '@/components/appointments/AppointmentDetail'
import { required, minValue } from 'vuelidate/lib/validators'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/16'
import Patient from '@/models/Patient'
import AppointmentsAPI from '@/api/appointments'

export default {
  name: 'BookVisitModal',

  components: { VisitSelectPatient, SelectClinic, VisitSelectSlot, VisitNotesForm, VisitPayment, AppointmentDetail },

  mixins: [modalMixin, paymentMixin],

  data() {
    return {
      step: 1,
      loading: false,
      icon: ChevronRight,
      form: {
        patient: {},
        slot: null,
      },
      name: 'book-visit-modal',
    }
  },

  events: {
    'start:visit:open': function(){
      this.open()
    },
    'start:visit:close': function(){
      this.close()
    },
  },

  validations() {
    let form = {
      patient: {
        required,
      },
    }

    if (this.step === 2) {
      form = Object.assign(form, {
        service: { required },
        appointmentType: { required },
        specialty: { required },
        service_tier: { required },
      })
    }

    if (this.step === 3) {
      form = Object.assign(form, {
        slot: { required },
      })
    }

    if (this.isLastStep) {
      form = Object.assign(form, {
        slot: { required },
        service: { required },
        appointmentType: { required },
        specialty: { required },
        service_tier: { required },
      })
    }

    if(this.form.transaction_type === 'cash' && this.hasCharge){
      return {
        form: {
          amount: { minValue: minValue(this.charge) },
        },
      }
    }

    return { form }
  },

  computed: {
    ...mapState({
      currentAppointment: (state) => state.appointments.currentAppointment,
      provider: (state) => state.auth.provider,
    }),

    ...mapGetters({
      userAccounts: 'billing/userAccounts',
      hasPaymentPermission: 'auth/hasPaymentPermission',
    }),

    charge() {
      return parseInt(this.form.service_tier?.charge)
    },

    hasCharge() {
      return this.charge !== 0
    },

    navItems() {
      const navItems = [
        { label: 'Select patient', description: 'Existing or new patient', path: 1, completed: false, step: 1, slug: 'select-patient' },
        { label: 'Clinics, Services', description: 'Choose service', path: 2, completed: false, step: 2, slug: 'clinic-service' },
        { label: 'Date, Doctor', description: 'Choose your date and doctor', path: 3, completed: false, step: 3, slug: 'date-doctor' },
        { label: 'Notes', description: 'Any notes to take', path: 4, completed: false, step: 4, slug: 'notes' },
      ]

      if (this.hasCharge && this.hasPaymentPermission) {
        navItems.push(
          { label: 'Payment', description: 'How patient makes payment', path: 5, completed: false, step: 5, slug: 'payment'},
        )
      }

      navItems.push({ label: 'Summary', description: 'Overview of appointment', path: 6, completed: false, step: 6, slug: 'summary' })

      return navItems
    },

    stepComponent() {
      let components = {
        1: 'VisitSelectPatient',
        2: 'SelectClinic',
        3: 'VisitSelectSlot',
        4: 'VisitNotesForm',
        5: 'AppointmentDetail',
      }

      if (this.hasCharge && this.hasPaymentPermission) {
        components[5] = 'VisitPayment'
        components[6] = 'AppointmentDetail'
      } else {
        components[5] = 'AppointmentDetail'
      }

      return components[this.step]
    },

    isLastStep() {
      return this.navItems.length === this.step
    },
  },

  watch: {
    step() {
      this.loading = false
    },
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatients',
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
      refreshCurrentAppointment: 'appointments/refreshCurrentAppointment',
      createVisit: 'visits/createVisit',
      getSlots: 'appointments/getAvailableDoctors',
      createAppointment: 'appointments/createAppointment',
      createPatient: 'patients/createPatient',
      topUpUserAccount: 'billing/topUpUserAccount',
      resetPatientAccounts: 'billing/resetPatientAccounts',
    }),

    goToStep(step) {
      this.step = step
    },

    async checkForSpecialty() {
      const service = this.form.service

      if(!service){
        this.step = 2
        this.$toast.error('Please select a service before proceeding')
        return
      }

      this.loading = true

      await this.filter()
      await this.getPatientAppointments()
      this.step = this.step + 1
      this.loading = false
    },

    async filter() {
      const filters = this.convertFromDatePickerFormat(new Date())
      await this.getSlots({ healthcareservice: this.form.service.id, ...filters })
    },

    async getPatientAppointments() {
      const {data} = await AppointmentsAPI.list(this.$providerId, {
        patient: this.form?.patient?.id,
        // start__gte: this.$date.userNow(),
        healthcare_service__id: this.form?.service?.id,
      })
      let slot = data.results ? data.results.find(app => isToday(parseISO(app.slot.start))) : {}
      this.form.slot = slot ? {
        ...slot.slot,
        practitioner_name: slot.practitioner.full_name,
        practitioner_role: slot.practitioner.practitioner_role,
      } : null
    },

    convertFromDatePickerFormat(val) {
      return {
        start__gt: this.$date.formatQueryParamsDate(val),
        end__lt: this.$date.formatQueryParamsDate(this.$date.endOfDate(val)),
      }
    },

    next() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please fill all required fields')
        return
      }

      if (this.isLastStep) {
        this.bookAndStart()
        return
      }

      // if (this.step === 5 && this.form.amount && this.form.transaction_type === 'cash') {
      //   this.receiveCash()
      //   return
      // }

      if (this.step === 2) {
        this.checkForSpecialty()
        return
      }

      this.step = this.step + 1
    },

    skip() {
      this.form.transaction_type = null
      this.next()
    },

    previous() {
      if (this.step === 1) {
        return
      }
      this.step = this.step - 1
    },

    startVisitOrContinue(patient) {
      if (patient.next_appointment && isToday(new Date(patient.next_appointment.start))) {
        this.start(patient)
      } else {
        this.next()
      }
    },

    async bookAndStart() {
      try {
        this.loading = true
        // const appointment = await this.createAppointment(this.form)

        await this.createVisit({
          patient: this.form.patient.id,
          // appointment: appointment.id,
          status: 'arrived',
          assigned_to: this.form.slot.practitioner_role,
          visit_class: 'ambulatory',
          arrived_at: this.$date.queryNow(),
          slot: this.form.slot?.id,
          service_provider: this.provider.id,
          account_id: this.form.account_id,
          transaction_type: this.form.transaction_type,
          price_tier: this.form.service_tier?.value,
          location: this.$locationId,
          ...this.getPaymentParams(this.form),
        })
        this.$toast.open({ message: 'The visit has started' })
        this.loading = false
        this.close()

      } catch (error) {
        this.loading = false
      }
    },

    async start(patient) {
      try {
        this.loading = true
        await this.createVisit({
          patient: patient.id,
          appointment: patient.next_appointment.id,
          status: 'planned',
          assigned_to: patient.next_appointment.practitioner_role,
          visit_class: 'ambulatory',
          arrived_at: this.$date.queryNow(),
          service_provider: this.provider.id,
          location: this.$locationId,
        })
        this.close()
        this.loading = false
        this.$toast.open({ message: 'The visit has started' })
      } catch (error) {
        this.loading = false
      }
    },

    async addPatient() {
      try {
        this.loading = true
        const data = await this.createPatient(this.form.patient)
        this.$toast.open({ message: 'Patient has been created'})
        this.form.patient =  new Patient(data).getNormalizedView()
        this.next()
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    async receiveCash() {
      if (!this.userAccounts.length) {
        this.$toast.error({ message: 'The user needs an account to proceed'})
        return
      }
      this.loading = true
      try {
        await this.topUpUserAccount({
          patientId: this.form.patient.id,
          walletId: this.userAccounts[0].uuid,
          params: {
            amount: this.form.amount,
            currency: this.form.currency,
            cashier: this.$providerId,
            transaction_type: this.$global.CASH_TYPE,
            name: this.form.patient.name,
            reference_type: 'CASH_DEPOSIT',
          },
        })
        this.form.amount = null
        this.loading = false
        this.$toast.success('Top up successful')
        this.next()
      } catch (error) {
        this.loading = false
      }
    },

    async afterCloseFunction() {
      await this.resetPatientAccounts()
    },
  },
}
</script>
