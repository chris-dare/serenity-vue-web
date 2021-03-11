<template>
  <div class="w-4/5 mx-auto space-y-6">
    <UserDetailsHeader />
    <img src="@/assets/img/started.svg">
    <div>
      <h1 class="text-lg font-semibold">Get started here</h1>
      <p>Here is a simple way to get started setting up your provider information</p>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <WorkspaceCard
        v-for="(item, index) in items"
        :key="index"
        :details="item"
      />
    </div>
  </div>
</template>

<script>
import UserDetailsHeader from '@/components/ui/headers/UserDetailsHeader'
import WorkspaceCard from '@/components/ui/cards/WorkspaceCard'

export default {
  name: 'GetStarted',

  components: { UserDetailsHeader, WorkspaceCard },

  data() {
    return {
      items: [
        { label: 'Company details', description: 'Please complete your company profile information', status: 'complete', link: 'Settings'},
        { label: 'Locations', description: 'Set up your areas and locations of service', status: 'complete', link: 'Locations'},
        { label: 'Services & Pricing', description: 'Add various services and their prices', status: 'complete', link: 'Services'},
        { label: 'Workspaces', description: 'Setup various departments or workspaces', status: 'complete', link: 'Workspaces'},
        { label: 'Team', description: 'Start adding practitioners to your organization', status: 'complete', link: 'Team'},
        { label: 'Schedules', description: 'Create schedules for teams in your organization', status: 'complete', link:'Schedules'},
      ],
    }
  },
}
</script>
