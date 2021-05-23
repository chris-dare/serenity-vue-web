<template>
  <div>
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
        custom-class="bg-white border-0"
        @click="change(dashboard)"
      />
    </div>

    <CreateMeetingModal />
  </div>
</template>

<script>
export default {
  name: 'VirtualCareDashboard',

  components: {
    CreateMeetingModal: () => import('@/components/virtual-care/modals/CreateMeetingModal'),
  },

  data() {
    return {
      selected: '',
      visible: false,
      visitVisible: false,
    }
  },

  computed: {

    dashboardTypes() {
      const types = [
        {
          label: 'Create a meeting',
          description: 'Create a new meeting',
          type: 'add',
          value: 'add',
        },
        {
          label: 'Join meeting',
          description: 'Join meeting with patient',
          type: 'schedule',
          value: 'schedule',
          notification: 'new meeting in 20 mins',
        },
        {
          label: 'View schedule',
          description: 'View your scheduled meetings with patient',
          type: 'schedule',
          value: 'schedule',
        },
      ]

      return types
    },
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.value

      switch (dashboard.value) {
      case 'add':
        this.$trigger('create:meeting:open')
        break
      case 'join':
        this.$trigger('visit:start:open')
        break
      case 'schedule':
        this.$trigger('visit:start:open')
        break
      
      default:
        break
      }
      
    },
  },
}
</script>
