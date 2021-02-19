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
        <SeButton full>{{ buttonLabel }}</SeButton>
        <p
          class="underline cursor-pointer"
          @click="visible = false"
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
      default: 'Are you sure you want to end this visit?',
    },
    buttonLabel: {
      type: String,
      default: 'End Visit',
    },
  },

  data() {
    return {
      visible: false,
    }
  },

  events: {
    'visit:end:open': function(){
      this.visible = true
    },
    'visit:end:close': function(){
      this.visible = false
    },
  },
}
</script>
