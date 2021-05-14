<template>
  <div class="w-4/5 mx-auto">
    <UserDetailsHeader />

    <component :is="workspaceComponent" />
    
    <GetStartedModal :visible.sync="visible" />
    <StartVisitModal />
    <SearchPatientsModal />
  </div>
</template>

<script>

import GetStartedModal from '@/components/dashboard/GetStartedModal'
import StartVisitModal from '@/components/appointments/StartVisitModal'
import UserDetailsHeader from '@/components/ui/headers/UserDetailsHeader'

const DiagnosticDashboard = () => import('@/components/diagnostic/DiagnosticDashboard')
const OPDDashboard = () => import('@/components/opd/OPDDashboard')
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',

  components: { GetStartedModal, StartVisitModal, UserDetailsHeader, DiagnosticDashboard, OPDDashboard },

  data() {
    return {
      selected: 'search',
      visible: false,
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      appointmentsCount: (state) => state.appointments.appointmentsCount,
    }),

    workspaceComponent() {
      if (this.workspaceType === 'DIAG') {
        return 'DiagnosticDashboard'
      }
  
      if (this.workspaceType === 'OPD') {
        return 'OPDDashboard'
      }

      return 'DefaultDashboard'
    },
  },

  created() {
    // if (this.appointmentsCount === 0) {
    //   this.visible = true
    // }
  },

  
}
</script>
