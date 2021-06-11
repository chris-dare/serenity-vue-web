<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Find Patient</p>
      </div>
      <LabsTable />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LabsTable from '@/components/diagnostic/labResults'
export default {
  name: 'DiagnosticPatients',

  components: {  LabsTable },

  data() {
    return {
      selected: 'active',
    }
  },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
    }),
  },
}
</script>]
