<template>
  <div>
    <component :is="workspaceActions" />
  </div>
</template>

<script>
import DiagnosticPatientActions from '@/components/diagnostic/DiagnosticPatientActions'
import { mapState } from 'vuex'
export default {
  name: 'PatientActions',

  components: { DiagnosticPatientActions },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
    }),

    workspaceActions() {
      if (this.workspaceType === 'DIAG') {
        return 'DiagnosticPatientActions'
      }

      return 'DefaultPatientActions'
    },
  },

  
}
</script>
