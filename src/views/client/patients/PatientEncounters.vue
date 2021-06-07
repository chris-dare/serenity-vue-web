<template>
  <div class="mt-3 grid grid-cols-4 gap-4">
    <div class="h-avg overflow-y-auto">
      <EncountersList
        name="current"
        :encounters="onGoingEncounters"
        is-active
      />
      <EncountersList
        name="past"
        :encounters="pastEncounters"
      />
    </div>
    <div class="col-span-3">
      <div class="flex justify-between items-center">
        <p class="text-serenity-placeholder my-3">Encounter Details</p>
      </div>
      <EncounterDetailCard />
    </div>
  </div>
</template>

<script>
import EncounterDetailCard from '@/components/patients/encounters/EncounterDetailCard'
import EncountersList from '@/components/patients/encounters/EncountersList'
import { mapGetters } from 'vuex'

export default {
  name: 'PatientEncounters',

  components: { EncounterDetailCard, EncountersList },

  computed: {
    ...mapGetters({
      onGoingEncounters: 'encounters/onGoingEncounters',
      pastEncounters: 'encounters/pastEncounters',
    }),
  },
}
</script>
