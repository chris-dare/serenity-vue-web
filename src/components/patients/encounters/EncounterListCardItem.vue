<template>
  <ListCard
    :is-active="isCurrentEncounter"
    class="mt-2 cursor-pointer"
  >
    <p class=" text-serenity-primary">
      <span class="capitalize">{{ encounter.encounter_class }}</span> <span class="text-secondary">({{ $date.distanceInWords(encounter.start_time) }})</span>
    </p>
    <p class="text-sm text-secondary mt-1">
      The patient has been complaining of difficulty in breathing.
    </p>
  </ListCard>
</template>

<script>
export default {
  name: 'EncounterListCardItem',

  props: {
    encounter: {
      type: Object,
      default: () => {},
    },

    isCurrentEncounter: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
