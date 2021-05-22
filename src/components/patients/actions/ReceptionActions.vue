<template>
  <div>
    <div
      v-if="hasActiveEncounter"
      class="flex items-center space-x-4"
    >
      <SeButton
        v-if="$userCan('vitals.write')"
        :to="{ name: 'Vitals', query: {id: this.$route.params.id} }"
      >
        Capture vitals <Add class="w-4 h-4 text-white ml-4" />
      </SeButton>
      
      <QueueDropdown v-if="false" />
    </div>
    <div
      v-else
      class="flex items-center space-x-4"
    >
      <SeButton
        v-if="$userCan('appointments.write')"
        @click="book"
      >
        Book appointment <Add class="w-4 h-4 text-white ml-4" />
      </SeButton>
      <SeButton
        variant="secondary"
        @click="$trigger('start:encounter:open')"
      >
        Start Encounter
      </SeButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'ReceptionActions',

  components: {
    QueueDropdown: () => import('@/components/appointments/QueueDropdown'),
  },

  computed: {
    ...mapState({
      currentPatient: (state) => state.patients.currentPatient,
    }),

    ...mapGetters({
      hasActiveEncounter: 'encounters/hasActiveEncounter',
    }),
  },

  methods: {
    ...mapActions({
      setCurrentAppointment: 'appointments/setCurrentAppointment',
    }),

    async book() {
      await this.setCurrentAppointment({ patient: this.currentPatient })
      this.$router.push({ name: 'ClinicsServices' })
    },
  },
}
</script>
