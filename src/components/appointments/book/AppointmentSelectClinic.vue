<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next: Date, Doctor"
    :previous="previous"
    :modal="modal"
    @cancel="cancel"
    @save="validateAndReroute"
  >
    <p class="text-primary my-4">
      Which clinic are you booking this appointment to?
    </p>
    <div class="grid grid-cols-3 gap-4">
      <InfoLinkCard
        v-for="(appointment, index) in appointmentTypes"
        :key="index"
        :is-selected="selected === appointment.value"
        :details="appointment"
        :type="appointment.type"
        @click="selected = appointment.value"
      />
    </div>
    <div class="grid grid-cols-2 gap-4 mt-8 mb-6">
      <MultiSelect
        v-model="form.appointmentType"
        title="Choose an appointment type"
        :multiple="false"
        :options="types"
        label="label"
        track-by="value"
        placeholder="Select type"
        :error-message="$utils.validateRequiredField($v, 'appointmentType')"
        preselect
        custom-field="value"
      />
      <MultiSelect
        v-model="form.service"
        title="Choose a service"
        :multiple="false"
        :options="services"
        label="healthcare_service_name"
        placeholder="Select service"
        :error-message="$utils.validateRequiredField($v, 'service')"
        preselect
      />

      <MultiSelect
        v-model="form.specialty"
        title="Choose a specialty"
        :multiple="false"
        :options="specialties"
        label="Display"
        track-by="Code"
        placeholder="Specialties"
        :error-message="$utils.validateRequiredField($v, 'specialty')"
      />

      <MultiSelect
        v-model="form.service_tier"
        title="Choose a service tier"
        :multiple="false"
        :options="serviceTiers"
        label="label"
        track-by="value"
        placeholder="Service tiers"
        :error-message="$utils.validateRequiredField($v, 'service_tier')"
        preselect
      />
    </div>
    <div v-if="selected === 'virtual-care'">
      <Information class="w-5 h-5 text-info" />
      <p class="my-1">
        Darlene Robertson (Patient) must meet the following requirements for
        virtual care
      </p>
      <p
        class="underline text-info text-xs cursor-pointer"
        @click="visible = !visible"
      >
        Check requirements
      </p>
    </div>
    <div v-if="selected === 'home'">
      <cv-text-input
        v-model="form.address"
        label="Home/Residential address"
        placeholder="Enter venue for the home care/visit"
        type="text"
        class="inherit-full-input my-8"
      />
    </div>
    <div v-if="selected === 'diagnostic'">
      <cv-checkbox
        label="Darlene Patterson (Patient) is taking the lab for travelling purposes"
        :checked="form.checked"
        class="se-checkbox"
      />
    </div>
    <VirtualCareRequirementsModal :visible.sync="visible" />
  </MultiStepBase>
</template>

<script>
import Information from '@carbon/icons-vue/es/information/32'
import VirtualCareRequirementsModal from '@/components/appointments/VirtualCareRequirementsModal'
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'AppointmentSelectClinic',

  components: { VirtualCareRequirementsModal, Information },

  mixins: [MultiStep],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selected: 'in-patient',
      form: {
        service: null,
      },
      visible: false,
      next: 'DateDoctor',
      previous: 'SelectPatient',
      parent: 'Appointments',
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      services: (state) => state.services.services,
      specialties: (state) => state.resources.specialties,
      storeData: (state) => state.appointments.currentAppointment,
      types: (state) => state.appointments.appointmentTypes,
    }),

    appointmentTypes() {
      if (this.workspaceType === 'RECEPT') {
        return [
          {
            label: 'In patient',
            description: 'for General and spceial pratices',
            type: 'inpatient',
            value: 'in-patient',
          },
          {
            label: 'Out patient',
            description: 'for General and spceial pratices',
            type: 'outpatient',
            value: 'out-patient',
          },
          {
            label: 'Diagnostic',
            description: 'COVID-19 and other laboratory tests',
            type: 'diagnostic',
            value: 'diagnostic',
          },
        ]
      }

      return [
        {
          label: 'In patient',
          description: 'for General and spceial pratices',
          type: 'inpatient',
          value: 'in-patient',
        },
        {
          label: 'Out patient',
          description: 'for General and spceial pratices',
          type: 'outpatient',
          value: 'out-patient',
        },
        {
          label: 'Virtual care',
          description: 'for General and spceial pratices',
          type: 'virtualcare',
          value: 'virtual-care',
        },
        {
          label: 'Home care',
          description: 'Residence/Venue for care required',
          type: 'home',
          value: 'home',
        },
        {
          label: 'Diagnostic',
          description: 'COVID-19 and other laboratory tests',
          type: 'diagnostic',
          value: 'diagnostic',
        },
      ]
    },

    serviceTiers() {
      if (!this.form.service || !this.form.service.price_tiers) return []
      return this.form.service.price_tiers.map(tier => {
        return {
          label: `${tier.name} - ${tier.currency} ${tier.cost}`,
          value: tier.name,
        }
      })
    },

    specialties() {
      if (!this.form.service) return []
      if (this.form.id) return this.services.find(service => service.id === this.form.service.id).healthcare_service_specialties
      return this.form.service.healthcare_service_specialties
    },
  },

  validations: {
    form: {
      service: { required },
      appointmentType: { required },
      specialty: { required },
      service_tier: { required },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
    }),
  },
}
</script>
