<template>
  <div class="mt-3 grid grid-cols-4 gap-4">
    <div>
      <EncountersList
        name="current"
        :encounters="onGoingEncounters"
        is-active
      />
      <EncountersList
        name="past"
        :encounters="pastEncounters"
      />
      <!-- <div class="flex items-center mt-3">
        <div class="w-3 h-3 mr-2 rounded-full bg-info" />
        <p class="">Past(6)</p>
      </div>
      <ListCard
        border="bg-info"
        class="mt-2"
      >
        <p class=" text-serenity-primary">
          Office Visit <span class="text-secondary">(Today, Nov 13, 2020)</span>
        </p>
        <p class="text-sm text-secondary mt-1">
          The patient has been complaining of difficulty in breathing.
        </p>
      </ListCard> -->
    </div>
    <div class="col-span-3">
      <div class="flex justify-between items-center">
        <p class="text-serenity-placeholder my-3">Encounter Details</p>
        <AddNewButton />
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
