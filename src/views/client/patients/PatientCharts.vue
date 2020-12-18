<template>
  <div class="mt-2">
    <div class="flex justify-between items-center my-2">
      <div class="flex items-center">
        <p>Patient Vitals</p>
        <p class="text-gray-500 text-sm ml-3">Updated: Today</p>
      </div>
      <div class="flex items-center">
        <p class="text-gray-500 mr-3 text-sm">Monthly</p>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-sm text-gray-900"
        >
          Filters
          <img src="@/assets/img/filter 1.svg" class="ml-2" alt="" />
        </cv-button>
      </div>
    </div>
    <PatientChartCards />
  </div>
</template>

<script>
import PatientChartCards from '@/components/patients/charts/PatientChartCards'
export default {
  name: 'PatientCharts',

  components: { PatientChartCards },
}
</script>
