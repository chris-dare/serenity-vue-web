<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="flex flex-col items-center justify-center space-y-4">
        <StatusSuccess
          v-if="type === 'success'"
          class="w-10 h-10 text-serenity-primary"
        />
        <StatusFailure
          v-else
          class="w-10 h-10 text-red-500"
        />
        <p>{{ label }}</p>
        <SeButton
          full
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
  </cv-modal>
</template>

<script>
import StatusSuccess from '@carbon/icons-vue/es/watson-health/ai-status--complete/32'
import StatusFailure from '@carbon/icons-vue/es/watson-health/ai-status--failed/32'
export default {
  name: 'EndVisitConfirmationModal',

  components: { StatusSuccess, StatusFailure },

  props: {
    type: {
      type: String,
      default: 'success',
    },

    label: {
      type: String,
      default: 'Are you sure you want to end this encounter?',
    },
    buttonLabel: {
      type: String,
      default: 'End Visit',
    },
  },

  data() {
    return {
      visible: false,
      callback: null,
    }
  },

  events: {
    'visit:end:open': function(_ev, { callback }){
      if(this.visible)return
      this.callback = callback
      this.visible = true
    },

    'visit:end:close': function(){
      this.visible = false
    },
  },

  methods: {
    async confirm() {
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
    },
  },
}
</script>
