<template>
  <div class="space-y-6">
    <p class="text-serenity-primary font-semibold mt-5 text-md">
      What would you like to do?
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-6">
      <InfoLinkCard
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="change(dashboard.value)"
      />
    </div>
    <p class="text-serenity-primary font-semibold mt-5">
      Active Lab Requests ({{ 0 }})
    </p>
    <LabsTable 
      hide-search 
      hide-walk
    />
    <AddPatient />
    <AddLabs />
  </div>
</template>

<script>
import AddLabs from '@/components/diagnostic/modals/AddLabResultsModal.vue'
import LabsTable from '@/components/diagnostic/LabResults'
import AddPatient from '@/components/diagnostic/modals/AddPatient'

export default {
  name: 'DiagnosticDashboard',

  components: { LabsTable, AddPatient, AddLabs },

  data() {
    return {
      selected: 'search',
    }
  },

  computed: {
    dashboardTypes() {
      return [
        {
          label: 'Find a patient',
          description: 'Quickly search for a patient by name',
          type: 'search',
          value: 'search',
        },
        {
          label: 'Enter Lab Results',
          description: 'Enter results for the tests taken',
          type: 'edit',
          value: 'edit',
        },
        {
          label: 'Add a patient',
          description: 'Add a new patient from referral and walk-ins',
          type: 'add',
          value: 'add',
        },
      ]
    },
  },

  methods: {
    change(action) {
      this.selected = action
      switch (action) {
      case 'search':
        this.$router.push({ name: 'Diagnostic:Patients'})
        break
      case 'edit':
        this.$trigger('lab:add:open')
        // this.$router.push({ name: 'Biodata'})
        break
      case 'add':
        // this.$router.push({ name: 'Biodata'})
        this.$trigger('labpatient:add:open')
        // this.$router.push({ name: 'SelectPatient'})
        break
      
      default:
        break
      }
    },
  },
}
</script>
