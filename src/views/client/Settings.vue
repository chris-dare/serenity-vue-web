<template>
  <div class="w-4/5 mx-auto">
    <UserDetailsHeader />
    <p class="text-serenity-primary my-6 font-semibold">
      What would you like to do?
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-6 my-4">
      <PatientCard
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="w-full bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
    <AdminProfile />
    <ProviderProfile />
  </div>
</template>

<script>
import PatientCard from '@/components/appointments/PatientCard'
import UserDetailsHeader from '@/components/ui/headers/UserDetailsHeader'
import AdminProfile from '@/components/admin/modals/AdminProfile'
import ProviderProfile from '@/components/admin/modals/ProviderProfile'
import { mapState } from 'vuex'

export default {
  name: 'Settings',

  components: { PatientCard,UserDetailsHeader, AdminProfile, ProviderProfile },

  data() {
    return {
      selected: 'search',
      dashboardTypes: [
        {
          label: 'Provider Profile',
          description: 'Information about this company',
          type: 'home',
          value: 'profile',
        },
        {
          label: 'Admin Profile',
          description: 'A quick overview of you',
          type: 'user',
          value: 'admin',
        },
        {
          label: 'Security',
          description: 'Protect your account',
          type: 'security',
          value: 'security',
        },
      ],
    }
  },

  computed: {
    ...mapState({
      workspaceType: state => state.global.workspaceType,
    }),
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.value

      if (dashboard.value === 'profile') {
        this.$trigger(this.workspaceType === 'admin' ? 'provider:profile:open':'profile:edit')
      }
      if (dashboard.value === 'admin') {
        this.$trigger('admin:profile:open')
      }

      if (dashboard.value === 'security') {
        this.$trigger('profile:security')
      }
      
    },
  },
}
</script>
