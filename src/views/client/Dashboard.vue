<template>
  <div class="w-4/5 mx-auto">
    <UserDetailsHeader />

    <component :is="workspaceComponent" />
    
    <GetStartedModal :visible.sync="visible" />
    <StartVisitModal />
    <SearchPatientsModal />
    <BookAppointmentModal />
  </div>
</template>

<script>

import GetStartedModal from '@/components/dashboard/GetStartedModal'
import StartVisitModal from '@/components/appointments/StartVisitModal'

const DiagnosticDashboard = () => import('@/components/diagnostic/DiagnosticDashboard')
const OPDDashboard = () => import('@/components/opd/OPDDashboard')
const PharmacyDashboard = () => import('@/components/pharmacy/PharmacyDashboard')
const ReceptionDashboard = () => import('@/components/reception/ReceptionDashboard')
const BookAppointmentModal = () => import('@/components/appointments/book/BookAppointmentModal')

import { mapState } from 'vuex'

export default {
  name: 'Dashboard',

  components: { GetStartedModal, StartVisitModal, DiagnosticDashboard, OPDDashboard, PharmacyDashboard, BookAppointmentModal, ReceptionDashboard },

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
      if (this.workspaceType === 'PHARM') {
        return 'PharmacyDashboard'
      }
      if (this.workspaceType === 'RECEPT') {
        return 'ReceptionDashboard'
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
