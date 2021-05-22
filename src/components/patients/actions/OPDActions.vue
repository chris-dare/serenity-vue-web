<template>
  <div class="flex items-center space-x-4">
    <SeButton
      v-if="!hasActiveEncounter"
      variant="secondary"
      @click="$trigger('start:encounter:open')"
    >
      Start Encounter
      <Add class="ml-2 w-5 h-5 text-white" />
    </SeButton>
    <div
      v-else
      class="flex items-center space-x-4"
    >
      <p
        class="underline cursor-pointer"
        @click="end"
      >
        End Encounter
      </p>
      <AddNewDropdown />

      <SeButton
        variant="warning"
        :to="{ name: 'EncounterReview', params: { encounter: encounter.id, id: $route.params.id } }"
      >
        Begin Consultation
      </SeButton>
      <SeButton
        v-if="false"
        variant="danger"
        @click="$trigger('profile:deceased-info:open')"
      >
        Patient is deceaseed - read more
      </SeButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'OPDActions',

  components: {
    AddNewDropdown: () => import('@/components/patients/AddNewDropdown'),
  },

  computed: {
    ...mapState({
      encounter: state => state.encounters.currentEncounter,
    }),
    ...mapGetters({
      hasActiveEncounter: 'encounters/hasActiveEncounter',
    }),
  },

  methods: {
    ...mapActions({
      endEncounter: 'encounters/endEncounter',
    }),


    end() {
      this.$trigger('visit:end:open', {
        callback: async () => {
          this.loading = true
          try {
            await this.endEncounter()
            this.$toast.open({
              message: 'Encounter ended successfully',
            })
            this.loading = false
          } catch (error) {
            // empty
            throw error || error.message
          }
        },
      })
    },
  },
}
</script>

<style>

</style>