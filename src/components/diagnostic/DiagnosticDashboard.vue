<template>
  <div class="space-y-6">
    <p class="text-serenity-primary font-semibold">
      What would you like to do?
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-6">
      <InfoLinkCard
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="change(dashboard.value)"
      />
    </div>
    <p class="text-serenity-primary font-semibold">
      Active Visits ({{ 0 }})
    </p>
    <VisitsTable hide-search />
  </div>
</template>

<script>
import VisitsTable from '@/components/visits/VisitsTable'

export default {
  name: 'DiagnosticDashboard',

  components: { VisitsTable },

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
        },
      ]
    },
  },

  methods: {
    change(action) {
      switch (action) {
      case 'search':
        console.log('search')
        break
          
      default:
        break
      }
    },
  },
}
</script>
