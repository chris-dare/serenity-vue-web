<template>
  <div class="mt-3 grid grid-cols-4 gap-4">
    <div>
      <div class="flex items-center my-3">
        <div class="w-3 h-3 mr-2 rounded-full bg-serenity-warning"></div>
        <p class="text-sm">Current</p>
      </div>
      <ListCard is-active="true" class="mt-2">
        <p class="text-sm text-serenity-primary">
          Office Visit <span class="text-gray-400">(Today, Nov 13, 2020)</span>
        </p>
        <p class="text-sm text-gray-400 mt-1">
          The patient has been complaining of difficulty in breathing.
        </p>
      </ListCard>
      <div class="flex items-center mt-3">
        <div class="w-3 h-3 mr-2 rounded-full bg-serenity-info"></div>
        <p class="text-sm">Past(6)</p>
      </div>
      <ListCard border="bg-serenity-info" class="mt-2">
        <p class="text-sm text-serenity-primary">
          Office Visit <span class="text-gray-400">(Today, Nov 13, 2020)</span>
        </p>
        <p class="text-sm text-gray-400 mt-1">
          The patient has been complaining of difficulty in breathing.
        </p>
      </ListCard>
    </div>
    <div class="col-span-3">
        <p class="text-serenity-placeholder my-3">Encounter Details</p>
        <EncounterDetailCard />
    </div>
  </div>
</template>

<script>
import EncounterDetailCard from '@/components/patients/encounters/EncounterDetailCard'
export default {
  name: 'PatientEncounters',

  components: {EncounterDetailCard},
}
</script>
