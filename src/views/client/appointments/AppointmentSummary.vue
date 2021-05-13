<template>
  <MultiStepBase
    :icon="icon"
    next-label="Book Appointment"
    :previous="previous"
    :loading="loading"
    @cancel="cancel"
    @save="save"
  >
    <div
      
      class="border-b border-solid border-subtle py-6"
    >
      <p class="text-secondary mb-4">Patient</p>
      <div
        v-if="storeData.patient"
        class="grid grid-cols-7 gap-4 items-center"
      >
        <div class="col-span-3">
          <InfoImageBlock
            :label="storeData.patient.name"
            :description="storeData.patient.gender_age_description"
          />
        </div>
        <div class="col-span-3">
          <p>{{ storeData.patient.phone }}</p>
        </div>
        <div>
          <router-link
            tag="div"
            :to="{name: 'SelectPatient'}"
            class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
          >
            <img
              src="@/assets/img/edit 1.svg"
              class="w-4 h-4"
            >
          </router-link>
        </div>
      </div>
      <p v-else>No patient selected</p>
    </div>
    <div
      
      class="border-b border-solid border-subtle py-6"
    >
      <p class="text-secondary mb-4">Clinic and Services</p>
      <div
        v-if="storeData.service"
        class="grid grid-cols-7 gap-4"
      >
        <div class="flex items-center col-span-6">
          <div
            class="w-10 h-10 flex items-center justify-center rounded-full bg-serenity-primary mr-3"
          >
            <Diagnostic class="w-7 h-7 text-white" />
          </div>
          <div>
            <p class="text-black font-semibold mb-1">{{ storeData.service.categories }}</p>
            <p class="text-secondary mb-1">
              Service:
              <span class="text-primary">{{ storeData.service.healthcare_service_name }}</span>
            </p>
            <p class="text-secondary">
              Price: <span class="text-primary">{{ storeData.service_tier.label }}</span>
            </p>
          </div>
        </div>
        <div>
          <router-link
            tag="div"
            :to="{name: 'ClinicsServices'}"
            class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
          >
            <img
              src="@/assets/img/edit 1.svg"
              class="w-4 h-4"
            >
          </router-link>
        </div>
      </div>
      <p v-else>No service selected</p>
    </div>
    <div class="border-b border-solid border-subtle py-6">
      <p class="text-secondary mb-4">Date and Doctor</p>
      <div
        v-if="storeData.slot"
        class="grid grid-cols-7 gap-4"
      >
        <div class="col-span-6">
          <InfoImageBlock
            :label="storeData.slot.practitioner.fullName"
            :description="storeData.slot.practitioner.role"
            description-color="text-primary text-base"
          />
          <p class="text-secondary text-sm">
            Appointment time: <span class="text-primary text-base">{{ $date.formatDate(storeData.slot.start, 'dd MMM') }}, {{ storeData.slot.slot }}</span>
          </p>
        </div>
        <div>
          <router-link
            tag="div"
            :to="{name: 'DateDoctor'}"
            class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
          >
            <img
              src="@/assets/img/edit 1.svg"
              class="w-4 h-4"
            >
          </router-link>
        </div>
      </div>
      <p v-else>No date and doctor selected</p>
    </div>
    <div class="border-b border-solid border-subtle py-6">
      <p class="text-secondary mb-2">Appointment notes:</p>
      <div class="grid grid-cols-7 gap-4">
        <div class="flex items-center col-span-6">
          <p>{{ storeData.comment }}</p>
        </div>
        <div>
          <router-link
            tag="div"
            :to="{name: 'AppointmentNotes'}"
            class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
          >
            <img
              src="@/assets/img/edit 1.svg"
              class="w-4 h-4"
            >
          </router-link>
        </div>
      </div>
    </div>
    <AppointmentSuccessModal :visible.sync="visible" />
    <BillingModal
      :appointment="storeData"
    />
  </MultiStepBase>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import Diagnostic from '@carbon/icons-vue/es/microscope/32'
import AppointmentSuccessModal from '@/components/patients/modals/AppointmentSuccessModal'
import BillingModal from '@/components/appointments/BillingModal'
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'AppointmentSummary',

  components: { Diagnostic, AppointmentSuccessModal, BillingModal },

  mixins: [MultiStep],

  data() {
    return {
      icon: Checkmark,
      visible: false,
      previous: 'AppointmentNotes',
      parent: 'Appointments',
    }
  },


  computed: {
    ...mapState({
      storeData: (state) => state.appointments.currentAppointment,
    }),
  },

  beforeMount() {},

  methods: {
    ...mapActions({
      createAppointment: 'appointments/createAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
      addToStoreData: 'appointments/addToCurrentAppointment',
    }),

    async save() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields from previous steps!',
          type: 'error',
        })
        return
      }
      this.addToStoreData(this.form)

      this.loading = true
      await this.createAppointment(this.storeData)

      this.$trigger('billing:details:open')
      this.loading = false
    },
  },

  validations: {
    form: {
      slot: { required  },
      service: { required  },
      patient: { required  },
      appointmentType: { required  },
    },
  },
}
</script>
