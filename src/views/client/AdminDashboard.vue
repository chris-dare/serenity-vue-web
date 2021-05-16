<template>
  <div class="w-4/5 mx-auto">
    <UserDetailsHeader />
    <p class="text-serenity-primary my-6 font-semibold">Overview</p>
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
    <p class="text-serenity-primary my-6 font-semibold">Things to do</p>
    <div class="grid grid-cols-4 gap-2 lg:gap-4 my-4">
      <DashboardCard
        v-for="(dashboard, index) in overviewTypes"
        :key="index"
        :is-selected="selected === dashboard.type"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
    <AddEditWorkspace />
    <AddEditInventory />
  </div>
</template>

<script>

import AddEditWorkspace from '@/components/admin/modals/AddEditWorkspace'
import AddEditInventory from '@/components/admin/modals/AddEditInventory'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',

  components: { AddEditWorkspace, AddEditInventory },

  data() {
    return {
      selected: 'search',
      visible: false,
      visitVisible: false,
    }
  },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
      appointmentsCount: (state) => state.appointments.appointmentsCount,
      workspacesCount: (state) => state.workspaces.workspacesCount,
      locationsCount: (state) => state.locations.locationsCount,
    }),
  
    dashboardTypes() {
      const types = [
        // {
        //   label: 'Providers',
        //   type: 'stethoscope',
        //   value: '1',
        // },
        {
          label: 'Patients',
          type: 'Reference',
          value: this.patientsCount,
        },
        {
          label: 'Corporate Clients',
          type: 'Indentification',
          value: '8',
        },
        {
          label: 'Appointment',
          type: 'Calendar',
          value: this.appointmentsCount,
        },
        {
          label: 'Workspaces',
          type: 'Cross',
          value: this.workspacesCount,
        },
        {
          label: 'Locations',
          type: 'Categories',
          value: this.locationsCount,
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
          action: 'team',
        },
        {
          label: 'New workspace',
          type: 'Cross',
          description: 'Create a new department or workspace',
          action: 'workspace',
        },
        {
          label: 'Inventory Item',
          type: 'Folder',
          description: 'Add new item to your inventory',
          action: 'inventory',
        },
        {
          label: 'Register patient',
          type: 'User',
          description: 'Create a new patient profile',
          action: 'patient',
        },
      ]

      return types
    },
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.type

      if (dashboard.action === 'team') {
        this.$router.push({ name: 'TeamBiodata' })
      }
      if (dashboard.action === 'workspace') {
        this.$trigger('workspace:add:open')
      }
      if (dashboard.action === 'patient') {
        this.$router.push({name:'Biodata'})
      }
      if (dashboard.action === 'inventory') {
        this.$trigger('inventory:add:open')
      }
    },
  },
}
</script>
