<template>
  <div class="">
    <p class="text-primary my-4">
      Which clinic are you booking this appointment to?
    </p>
    <div class="grid grid-cols-3 gap-4">
      <PatientCard
        v-for="(appointment, index) in appointmentTypes"
        :key="index"
        :is-selected="selected === appointment.value"
        :details="appointment"
        :type="appointment.type"
        @click="selected = appointment.value"
      />
    </div>
    <div class="grid grid-cols-2 gap-4 mt-8 mb-6">
      <cv-select
        v-model="form.service"
        label="Choose a service"
        class="inherit-full-input"
        placeholder="Male or female"
      >
        <cv-select-option
          disabled
          selected
          hidden
        >
          In Patient General Practice
        </cv-select-option>
        <cv-select-option value="male">Male</cv-select-option>
        <cv-select-option value="female">FeMale</cv-select-option>
      </cv-select>
      <cv-select
        v-model="form.service_tier"
        label="Choose a service tier"
        class="inherit-full-input"
        placeholder="Male or female"
      >
        <cv-select-option
          disabled
          selected
          hidden
        >
          Service tiers
        </cv-select-option>
        <cv-select-option value="male">Male</cv-select-option>
        <cv-select-option value="female">FeMale</cv-select-option>
      </cv-select>
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

    <div class="flex items-center justify-between my-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary px-6 mr-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
        >
          Cancel
        </cv-button>
        <cv-button
          class="bg-black px-6"
          kind="primary"
          @click="$router.push({ name: 'SelectPatient' })"
        >
          Go back
        </cv-button>
      </div>
      <div class="flex items-center">
        <cv-button
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary"
          @click="save"
        >
          Next: Date, Doctor
        </cv-button>
      </div>
    </div>
    <VirtualCareRequirementsModal :visible.sync="visible" />
  </div>
</template>

<script>
import Information from '@carbon/icons-vue/es/information/32'
import PatientCard from '@/components/appointments/PatientCard'
import VirtualCareRequirementsModal from '@/components/appointments/VirtualCareRequirementsModal'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ClinicsServices',

  components: { PatientCard, VirtualCareRequirementsModal, Information },

  data() {
    return {
      selected: 'in-patient',
      form: {
        service:'In Patient General Practice',
        service_tier: 'Service Tier',
      },
      visible: false,
      icon: ChevronRight,
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
    }),

    appointmentTypes() {
      if (this.workspaceType === 'Reception') {
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
  },

  methods: {
    ...mapActions({
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
    }),

    save() {
      this.addToCurrentAppointment(this.form)
      this.$router.push({ name: 'DateDoctor' })
    },
  },
}
</script>
