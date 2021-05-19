<template>
  <div class="relative h-full">
    <div class="space-y-8 divide-y divide-solid divide-subtle">
      <p class="font-semibold">Patient Review</p>
      <EncounterDetails />
    </div>

    <div class="flex justify-end absolute w-full right-0 bottom-8">
      <SeButton
        :to="{name: 'EncounterDiagnosis', params: {id: $route.params.id}}"
        :icon="ChevronRight"
      >
        Add Diagnosis
      </SeButton>
    </div>
  </div>
</template>

<script>
import EncounterDetails from '@/components/patients/encounters/EncounterDetails'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'EncountersReview',

  components: { EncounterDetails },

  data() {
    return {
      icon: ChevronRight,
    }
  },
}
</script>
