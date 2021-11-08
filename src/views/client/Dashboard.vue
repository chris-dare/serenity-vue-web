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

import BillingDashboard from '@/components/billing/BillingDashboard'
import OPDDashboard from '@/components/opd/OPDDashboard'
import PharmacyDashboard from '@/components/pharmacy/PharmacyDashboard'
import ReceptionDashboard from '@/components/reception/ReceptionDashboard'
import DiagnosticDashboard from '@/components/diagnostic/DiagnosticDashboard'
import IPDDashboard from '@/components/ipd/IPDDashboard'
import VirtualCareDashboard from '@/components/virtual-care/VirtualCareDashboard'
import BookVisitModal from '@/components/visits/BookVisitModal'

import { mapState } from 'vuex'

export default {
  name: 'Dashboard',

  components: { GetStartedModal, BillingDashboard, IPDDashboard, DiagnosticDashboard, OPDDashboard, PharmacyDashboard, ReceptionDashboard, VirtualCareDashboard, BookVisitModal },

  data() {
    return {
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
      if (this.workspaceType === 'IPD') {
        return 'IPDDashboard'
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


}
</script>
