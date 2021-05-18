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
            @click="$router.push({ name: 'Biodata', params: { id: patient.id } })"
          >
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <SeButton
          v-if="!hasActiveEncounter"
          variant="secondary"
          @click="$trigger('start:encounter:open')"
        >
          Start Encounter
          <Add class="ml-2 w-5 h-5 text-white" />
        </SeButton>
        <div
          v-else
          class="flex items-center space-x-4"
        >
          <p
            class="underline cursor-pointer"
            @click="end"
          >
            End Encounter
          </p>
          <AddNewDropdown />
        
          <SeButton
            variant="warning"
          >
            Begin Consultation
          </SeButton>
          <SeButton
            v-if="false"
            variant="danger"
            @click="$trigger('profile:deceased-info:open')"
          >
            Patient is deceaseed - read more
          </SeButton>
        </div>
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
import { mapState, mapActions, mapGetters } from 'vuex'
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

    ...mapGetters({
      hasActiveEncounter: 'encounters/hasActiveEncounter',
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
    next(async vm => {
      vm.loading = true
      await vm.initSinglePatientInformation(vm.id)
      vm.loading = false
    })
  },

  methods: {
    ...mapActions({
      initSinglePatientInformation: 'patients/initSinglePatientInformation',
      endEncounter: 'encounters/endEncounter',
    }),


    end() {
      this.$trigger('visit:end:open', {
        callback: async () => {
          this.loading = true
          try {
            await this.endEncounter()
            this.$toast.open({
              message: 'Encounter ended successfully',
            })
            this.loading = false
          } catch (error) {
            // empty
            throw error || error.message
          }
        },
      })
    },
  },
}
</script>
