<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="w-full flex flex-col items-center justify-center pt-6 space-y-4">
        <Checkmark class="text-serenity-primary w-12 h-12" />
        <p class="text-serenity-primary my-4 text-lg">{{ label }}</p>
        <SeButton
          @click="visible = false"
        >
          Close
        </SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark/32'

export default {
  name: 'ProfileUpdateSuccessModal',

  components: { Checkmark },

  data() {
    return {
      visible: false,
      label: '',
    }
  },

  events: {
    'success:open': function(data){
      this.visible = true
      this.label = data.params[0]
    },
    'success:close': function(){
      this.visible = false
    },
  },

  watch: {
    '$route'(){
      this.visible = false
    },
  },
}
</script>
