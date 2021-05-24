<template>
  <div>
    <CarePlan />
  </div>
</template>

<script>

export default {
  name: 'EncounterCarePlan',

  components: {
    CarePlan: () => import('@/components/patients/encounters/CarePlan'),
  },
}
</script>
