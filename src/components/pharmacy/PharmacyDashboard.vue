<template>
  <div class="">
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
    <p class="text-serenity-primary my-6 font-semibold">
      Medication Requests
    </p>
    <PrescriptionsTable route="Pharmacy:PatientSummary" />
    <NonPatientPrescriptionModal />
  </div>
</template>

<script>
import PrescriptionsTable from '@/components/pharmacy/PrescriptionsTable.vue'
import NonPatientPrescriptionModal from '@/components/pharmacy/modals/NonPatientPrescriptionModal'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',

  components: { 
    NonPatientPrescriptionModal,
    PrescriptionsTable,
  },

  data() {
    return {
      selected: '',
      visible: false,
      visitVisible: false,
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      provider: (state) => state.auth.provider,
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
          label: 'New Prescription',
          description: 'Create a new prescription',
          type: 'add',
          value: 'new',
        },
      ]

      return types
    },
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.value

      if (dashboard.value === 'search') {
        this.$router.push({ name: 'Pharmacy:Patients' })
      }

      if (dashboard.value === 'new') {
        this.$router.push({ name: 'Pharmacy:New'})
      }
    },
  },
}
</script>
