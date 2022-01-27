<template>
  <div>
    <ThreeSectionLayout>
      <template v-slot:side>
        <div class="overflow-y-auto">
          <EncounterPatientSummary
            :patient="patient"
            :vitals="vitals"
            :status="status"
            @click="$router.push({ name: currentWorkspacePatientPage, params: patient.id })"
          />

          <div class="px-4">
            <div
              class="grid grid-cols-2"
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
      </template>

      <template>
        <router-view />
      </template>
    </ThreeSectionLayout>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import EncounterBasicInfo from '@/components/patients/encounters/EncounterBasicInfo'
import EncounterActions from '@/components/patients/encounters/EncounterActions'
import EncounterPatientSummary from '@/components/patients/encounters/EncounterPatientSummary'
import ThreeSectionLayout from '@/layout/ThreeSectionLayout'

export default {
  name: 'VirtualCareIndex',

  components: {
    EncounterBasicInfo,
    EncounterActions,
    EncounterPatientSummary,
    ThreeSectionLayout,
    CaptureVitalsModal: () => import('@/components/vitals/CaptureVitalsModal'),
    EndVisitConfirmationModal: () => import('@/components/patients/modals/EndVisitConfirmationModal'),
  },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    care: {
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
        { label: 'Basic Info', slug: 'basic-info' },
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
      await vm.initSinglePatientInformation(vm.id)
      //   await vm.getEncounter(vm.encounter)
      vm.loading = false
    })
  },

  methods: {
    ...mapActions({
      initSinglePatientInformation: 'patients/initSinglePatientInformation',
      getEncounter: 'encounters/getEncounter',
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
