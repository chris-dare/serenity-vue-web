<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
    width="450px"
  >
    <template>
      <div class="flex flex-col items-center justify-center space-y-4">
        <StatusSuccess
          v-if="!failure"
          class="w-10 h-10 text-serenity-primary"
        />
        <StatusFailure
          v-else
          class="w-10 h-10 text-red-500"
        />
        <p class="text-center">{{ label }}</p>
        <SeButton
          full
          :variant="failure ? 'warning' : 'primary'"
          @click="confirm"
        >
          {{ buttonLabel }}
        </SeButton>
        <p
          class="underline cursor-pointer"
          @click="close"
        >
          Go back
        </p>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import StatusSuccess from '@carbon/icons-vue/es/watson-health/ai-status--complete/32'
import StatusFailure from '@carbon/icons-vue/es/watson-health/ai-status--failed/32'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'EndVisitConfirmationModal',

  components: { StatusSuccess, StatusFailure },

  data() {
    return {
      visible: false,
      callback: null,
      type: 'success',
      name: 'end-visit-confirmation-modal',
    }
  },

  events: {
    'visit:end:open': function(_ev, { callback }){
      if(this.visible)return
      this.callback = callback
      this.visible = true
      this.$modal.show(this.name)
    },

    'visit:end:close': function(){
      this.visible = false
      this.$modal.hide(this.name)
    },
  },

  computed: {
    ...mapState({
      encounter: state => state.encounters.currentEncounter,
    }),
    ...mapGetters({
      failure: 'encounters/currentEncounterCannotBeFinished',
    }),

    label() {
      if (this.failure) {
        return 'You cannot end this visit, please complete all required fields for your consultation'
      }

      return 'Are you sure you want to end this encounter?'
    },

    buttonLabel() {
      return this.failure ? 'Complete consultation' : 'End Encounter'
    },
  },

  methods: {
    async confirm() {
      if (this.failure) {
        this.$router.push({ name: 'EncounterReview', params: { encounter: this.encounter.id, id: this.$route.params.id } })
        this.close()
        return
      }
      if (this.callback) {
        try {
          await this.callback(this.data)
          this.close()
        } catch {
          //empty
        }
      }
    },
  
    close() {
      this.visible = false
      this.$modal.hide(this.name)
    },
  },
}
</script>
