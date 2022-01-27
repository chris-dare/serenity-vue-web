<template>
  <AppStatePage
    :loading="loading"
    class="h-main"
  >
    <div class="grid grid-cols-4 gap-4 overflow-hidden">
      <div class="overflow-y-auto">
        <EncounterPatientSummary
          :patient="patient"
          :vitals="vitals"
          :status="status"
          @click="$router.push({ name: currentWorkspacePatientPage, params: patient.id })"
        />

        <div class="px-4">
          <div
            class="grid"
          >
            <div
              v-for="(link, index) in links"
              :key="index"
              class="relative cursor-pointer flex-1 items-center justify-center flex border-b-2 py-4 border-serenity-primary-highlight"
              :class="[ link.slug === selected ? 'text-serenity-primary' : 'text-secondary' ]"
              @click="selected = link.slug"
            >
              {{ link.label }}
              <div
                class="w-full h-0.5 absolute bg-serenity-light-gray bottom-0"
                :class="{ 'bg-serenity-primary-highlight': link.slug === selected }"
              />
            </div>
          </div>
          <vue-page-transition name="fade">
            <component :is="selectedComponent" />
          </vue-page-transition>
        </div>
      </div>

      <div class="col-span-3 bg-white h-full p-8">
        <vue-page-transition name="fade">
          <router-view />
        </vue-page-transition>
      </div>
    </div>

    <CaptureVitalsModal />
    <EndVisitConfirmationModal />
    <BookAppointmentModal />
    <MedicalHistoryModal />
  </AppStatePage>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import EncounterBasicInfo from '@/components/patients/encounters/EncounterBasicInfo'
import EncounterActions from '@/components/patients/encounters/EncounterActions'
import EncounterPatientSummary from '@/components/patients/encounters/EncounterPatientSummary'

export default {
  name: 'EncountersIndex',

  components: {
    EncounterBasicInfo,
    EncounterActions,
    EncounterPatientSummary,
    CaptureVitalsModal: () => import(/* webpackPrefetch: true */'@/components/vitals/CaptureVitalsModal'),
    EndVisitConfirmationModal: () => import(/* webpackPrefetch: true */'@/components/patients/modals/EndVisitConfirmationModal'),
    BookAppointmentModal: () => import(/* webpackPrefetch: true */'@/components/appointments/book/BookAppointmentModal'),
    MedicalHistoryModal: () => import(/* webpackPrefetch: true */'@/components/patients/encounters/modals/MedicalHistoryModal'),
  },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    encounter: {
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
      selected: 'action',
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      currentEncounter: (state) => state.encounters.currentEncounter,
    }),

    ...mapGetters({
      vitals: 'encounters/currentEncounterLatestVitals',
      status: 'encounters/currentEncounterStatus',
      currentWorkspacePatientPage: 'global/currentWorkspacePatientPage',
    }),

    links() {
      return [
        // { label: 'Basic Info', slug: 'basic-info' },
        { label: 'Action', slug: 'action' },
      ]
    },

    selectedComponent() {
      if (this.selected === 'basic-info') {
        return 'EncounterBasicInfo'
      }

      return 'EncounterActions'
    },
  },

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.loading = true
      await vm.initSinglePatientEncounterInformation({ patient: vm.id, encounter: vm.encounter })
      vm.loading = false
    })
  },

  methods: {
    ...mapActions({
      initSinglePatientEncounterInformation: 'encounters/initSinglePatientEncounterInformation',
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
            this.$router.push({ name: 'Patients' })
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
