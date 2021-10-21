<template>
  <div class="space-y-4">
    <div class="bg-white p-4">
      <div class="flex justify-between">
        <p class="text-secondary">Intake and output charts</p>
        <FilterGroup
          v-model="selected"
          :filters="filters"
          default-color="tetiary"
        />
      </div>

      <component :is="stepComponent" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <EditableCard title="Vital Charts with M.E.W.S calculation">
        <template slot="action">
          <p class="text-serenity-primary cursor-pointer font-semibold text-sm">View full chart</p>
        </template>

        <div class="flex flex-col justify-center items-center space-y-6 mt-8">
          <MewsScore />

          <p class="font-semibold">Continue with normal 8 hours vitals / MEWS</p>
          <p class="text-sm">Jun 28, 2020, 12:00 pm</p>
          <p class="text-secondary text-sm text-center w-3/4 mx-auto">**If any single category scores a 3: Escalate immediately for medical re-assessment.</p>
        </div>
      </EditableCard>

      <EditableCard title="Fall risk assessment">
        <template slot="action">
          <p class="text-serenity-primary cursor-pointer font-semibold text-sm">View full chart</p>
        </template>

        <div class="flex flex-col justify-center items-center space-y-6 mt-8">
          <MewsScore />

          <p class="font-semibold">No risk for falls</p>
          <p class="text-sm">Jun 28, 2020, 12:00 pm</p>
        </div>
      </EditableCard>
    </div>
  </div>
</template>

<script>
import IntakeChartTable from '@/components/ipd/tables/IntakeChartTable'
import OutputChartTable from '@/components/ipd/tables/OutputChartTable'
import MewsScore from '@/components/ipd/MewsScore'

export default {
  name: 'IPDPatientProfileCharts',

  components: { IntakeChartTable, OutputChartTable, MewsScore },

  data() {
    return {
      selected: 'intake',
    }
  },

  computed: {
    filters() {
      return [
        { display: 'Intake chart', code: 'intake' },
        { display: 'Output chart', code: 'output' },
      ]
    },

    stepComponent() {
      let components = {
        intake: 'IntakeChartTable',
        output: 'OutputChartTable',
      }

      return components[this.selected]
    },
  },
}
</script>
