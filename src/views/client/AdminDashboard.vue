<template>
  <div class="w-4/5 mx-auto">
    <UserDetailsHeader />
    <p class="text-serenity-primary my-6 font-semibold">
      Overview
    </p>
    <div class="grid grid-cols-4 gap-2 lg:gap-4 my-4">
      <DashboardCard
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
    <p class="text-serenity-primary my-6 font-semibold">
      Things to do
    </p>
    <div class="grid grid-cols-4 gap-2 lg:gap-4 my-4">
      <DashboardCard
        v-for="(dashboard, index) in overviewTypes"
        :key="index"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
  </div>
</template>

<script>
import DashboardCard from '@/components/ui/cards/DashboardCard'
import UserDetailsHeader from '@/components/ui/headers/UserDetailsHeader'

export default {
  name: 'Dashboard',

  components: { DashboardCard, UserDetailsHeader },

  data() {
    return {
      selected: 'search',
      visible: false,
      visitVisible: false,
    }
  },

  computed: {
    dashboardTypes() {
      const types = [
        {
          label: 'Providers',
          type: 'stethoscope',
          value: '152',
        },
        {
          label: 'Patients',
          type: 'Reference',
          value: '8,670',
        },
        {
          label: 'Corporate Clients',
          type: 'Indentification',
          value: '8',
        },
        {
          label: 'Appointment',
          type: 'Calendar',
          value: '0',
        },
        {
          label: 'Workspaces',
          type: 'Cross',
          value: '0',
        },
        {
          label: 'Locations',
          type: 'Categories',
          value: '0',
        },
      ]

      return types
    },
    overviewTypes() {
      const types = [
        {
          label: 'New Provider',
          type: 'Add',
          description: 'Add new provider',
          value: '',
        },
        {
          label: 'New workspace',
          type: 'Cross',
          description: 'Create a new department or workspace',
        },
        {
          label: 'Register patient',
          type: 'User',
          description: 'Create a new patient profile',
        },
        {
          label: 'New company',
          type: 'Download',
          description: 'Create a new corporate client',
        },
      ]

      return types
    },
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.value

      if (dashboard.value === 'visit') {
        this.visitVisible = true
      }

      if (dashboard.value === 'register') {
        this.$router.push({ name: 'Biodata' })
      }

      if (dashboard.value === 'schedule') {
        this.$router.push({ name: 'SelectPatient' })
      }
    },
  },
}
</script>
