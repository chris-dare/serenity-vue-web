<template>
  <div class="flex items-center space-x-4">
    <SeButton
      v-if="patientIsDeceased"
      variant="danger"
      @click="$trigger('profile:deceased-info:open')"
    >
      Patient is deceased - read more
    </SeButton>
    <SeButton
      v-if="!hasActiveEncounter && !patientIsDeceased && patientHasVisit"
      variant="secondary"
      @click="$trigger('start:encounter:open')"
    >
      Start Encounter
      <Add class="ml-2 w-5 h-5 text-white" />
    </SeButton>
    <div
      v-if="hasActiveEncounter"
      class="flex items-center space-x-4"
    >
      <p
        class="underline cursor-pointer"
        @click="endVisit"
      >
        End Visit
      </p>
      <p
        class="underline cursor-pointer"
        @click="end"
      >
        End Consultation
      </p>
      <AddNewDropdown />

      <!-- <SeButton
        variant="warning"
        :loading="loading"
        @click="goToWizard"
      >
        {{ hasEncounterBegan ? 'Continue Consultation' : 'Begin Consultation' }}
      </SeButton> -->
      <SeButton
        variant="warning"
        :loading="loading"
        @click="openOngoingEncounters"
      >
        Ongoing Encounters
      </SeButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import timerMixin from '@/mixins/timer'
import isSameDay from 'date-fns/isSameDay'
import AddNewDropdown from '@/components/patients/AddNewDropdown'

export default {
  name: 'OPDActions',

  components: {
    AddNewDropdown,
  },

  mixins: [timerMixin],

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapState({
      encounter: state => state.encounters.currentEncounter,
    }),

    ...mapGetters({
      hasActiveEncounter: 'encounters/hasActiveEncounter',
      hasEncounterBegan: 'encounters/hasEncounterBegan',
      appointments: 'appointments/patientAppointments',
      patientIsDeceased: 'patients/patientIsDeceased',
      patientHasVisit: 'patients/patientHasVisit',
      visitId: 'visits/visitId',
    }),

    hasUpcomingEncounter() {
      if (!this.appointments) return false
      return !!this.appointments().find(appointment => {
        return isSameDay(new Date(this.currentTime), new Date(appointment.start)) && appointment.status === 'pending'
      })
    },
  },

  methods: {
    ...mapActions({
      endEncounter: 'encounters/endEncounter',
      startEncounter: 'encounters/startEncounter',
      deleteVisit: 'visits/deleteVisit',
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

    async endVisit() {
      this.$trigger('actions-modal:open', {
        confirmButtonText: 'End',
        type: 'delete',
        confirmButtonVariant: 'danger',
        label: 'Are you sure you want to end this visit?',
        callback: async () => {
          try {
            this.loading = true
            await this.endEncounter()
            await this.deleteVisit(this.visitId)
            this.$toast.open({ message: 'The visit has ended' })
            this.loading = false

          } catch (error) {
            this.loading = false
          }
        },
        cancel: async () => {

        },
      })

    },

    openOngoingEncounters() {
      this.$trigger('profile:patient:encounters:open')
    },

    async goToWizard() {
      if (this.encounter.status === 'in-progress') {
        this.$router.push({ name: 'EncounterReview', params: { encounter: this.encounter.id, id: this.$route.params.id } })
        return
      }

      try {
        this.loading = true
        await this.startEncounter(this.encounter.id)
        this.$router.push({ name: 'EncounterReview', params: { encounter: this.encounter.id, id: this.$route.params.id } })
        this.loading = false
      } catch (error) {
        console.log('er', error.data)
      } finally {
        this.loading = false
      }
      
    },
  },
}
</script>
