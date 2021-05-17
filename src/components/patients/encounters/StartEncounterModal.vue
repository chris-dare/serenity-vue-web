<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <cv-form
        autocomplete="off"
        class="space-y-8"
        @submit.prevent
      >
        <p class="text-lg font-semibold">Start Encounter</p>
        <MultiSelect
          v-model="form.service_type"
          title="Service type"
          :multiple="false"
          :options="services"
          label="healthcare_service_name"
          placeholder="Select service type"
          custom-field="id"
          track-by="id"
          enable-search
        />
        <MultiSelect
          v-model="form.encounter_class"
          title="Code"
          :multiple="false"
          :options="codes"
          label="label"
          placeholder="Select code"
          custom-field="label"
          track-by="value"
          enable-search
        />
        <cv-number-input
          v-model="form.priority"
          label="Priority"
          placeholder="eg 1 for highest priority"
          class="se-input-gray"
        />
        <div class="flex items-center justify-between">
          <SeButton
            variant="secondary"
            @click="close"
          >
            Cancel
          </SeButton>
          <SeButton
            :loading="loading"
            @click="start"
          >
            Start Encounter
          </SeButton>
        </div>
      </cv-form>
    </template>
  </cv-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'StartEncounterModal',

  data() {
    return {
      form: {},
      visible: false,
      loading: false,
    }
  },

  computed: {
    ...mapState({
      codes: state => state.encounters.encounterCodes,
      services: state => state.services.services,
    }),
  },

  events: {
    'start:encounter:open': function(){
      this.visible = true
    },
    'start:encounter:close': function(){
      this.visible = false
    },
  },

  methods: {
    ...mapActions({
      startEncounter: 'encounters/createEncounter',
    }),

    async start() {
      try {
        this.loading = true
        await this.startEncounter({patient: this.$route.params.id, ...this.form })
        this.$toast.open({ message: 'Encounter has started' })
        this.loading = false
        this.visible = false
      } catch (error) {
        this.loading = false
      }
    },

    close() {
      this.visible = false
    },
  },
}
</script>
