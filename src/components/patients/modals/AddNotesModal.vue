<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-4">
        <p class="text-lg font-semibold">Add notes</p>
        <cv-text-area
          v-model="form.notes"
          label="Note details"
          placeholder="Describe what this note is about"
          :rows="10"
        />
        <div class="flex items-center justify-between mt-8">
          <SeButton variant="secondary">Go back</SeButton>
          <SeButton>Submit Note<ChevronRight class="w-4 h-4 text-white ml-4" /></SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'AddNotesModal',

  components: { ChevronRight },

  data() {
    return {
      form: {},
      visible: false,
    }
  },

  events: {
    'profile:notes:open': function(){
      this.visible = true
    },
    'profile:notes:close': function(){
      this.visible = false
    },
  },
}
</script>
