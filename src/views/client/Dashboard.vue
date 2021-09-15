<template>
  <div class="max-w-7xl mx-auto">
    <UserDetailsHeader />

    <component :is="workspaceComponent" />

    <GetStartedModal :visible.sync="visible" />
    <SearchPatientsModal />
    <BookVisitModal />
  </div>
</template>

<script>

import GetStartedModal from '@/components/dashboard/GetStartedModal'

const DiagnosticDashboard = () => import('@/components/diagnostic/DiagnosticDashboard')
const OPDDashboard = () => import('@/components/opd/OPDDashboard')
const PharmacyDashboard = () => import('@/components/pharmacy/PharmacyDashboard')
const ReceptionDashboard = () => import('@/components/reception/ReceptionDashboard')
const BillingDashboard = () => import('@/components/billing/BillingDashboard')
const VirtualCareDashboard = () => import('@/components/virtual-care/VirtualCareDashboard')
const BookVisitModal = () => import('@/components/visits/BookVisitModal')

import { mapState } from 'vuex'

export default {
  name: 'Dashboard',

  components: { GetStartedModal, BillingDashboard, DiagnosticDashboard, OPDDashboard, PharmacyDashboard, ReceptionDashboard, VirtualCareDashboard, BookVisitModal },

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

      if (this.workspaceType === 'VIRT') {
        return 'VirtualCareDashboard'
      }

      if (this.workspaceType === 'BILL') {
        return 'BillingDashboard'
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
