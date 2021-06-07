<template>
  <div class="mt-4">
    <div class="flex justify-between items-center my-2">
      <div class="flex items-center space-x-3">
        <p>Patient Vitals</p>
        <!-- <p class="text-gray-500  ml-3">Updated: Today</p> -->
        <div
          v-if="hasActiveEncounter"
          class="flex items-center space-x-1 cursor-pointer"
          @click="$trigger('capture:vitals:open')"
        >
          <AddFilled class="w-4 h-4 text-serenity-primary" />
          <p>Add new</p>
        </div>
      </div>
      <div class="flex items-center">
        <p class="text-gray-500 mr-3 ">Monthly</p>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white  text-serenity-placeholder"
        >
          Filters
          <img
            src="@/assets/img/filter 1.svg"
            class="ml-2"
            alt=""
          >
        </cv-button>
      </div>
    </div>
    <PatientChartCards />
  </div>
</template>

<script>
import PatientChartCards from '@/components/patients/charts/PatientChartCards'
import AddFilled from '@carbon/icons-vue/es/add--filled/32.js'
import { mapGetters } from 'vuex'
export default {
  name: 'PatientCharts',

  components: { PatientChartCards, AddFilled },

  computed: {
    ...mapGetters({
      hasActiveEncounter: 'encounters/hasActiveEncounter',
    }),
  },
}
</script>
