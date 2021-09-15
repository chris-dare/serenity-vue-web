<template>
  <div>
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between ">
        <p class="text-xl font-bold">Visits</p>
      </div>

      <div>
        <VisitsTable />
      </div>
    </div>
  </div>
</template>

<script>
import VisitsTable from '@/components/visits/VisitsTable'
export default {
  name: 'Visits',

  components: { VisitsTable },
}
</script>
