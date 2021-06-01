<template>
  <div>
    <CarePlan />
  </div>
</template>

<script>

export default {
  name: 'EncounterCarePlan',

  components: {
    CarePlan: () => import(/* webpackPrefetch: true */'@/components/patients/encounters/CarePlan'),
  },
}
</script>
