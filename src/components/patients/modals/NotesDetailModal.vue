<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="close"
  >
    <template slot="content">
      <div class="flex items-center justify-between mb-6 w-full">
        <p>Note details</p>
      </div>
      <div>
        <p class="text-secondary mb-2">Written by</p>
        <div class="flex items-center">
          <InfoImageBlock
            label="Dr Chris Dare"
            description="General Practitioner"
          />
        </div>

        <div class="my-6">
          <p class="text-secondary mb-2">Encounter</p>
          <div class="flex items-center">
            <p>{{ $date.formatDate(note.created_at) }}</p>
            <p
              v-if="note.encounter"
              class="text-serenity-primary font-bold underline ml-2"
              @click="viewEncounter"
            >
              View encounter
            </p>
          </div>
        </div>
        <!-- <div class="my-6">
          <p class="text-secondary  mb-2">Area</p>
          <p>In Patient</p>
        </div> -->
        <div class="my-6">
          <p
            class="text-secondary pb-2"
          >
            Details
          </p>
          <p>
            {{ note.display }}
          </p>
        </div>
      </div>
      <div class="w-full mt-8">
        <SeButton
          variant="secondary"
          full
          @click="close"
        >
          Close
        </SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import modalMixin from '@/mixins/modal'
import { mapActions } from 'vuex'
export default {
  name: 'NotesDetailModal',

  mixins: [modalMixin],

  data() {
    return {
      note: {},
    }
  },

  events: {
    'notes:detail:open': function(_ev, { data }){
      this.visible = true
      this.note = data
    },
    'notes:detail:close': function() {
      this.close()
    },
  },

  methods: {
    ...mapActions({
      setCurrentEncounter: 'encounters/setCurrentEncounter',
    }),

    viewEncounter() {
      this.setCurrentEncounter(this.note.encounter)
      this.$router.push({ name: 'PatientEncounters', params: { id: this.$route.params.id }})
    },
  },
}
</script>
