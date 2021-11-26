<template>
  <BaseModal
    :name="name"
    width="450px"
    title="Virtual Care Requirements"
  >
    <template>
      <div>
        <p class="text-placeholder text-xs">
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
          <SeButton
            variant="danger-outline"
          >
            Patient is not fit
          </SeButton>
          <SeButton
            :icon="icon"
          >
            Patient is fit
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import modalMixin from '@/mixins/modal'

export default {
  name: 'VirtualCareRequirementsModal',

  mixins: [modalMixin],

  data() {
    return {
      icon: Checkmark,
      name: 'virtual-care-requirements-modal',
    }
  },

  events: {
    'virtual:care:open': function(){
      this.open()
    },
  },
}
</script>
