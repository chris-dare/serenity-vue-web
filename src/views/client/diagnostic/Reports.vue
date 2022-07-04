<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Diagnostic Reports</p>
      </div>
      <LabsTable />
    </div>
  </div>
</template>

<script>
import LabsTable from '@/components/diagnostic/LabsReports'

export default {
  name: 'DiagnosticReports',

  components: { LabsTable },

  data() {
    return {
      selected: 'active',
    }
  },
}
</script>
