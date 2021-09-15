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
      Recent Orders
    </p>
    <LabsTable />
    <Next />
  </div>
</template>

<script>
import LabsTable from '@/components/diagnostic/LabsOrders'
import Next from '@/components/diagnostic/modals/RequestedLabs.vue'

export default {
  name: 'DiagnosticDashboard',

  components: { LabsTable, Next },

  data() {
    return {
      selected: '',
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
          hide: !this.$userCan('patient.write'),
        },
        {
          label: 'New Diagnostic Request',
          description: 'Add a new diagnostic request',
          type: 'add',
          value: 'add',
          hide: !this.$userCan('diagnostic.requests.write'),
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
        this.$trigger('new-lab:add:open')
        break
      case 'add':
        this.$router.push({ name: 'DiagnosticSelectPatient'})
        break

      default:
        break
      }
    },
  },
}
</script>
