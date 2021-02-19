<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="xs"
  >
    <template slot="content">
      <div>
        <p class="my-2 font-semibold">Virtual Care Requirements</p>
        <p class="text-serenity-placeholder text-xs">
          Patient does not have sudden weakness or numbness in the face, arm or
          leg (especially on one side of the body)
          <br>
          <br>
          Patient does not have sudden confusion or trouble speaking or
          understanding speech
          <br><br>
          Patient does not have sudden vision problems in one or both eyes
          <br><br>
          Patient does not have sudden difficulty walking or dizziness, loss of
          balance or problems with coordination
          <br><br>
          Patient does not have severe headache with no known cause
          <br><br>
          Patient does not have chest pain
          <br><br>
          Patient is not actively bleeding from any part of the body
          <br><br>
          Patient has not had a seizure within the last 24 hours, or has had but
          is known to have seizure disorder
          <br><br>
          Patient is not a child with persistent fever (Temperature >38.5 °C)
        </p>
        <div class="flex items-center justify-between mt-2">
          <cv-button
            class="border-danger text-danger hover:text-white focus:bg-danger hover:bg-danger px-4"
            kind="tertiary"
            size="field"
          >
            Patient is not fit
          </cv-button>
          <cv-button
            :icon="icon"
            kind="primary"
            size="field"
            class="bg-serenity-primary"
          >
            Patient is fit
          </cv-button>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
export default {
  name: 'VirtualCareRequirementsModal',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      icon: Checkmark,
    }
  },

  computed: {
    modalVisible: {
      set(val) {
        this.$emit('visible:update', val)
      },
      get() {
        return this.visible
      },
    },
  },
}
</script>
