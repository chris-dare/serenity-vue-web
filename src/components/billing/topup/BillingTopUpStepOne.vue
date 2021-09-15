<template>
  <div>
    <SelectPatientTable
      :columns="columns"
      :patient.sync="localValue.patient"
      hide-selected-patient
    />
  </div>
</template>

<script>
import SelectPatientTable from '@/components/appointments/tables/SelectPatientTable'
import modelMixin from '@/mixins/model'

export default {
  name: 'BillingTopUpStepOne',

  components: { SelectPatientTable },

  mixins: [modelMixin],

  data() {
    return {
      columns: ['Patient', 'Mobile'],
    }
  },
}
</script>
