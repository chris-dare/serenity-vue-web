<template>
  <div class="space-y-4 my-6">
    <p class="text-serenity-primary font-semibold">
      Perform action
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-4 my-4">
      <PatientCard
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="onCardClick(dashboard.value)"
      />
    </div>

    <p class="text-serenity-primary font-semibold">
      Active Labs (0)
    </p>

    <LabsTable />
    <AddLabResultsModal />
    <ViewLabResultsModal />
  </div>
</template>

<script>
import PatientCard from '@/components/appointments/PatientCard'

import LabsTable from '@/components/diagnostic/LabsTable'
import AddLabResultsModal from '@/components/diagnostic/modals/AddLabResultsModal'
import ViewLabResultsModal from '@/components/diagnostic/modals/ViewLabResultsModal'

export default {
  name: 'DiagnosticPatientActions',

  components: { PatientCard, LabsTable, AddLabResultsModal, ViewLabResultsModal },

  data() {
    return {
      selected: '',
    }
  },

  computed: {
    dashboardTypes() {
      return [
        {
          label: 'Enter Lab Results',
          description: 'Enter results for the tests taken',
          type: 'search',
          value: 'add',
        },
        {
          label: 'View Lab results',
          description: 'View previous enteted lab results',
          type: 'lab',
          value: 'view',
        },
      ]
    },
  },

  methods: {
    onCardClick(action) {
      switch (action) {
      case 'add':
        this.$trigger('lab:add:open')
        break
      case 'view':
        this.$trigger('lab:view:open')
        break
          
      default:
        break
      }
    },
  },
}
</script>