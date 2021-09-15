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
    <p class="text-serenity-primary my-6 font-semibold">
      Patients on a visit  ({{ visitCount }})
    </p>
    <VisitsTable hide-search />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VisitsTable from '@/components/visits/VisitsTable'
export default {
  name: 'DefaultDashboard',

  components: { VisitsTable },

  data() {
    return {
      selected: '',
      visible: false,
      visitVisible: false,
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
    }),

    ...mapGetters({
      visitCount: 'visits/visitCount',
    }),

    dashboardTypes() {
      const types = [
        {
          label: 'Find a patient',
          description: 'Quickly search for a patient by name',
          type: 'search',
          value: 'search',
        },
        {
          label: 'Book appointment',
          description: 'Help a patient schedule an appointment',
          type: 'schedule',
          value: 'schedule',
        },
        {
          label: 'Register a patient',
          description: 'Create record for a new patient',
          type: 'newpatient',
          value: 'register',
        },
        {
          label: 'Book COVID-19 test',
          description: 'Schedule a patient for COVID test',
          type: 'book',
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
      case 'register':
        this.$router.push({ name: 'Biodata'})
        break
      case 'schedule':
        this.$router.push({ name: 'SelectPatient'})
        break
      case 'search':
        this.$trigger('search:patients:open')
        break
      
      default:
        break
      }
      
    },
  },
}
</script>
