<template>
  <div class="max-w-7xl mx-auto">
    <UserDetailsHeader />

    <component :is="workspaceComponent" />

    <SearchPatientsModal />
    <BookVisitModal />
  </div>
</template>

<script>

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

  components: { BillingDashboard, IPDDashboard, DiagnosticDashboard, OPDDashboard, PharmacyDashboard, ReceptionDashboard, VirtualCareDashboard, BookVisitModal },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      appointmentsCount: (state) => state.appointments.appointmentsCount,
    }),

    workspaceComponent() {
      let components = {
        DIAG: 'DiagnosticDashboard',
        OPD: 'OPDDashboard',
        IPD: 'IPDDashboard',
        PHARM: 'PharmacyDashboard',
        RECEPT: 'ReceptionDashboard',
        VIRT: 'VirtualCareDashboard',
        BILL: 'BillingDashboard',
      }

      return components[this.workspaceType] || 'DefaultDashboard'
    },
  },


}
</script>
