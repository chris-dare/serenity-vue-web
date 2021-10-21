<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="content">
      <SeForm class="space-y-8">
        <p class="text-lg font-semibold">Observations</p>

        <FilterGroup
          v-model="selected"
          :filters="filters"
          default-color="tetiary"
        />
        <component
          :is="stepComponent"
          @close="close"
        />
      </SeForm>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions } from 'vuex'
import IntakeChart from '@/components/ipd/observations/IntakeChart'
import OutputChart from '@/components/ipd/observations/OutputChart'
import ObservationVitalCharts from '@/components/ipd/observations/ObservationVitalCharts'
import RiskAssessmentTools from '@/components/ipd/observations/RiskAssessmentTools'
import ObservationsCharts from '@/components/ipd/observations/ObservationsCharts'

export default {
  name: 'AddEditInventory',

  components: {
    IntakeChart,
    OutputChart,
    ObservationVitalCharts,
    RiskAssessmentTools,
    ObservationsCharts,
  },

  data() {
    return {
      form: {},
      selected: 'intake',
      loading: false,
      visible: false,
    }
  },

  computed: {
    filters() {
      return [
        { display: 'Intake chart', code: 'intake' },
        { display: 'Output chart', code: 'output' },
        { display: 'Vital Charts with M.E.W.S calculation', code: 'vitals' },
        { display: 'Risk Assessment Tools', code: 'risk' },
        { display: 'Observations Chart', code: 'observations' },
      ]
    },

    stepComponent() {
      let components = {
        intake: 'IntakeChart',
        output: 'OutputChart',
        vitals: 'ObservationVitalCharts',
        risk: 'RiskAssessmentTools',
        observations: 'ObservationsCharts',
      }

      return components[this.selected]
    },
  },

  events: {
    'profile:observation:open': function(){
      this.visible = true
      this.form = {}
    },
    'observation:edit:open': function(data){
      this.visible = true
      this.form = data.params[0]
    },
  },

  methods: {
    ...mapActions({
      createInventory: 'inventory/createInventory',
      updateInventory: 'inventory/updateInventory',
    }),

    close() {
      this.$v.$reset()
      this.visible = false
    },
  },
}
</script>
