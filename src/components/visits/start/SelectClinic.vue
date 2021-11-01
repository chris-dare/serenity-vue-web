<template>
  <SeForm>
    <p class="text-primary font-semibold my-4">
      {{ modal ? 'Reason for visit' : 'Why are you booking this appointment?' }}
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
        v-model="localValue.appointmentType"
        title="Choose an appointment type"
        :multiple="false"
        :options="types"
        label="label"
        track-by="value"
        placeholder="Select type"
        :error-message="$utils.validateRequiredField(v, 'appointmentType')"
        preselect
        custom-field="value"
      />
      <MultiSelect
        v-model="localValue.service"
        title="Choose a service"
        :multiple="false"
        :options="filteredServices"
        label="healthcare_service_name"
        track-by="id"
        placeholder="Select service"
        :error-message="$utils.validateRequiredField(v, 'service')"
        preselect
        @select="clear"
      />

      <MultiSelect
        ref="specialty"
        v-model="localValue.specialty"
        title="Choose a specialty"
        :multiple="false"
        :options="specialties"
        label="display"
        track-by="code"
        placeholder="Specialties"
        :error-message="$utils.validateRequiredField(v, 'specialty')"
      />

      <MultiSelect
        ref="serviceTier"
        v-model="localValue.service_tier"
        title="Choose a service tier"
        :multiple="false"
        :options="serviceTiers"
        label="label"
        track-by="value"
        placeholder="Service tiers"
        :error-message="$utils.validateRequiredField(v, 'service_tier')"
        preselect
      />
    </div>
    <div v-if="selected === 'virtual-care'">
      <Information class="w-5 h-5 text-info" />
      <p class="my-1">
        {{ localValue.patient.fullName }} (Patient) must meet the following requirements for
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
        v-model="localValue.address"
        label="Home/Residential address"
        placeholder="Enter venue for the home care/visit"
        type="text"
        class="inherit-full-input my-8"
      />
    </div>
    <div v-if="selected === 'diagnostic'">
      <cv-checkbox
        label="Darlene Patterson (Patient) is taking the lab for travelling purposes"
        :checked="localValue.checked"
        class="se-checkbox"
      />
    </div>
    <VirtualCareRequirementsModal :visible.sync="visible" />
  </SeForm>
</template>

<script>
import Information from '@carbon/icons-vue/es/information/32'
import VirtualCareRequirementsModal from '@/components/appointments/VirtualCareRequirementsModal'
import { mapActions, mapState } from 'vuex'
import modelMixin from '@/mixins/model'

export default {
  name: 'SelectClinic',

  components: { VirtualCareRequirementsModal, Information },

  mixins: [modelMixin],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },

    v: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      selected: 'out-patient',
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
      // specialties: (state) => state.resources.specialties,
      storeData: (state) => state.appointments.currentAppointment,
      types: (state) => state.appointments.appointmentTypes,
    }),

    filteredServices() {
      if (this.selected === 'diagnostic') {
        return this.services.filter(service => service.categories.toLowerCase() === 'diagnostic')
      }

      return this.services
    },

    appointmentTypes() {
      if (this.workspaceType === 'RECEPT') {
        return [
          {
            label: 'Out patient',
            description: 'for General and special practices',
            type: 'outpatient',
            value: 'out-patient',
          },
          {
            label: 'In patient',
            description: 'for General and special practices',
            type: 'inpatient',
            value: 'in-patient',
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
          label: 'Out patient',
          description: 'for General and special practices',
          type: 'outpatient',
          value: 'out-patient',
        },
        {
          label: 'In patient',
          description: 'for General and special practices',
          type: 'inpatient',
          value: 'in-patient',
        },
        {
          label: 'Virtual care',
          description: 'for General and special practices',
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
      if (!this.localValue.service || !this.localValue.service.price_tiers) return []
      return this.localValue.service.price_tiers.map(tier => {
        return {
          label: `${tier.display} - ${tier.currency} ${tier.charge}`,
          value: tier.id,
          charge: tier.charge,
        }
      })
    },

    specialties() {
      if (!this.localValue.service) return []
      if (this.localValue.id) return this.services.find(service => service.id === this.localValue.service.id).healthcare_service_specialties
      return this.localValue.service.healthcare_service_specialties
    },
  },



  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
    }),

    clear() {
      this.$refs.specialty.clear()
      this.$refs.serviceTier.clear()
    },
  },
}
</script>
