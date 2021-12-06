<template>
  <BaseModal
    :name="name"
    width="450px"
    @closed="close"
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
          :loading="loading"
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
import { mapActions, mapGetters, mapState } from 'vuex'
import modalMixin from '@/mixins/modal'

export default {
  name: 'EndVisitConfirmationModal',

  components: { StatusSuccess, StatusFailure },

  mixins: [modalMixin],

  data() {
    return {
      visible: false,
      callback: null,
      type: 'success',
      name: 'end-visit-confirmation-modal',
      loading: false,
    }
  },

  events: {
    'visit:end:open': function(_ev, { callback }){
      if(this.visible)return
      this.callback = callback
      this.visible = true
      this.open()
    },

    'visit:end:close': function(){
      this.visible = false
      this.close()
    },
  },

  computed: {
    ...mapState({
      encounter: state => state.encounters.currentEncounter,
    }),
    ...mapGetters({
      failure: 'encounters/currentEncounterCannotBeFinished',
      hasEncounterBegan: 'encounters/hasEncounterBegan',
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
    ...mapActions({
      startEncounter: 'encounters/startEncounter',
    }),

    async confirm() {
      if (this.failure) {
        await this.handleFailure()
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

    async handleFailure() {
      try {
        this.loading = true
        if (!this.hasEncounterBegan) {
          await this.startEncounter(this.encounter.id)
          this.goToReview()
        } else {
          this.goToReview()
        }
      } catch (error) {
        // 
      } finally {
        this.loading = false
      }
    },

    goToReview() {
      this.$router.push({ name: 'EncounterReview', params: { encounter: this.encounter.id, id: this.$route.params.id } })
      this.close()
    },
  },
}
</script>
