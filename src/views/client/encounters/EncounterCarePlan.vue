<template>
  <div>
    <CarePlan v-bind="$attrs" />
  </div>
</template>

<script>
import CarePlan from '@/components/patients/encounters/CarePlan'
export default {
  name: 'EncounterCarePlan',

  components: {
    CarePlan,
  },
}
</script>
