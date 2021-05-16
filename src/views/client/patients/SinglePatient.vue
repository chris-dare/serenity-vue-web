<template>
  <div
    class="w-4/5 mx-auto"
  >
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center space-x-4">
          <ImageBlock
            :url="patient.url"
            :alt="patient.name"
          />
          <div>
            <p>{{ patient.name }}</p>
            <p class="text-secondary  capitalize">
              {{ patient.gender_age_description }}
            </p>
            <div class="mt-2 flex items-center">
              <div class="bg-green-700 w-3 h-3 rounded-full mr-2" />
              <p>MR No: {{ patient.mr_number }}</p>
            </div>
          </div>
        </div>
        <div
          class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
        >
          <img
            src="@/assets/img/edit 1.svg"
            class="w-4 h-4"
            @click="$router.push({name: 'Biodata', params: {id: patient.id}})"
          >
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <p
          class="underline cursor-pointer"
          @click="$trigger('visit:end:open')"
        >
          End Visit
        </p>
        <AddNewDropdown />
        <cv-button
          v-if="!hasEncounter"
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
          @click="$router.push({ name: 'SelectPatient' })"
        >
          Record a new encounter
          <Add class="ml-2 w-5 h-5 text-white" />
        </cv-button>
        <cv-button
          v-else
          kind="primary"
          size="field"
          class="px-4 bg-warning hover:bg-warning mr-2 text-black"
          @click="$router.push({ name: 'SelectPatient' })"
        >
          Open ongoing encounter
          <Add class="ml-2 w-5 h-5 text-white" />
        </cv-button>
        <SeButton
          v-if="false"
          variant="danger"
          @click="$trigger('profile:deceased-info:open')"
        >
          Patient is deceaseed - read more
        </SeButton>
      </div>
    </div>

    <div>
      <PatientDetailsNav />
      
      <router-view />
    </div>
    <SinglePatientModals />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddNewDropdown from '@/components/patients/AddNewDropdown'
import SinglePatientModals from '@/components/patients/modals/SinglePatientModals'
import PatientDetailsNav from '@/components/patients/PatientDetailsNav'

export default {
  name: 'SinglePatient',

  components: { AddNewDropdown, SinglePatientModals, PatientDetailsNav },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      hasEncounter: false,
      visible: false,
      admitModal: false,
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      workspaceType: (state) => state.global.workspaceType,
    }),

    links() {
      let links = [
        { label: 'Actions', path: 'PatientActions' },
        { label: 'Summary', path: 'PatientSummary' },
      ]

      if (this.workspaceType === 'Reception') {
        links.push({ label: 'Chart', path: 'PatientCharts' },{ label: 'Appointments', path: 'PatientAppointments' })
      } else {
        links.push(
          { label: 'Timeline', path: 'PatientTimeline' },
          { label: 'Chart', path: 'PatientCharts' },
          { label: 'Appointments', path: 'PatientAppointments' },
          { label: 'Encounters', path: 'PatientEncounters' },
          { label: 'Prescriptions', path: 'PatientPrescriptions' },
          { label: 'Orders/Billing', path: 'PatientOrders' },
          { label: 'Reports', path: 'PatientReports' },
          { label: 'Notes', path: 'PatientNotes' })
      }
      return links

    },

    isSelected() {
      return (index) => this.initialSelected === index
    },
  },

  beforeRouteEnter (to, from, next) {
    next(vm => vm.getPatient(vm.id))
  },

  methods: {
    ...mapActions({
      getPatient: 'patients/getPatient',
    }),
  },
}
</script>
