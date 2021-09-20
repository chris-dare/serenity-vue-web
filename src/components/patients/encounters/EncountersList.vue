<template>
  <div>
    <div class="flex items-center my-3">
      <div
        class="w-3 h-3 mr-2 rounded-full "
        :class="[isActive ? 'bg-warning': 'bg-info']"
      />
      <p class="capitalize">{{ name }}</p>
    </div>
    <div v-if="noEncounters">
      <p class="text-secondary text-sm">There are no {{ name }} encounters</p>
    </div>
    <div v-else>
      <EncounterListCardItem
        v-for="(encounter, index) in encounters"
        :key="index"
        :encounter="encounter"
        :is-current-encounter="encounter.id === currentEncounter.id"
        @click.native="setPatientCurrentEncounter(encounter)"
      />
    </div>
  </div>
</template>

<script>
import EncounterListCardItem from '@/components/patients/encounters/EncounterListCardItem'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'EncountersList',

  components: {EncounterListCardItem},

  props: {
    name: {
      type: String,
      default: '',
    },

    encounters: {
      type: Array,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState({
      currentEncounter: state => state.encounters.currentPatientEncounter,
    }),
    noEncounters() {
      return this.encounters.length === 0
    },
  },

  methods: {
    ...mapActions({
      setPatientCurrentEncounter: 'encounters/setPatientCurrentEncounter',
    }),
  },
}
</script>
