<template>
  <div class="max-w-7xl mx-auto">
    <UserDetailsHeader />
    <p class="text-serenity-primary my-6 font-semibold">
      What would you like to do?
    </p>
    <div class="flex my-4">
      <InfoLinkCard
        v-for="(dashboard, index) in availableActions"
        :key="index"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
    <NonPatientPrescriptionModal />
  </div>
</template>

<script>
import NonPatientPrescriptionModal from '@/components/pharmacy/modals/NonPatientPrescriptionModal'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',

  components: {
    NonPatientPrescriptionModal,
  },

  data() {
    return {
      selected: 'search',
      visitVisible: false,
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
    }),

    availableActions() {
      const types = [
        {
          label: 'Find a patient',
          description: 'Quickly search for a patient by name',
          type: 'search',
          value: 'search',
        },
        {
          label: 'Non Patient',
          description: 'Dispense drugs to non-hospital patients',
          type: 'search',
          value: 'nonpatient',
        },
      ]

      return types
    },
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.value

      if (dashboard.value === 'search') {
        this.$router.push({ name: 'Pharmacy:Patients'})
      }

      if (dashboard.value === 'nonpatient') {
        this.$trigger('pharmacy:nonpatient_prescription:open')
      }

    },
  },
}
</script>
