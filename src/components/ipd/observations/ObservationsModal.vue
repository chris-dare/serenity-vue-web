<template>
  <BaseModal
    :name="name"
    title="Observations"
    @closed="close"
  >
    <template>
      <SeForm class="space-y-8">
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
  </BaseModal>
</template>

<script>
import { mapActions } from 'vuex'
import modalMixin from '@/mixins/modal'
import IntakeChart from '@/components/ipd/observations/IntakeChart'
import OutputChart from '@/components/ipd/observations/OutputChart'
import ObservationVitalCharts from '@/components/ipd/observations/ObservationVitalCharts'
import RiskAssessmentTools from '@/components/ipd/observations/RiskAssessmentTools'
import ObservationsCharts from '@/components/ipd/observations/ObservationsCharts'

export default {
  name: 'ObservationsModal',

  components: {
    IntakeChart,
    OutputChart,
    ObservationVitalCharts,
    RiskAssessmentTools,
    ObservationsCharts,
  },

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      selected: 'intake',
      loading: false,
      name: 'observations-modal',
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
      this.open()
      this.form = {}
    },
    'observation:edit:open': function(data){
      this.open()
      this.form = data.params[0]
    },
  },

  methods: {
    ...mapActions({
      createInventory: 'inventory/createInventory',
      updateInventory: 'inventory/updateInventory',
    }),
  },
}
</script>
