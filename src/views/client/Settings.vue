<template>
  <div class="max-w-7xl mx-auto">
    <UserDetailsHeader />
    <p class="text-serenity-primary my-6 font-semibold">
      What would you like to do?
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-6 my-4">
      <InfoLinkCard
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="w-full bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
    <ProviderProfile />
  </div>
</template>

<script>
import ProviderProfile from '@/components/admin/modals/ProviderProfile'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Settings',

  components: { ProviderProfile },

  data() {
    return {
      selected: 'search',
    }
  },

  computed: {
    ...mapState({
      workspaceType: state => state.global.workspaceType,
    }),

    dashboardTypes() {
      let types = [{
        label: 'Provider Profile',
        description: 'Information about this company',
        type: 'home',
        value: 'profile',
      }]

      if (this.$isCurrentWorkspace('ADMIN')) {
        types.push({
          label: 'Admin Profile',
          description: 'A quick overview of you',
          type: 'user',
          value: 'admin',
        })
      }

      types.push({
        label: 'Security',
        description: 'Protect your account',
        type: 'security',
        value: 'security',
      })

      return types
    },
  },

  mounted() {
    this.getProvider()
  },

  methods: {
    ...mapActions({
      getProvider:'auth/getProvider',
    }),
    change(dashboard) {
      this.selected = dashboard.value

      if (dashboard.value === 'profile') {
        this.$trigger(this.workspaceType === 'admin' ? 'provider:profile:open' : 'profile:edit')
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
