<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    title="Note details"
    width="450px"
  >
    <template>
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
  </BaseModal>
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
      name: 'notes-detail-modal',
    }
  },

  events: {
    'notes:detail:open': function(_ev, { data }){
      this.open()
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
